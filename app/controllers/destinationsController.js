api = require('./apiConfig')
async = require('async')

// export this object
module.exports = {
	index: index,
	testimonials: testimonials,
	dest_testimonial: destinations_with_testimonial,
	packages: packages
};


// List all destinations
function index(req, res, next) {
	var request = require('request')
	tt_cookies = req.app.get('tt_cookies');
	options = api.request_api_setup('/api/v1/trip_types/all_destinations.json', '', tt_cookies)
	request.get(options, function(error, response, body){
		console.log(error)
		if (response.statusCode >= 400){
			console.log(body)
			res.render('layouts/errors', {errors: body['errors']})
		}else{
			res.render('destinations/index', { destinations: JSON.parse(body) });	
		}
	})
}

// Destination Testimonials
function testimonials(req, res, next){
	var request = require('request')
	tt_cookies = req.app.get('tt_cookies');
	dest_id = req.params.id
	options = api.request_api_setup('/api/v1/destinations/'+dest_id+'/destination_top_testimonials.json', '', tt_cookies )
	request.get(options, function(error, response, body){
		body = JSON.parse(body)
		if (response.statusCode >= 400){
			res.render('layouts/errors', {errors: body})
		}else{
			res.render('destinations/testimonials', { testimonials: body });	
		}
	})
}

// Destination Packages
function packages(req, res, next){
	var request = require('request')
	tt_cookies = req.app.get('tt_cookies');
	dest_id = req.params.id
	options = api.request_api_setup('/api/v1/destinations/'+dest_id+'/packages.json', '', tt_cookies )
	request.get(options, function(error, response, body){
		console.log(body)
		res.json(body)
		// body = JSON.parse(body)
		// if (response.statusCode >= 400){
		// 	res.render('layouts/errors', {errors: body})
		// }else{
		// 	res.json(body)
		// 	//res.render('destinations/testimonials', { testimonials: body });	
		// }
	})
}



function api_callback(err, response, body) {
	console.log(err)
	console.log(body)
	return body
}


// List all destinations
function destinations_with_testimonial(req, res, next) {
	var request = require('request')
	tt_cookies = req.app.get('tt_cookies');
	dest_options = api.request_api_setup('/api/v1/trip_types/all_destinations.json', '', tt_cookies)
	testimonial_options = api.request_api_setup('/api/v1/destinations/56/destination_top_testimonials.json', '', tt_cookies)
	async.parallel(
		{
			destinations: function(api_callback){
					request.get(dest_options, api_callback)
				},
			testimonials: function(api_callback){
					request.get(testimonial_options, api_callback)
				}
		}
		,function(error, results){
		console.log(results);
		res.json(results);
	});	
}
