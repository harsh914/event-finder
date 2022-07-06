var express = require('express');
var fs = require('fs');
var config = require('../config/settings');


function templateEngine(filePath,options,callback) {
	var absfilePath = config.basePath + "\\view" + filePath;
	fs.readFile(filePath,function(err,contents){		
		if (err) return callback(err);
		var rendered = contents.toString();
		
		for(x in options){
			if (x != 'settings' && x != '_locals' && x != 'cache'){
				var substr = "<!-- " + x + " -->";
				rendered = rendered.replace(substr, options[x]);
			}
		}
		
		return callback(null,rendered);
	});
	
}

module.exports = templateEngine;
