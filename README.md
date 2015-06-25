## Installation Guide

 - Open the terminal (Ctrl+T) and follow the steps
	
	$ mkdir wiki && cd wiki
	$ git clone https://github.com/sarvesh-onlyme/wiki_app.git
	$ virtualenv flask
	$ source flask/bin/activate
	$ pip install -r wiki_app/tmp/requirements.txt
	$ mysql -u root -p

 - Now in mysql create a database 'mediawiki'
	
	mysql> CREATE DATABASE mediawiki
 	mysql> exit

	$ mysql -u root -p mediawiki < wiki_app/tmp/sortinghat.mysql
	$ cp wiki_app/tmp/run.py .

 - Now open the wiki_app/config.py and set password of mysql
 - Now to run the app
 	
 	$ wiki$ ./run.py

- Now open localhost:5000 in your browser