from wiki_app import app
from flask import render_template, send_from_directory, Response
import json

@app.route('/')
@app.route('/index')
def index():
	user = {'nickname': 'dhu'}
	return render_template('index.html', title='Home', user=user)

@app.route('/contributor/all')
def getContributorsList():
	# Get Data
	contributorsList = [
		{
			"id": 1,
			"name": "John",
			"username": "john",
			"email": "john@wikimedia.com",
			"organization": "wikimedia",
			"country": "spain",
			"start_date": "2014-1-1",
			"end_date": "currently"
		},
		{
			"id": 2,
			"name": "John1",
			"username": "john1",
			"email": "john1@wikimedia.com",
			"organization": "wikimedia",
			"country": "spain",
			"start_date": "2014-1-1",
			"end_date": "currently"
		},
		{
			"id": 3,
			"name": "John3",
			"username": "john3",
			"email": "john3@wikimedia.com",
			"organization": "wikimedia",
			"country": "spain",
			"start_date": "2014-1-1",
			"end_date": "currently"
		}
	]
	return Response(json.dumps(contributorsList),  mimetype='application/json')

@app.route('/country/all')
def getCountriesList():
	# Get Data
	countriesList = [
		{
			"id": 1,
			"country": "spain"
		},
		{
			"id": 2,
			"country": "florida"
		},
		{
			"id": 3,
			"country": "india"
		}
	]
	return Response(json.dumps(countriesList),  mimetype='application/json')

@app.route('/company/all')
def getCompaniesList():
	# Get Data
	companiesList = [
		{
			"id": 1,
			"country": "wikimedia"
		},
		{
			"id": 2,
			"country": "firefox"
		},
		{
			"id": 3,
			"country": "google"
		}
	]
	return Response(json.dumps(companiesList),  mimetype='application/json')