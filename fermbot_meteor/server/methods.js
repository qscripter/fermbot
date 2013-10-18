Meteor.methods({
	getReadings: function () {
		return Readings.find().fetch();
	}
});