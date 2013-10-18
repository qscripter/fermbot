function respChart(selector, data, options){

        // Define default option for line chart
        var option = {
                scaleOverlay : false,
                scaleOverride : false,
                scaleSteps : null,
                scaleStepWidth : null,
                scaleStartValue : null,
                scaleLineColor : "rgba(0,0,0,.1)",
                scaleLineWidth : 1,
                scaleShowLabels : true,
                scaleLabel : "<%=value%>",
                scaleFontFamily : "'proxima-nova'",
                scaleFontSize : 10,
                scaleFontStyle : "normal",
                scaleFontColor : "#909090",
                scaleShowGridLines : true,
                scaleGridLineColor : "rgba(0,0,0,.05)",
                scaleGridLineWidth : 1,
                bezierCurve : true,
                pointDot : true,
                pointDotRadius : 3,
                pointDotStrokeWidth : 1,
                datasetStroke : true,
                datasetStrokeWidth : 2,
                datasetFill : true,
                animation : true,
                animationSteps : 60,
                animationEasing : "easeOutQuart",
                onAnimationComplete : null
        };

        // check if the option is override to exact options 
        // (bar, pie and other)
        if (options === false || options === null) {
                options = option;
        }

        // get selector by context
        var ctx = selector.get(0).getContext("2d");
        // pointing parent container to make chart js inherit its width
        var container = $(selector).parent();

        // enable resizing matter
        $(window).resize( generateChart );



        // this function produce the responsive Chart JS
        function generateChart(){
                // make chart width fit with its container
                var ww = selector.attr('width', $(container).width() );
                // Initiate new chart or Redraw
                return new Chart(ctx).Line(data, options);
        }

        // run function - render chart at first load
        return generateChart();

}

function drawChart (readings) {
	var $chart = $('#myChart');
	if ($chart && readings.length > 0) {
		var labels = [];
		var temps = [];
		for (var i=0; i < readings.length; i++) {
			var date = new Date(readings[i].date_time);
			var options = {
				year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
			};
			labels.push(date.toLocaleTimeString());
			temps.push(readings[i].temp_f);
		}
		var data = {
			labels : labels,
			datasets : [
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					data : temps
				}
			]
		};
		var chart = respChart($chart, data);
	}
}

Template.chart.rendered = function () {
	Meteor.call("getReadings", function (err, res) {
		drawChart(res);
	});
};