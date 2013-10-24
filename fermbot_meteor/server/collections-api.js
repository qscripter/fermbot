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
					Sensors.update({sensorAddress: obj.sensor}, {$set: {currentTemp: obj.temp_f, updated: obj.date_time}});
					return true;
				} else {
					return false;
				}
			}
		}
	});

	collectionApi.start();
});