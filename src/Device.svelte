<script lang="ts">
import {pairDevice, getSessionData} from './sensor';

export let sessionData:any[];
let deviceName = 'No device paired';

const pairDeviceButton = async() => {
    let device = await pairDevice();
    deviceName = device.name;
}

const getSessionDataButton = async() => {
    sessionData = await getSessionData();
}
</script>

<section>
    <h1>Device</h1>
    <p>Paired to: {deviceName}</p>
    <button on:click={async()=>await pairDeviceButton()}>pairDevice</button>
    <button on:click={async()=>await getSessionDataButton()}>getSessionData</button>
</section>

<style>

</style>