var express = require('express');
var app = express();

//var Mopidy = require("mopidy");
//var mopidy = new Mopidy();

//mopidy.on(console.log.bind(console));

app.use(express.static('../wwwroot'));

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})