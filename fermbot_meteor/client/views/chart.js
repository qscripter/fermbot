Template.chart.rendered = function () {
	var ctx = document.getElementById("myChart").getContext("2d");
	var readings = Readings.find().fetch();
	var labels = [];
	var temps = [];
	for (var i=0; i < readings.length; i++) {
		labels.push(readings[i].date_time);
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
};