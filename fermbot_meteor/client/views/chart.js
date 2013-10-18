function drawChart (readings) {
	var ctx = document.getElementById("myChart").getContext("2d");
	if (ctx && readings.length > 0) {
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
		var chart = new Chart(ctx).Line(data);
	}
}

Template.chart.rendered = function () {
	Meteor.call("getReadings", function (err, res) {
		drawChart(res);
	});
};