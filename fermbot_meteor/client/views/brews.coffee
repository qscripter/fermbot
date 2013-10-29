Template.brews.brews =  () =>
	return Brews.find()

Template.brews.sensors = ->
	return Sensors.find()

Template.brews.sensorSelected = (sensorId, brewId) =>
	return Brews.findOne(brewId)?.sensor == sensorId

Template.brews.locations = ->
	return Locations.find()

Template.brews.locationSelected = (locationId, brewId) =>
	return Brews.findOne(brewId)?.location == locationId



Template.brews.events = {
	'click #add-brew': ->
		brewName =  $('#brew-name').val()
		Meteor.call("createBrew", brewName);
	'change .select-sensor': (event) =>
		sensorId = $(event.target).val()
		brewId = $(event.target).attr('brewId')
		Brews.update(brewId, {$set: {sensor: sensorId}})
	'change .select-location': (event) =>
		locationId = $(event.target).val()
		brewId = $(event.target).attr('brewId')
		Brews.update(brewId, {$set: {location: locationId}})
}