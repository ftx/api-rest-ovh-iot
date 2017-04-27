var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = process.env.PORT || 96;

var TOKEN_ID = process.env.TOKEN_ID;
var TOKEN_KEY = process.env.TOKEN_KEY;

// routes
app.post('/', function(req, res) {
	res.write('REST API NodeJS IOT OVH (sigfox version) - flotix@linux.com');
});



app.post('/send', function(req, res) {
    var temp = req.body.slot_temp;
    var hum = req.body.slot_hum;
    var signal = req.body.signal;

    res.send(signal + ' ' + temp + ' ' + hum);
    console.log(signal + ' ' + temp + ' ' + hum);


//JSON
var data = [{
			metric:"temp",
			value:temp,
			tags:{
				source:"sigfox",
				region:"Le Bouscat"
			}
},
{
                        metric:"hum",
                        value:hum,
                        tags:{
                                source:"sigfox",
                                region:"Le Bouscat"
                        }
},
{
                        metric:"signal",
                        value:signal,
                        tags:{
                                source:"sigfox",
                                region:"Le Bouscat"
                        }
}
];


// Send data
request({
	uri: "https://opentsdb-gra1.tsaas.ovh.com/api/put",
	auth: {
		user: TOKEN_ID,
		pass: TOKEN_KEY,
		sendImmediately: true
	},
	method: "POST",
	json: data
}, function (error, response, body) {
	if (error) {
		console.log(error);
	} else if (response.statusCode >= 400) {
		console.log(body);
		console.log(response.statusMessage);
	} else {
		console.log("...Success! Send to OVH IOT...");
	}
});





});


// start the server
app.listen(port);
console.log('Server started! port:' + port);
