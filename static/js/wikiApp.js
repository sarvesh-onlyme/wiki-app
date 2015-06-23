var app = angular.module("wikiApp", ['ngRoute']);
var contributorsList = null;
var countriesList = null;
var companiesList = null;
var attributes = ["id", "name", "username", "email", "organization", "country", "start_date", "end_date"];
var userid = null;