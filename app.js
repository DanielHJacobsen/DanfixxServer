
// BASE SETUP
// =============================================================================

var path			 	= require('http');
var path			 	= require('https');
var path			 	= require('path');
var bodyParser 	= require('body-parser');
var express    	= require('express');
var request 		= require('request');

var app        	= express(); // define our app using express

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = (process.env.VCAP_APP_PORT || process.env.PORT || 3000);
var host = (process.env.VCAP_APP_HOST || process.env.HOST || 'localhost');

var defaultBaseURL = 'https://palblyp.pmservice.ibmcloud.com/pm/v1';
var defaultAccessKey = 'secret';
var dbBearerToke = 'secret';

// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.
var env = { baseURL: defaultBaseURL, accessKey: defaultAccessKey };

var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
var pmServiceName = process.env.PA_SERVICE_LABEL ? process.env.PA_SERVICE_LABEL : 'pm-20';
var service = (services[pmServiceName] || "{}");
var credentials = service[0].credentials;
if (credentials != null) {
		env.baseURL = credentials.url;
		env.accessKey = credentials.access_key;
}

var rootPath = '/score';

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 	// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
 	next(); // make sure we go to the next routes and don't stop here
});

// env request
router.get('/', function(req, res) {
	res.json(env);
});

// score request
router.post('/', function(req, res) {
	var scoreURI = env.baseURL + '/score/' + req.body.context + '?accesskey=' + env.accessKey;
console.log('=== SCORE ===');
console.log('  URI  : ' + scoreURI);
console.log('  Context: ' + JSON.stringify(req.body.context));
console.log('  Input: ' + JSON.stringify(req.body.input));
console.log(' ');


	try {
		var r = request.post(scoreURI, { json: true, body: req.body.input }, function (error, response, body){
    if (!error && response.statusCode == 200) {
    	var temp = JSON.stringify(body[0].data[0]).split(",")[0].substring(1);
      	console.log("Body: " + JSON.stringify(body) + " - BodyTry: "+ JSON.stringify(body[0].data[0]).split(",")[0].substring(1));
      	
      	if (req.body.context == "livingroom") {
      		livingRoomReq(temp, function(err, result) {
      			if (err) {
      				console.log('something blew up');
      			} else {
      				console.log("Result: " + result); // Returns HTTP
      			}
      		});
      	}
      	if (req.body.context == "kitchen") {
      		kitchenReq(temp, function(err, result) {
      			if (err) {
      				console.log('something blew up');
      			} else {
      				console.log("Result: " + result); // Returns HTTP
      			}
      		});
      	}
      	if (req.body.context == "bedroom") {
      		bedroomReq(temp, function(err, result) {
      			if (err) {
      				console.log('something blew up');
      			} else {
      				console.log("Result: " + result); // Returns HTTP
      			}
      		});
      	}
      	if (req.body.context == "guestroom") {
      		guestRoomReq(temp, function(err, result) {
      			if (err) {
      				console.log('something blew up');
      			} else {
      				console.log("Result: " + result); // Returns HTTP
      			}
      		});
      	}
      	if (req.body.context == "bathroom") {
      		bathroomReq(temp, function(err, result) {
      			if (err) {
      				console.log('something blew up');
      			} else {
      				console.log("Result: " + result); // Returns HTTP
      			}
      		});
      	}
      	if (req.body.context == "diningroom") {
      		diningRoomReq(temp, function(err, result) {
      			if (err) {
      				console.log('something blew up');
      			} else {
      				console.log("Result: " + result); // Returns HTTP
      			}
      		});
      	}
      	if (req.body.context == "gamingroom") {
      		gamingRoomReq(temp, function(err, result) {
      			if (err) {
      				console.log('something blew up');
      			} else {
      				console.log("Result: " + result); // Returns HTTP
      			}
      		});
      	}
	
	
    } else {
      console.log("ERROR: "+error);
    }
  });
		req.pipe(r);
		r.pipe(res);
		
	} catch (e) {
		console.log('Score exception ' + JSON.stringify(e));
    var msg = '';
    if (e instanceof String) {
    	msg = e;
    } else if (e instanceof Object) {
      msg = JSON.stringify(e);
    }
    res.status(200);
    return res.send(JSON.stringify({
        flag: false,
        message: msg
  	}));
	}
	process.on('uncaughtException', function (err) {
    console.log("ERROR: " + err);
	});
	
});

//-------------------------------------------------------------------------------

var livingRoomReq = function(temp,callback){
  	request.post('https://16f65628-23da-4fc9-bfaf-74103b2a9509-bluemix.cloudant.com/danfixx', { json: true, body: {"_id":"Danfixx","Room":"Livingroom"}},
  	{
  	'auth':
  		{
  		'bearer': dbBearerToke
  		}
  	},  
  	function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, body);
    } else {
      callback(error);
    }
  });
};

var kitchenReq = function(temp,callback){
  	request.post('https://16f65628-23da-4fc9-bfaf-74103b2a9509-bluemix.cloudant.com/danfixx', { json: true, body: {"_id":"Danfixx","Room":"Kitchen"}},
  	{
  	'auth':
  		{
  		'bearer': dbBearerToke
  		}
  	},  
  	function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, body);
    } else {
      callback(error);
    }
  });
};

var bedroomReq = function(temp,callback){
  	request.post('https://16f65628-23da-4fc9-bfaf-74103b2a9509-bluemix.cloudant.com/danfixx', { json: true, body: {"_id":"Danfixx","Room":"Bedroom"}},
  	{
  	'auth':
  		{
  		'bearer': dbBearerToke
  		}
  	},  
  	function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, body);
    } else {
      callback(error);
    }
  });
};

var guestRoomReq = function(temp,callback){
  	request.post('https://16f65628-23da-4fc9-bfaf-74103b2a9509-bluemix.cloudant.com/danfixx', { json: true, body: {"_id":"Danfixx","Room":"Guest Room"}},
  	{
  	'auth':
  		{
  		'bearer': dbBearerToke
  		}
  	},  
  	function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, body);
    } else {
      callback(error);
    }
  });
};

var bathroomReq = function(temp,callback){
  	request.post('https://16f65628-23da-4fc9-bfaf-74103b2a9509-bluemix.cloudant.com/danfixx', { json: true, body: {"_id":"Danfixx","Room":"Bathroom"}},
  	{
  	'auth':
  		{
  		'bearer': dbBearerToke
  		}
  	},  
  	function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, body);
    } else {
      callback(error);
    }
  });
};

var diningRoomReq = function(temp,callback){
  	request.post('https://16f65628-23da-4fc9-bfaf-74103b2a9509-bluemix.cloudant.com/danfixx', { json: true, body: {"_id":"Danfixx","Room":"Dining Room"}},
  	{
  	'auth':
  		{
  		'bearer': dbBearerToke
  		}
  	},  
  	function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, body);
    } else {
      callback(error);
    }
  });
};

var gamingRoomReq = function(temp,callback){
  	request.post('https://16f65628-23da-4fc9-bfaf-74103b2a9509-bluemix.cloudant.com/danfixx', { json: true, body: {"_id":"Danfixx","Room":"Gaming Room"}},
  	{
  	'auth':
  		{
  		'bearer': dbBearerToke
  		}
  	},  
  	function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, body);
    } else {
      callback(error);
    }
  });
};

//-------------------------------------------------------------------------------

// Register Service routes and SPA route ---------------

// all of our service routes will be prefixed with rootPath
app.use(rootPath, router);

// SPA AngularJS application served from the root
app.use(express.static(path.join(__dirname, 'public')));

// START THE SERVER with a little port reminder when run on the desktop
// =============================================================================
app.listen(port, host);
console.log('App started on port ' + port);
