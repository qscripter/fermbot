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
	},
	getSensors: function () {
		return Sensors.find().fetch();
	},
	deleteSensors: function () {
		Sensors.remove({}, {multi: true});
	},
	cleanReadings: function () {
		Readings.remove({temp_f: {$gt: 150}}, {multi: true});
	}
});