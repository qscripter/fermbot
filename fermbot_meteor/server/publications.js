Meteor.publish("all-sensors", function () {
	return Sensors.find();
});