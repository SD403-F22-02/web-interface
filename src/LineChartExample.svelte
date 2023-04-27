<script>
	import { LineChart } from "@carbon/charts-svelte";

	import "@carbon/styles/css/styles.css";
	import "@carbon/charts/styles.css";
</script>

<LineChart
	data={[
	{
		"group": "Dataset 1",
		"date": "2019-01-01T06:00:00.000Z",
		"value": -10000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-01T11:00:00.000Z",
		"value": -12000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-01T16:00:00.000Z",
		"value": -14000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-02T06:00:00.000Z",
		"value": -25000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-02T08:00:00.000Z",
		"value": -26000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-03T06:00:00.000Z",
		"value": -10000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-03T11:00:00.000Z",
		"value": 10000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-03T16:00:00.000Z",
		"value": 12000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-05T06:00:00.000Z",
		"value": 45000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-07T06:00:00.000Z",
		"value": 49000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-07T21:00:00.000Z",
		"value": 45000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-09T06:00:00.000Z",
		"value": 50000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-09T11:00:00.000Z",
		"value": 52000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-09T21:00:00.000Z",
		"value": 55000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-10T06:00:00.000Z",
		"value": 50000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-12T06:00:00.000Z",
		"value": 65000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-13T06:00:00.000Z",
		"value": 80000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-14T16:00:00.000Z",
		"value": 85000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-15T13:00:00.000Z",
		"value": 90000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-16T00:00:00.000Z",
		"value": 70000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-01T06:00:00.000Z",
		"value": 20000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-01T09:00:00.000Z",
		"value": 22000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-01T22:00:00.000Z",
		"value": 24000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-02T06:00:00.000Z",
		"value": 35000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-02T13:00:00.000Z",
		"value": 36000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-03T06:00:00.000Z",
		"value": 20000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-03T12:00:00.000Z",
		"value": 20000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-04T00:00:00.000Z",
		"value": 22000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-05T06:00:00.000Z",
		"value": 62000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-06T06:00:00.000Z",
		"value": 52000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-07T06:00:00.000Z",
		"value": 52000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-07T21:00:00.000Z",
		"value": 52000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-09T06:00:00.000Z",
		"value": 60000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-09T11:00:00.000Z",
		"value": 62000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-09T16:00:00.000Z",
		"value": 62000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-12T06:00:00.000Z",
		"value": 65000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-14T06:00:00.000Z",
		"value": 40000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-15T11:00:00.000Z",
		"value": 45000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-15T16:00:00.000Z",
		"value": 35000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-16T00:00:00.000Z",
		"value": 30000
	}
]}
	options={{
	"title": "Line (dense time series)",
	"axes": {
		"bottom": {
			"title": "2019 Annual Sales Figures",
			"mapsTo": "date",
			"scaleType": "time"
		},
		"left": {
			"mapsTo": "value",
			"title": "Conversion rate",
			"scaleType": "linear"
		}
	},
	"curve": "curveMonotoneX",
	"height": "400px"
}}
	/>
