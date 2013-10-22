var data;

function addItem(item) {
	var element = {};
	element[item.sensor] = item.temp_f;
	element.date = item.date_time;
	data.push(element);
}

Meteor.methods({
	getReadings: function (sensorAddresses) {
		data = [];
		for (var i=0; i < sensorAddresses.length; i++) {
			_.each(Readings.find({sensor: sensorAddresses[i]}).fetch(), addItem);
		}
		return data;
	}
});