Meteor.subscribe("all-sensors");

Meteor.Router.add({
	'/': 'sensorData',
	'/sensors': 'sensors',
	'/chart': 'chart'
});