Template.sensorData.sensors = function () {
	return Sensors.find();
};

Template.sensorData.localUpdateTime = function () {
	var dateTime = new Date(this.updated);
	var options = {
		year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
	};
	return dateTime.toLocaleDateString("en-US", options);
};

Template.sensorData.roundedTemp = function () {
	return Math.round(this.currentTemp * 100) / 100;
}