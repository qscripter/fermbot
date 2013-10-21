Template.home.readings = function () {
	return Readings.find({}, {sort: {date_time: -1}, limit: 150});
};

Template.home.localTime = function () {
	var dateTime = new Date(this.date_time);
	var options = {
		year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
	};
	return dateTime.toLocaleDateString("en-US", options);
};