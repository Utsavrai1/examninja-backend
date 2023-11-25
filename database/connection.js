var pg = require('pg');
var client = new pg.Client(process.env.ELEPHANT_SQL_URL);

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  else{
    console.log("Successfully Connected to Database".green);
  }

});

module.exports = client;
