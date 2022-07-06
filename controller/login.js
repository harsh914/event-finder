var express = require('express');
var router = new express.Router();
var config = require('../config/settings');
var U = require('../model/user');

var bodyParser = require('body-parser')
router.use( bodyParser.json() );       
router.use(bodyParser.urlencoded({   
  extended: true
}));
router.use(express.json());


router.get(["/","/Login"],function (request,response) {	
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
	response.setHeader("Pragma", "no-cache");
	
	if(!request.session.user)
		response.render('Login');
	else
		response.redirect('/Home');
});


router.post(["/","/Login"],function (request,response) {
	
	var newuser = new U.User("", request.body.username, request.body.password);
	var ret = newuser.validateUser(function(result){
		if(result == -1){
			html = "<h3 style=\"text-align:center; color:white\">Incorrect credentials</h3>";
			response.render('Login',{content : html});
		}
		else{
			request.session.user = newuser;
			response.redirect('/Home');
		}
	});
	
});

module.exports = router;