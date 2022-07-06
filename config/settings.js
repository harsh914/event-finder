var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '',
  database: "event_management"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

module.exports = {
	con: con
	
};