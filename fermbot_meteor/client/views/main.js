Template.main.readings = function () {
	return Readings.find({}, {sort: {date_time: -1}, limit: 150});
};