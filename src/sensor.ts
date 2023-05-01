// const device = await navigator.bluetooth.requestDevice({
//     acceptAllDevices: true,
//     optionalServices: [0x180F]
// });
// const gattserver = await device.gatt?.connect();
// const battservice = await gattserver?.getPrimaryServices();
// // const charics = await battservice?[0].getCharacteristics();
// const charics = await battservice[0].getCharacteristics();
// const battChar = charics[0];
// let reading = await battChar.readValue();

// for (let i = 0; i < 100; i++) {
//     reading = await battChar.readValue();
//     console.log(reading.getUint8());
//     await sleep(200);
// }

import mockdata from './mockdata'

let device:BluetoothDevice;
let commandCharacteristic:BluetoothRemoteGATTCharacteristic; // send command to command char to tell the sensor to send data
let dataCharacteristic:BluetoothRemoteGATTCharacteristic; // send data when the command char receives the command

const textdec = new TextDecoder('utf-8');

const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const lineParser = (line:string) => {
    const [time_ms, roll, pitch, yaw] = line.split(',').map(parseFloat);
    return {time_ms, roll, pitch, yaw};
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

    if(!device){
        console.log('No device paired!!!');
        return;
    }
    if(!device.gatt){
        console.log('No GATT server found!!1');
        return;
    }

    const gattserver = device.gatt;
    while(!gattserver.connected){
        console.log('Attempting to connect to GATT server');
        await gattserver.connect();
        sleep(500);
    }
    const services = await gattserver.getPrimaryServices();
    const imuService = services[0];
    console.log(imuService);
    const imuCharacteristics = await imuService.getCharacteristics();
    console.log(imuCharacteristics);
    dataCharacteristic = imuCharacteristics[0];
    commandCharacteristic = imuCharacteristics[1];

    console.log(dataCharacteristic, commandCharacteristic);
    return device;
}

export const forgetDevice = async () => {
    if(!device){
        console.log('No device to forget');
        return 1;
    }
    console.log('forgetting device');
    await device.forget();
    return 0;
}

export const startSession = async () => {
    if(!device){
        console.log('No device paired');
        return 1;
    }

    await commandCharacteristic.writeValueWithResponse(new TextEncoder().encode('s'));
    while(1){
        sleep(100);
        let value = textdec.decode(await commandCharacteristic.readValue());
        if(value.includes('started session')) break;
    }
    return 0;
}

export const stopSession = async () => {
    if(!device){
        console.log('No device paired');
        return 1;
    }

    await commandCharacteristic.writeValueWithResponse(new TextEncoder().encode('x'));
    while(1){
        sleep(100);
        let value = textdec.decode(await commandCharacteristic.readValue());
        if(value.includes('stopped session')) break;
    }
    return 0;
}

export const getSessionData = async () => {
    // send command to device via command char

    // start listening on the data char and get data on BLENotify

    if(!device){
        console.log('No device selected!');
    }
    console.log('getSessionData not implemented yet!!!11');
    // return mockdata.rawdata100;
    let rawdata = []

    const onDataChange = (ev)=>{
        let val = (ev.target as any).value;
        console.log(textdec.decode(val));
        rawdata.push(textdec.decode(val));
    }

    dataCharacteristic.startNotifications().then((_)=>{
        dataCharacteristic.addEventListener('characteristicvaluechanged', onDataChange)
    })

    console.log('sending g');
    await commandCharacteristic.writeValueWithResponse(new TextEncoder().encode('g'));
    while(1){
        sleep(100);
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