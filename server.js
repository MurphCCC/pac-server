var express = require('express')
var app = express()
var fs = require('fs')
var accesslog = require('access-log');

//Wildcard route.  Because this server is only handling pac files we want to serve proxy.pac to all requests.
app.get('/*', function (req, res) {
  accesslog(req, res);
  var data = fs.readFileSync('proxy.pac').toString();
  res.send(data)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
