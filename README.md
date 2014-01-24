README
======

What is microscope.js ?
-----------------------

microscopejs is a Node.js MVC framework for productive web development.
It allow you create REST API and CRUD controllers quickly with Command Line Tool.
microscopejs is based on express.js so it's MVC design pattern.
Because i want to build microscope with best nodejs tools, it use sequelize ORM and passport to perform authentication.

Requirements
------------

node.js >= 0.8

Installation
------------
install with npm:

	sudo npm install microscope -g

Getting started
---------------

Open terminal and run:

	microscope new [myprojectname]
	cd [myprojectname]
	sudo npm install
	bower install

Create a new mysql database.

Go to ./configs/database.json and edit json database configuration file.

Run :

	microscope tool

And select: database > synchronize

Run server with :

	microscope server

For development use grunt tasks:

	grunt debug

* run application with nodemon.
* watch assets files changes.
* run default web browser.

You're done !

Documentation
-------------

microscope provide command line interface to build web application quicly.

####Create new application:

	microscope new [projectName]
	
####Run application :

	microscope server

####Generate model file :

	microscope generate model [modelName] [property1]:string [property2]:text [property3]:boolean ...

the properties of the models can be of the following types:

string, text, boolean, date, integer, float

####Generate basic controller with actions:

	microscope generate controller [controllerName] [action1Name] [action2Name] ...

####Scaffold CRUD controller, data access layer, model and views (mobile views in option):

	microscope scaffold controller [modelName] [property1]:string [property2]:text ...

add -m or --mobile in option to scaffold jQuery mobile views.

####Scaffold REST API, data access layer and model:

	microscope scaffold api [modelName] [property1]:string [property2]:text ...

####Scaffold data access layer and model:

	microscope scaffold dal [modelName] [property1]:string [property2]:text ...

####Display microscope inquirer tool:
	
	microscope tool

Website documentation
---------------------

www.microscopejs.com (come soon)

Roadmap
-------

You can follow microscope development trello board here:

[microscopejs trello board](https://trello.com/b/wuNvfCiH/microscopejs)

Licence
-------

microscope is released under the MIT license.