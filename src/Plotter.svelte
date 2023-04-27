<script lang="ts">
import {LineChart} from '@carbon/charts-svelte';
import "@carbon/styles/css/styles.css";
import "@carbon/charts/styles.css";

export let sessionData:any[];

const parseSensorData = (data:any[]) => {
/**
 * {
 *  time_ms
 *  roll
 *  pitch
 *  yaw
 * }
*/
    console.log('parsing sensor data');
    if(!data){return}
    console.log('data', data);
    let parsedData = [];
    data.forEach((ele)=>{
        parsedData.push({
            group: 'roll',
            time_ms: ele.time_ms,
            value: ele.roll
        });
        parsedData.push({
            group: 'pitch',
            time_ms: ele.time_ms,
            value: ele.pitch
        });
        parsedData.push({
            group: 'yaw',
            time_ms: ele.time_ms,
            value: ele.yaw
        });
    });
    console.log('parsedData', parsedData);
    return parsedData;
}

$: sessionDataParsed = parseSensorData(sessionData);



</script>


<LineChart
    data={sessionDataParsed}
    options={{
        "title": "Sensor Fusion",
        "axes": {
            "bottom": {
                "title": "Time (ms)",
                "mapsTo": "time_ms",
                "scaleType": "linear"
            },
            "left": {
                "mapsTo": "value",
                "title": "Roll, Pitch, Yaw (degrees)",
                "scaleType": "linear"
            }
        },
        "curve": "curveMonotoneX",
        "height": "600px"
    }}
    />