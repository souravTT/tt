module.exports = {
	request_api_setup: request_api_setup,
	response_cookies: response_cookies
};


// Configure API Request
function request_api_setup(path, params='', cookies = '', query_string = ''){
	var options = {
		url: process.env.TT_URI+path,
		headers: {
		    'Authorization': 'Basic dHR1c2VyOnR0dXNlcg==',
		    'Content-Type': 'application/json',
		    'Arequest_api_setupccept': 'application/json',
		  }
	};
	if(params){
		options['body'] = JSON.stringify(params)
	}
	if (cookies){
		options['headers']['Cookie'] = cookies;
		options['url'] = options['url']+'?security_auth_token='+process.env.TT_SECURITY_TOKEN;
		if (query_string){
			options['url'] = options['url'] + query_string;
		}
		options['headers']['User-Agent'] = 'TravelTriangle'
	}
	console.log(options)
	return options;
}

// Return API Cookies
function response_cookies(response){
	cookies = response['headers']['set-cookie'].map(function(self){
			return self.split('; ')[0];
		}).join('; ')
	return cookies;
}