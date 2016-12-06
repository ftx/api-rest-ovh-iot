var http = require('http');
var request = require('request');

var s = http.createServer(function (req, res) {
  var raw = '';
  req.on('data', function(d) {
    raw += d; 
  });
  req.on('end', function() {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(raw);  
    var info = JSON.parse(raw);
    var temp = info.temperature

var options = {
    method: 'GET',
    uri: 'http://api.lf.je/send?measurement=temp&value='+temp+'&location=LoRa'
};
console.log(temp);
request(options, function(error, response, body) {
    console.log(body);
});



  });
});
s.listen(81);
