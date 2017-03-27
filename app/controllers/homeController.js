var request = require('request')

// export this object
module.exports = {
	index: index,
	profile: github_profile,
	get_url_data: get_url_data
};


// Home index actions
function index(req, res, next){
	console.log(res.locals)
	res.render('home/index', { title: 'hello every one' });
}

// Home github profile actions
function github_profile(req, res, next){
	var options = {
		  url: 'https://api.github.com/users/'+req.params.username,
		  headers: {
		    'User-Agent': 'request'
		  }
		};
	request.get(options, function (error, response, body) {
		res.render('home/github_profile', { profile: body });
	})
}

function get_url_data(req, res, next){
	tt_cookies = req.app.get('tt_cookies');
	console.log(req.query.path)
	options = api.request_api_setup(req.query.path, '', tt_cookies)
	console.log(options)
	request.get(options, function(error, response, body){
		res.json(body);	
	})
}