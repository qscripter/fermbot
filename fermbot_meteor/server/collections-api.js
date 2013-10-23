Meteor.startup(function () {
	collectionApi = new CollectionAPI({
		apiPath: 'api'
	});

	collectionApi.addCollection(Readings, 'readings', {
		methods: ['POST', 'GET', 'PUT', 'DELETE'],
		before: {
			POST: function (obj) {
				obj.date_time = new Date(obj.date_time);
				Sensors.update({sensorAddress: obj.sensor}, {$set: {currentTemp: obj.temp_f, updated: obj.date_time}});
				Meteor.call("cleanReadings");
				return true;
			}
		}
	});

	collectionApi.start();
});