const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const accesslog = require('access-log');
const shell = require('shelljs');
const exec = require('child_process').exec;
const path = require('path');
// Set up express server here
const options = {
    cert: fs.readFileSync(path.join(__dirname,'./fullchain.pem')),
    key: fs.readFileSync(path.join(__dirname, './privkey.pem'))
};

app.get('/log', (req, res) => {
  exec("awk '{print $1, $7}' /var/log/apache2/pacserver-*.log | sort | uniq | sed 's=/==g' | sed 's=.pac==g'", (e, stdout, stderr)=> {
      if (e instanceof Error) {
          console.error(e);
          throw e;
      }
      console.log('stdout ', stdout);
      console.log('stderr ', stderr);
      res.send(stdout)
  });
  // res.sendFile(__dirname + '/server.log')
  res.end
})

app.get('/log1', (req, res) => {
  exec("awk '{print $1, $7}' /var/log/apache2/pacserver-access.log.1 | sort | uniq | sed 's=/==g' | sed 's=.pac==g'", (e, stdout, stderr)=> {
      if (e instanceof Error) {
          console.error(e);
          throw e;
      }
      console.log('stdout ', stdout);
      console.log('stderr ', stderr);
      res.send(stdout)
  });
  // res.sendFile(__dirname + '/server.log')
  res.end
})

app.listen(8080);
https.createServer(options, app).listen(8443);
console.log('listening');
