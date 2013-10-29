Meteor.subscribe("all-sensors");
Meteor.subscribe("all-brews");
Meteor.subscribe("all-yeasts");
Meteor.subscribe("all-locations");

Meteor.Router.add({
	'/': 'home',
	'/sensors': 'sensors',
	'/chart': 'chart',
	'/brews': 'brews'
});