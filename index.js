var http = require('http');
var url = require('url');
var querystring = require('querystring');
var request = require("request");

// Body Parser
//
var getRawBody = require('raw-body')


var TOKEN_ID = process.env.TOKEN_ID;
var TOKEN_KEY = process.env.TOKEN_KEY;

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    console.log(page);
    res.writeHead(200, {"Content-Type": "text/plain"});
    if (page == '/') {
        res.write('REST API NodeJS IOT OVH - flotix@linux.com');
    }
    else if (page == '/lora') {

	getRawBody(req)
  .then(function (buf) {
    res.statusCode = 200
    res.end(buf.length + ' bytes submitted')
  })
  .catch(function (err) {
    res.statusCode = 500
    res.end(err.message)
  })
    console.log(res);	
    }
    else if (page == '/send') {
	var params = querystring.parse(url.parse(req.url).query);


var measurement =	params['measurement'];
var value	=	Number(params['value']);
var location	=	params['location'];

var data = [{
			metric:measurement,
			value:value,
			tags:{
				source:"RestNodeJS-API",
				region:location
			}
		}];
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
		console.log("Success!" + location + " / " + measurement + " / " +value +" ");
	}
});

	res.write('Success');
    }
    res.end();
});
server.listen(81);
