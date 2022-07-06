var express = require('express');
var router = new express.Router();
var config = require('../config/settings');
var U = require('../model/user');

var bodyParser = require('body-parser')
router.use( bodyParser.json() );       
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
router.use(express.json());


router.get(["/","/SignUp"],function (request,response) {	  	
	response.render('SignUp');
});


router.post(["/","/SignUp"],function (request,response) {	
	var newuser = new U.User(request.body.name, request.body.username, request.body.password);
	var ret = newuser.insertIntoDb(function(result){
		if(result == -1){
			console.log("Couldnt sign up");
			html = "<h3 style=\"text-align:center; color:white\">This username is already in use</h3>";
			response.render('Login',{content : html});
		}
		else{
			response.redirect('/Login');
		}
	});
	
});

module.exports = router;