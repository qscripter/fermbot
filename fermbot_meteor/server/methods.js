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
			var today = new Date();
			var yesterday = new Date(today.setDate(today.getDate() - 1));
			_.each(Readings.find({sensor: sensorAddresses[i], date_time: {$gt: yesterday}}).fetch(), addItem);
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
		//Readings.remove({temp_f: {$gt: 150}}, {multi: true});
		var log = [];
		Readings.find().forEach(function (document) {
			var coeff = 1000 * 60 * 5;
			console.log(document);
			var date = new Date(document.date_time);
			console.log(date);
			var roundedDate = new Date(Math.round(date.getTime() / coeff) * coeff);
			log.push(roundedDate);
			Readings.update(document._id, {$set: {date_time: roundedDate}}, {$unset: {date: ""}});
		});
		return log;
	},
	getBrewChart: function (brewId) {
		var brew = Brews.findOne(brewId);
		var mostRecentReadingTime = new Date(Brews.updated);
		var oldDate = new Date(mostRecentReadingTime.setDate(mostRecentReadingTime.getDate() - 1));
		var data = [];
		function addItem(item) {
			var element = {};
			element[item.sensor] = item.temp_f;
			element.date = item.date_time;
			data.push(element);
		}
		//
		Readings.find({date_time: {$gt: oldDate}, brew: brew._id}).forEach(addItem);
		return data;
	},
	createBrew: function (name) {
		var data = {
			name: name,
			updated: new Date(),
			currentTemp: 70,
			readings: [],
			sensor: "",
			location: "",
			status: "fermenting"
		};
		Brews.insert(data);
	}
});