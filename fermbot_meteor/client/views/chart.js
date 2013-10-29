var chart;
var chartCursor;
var chartData;
var colors = [
        "#FF0000",
        "#FF7400",
        "#009999",
        "#00CC00",
        "#A60000",
        "#A64B00",
        "#006363",
        "#008500"];

// this method is called when chart is first inited as we listen for "dataUpdated" event
function zoomChart() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
}

// generate some random data, quite different range
function drawChart(brew) {

        // SERIAL CHART    
        chart = new AmCharts.AmSerialChart();
        chart.pathToImages = "/amcharts/images/";
        chart.dataProvider = chartData;
        chart.categoryField = "date";
        chart.balloon.bulletSize = 5;

        // listen for "dataUpdated" event (fired when chart is rendered) and call zoomChart method when it happens
        chart.addListener("dataUpdated", zoomChart);

        // AXES
        // category
        var categoryAxis = chart.categoryAxis;
        categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
        categoryAxis.minPeriod = "mm"; // our data is daily, so we set minPeriod to DD
        categoryAxis.dashLength = 1;
        categoryAxis.minorGridEnabled = true;
        categoryAxis.position = "top";
        categoryAxis.axisColor = "#DADADA";

        // value                
        var valueAxis = new AmCharts.ValueAxis();
        valueAxis.axisAlpha = 0;
        valueAxis.dashLength = 1;
        chart.addValueAxis(valueAxis);

        // GRAPH
        var graph = new AmCharts.AmGraph();
        graph.title = brew.name;
        graph.valueField = brew.name;
        graph.bullet = "round";
        graph.bulletBorderColor = colors[0];
        graph.bulletBorderThickness = 2;
        graph.bulletBorderAlpha = 1;
        graph.lineThickness = 2;
        graph.lineColor = colors[0];
        graph.hideBulletsCount = 1; // this makes the chart to hide bullets when there are more than 50 series in selection
        chart.addGraph(graph);


        // CURSOR
        chartCursor = new AmCharts.ChartCursor();
        chartCursor.cursorPosition = "mouse";
        chartCursor.oneBalloonOnly = false;
        chartCursor.pan = true; // set it to fals if you want the cursor to work in "select" mode
        chart.addChartCursor(chartCursor);

        // SCROLLBAR
        var chartScrollbar = new AmCharts.ChartScrollbar();
        chart.addChartScrollbar(chartScrollbar);

        // WRITE
        chart.write("chartdiv");
}


Template.chart.rendered = function () {
        var addresses;
        Meteor.call("getBrewChart", this.data._id, function(err, data) {
                console.log(data);
                chartData = data;
                drawChart(this);
        });
};
/*
Deps.autorun( function () {
        if (Sensors) {
                var addresses = Sensors.find().fetch();
                addresses = _.map(addresses, function(item) {
                        return item.sensorAddress;
                });
                Meteor.call("getReadings", addresses, function (err, data) {
                        chartData = data;
                });
        }
});
*/