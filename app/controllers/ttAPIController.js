api = require('./apiConfig')
var request = require('request')

// export this object
module.exports = {
	sign_in: tt_signin,
	tt_login: tt_login,
	tt_logout: tt_logout,
	auto_login: auto_login
};

// TT sign in action
function tt_signin(req, res, next){
	req.app.set('tt_cookies', null);
	res.render('tt_api/sign_in', {error: ''})
}

// TT Login Request API
function tt_login(req, res, next){
	var params = {
		      "login_type": "json",
		      "user": {"email": req.body.email, "password": req.body.password }
		    }
	options = api.request_api_setup('/users/sign_in', params)
	request.post(options, function (error, response, body) {
		if (body['error']){
			res.render('tt_api/sign_in', {error: body['error']});
		}else{
			cookies = api.response_cookies(response)
			res.locals.success = "Successfully Authenticated From TravelTriangle"
			req.app.set('tt_cookies', cookies)	
			res.redirect('/');
		}
	})
}

// TT Login Request API
function auto_login(req, res, next){
	var params = {
		      "login_type": "json",
		      "user": {"email": process.env.EMAIL, "password": process.env.PASSWORD }
		    }
	options = api.request_api_setup('/users/sign_in', params)
	request.post(options, function (error, response, body) {
		if (body['error']){
			res.render('tt_api/sign_in', {error: body['error']});
		}else{
			current_user = body['current_user']
			console.log(current_user)
			res.cookie('current_user', current_user)
			console.log(req.session.current_user)
			cookies = api.response_cookies(response)
			res.locals.success = "Successfully Authenticated From TravelTriangle"
			req.app.set('tt_cookies', cookies)	
			res.redirect('/destinations');
		}
	})
}

// TT logout
function tt_logout(req, res, next){
	tt_cookies = req.app.get('tt_cookies')
	console.log(req.session)
	options = api.request_api_setup('/users/sign_out', {"logout_type": 'json'}, tt_cookies)
	request.get(options, function (error, response, body){
		req.app.set('tt_cookies', null) ;
		req.session.current_user = null;
		res.redirect('/')
	})
}
