<script lang="ts">
import Device from './Device.svelte';
import Plotter from './Plotter.svelte';

let sessionData:any[];


</script>

<svelte:head>
    <title>Sensor Data</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
    <Device bind:sessionData={sessionData}/>
    <Plotter sessionData={sessionData}/>
    <!-- <LineChartExample/> -->
</main>

<style>
    
</style>