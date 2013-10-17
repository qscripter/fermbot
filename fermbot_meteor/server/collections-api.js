Meteor.startup(function () {
	collectionApi = new CollectionAPI({
		apiPath: 'api'
	});

	collectionApi.addCollection(Readings, 'readings', {
		methods: ['POST', 'GET', 'PUT', 'DELETE']
	});

	collectionApi.start();
});