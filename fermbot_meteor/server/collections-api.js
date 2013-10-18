Meteor.startup(function () {
	collectionApi = new CollectionAPI({
		apiPath: 'api'
	});

	collectionApi.addCollection(Readings, 'readings', {
		methods: ['POST', 'GET', 'PUT', 'DELETE'],
		before: {
			POST: function (obj) {
				obj.date_time = new Date(obj.date_time);
				return true;
			}
		}
	});

	collectionApi.start();
});