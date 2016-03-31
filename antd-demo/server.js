var express = require('express');
var app = express();
var path = require('path');
//var fs = require('file');

app.use(express.static(path.join(__dirname, 'src/datas')));

app.get('/datas/:filename', function (req, res) {
  var fname = req.params.filename;
  console.log(fname);
  res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  })
  res.sendfile('src/datas/'+fname);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});



