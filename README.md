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

	microscope

Select 'new project' and set a project name.

	cd project && sudo npm install

Create a new mysql database.

Go to ./configs/database.json and edit json database configuration file.

Run again:

	microscope

And select: database > synchronize

Run again:

	microscope

select: run server

You're done !

Documentation
-------------

www.microscopejs.com (come soon)

Licence
-------

microscope is released under the MIT license.