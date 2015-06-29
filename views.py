from wiki_app import app
from flask import render_template, send_from_directory, Response, request, redirect, jsonify
import json
from wiki_app.config import mysql
from bson import json_util
from flask.json import JSONEncoder
from functions import Default, jsonDumps
import MySQLdb

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
		try:
			cursor.execute(query)
			data = cursor.fetchone()
			userid = data[0]
			return redirect("/contributor/"+userid)
		except MySQLdb.Error, e:
			try:
				return "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
			except IndexError:
				return "MySQL Error: %s" % str(e)
	

@app.route('/contributor/all')
def getContributorsList():
	# Get Data
	cursor = mysql.connect().cursor()
	query = "SELECT p.uuid as id, i.name as name, p.name as username, p.email as email, d.name as company, c.name as country, u.init as start_date, u.end as end_date FROM `profiles` as p, `countries` as c, `uidentities_domains` as u, `domains` as d, `identities` as i WHERE p.country_code = c.code and u.uuid=p.uuid and u.domain_id=d.id and i.uuid=p.uuid ORDER BY p.uuid LIMIT 100"
	try:
		cursor.execute(query)
		data = cursor.fetchall()
		contributorsList = jsonDumps(data) #json.dumps(data, default=json_util.default)
		return Response(contributorsList,  mimetype='application/json')
	except MySQLdb.Error, e:
		try:
			return "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
		except IndexError:
			return "MySQL Error: %s" % str(e)

@app.route('/contributor/<id>')
def getContributorsInfo(id):
	# Get Data
	cursor = mysql.connect().cursor()
	query = "SELECT p.uuid as id, i.name as name, p.name as username, p.email as email, d.name as company, c.name as country, u.init as start_date, u.end as end_date FROM `profiles` as p, `countries` as c, `uidentities_domains` as u, `domains` as d, `identities` as i WHERE p.country_code = c.code and u.uuid=p.uuid and u.domain_id=d.id and i.uuid=p.uuid and p.uuid='"+id+"'"
	try:
		cursor.execute(query)
		data = cursor.fetchone()
		contributorsList = json.dumps(data, default=json_util.default)
		return Response(contributorsList,  mimetype='application/json')
	except MySQLdb.Error, e:
		try:
			return "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
		except IndexError:
			return "MySQL Error: %s" % str(e)

@app.route('/contributor/set', methods=['POST'])
def setContritutorsInfo():
	if request.method == 'POST':
		id =  request.json['id']
		name = request.json['name']
		username = request.json['username']
		email = request.json['email']
		organization = request.json['organization']
		country = request.json['country']

		conn = mysql.connect()
		cursor = conn.cursor()
		try:
			query = "UPDATE `identities` SET `name`='"+name+"',`email`='"+email+"',`username`='"+username+"' WHERE uuid='"+id+"'" 
			cursor.execute(query)

			#Update Company
			query1 = "UPDATE `uidentities_domains` SET `domain_id` = (SELECT `id` FROM `domains` WHERE `name` = '"+organization+"') WHERE `uuid` = '"+id+"'"
			cursor.execute(query1)
		
			#Update Country
			query2 = "UPDATE `profiles` SET `email`='"+email+"',`country_code`=(SELECT `code` FROM `countries` WHERE `name`='"+country+"') WHERE `uuid`='"+id+"'"
			cursor.execute(query2)
			conn.commit()
			return "setContributorsInfo"
		except MySQLdb.Error, e:
			try:
				return "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
			except IndexError:
				return "MySQL Error: %s" % str(e)

@app.route('/contributor/del', methods=['POST'])
def delContributorsInfo():
	if request.method == 'POST':
		id = request.json['id']
		conn = mysql.connect()
		cursor = conn.cursor()
		try:
			query = "DELETE FROM `profiles` WHERE `uuid`='"+id+"'"
			cursor.execute(query)
			query = "DELETE FROM `uidentities` WHERE `uuid`='"+id+"'"
			cursor.execute(query)
			query = "DELETE FROM `uidentities_domains` WHERE `uuid`='"+id+"'"
			cursor.execute(query)
			query = "DELETE FROM `identities` WHERE `uuid`='"+id+"'"
			cursor.execute(query)
			conn.commit()
			return "delContributorsInfo"
		except MySQLdb.Error, e:
			try:
				return "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
			except IndexError:
				return "MySQL Error: %s" % str(e)

# Country
@app.route('/country/all')
def getCountriesList():
	# Get Data
	cursor = mysql.connect().cursor()
	query = "SELECT code, name FROM `countries` WHERE 1"
	cursor.execute(query)
	data = cursor.fetchall()
	countriesList = json.dumps(data, default=json_util.default)
	return Response(countriesList,  mimetype='application/json')

@app.route('/country/set', methods=['POST'])
def setCountryInfo():
	if request.method == 'POST':
		id =  request.json['id']
		name = request.json['country']

		conn = mysql.connect()
		cursor = conn.cursor()
		query = "UPDATE `countries` SET `name`='"+name+"' WHERE `code`='"+id+"'"
		cursor.execute(query)
		conn.commit()
		return "setCountryInfo"

@app.route('/country/add', methods=['POST'])
def addCountryInfo():
	if request.method == 'POST':
		code = request.json['code']
		country = request.json['country']
		alpha3 = request.json['alpha3']

		conn = mysql.connect()
		cursor = conn.cursor()
		query = "INSERT INTO `countries`(`code`, `name`, `alpha3`) VALUES ('"+code+"', '"+country+"', '"+alpha3+"')"
		cursor.execute(query)
		conn.commit()
		return "addCountryInfo"

@app.route('/country/del', methods=['POST'])
def delCountryInfo():
	if request.method == 'POST':
		id =  request.json['id']

		conn = mysql.connect()
		cursor = conn.cursor()
		query = "DELETE FROM `countries` WHERE `code`='"+id+"'"
		cursor.execute(query)
		conn.commit()
		return "delCountryInfo"

# Comapany
@app.route('/company/all')
def getCompaniesList():
	# Get Data
	cursor = mysql.connect().cursor()
	query = "SELECT id, name FROM `domains` WHERE 1"
	cursor.execute(query)
	data = cursor.fetchall()
	companiesList = json.dumps(data, default=json_util.default)
	return Response(companiesList,  mimetype='application/json')

@app.route('/company/set', methods=['POST'])
def setCompanyInfo():
	if request.method == 'POST':
		id =  request.json['id']
		name = request.json['company']

		conn = mysql.connect()
		cursor = conn.cursor()
		query = "UPDATE `domains` SET `name`='"+name+"' WHERE `id`='"+str(id)+"'"
		cursor.execute(query)
		conn.commit()
		return "setCompanyInfo"

@app.route('/company/add', methods=['POST'])
def addCompanyInfo():
	if request.method == 'POST':
		company = request.json['company']

		conn = mysql.connect()
		cursor = conn.cursor()
		query = "INSERT INTO `domains`(`name`) VALUES ('"+company+"')"
		cursor.execute(query)
		conn.commit()
		return "addCompanyInfo"

@app.route('/company/del', methods=['POST'])
def delCompanyInfo():
	if request.method == 'POST':
		id =  request.json['id']

		conn = mysql.connect()
		cursor = conn.cursor()
		query = "DELETE FROM `domains` WHERE `id`='"+str(id)+"'"
		cursor.execute(query)
		conn.commit()
		return "delCompanyInfo"