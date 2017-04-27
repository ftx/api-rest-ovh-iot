var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = process.env.PORT || 96;


// routes will go here
app.post('/send', function(req, res) {
    var temp = req.body.slot_temp;
    var hum = req.body.slot_hum;
    var signal = req.body.signal;

    res.send(signal + ' ' + temp + ' ' + hum);
    console.log(signal + ' ' + temp + ' ' + hum);
});


// start the server
app.listen(port);
console.log('Server started! port:' + port);
