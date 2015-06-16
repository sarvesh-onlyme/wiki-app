app.config(function($routeProvider){
	$routeProvider
		.when( '/', {
			controller: 'homeCtrl',
			templateUrl: 'static/views/home.html',
		})
		.when( '/account', {
			controller: 'accountCtrl',
			templateUrl: 'static/views/account.html',
		})
		.when( '/signin', {
			controller: 'signinCtrl',
			templateUrl: 'static/views/signin.html',
		})
		.when( '/country', {
			controller: 'countryCtrl',
			templateUrl: 'static/views/country.html',
		})
		.when( '/company', {
			controller: 'companyCtrl',
			templateUrl: 'static/views/company.html',
		});
});