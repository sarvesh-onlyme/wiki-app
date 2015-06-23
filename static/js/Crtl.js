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

app.controller("homeCtrl", function($scope, $routeParams){
	$scope.param = $routeParams.param;
	$scope.data = contributorsList;
	$(".nav.nav-sidebar li").removeClass("active-sidebar");
	$('.nav.nav-sidebar a[href="./"]')[0].parentElement.className = "active-sidebar";

	$scope.showEditRow = function(x) {
		var id = this.x.id;
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
				var value = $("[name="+id+"] [name="+attributes[i]+"] input").val();
				newData[attributes[i]] = value; 	
			};

			/* Send newData to backend */
			console.log(newData);
		}
		this.active = !this.active;
	};

	$scope.deleteRow = function(x) {
		var id = this.x.id;
		
		/* Send id to backend */
		console.log(id);
	};
});

app.controller("accountCtrl", function($scope, $routeParams, $http){
	$scope.param = $routeParams.param;
	if (userid) {
		$scope.user = user;
		$scope.userid = userid;
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
				var value = $("[name="+attributes[i]+"] input").val();
				newData[attributes[i]] = value; 	
			};

			/* Send newData to backend */
			console.log(newData);
		}
		this.active = !this.active;
	};

});

app.controller("countryCtrl", function($scope, $routeParams){
	$scope.param = $routeParams.param;
	$scope.data = countriesList;
	$(".nav.nav-sidebar li").removeClass("active-sidebar");
	$('.nav.nav-sidebar a[href="#/country"]')[0].parentElement.className = "active-sidebar";

	$scope.showEditRow = function(x) {
		var id = this.x.id;
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
			newData["country"] = value; 	
			
			/* Send newData to backend */
			console.log(newData);
		}
		this.active = !this.active;
	};

	$scope.deleteRow = function(x) {
		var id = this.x.id;
		
		/* Send id to backend */
		console.log(id);
	}
});

app.controller("companyCtrl", function($scope, $routeParams){
	$scope.param = $routeParams.param;
	$scope.data = companiesList;
	$(".nav.nav-sidebar li").removeClass("active-sidebar");
	$('.nav.nav-sidebar a[href="#/company"]')[0].parentElement.className = "active-sidebar";

	$scope.showEditRow = function(x) {
		var id = this.x.id;
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
			newData["company"] = value; 	
			
			/* Send newData to backend */
			console.log(newData);
		}
		this.active = !this.active;
	};

	$scope.deleteRow = function(x) {
		var id = this.x.id;
		
		/* Send id to backend */
		console.log(id);
	}
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