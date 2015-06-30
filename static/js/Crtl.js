app.controller("wikiCtrl", function($scope, $http){
	$http.get("contributor/all").success(function (response) {
		contributorsList = response;
	});
	$http.get("country/all").success(function (res) {
		countriesList = res;
	});
	$http.get("company/all").success(function (res) {
		companiesList = res;
	});
});

app.controller("homeCtrl", function($scope, $routeParams, $http){
	$scope.param = $routeParams.param;
	$scope.data = contributorsList;
	$scope.organization = companiesList;
	$scope.country = countriesList;
	$(".nav.nav-sidebar li").removeClass("active-sidebar");
	$('.nav.nav-sidebar a[href="./"]')[0].parentElement.className = "active-sidebar";

	$scope.showEditRow = function(x) {
		var id = this.x[0];
		console.log(this.x);
		if(!this.active) {
			$("[name="+id+"] > td > input").removeClass("ng-hide");
			$("[name="+id+"] > td > span").addClass("ng-hide");
			$("[name="+id+"] > td > a:first-child > span").text("Save");
		}
		else {
			$("[name="+id+"] > td > input").addClass("ng-hide");
			$("[name="+id+"] > td > span").removeClass("ng-hide");
			$("[name="+id+"] > td > a:first-child > span").text("Edit");

			/* Save edited data*/
			var newData = {};
			for (var i = 0; i < attributes.length; i++) {
				if (attributes[i] == "organization") {
					var value = $("[name="+id+"] [name="+attributes[i]+"] select").val();
				}
				else if (attributes[i] == "country") {
					var value = $("[name="+id+"] [name="+attributes[i]+"] select").val();
				}
				else {
					var value = $("[name="+id+"] [name="+attributes[i]+"] input").val();
				}
				$("[name="+id+"] [name="+attributes[i]+"] span").text(value);
				newData[attributes[i]] = value; 	
			};

			/* Send newData to backend */
			console.log(newData);
			$http.post("contributor/set", newData).success(function(response){
				if (response=="setContributorsInfo"){
					notification("Successfull", "Information of the user has been changed");
				}
				else {
					notification("Fail!", response);
				}
			});
		}
		this.active = !this.active;
	};

	$scope.deleteRow = function(x) {
		var id = this.x[0];
		
		/* Send id to backend */
		console.log(id);
		$http.post("contributor/del", {"id": id}).success(function(response){
			if (response=="delContributorsInfo"){
				$("[name="+id+"]").html("");
				notification("Successfull", "Information of the user has been deleted");
			}
			else {
				notification("Fail!", response);
			}
			console.log(response);
		});
	};
});

app.controller("accountCtrl", function($scope, $routeParams, $http){
	$scope.param = $routeParams.param;
	$scope.organization = companiesList;
	$scope.country = countriesList;
	if (userid) {
		$scope.user = user;
		$scope.userShow = 1;
	}
	$scope.showEditRow = function(x) {
		if(!this.active) {
			$("table > td > input").removeClass("ng-hide");
			$("table > td > span").addClass("ng-hide");
			$(".edit > a:first-child > span").text("Save");
		}
		else {
			$("name > td > input").addClass("ng-hide");
			$("name > td > span").removeClass("ng-hide");
			$(".edit > a:first-child > span").text("Edit");

			/* Save edited data*/
			var newData = {};
			for (var i = 0; i < attributes.length; i++) {
				if (attributes[i] == "organization") {
					var value = $("[name="+id+"] [name="+attributes[i]+"] select").val();
				}
				else if (attributes[i] == "country") {
					var value = $("[name="+id+"] [name="+attributes[i]+"] select").val();
				}
				else {
					var value = $("[name="+attributes[i]+"] input").val();
				}
				$("[name="+attributes[i]+"] span").text(value);
				newData[attributes[i]] = value;
			};

			/* Send newData to backend */
			console.log(newData);
			$http.post("contributor/set", newData).success(function(response){
				if (response=="setContributorsInfo"){
					notification("Successfull", "Your information has been changed");
				}
				else {
					notification("Fail!", response);
				}
				console.log(response);
			});
		}
		this.active = !this.active;
	};

});

app.controller("countryCtrl", function($scope, $routeParams, $http){
	$scope.param = $routeParams.param;
	$scope.data = countriesList;
	$(".nav.nav-sidebar li").removeClass("active-sidebar");
	$('.nav.nav-sidebar a[href="#/country"]')[0].parentElement.className = "active-sidebar";

	$scope.showEditRow = function(x) {
		var id = this.x[0];
		if(!this.active) {
			$("[name="+id+"] > td > input").removeClass("ng-hide");
			$("[name="+id+"] > td > span").addClass("ng-hide");
			$("[name="+id+"] > td > a:first-child > span").text("Save");
		}
		else {
			$("[name="+id+"] > td > input").addClass("ng-hide");
			$("[name="+id+"] > td > span").removeClass("ng-hide");
			$("[name="+id+"] > td > a:first-child > span").text("Edit");

			/* Save edited data*/
			var newData = {"id" : id};
			var value = $("[name="+id+"] [name=country] input").val();
			$("[name="+id+"] [name=country] span").text(value);
			newData["country"] = value; 	
			
			/* Send newData to backend */
			console.log(newData);
			$http.post("country/set", newData).success(function(response){
				if (response=="setCountryInfo"){
					notification("Successfull", "Information of the country has been changed");
				}
				else {
					notification("Fail!", response);
				}
			});
		}
		this.active = !this.active;
	};

	$scope.deleteRow = function(x) {
		var id = this.x[0];
		
		/* Send id to backend */
		console.log(id);
		newData = {"id" : id};
		$http.post("country/del", newData).success(function(response){
			if (response=="delCountryInfo"){
				$("[name="+id+"]").html("");
				notification("Successfull", "Country has been deleted");
			}
			else {
				notification("Fail!", response);
			}
		});
	}

	$scope.addRow = function() {
		var code = $(".addCountry div input[id='code']").val();
		var country = $(".addCountry div input[id='country']").val();
		var alpha3 = $(".addCountry div input[id='alpha3']").val();
		newData = {"code": code, "country": country, "alpha3": alpha3};
		console.log(newData);
		$http.post("country/add", newData).success(function(response){
			if (response=="addCountryInfo"){
				notification("Successfull", "Country information has been added");
			}
			else {
				notification("Fail!", response);
			}
			console.log(response);
		});
	};
});

app.controller("companyCtrl", function($scope, $routeParams, $http){
	$scope.param = $routeParams.param;
	$scope.data = companiesList;
	$(".nav.nav-sidebar li").removeClass("active-sidebar");
	$('.nav.nav-sidebar a[href="#/company"]')[0].parentElement.className = "active-sidebar";

	$scope.showEditRow = function(x) {
		var id = this.x[0];
		if(!this.active) {
			$("[name="+id+"] > td > input").removeClass("ng-hide");
			$("[name="+id+"] > td > span").addClass("ng-hide");
			$("[name="+id+"] > td > a:first-child > span").text("Save");
		}
		else {
			$("[name="+id+"] > td > input").addClass("ng-hide");
			$("[name="+id+"] > td > span").removeClass("ng-hide");
			$("[name="+id+"] > td > a:first-child > span").text("Edit");

			/* Save edited data*/
			var newData = {"id" : id};
			var value = $("[name="+id+"] [name=company] input").val();
			$("[name="+id+"] [name=company] span").text(value);
			newData["company"] = value; 	
			
			/* Send newData to backend */
			console.log(newData);
			$http.post("company/set", newData).success(function(response){
				if (response=="setCompanyInfo"){
					notification("Successfull", "Information of the organization has been changed");
				}
				else {
					notification("Fail!", response);
				}
			});
		}
		this.active = !this.active;
	};

	$scope.deleteRow = function(x) {
		var id = this.x[0];
		
		/* Send id to backend */
		console.log(id);
		newData = {"id": id};
		$http.post("company/del", newData).success(function(response){
			if (response=="delCompanyInfo") {
				$("[name="+id+"]").html("");
				notification("Successfull", "Information of the organization has been deleted");
			}
			else {
				notification("Fail!", response);
			}
		});
	}

	$scope.addRow = function() {
		var company = $(".addCompany div input").val();
		newData = {"company": company}
		$http.post("company/add", newData).success(function(response){
			if (response=="addCompanyInfo"){
				notification("Successfull", "Information of the company has been added");
			}
			else {
				notification("Fail!", response);
			}
			console.log(response);
		});
	};
});

app.controller("signinCtrl", function($scope, $routeParams, $http){
	$scope.param = $routeParams.param;
	
	$scope.submit = function() {
		email = $("form input[id='inputEmail']").val();
		password = $("form input[id='inputPassword']").val();
		$http.post("signin", {'email':email, 'password':password}).success(function(response){
			console.log(response);
			user = response;
			userid = user[0];
			$scope.user = user;
		});
	}
});