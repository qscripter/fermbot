var chart;
var chartCursor;
var chartData;

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
        valueAxis.minimum = 25;
        valueAxis.maximum = 100;
        chart.addValueAxis(valueAxis);

        // GRAPH
        var graph = new AmCharts.AmGraph();
        graph.title = brew.name;
        graph.valueField = brew.name;
        graph.bullet = "round";
        graph.bulletBorderColor = "#0772a1";
        graph.bulletBorderThickness = 2;
        graph.bulletBorderAlpha = 1;
        graph.lineThickness = 2;
        graph.lineColor = "#0772a1";
        graph.hideBulletsCount = 1; // this makes the chart to hide bullets when there are more than 50 series in selection
        chart.addGraph(graph);

        // Location Temp
        var locationGraph = new AmCharts.AmGraph();
        locationGraph.title = "Location";
        locationGraph.valueField = "locationTemp";
        locationGraph.bullet = "round";
        locationGraph.bulletBorderColor = "#FF8700";
        locationGraph.bulletBorderThickness = 2;
        locationGraph.bulletBorderAlpha = 1;
        locationGraph.lineThickness = 2;
        locationGraph.lineColor = "#FF8700";
        locationGraph.hideBulletsCount = 1; // this makes the chart to hide bullets when there are more than 50 series in selection
        chart.addGraph(locationGraph);


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
        var chartId = "chart_" + brew._id;
        chart.write(chartId);
}


Template.chart.rendered = function () {
        var addresses;
        var brew = this.data;
        Meteor.call("getBrewChart", this.data._id, function(err, data) {
                chartData = data;
                drawChart(brew);
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