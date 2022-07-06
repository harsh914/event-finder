var express = require('express');
var router = new express.Router();
var E = require('../model/event')

router.get(["/","/CreateEvent"],function (request,response) {	  	
	if(!request.session.user){
		return response.send("You have not logged in");
	}
	else{
		response.render('create');
	}
	
});

router.post(["/Create","/CreateEvent"],function (request,response) {
	
	var newevent = new E.Event(request.body.name, request.body.date, request.body.type, request.session.user.username);
	var ret = newevent.saveEvent(function(result){
		if(result == 0){
			response.redirect('/Home');
		}
		else{
			var html = "<h3 style=\"text-align:center; color:white\">Event with the same title already exists</h3>";
			response.render('create', {content: html} );
		}
	});
	
});


module.exports = router;