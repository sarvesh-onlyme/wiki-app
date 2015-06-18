from flask.ext.mysql import MySQL
from wiki_app import app

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = '1991'
app.config['MYSQL_DATABASE_DB'] = 'mediawiki'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)