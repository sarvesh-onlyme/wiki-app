from wiki_app import app
from flask import render_template, send_from_directory, Response, request, redirect
import json
from wiki_app.config import mysql
from bson import json_util

@app.route('/')
@app.route('/index')
def index():
	user = {'nickname': 'dhu'}
	return render_template('index.html', title='Home', user=user)

@app.route('/signin', methods=['POST'])
def signin():
	if request.method == 'POST':
		email = request.json['email']
		password = request.json['password']

		# Authenticate
		cursor = mysql.connect().cursor()
		query = "SELECT uuid FROM `account` WHERE email = '"+email+"' and password = '"+password+"'"
		cursor.execute(query)
		data = cursor.fetchone()
		userid = data[0]
		return redirect("/contributor/"+userid)

@app.route('/contributor/all')
def getContributorsList():

	# Get Data
	cursor = mysql.connect().cursor()
	query = "SELECT p.uuid as id, i.name as name, p.name as username, p.email as email, d.name as company, c.name as country, u.init as start_date, u.end as end_date FROM `profiles` as p, `countries` as c, `uidentities_domains` as u, `domains` as d, `identities` as i WHERE p.country_code = c.code and u.uuid=p.uuid and u.domain_id=d.id and i.uuid=p.uuid LIMIT 10"
	cursor.execute(query)
	data = cursor.fetchall()
	contributorsList = json.dumps(data, default=json_util.default)
	#return data
	return Response(contributorsList,  mimetype='application/json')

@app.route('/contributor/<id>')
def getContributorsInfo(id):
	# Get Data
	cursor = mysql.connect().cursor()
	query = "SELECT p.uuid as id, i.name as name, p.name as username, p.email as email, d.name as company, c.name as country, u.init as start_date, u.end as end_date FROM `profiles` as p, `countries` as c, `uidentities_domains` as u, `domains` as d, `identities` as i WHERE p.country_code = c.code and u.uuid=p.uuid and u.domain_id=d.id and i.uuid=p.uuid and p.uuid='"+id+"'"
	cursor.execute(query)
	data = cursor.fetchone()
	contributorsList = json.dumps(data, default=json_util.default)
	#return data
	return Response(contributorsList,  mimetype='application/json')

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