Template.brewDetail.locationName = ->
	return Locations.findOne(this.location).name