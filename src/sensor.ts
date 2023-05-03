let device:BluetoothDevice;
let commandCharacteristic:BluetoothRemoteGATTCharacteristic; // send command to command char to tell the sensor to send data
let dataCharacteristic:BluetoothRemoteGATTCharacteristic; // send data when the command char receives the command

const textdec = new TextDecoder('utf-8');

export let progressReport = '';
let progressReportActive = false;
let sessionLength;

const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const lineParser = (line:string) => {
    const [time_ms, roll, pitch, yaw] = line.split(',').map(parseFloat);
    return {time_ms, roll, pitch, yaw};
}

const resetVars = () => {
    progressReport = '';
}

export const pairDevice = async () => {
    device = await navigator.bluetooth.requestDevice({
        // acceptAllDevices: true,
        filters: [{
            name: 'Arduino'
        },{
            name: 'TheraTec Sensor'
        }],
        optionalServices: [0x580A]
    });

    await device.gatt.connect()
    .then((gattserver) => gattserver.getPrimaryServices())
    .then((services) => services[0].getCharacteristics())
    .then((imuCharacteristics) => {
        dataCharacteristic = imuCharacteristics[0];
        commandCharacteristic = imuCharacteristics[1];
    })

    await dataCharacteristic.startNotifications();
    await commandCharacteristic.startNotifications();

    console.log(dataCharacteristic, commandCharacteristic);
    resetVars();
    return device;
}

export const forgetDevice = async () => {
    if(!device){
        console.log('No device to forget');
        return 1;
    }
    console.log('forgetting device');
    await device.forget();
    resetVars();
    return 0;
}

// export function* progressReportGenerator(){
//     if(!progressReportActive){ 
//         console.log('Progress Report is not active');
//         return '';
//     }
//     let previousProgressReport = '';
//     console.log('Update progress report');
//     yield 'Progress 1';
//     yield 'Progress 2';
//     yield 'Progress 3';
//     yield 'Progress 4';
//     while(progressReportActive){
//         console.log(progressReport);
//         if(progressReport == previousProgressReport) continue;
//         yield progressReport;
//     }
//     return 'Progress final';
// }

const sessionProgressReport = (ev) => {
    let currentSessionLength = textdec.decode((ev.target as any).value);
    progressReport = `Session Length: ${currentSessionLength}s`;
    console.log(progressReport);
}

export const startSession = async () => {
    if(!device){
        console.log('No device paired');
        return 1;
    }

    return commandCharacteristic.writeValueWithResponse(new TextEncoder().encode('s'))
    .then(()=>{
        commandCharacteristic.addEventListener('characteristicvaluechanged', sessionProgressReport);
        progressReportActive = true;
        console.log('sessionProgressReport event listener added');
        return 0;
    })
}

export const stopSession = async () => {
    if(!device){
        console.log('No device paired');
        return 1;
    }
    progressReportActive = false;
    commandCharacteristic.removeEventListener('characteristicvaluechanged', sessionProgressReport);
    // await commandCharacteristic.writeValueWithResponse(new TextEncoder().encode('x'));
    // while(1){
    //     await sleep(100);
    //     let value = textdec.decode(await commandCharacteristic.readValue());
    //     if(value.includes('stopped session')) break;
    // }
    console.log(`ProgressReport is currently ${progressReport}`);

    return commandCharacteristic.writeValueWithResponse(new TextEncoder().encode('x'))
    .then(() => commandCharacteristic.readValue())
    .then((value) => {
        sessionLength = textdec.decode(value);
        console.log(sessionLength);
        return 0;
    })
}

export const getSessionData = async () => {
    // send command to device via command char

    // start listening on the data char and get data on BLENotify

    if(!device){
        console.log('No device selected!');
    }
    let rawdata = []

    const onDataChange = (ev)=>{
        let val = (ev.target as any).value;
        console.log(textdec.decode(val));
        rawdata.push(textdec.decode(val));
    }

    dataCharacteristic.addEventListener('characteristicvaluechanged', onDataChange);

    console.log('sending g');
    await commandCharacteristic.writeValueWithResponse(new TextEncoder().encode('g'));
    while(1){
        await sleep(100);
        let value = textdec.decode(await commandCharacteristic.readValue());
        if(value.includes('done')) break;
    }
    dataCharacteristic.removeEventListener('characteristicvaluechanged', onDataChange);
    
    rawdata = rawdata.map((line:string)=>{
        return lineParser(line);
    })

    // console.log(rawdata);
    return rawdata;
}