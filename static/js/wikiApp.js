var app = angular.module("wikiApp", ['ngRoute']);
var contributorsList = null;
var countriesList = null;
var companiesList = null;
var attributes = ["id", "name", "username", "email", "organization", "country", "start_date", "end_date"];
var userid = null;

var notification = function(head, body) {
	$("#myModal .modal-header h4").text(head);
	$("#myModal .modal-body").text(body);
	$("#myModal").modal('show');
}

var getNumber = function(num) {
	arr = []
	for (var i = 0; i < num; i++)
		arr[i] = i+1
	return arr;
}

function previous(){  
    new_page = parseInt($('#current_page').val()) - 1;
    //if there is an item before the current active link run the function  
    if($('.active_page').prev('.page_link').length==true){  
        //go_to_page(new_page);
    }
}  
  
function next(){  
    new_page = parseInt($('#current_page').val()) + 1;  
    //if there is an item after the current active link run the function  
    if($('.active_page').next('.page_link').length==true){  
        go_to_page(new_page);  
    }  
  
}  
function go_to_page(page_num){  
    //get the number of items shown per page  
    var show_per_page = 4;//parseInt($('#show_per_page').val());  
  
    //get the element number where to start the slice from  
    start_from = page_num * show_per_page;  
  
    //get the element number where to end the slice  
    end_on = start_from + show_per_page;
  
}