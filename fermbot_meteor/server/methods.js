Meteor.methods({
	getReadings: function (sensorAddresses) {
		return Readings.find({sensor: sensorAddress}).fetch();
	}
});