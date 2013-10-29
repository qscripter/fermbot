Meteor.startup(function () {
	collectionApi = new CollectionAPI({
		apiPath: 'api'
	});

	collectionApi.addCollection(Readings, 'readings', {
		methods: ['POST', 'GET', 'PUT', 'DELETE'],
		before: {
			POST: function (obj) {
				if (obj.temp_f < 100) {
					var date = new Date(obj.date_time);
					// round date to 5 minute increments
					var coeff = 1000 * 60 * 5; // milliseconds * seconds * 5 minutes
					obj.date_time = new Date(Math.round(date.getTime() / coeff) * coeff);

					// round temp
					obj.temp_f = Math.round(obj.temp_f * 100) / 100;

					// assign the reading to a brew or a location
					var sensor = Sensors.findOne({sensorAddress: obj.sensor});
					var brew = Brews.findOne({sensor: sensor._id});
					var location = Locations.findOne({sensor: sensor._id});
					if (brew) {
						Brews.update(brew._id, {$set: {currentTemp: obj.temp_f, updated: obj.date_time}});
						obj.thing = brew._id;
					} else if (location) {
						Locations.update(location._id, {$set: {currentTemp: obj.temp_f, updated: obj.date_time}});
						obj.thing = location._id;
					} else {
						// sensor is unassigned and doesn't need to be read
						return false;
					}
					return true;
				} else {
					// sensor is not a valid reading and should be discarded
					return false;
				}
			}
		}
	});

	collectionApi.start();

	Sensors.find({assigned: false}).observe({
		added: function(document) {
			console.log(document);
		}
	});
});

