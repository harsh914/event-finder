var config = require('../config/settings')

class User{
	constructor(n, u, p){
		this.name = n;
		this.username = u;
		this.password = p;
	}
	
	insertIntoDb(callback){
		var n = this.name;
		var u = this.username;
		var p = this.password;
		var sql = "INSERT INTO users VALUES (?, ?, ?)";
		
		config.con.query("SELECT * FROM Users where username = ?", [u], function (err, result, fields) {
			if (err) throw err;
			if(result.length!=0)
				return callback(-1);
			else
				config.con.query(sql, [n, u, p], function (err, result) {
					if (err) throw err;
					console.log("1 record inserted");
					return callback(0);
				});	
		  });
	}
	
	validateUser(callback){
		var u = this.username;
		var p = this.password;
		var sql = "SELECT * from Users where username = ? and user_password = ?";
		config.con.query(sql, [u,p], function (err, result, fields) {
			if (err) throw err;
			if(result.length==0)
				return callback(-1);
			else
				return callback(0);
		  });
	}
	
	getMyEvents(callback){
		var u = this.username;
		var sql = "SELECT * from Events where creator = ? and event_date >= curdate()";
		config.con.query(sql, [u], function (err, result, fields) {
			if (err) throw err;
			if(result.length==0)
				return callback("");
			else
				return callback(result);
		  });
		
	}
	
	static checkUser(username, callback){
		var sql = "SELECT * from Users where username = ?";
		config.con.query(sql, [username], function (err, result, fields) {
			if (err) throw err;
			if(result.length == 0){
				return callback(-1);
			}
			else
				return callback(0);
		  });	
	}
	
	
	getInvitedEvents(callback){
		var u = this.username;
		var sql = "select event_name, events.event_id, event_type, Year(event_date) as year, "+
		"Month(event_date) as month, Day(event_date) as day, users.user_name as creator" +
		" from (event_invited join events on event_invited.event_id = events.event_id) join users on users.username = events.creator" +
		" where event_invited.username = ? and event_date >= curdate()";
		config.con.query(sql, [u], function (err, result, fields) {
			if (err) throw err;
			if(result.length==0)
				return callback("");
			else
				return callback(result);
		  });
	}
	
	getRSVPdEvents(callback){
		var u = this.username;
		var sql = "select event_name, events.event_id, event_type, Year(event_date) as year, "+
		"Month(event_date) as month, Day(event_date) as day, users.user_name as creator" +
		" from (rsvpd_guests join events on rsvpd_guests.event_id = events.event_id) join users on users.username = events.creator" +
		" where rsvpd_guests.username = ? and event_date >= curdate()";
		config.con.query(sql, [u], function (err, result, fields) {
			if (err) throw err;
			if(result.length==0)
				return callback("");
			else
				return callback(result);
		  });
	}
	
	RSVP(id, callback){
		var u = this.username;
		var sql = "delete from event_invited where username = ? and event_id = ?";
		config.con.query(sql, [u, id], function (err, result, fields) {
			if (err) throw err;
			config.con.query("select * from rsvpd_guests where username = ? and event_id = ?", [u, id], function (err, result, fields) {
				if (err) throw err;
				if(result.length==0){
					sql = "insert into rsvpd_guests values (?, ?)"
					config.con.query(sql, [u, id], function (error, res, f) {
						if (error) throw error;
						return callback(0);
					});
				}
			});
		});
		
		
	}
	
	
}

module.exports = {
	User: User
};