Template.home.brews = ->
	return Brews.find({sensor: {$not: ""}})