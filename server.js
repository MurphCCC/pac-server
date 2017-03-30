var express = require('express')
var app = express()
var fs = require('fs')
var accesslog = require('access-log');
var https = require('https');
var http = require('http');

var options = {
   key  : fs.readFileSync('privkey1.pem'),
   cert : fs.readFileSync('cert1.pem')
};

//Wildcard route.  Because this server is only handling pac files we want to serve proxy.pac to all requests.
app.get('*', function (req, res) {
  accesslog(req, res);
  res.redirect('https://localhost:8443');
  var data = fs.readFileSync('proxy.pac').toString();
  // res.send(data)
})

app.listen(80, function () {
  console.log('Example app listening on port 3000!')
})

https.createServer(options, (req, res) => {
  var data = fs.readFileSync('proxy.pac').toString();
  res.writeHead(200);
  res.end(data);
}).listen(8443);
