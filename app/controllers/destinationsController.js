api = require('./apiConfig')
async = require('async')

// export this object
module.exports = {
	index: index,
	testimonials: testimonials,
	destination: destination,
	packages: packages,
	tour_package: tour_package
};


// List all destinations
function index(req, res, next) {
	var request = require('request')
	tt_cookies = req.app.get('tt_cookies');
	options = api.request_api_setup('/api/v2/trip_types/all_destinations.json', '', tt_cookies)
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
			console.log(body[0]);
			res.render('destinations/testimonials', { testimonials: body });	
		}
	})
}

// Destination Packages
function packages(req, res, next){
	var request = require('request')
	tt_cookies = req.app.get('tt_cookies');
	dest_id = req.params.id
	query_string = "&result_type=package_catalog&destination="+dest_id
	options = api.request_api_setup('/api/v4/get_filtered_results.json', '', tt_cookies, query_string)
	request.get(options, function(error, response, body){
		body = JSON.parse(body)
		if (response.statusCode >= 400){
			res.render('layouts/errors', {errors: body})
		}else{
			// res.json(body)
			dest_name = body['packages'][0]['destinations'][0]['name']
			console.log(dest_name)
			res.render('destinations/new_packages', { packages: body['packages'], dest_name: dest_name });	
		}
	})
}



function api_callback(err, response, body) {
	console.log(err)
	console.log(body)
	return body
}


// List all destinations
function destination(req, res, next) {
	var request = require('request')
	tt_cookies = req.app.get('tt_cookies');
	base_url = req.params.base_url
	package_id =  req.params.id
	console.log(req.params)
	package_option = api.request_api_setup('/api/v3/tour_packages/'+base_url+'.json', '', tt_cookies, '&id='+package_id)
	dest_options = api.request_api_setup('/api/v1/trip_types/all_destinations.json', '', tt_cookies)
	testimonial_options = api.request_api_setup('/api/v1/destinations/56/destination_top_testimonials.json', '', tt_cookies)
	async.parallel(
		{
			// destinations: function(api_callback){
			// 		request.get(dest_options, api_callback)
			// 	},
			// testimonials: function(api_callback){
			// 		request.get(testimonial_options, api_callback)
			// 	},
			package: function(api_callback){
				request.get(package_option, api_callback)
			}
		}
		,function(error, results){
		// console.log(results);
		res.json(results);
	});	
}


function tour_package(req, res, next) {
	var request = require('request')
	tt_cookies = req.app.get('tt_cookies');
	base_url = req.params.base_url
	package_id =  req.params.id
	package_option = api.request_api_setup('/api/v3/tour_packages/'+base_url+'.json', '', tt_cookies, '&id='+package_id)
	async.parallel(
		{
			package: function(api_callback){
				request.get(package_option, api_callback)
			}
		},
		function(error, results){
			res.json(results);
		}
	);	
}