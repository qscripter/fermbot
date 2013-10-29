Meteor.publish("all-sensors", function () {
	return Sensors.find();
});

Meteor.publish("all-brews", function () {
	return Brews.find();
});

Meteor.publish("all-yeasts", function () {
	return Yeasts.find();
});

Meteor.publish("all-locations", function () {
	return Locations.find();
});