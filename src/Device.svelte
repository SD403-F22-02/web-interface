<script lang="ts">
import {pairDevice, getSessionData, forgetDevice, startSession, stopSession, progressReport} from './sensor';

export let sessionData:any[];
let deviceName = 'No device paired';
let infoMsgType = 'info';
let infoMsg = '';

let activeSession = false;
$: progress = progressReport;
// $: {
//     progress = progress;
// }

const message = (type, message) => {
    infoMsgType = type;
    infoMsg = message;
}

const pairDeviceButton = async() => {
    message('info', 'Attempting to pair...');
    let device = await pairDevice();
    deviceName = device.name;
    message('success','Successfully paired');
}

const getSessionDataButton = async() => {
    message('info', 'Getting session data...');
    sessionData = await getSessionData();
    message('success', 'Successfully received session data');
}

const forgetDeviceButton = async () => {
    const res = await forgetDevice();
    if(res){
        message('error', 'No device to forget');
        return;
    }
    deviceName = 'No device paired';
    activeSession = false;
    message('success', 'Device forgotten');
}

const startSessionButton = async() => {
    const res = await startSession();
    if(res){
        message('error', 'No device paired.')
        return;
    }
    activeSession = true;
    message('info', 'Start session command sent');
}

const stopSessionButton = async() => {
    const res = await stopSession();
    if(res){
        message('error', 'No device paired.');
        return;
    }
    activeSession = false;
    message('info', 'Stop session command sent');
    console.log(`Progress is ${progressReport}`)
}
</script>

<section>
    <h1>SD405-S23-02 Sensor Data</h1>
    <p class={infoMsgType}>{infoMsg}</p>
    <h4>Paired to: {deviceName}</h4>

    <button on:click={async()=>await pairDeviceButton()}>pairDevice</button>
    <button on:click={async()=>await forgetDeviceButton()}>forgetDevice</button>
    
    <button on:click={async()=>await getSessionDataButton()}>getSessionData</button>
    <!-- <button on:click={async()=>await stopSessionButton()}>stopSession</button>
    <button on:click={async()=>await startSessionButton()}>startSession</button> -->

    {#if !activeSession}
    <button on:click={async()=>await startSessionButton()}>startSession</button>
    {/if}
    {#if activeSession}
    <button on:click={async()=>await stopSessionButton()}>stopSession</button>
    {/if}

</section>

<style>
/* .info, .success, .warning, .error, .validation {
    border: 1px solid;
    margin: 10px 0px;
    padding: 15px 10px 15px 50px;
    background-repeat: no-repeat;
    background-position: 10px center;
} */
.info {
    color: #00529B;
    background-color: #BDE5F8;
    /* background-image: url('https://i.imgur.com/ilgqWuX.png'); */
}
.success {
    color: #4F8A10;
    background-color: #DFF2BF;
    /* background-image: url('https://i.imgur.com/Q9BGTuy.png'); */
}
.warning {
    color: #9F6000;
    background-color: #FEEFB3;
    /* background-image: url('https://i.imgur.com/Z8q7ww7.png'); */
}
.error{
    color: #D8000C;
    background-color: #FFBABA;
    /* background-image: url('https://i.imgur.com/GnyDvKN.png'); */
}
.validation{
    color: #D63301;
    background-color: #FFCCBA;
    /* background-image: url('https://i.imgur.com/GnyDvKN.png'); */
}
</style>