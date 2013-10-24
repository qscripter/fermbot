Meteor.subscribe("all-sensors");
Meteor.subscribe("all-brews");
Meteor.subscribe("all-yeasts");

Meteor.Router.add({
	'/': 'sensorData',
	'/sensors': 'sensors',
	'/chart': 'chart'
});