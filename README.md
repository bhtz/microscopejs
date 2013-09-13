README
======

What is microscope.js ?
-----------------------

microscopejs is a Node.js MVC framework for productive web development.

Requirements
------------

node.js >= 0.8

Installation
------------
install with npm :

	sudo npm install microscope -g

or install bin locally :

	git clone https://github.com/bhtz/microscopejs.git

Getting started
---------------

Open terminal and run:

	microscope

or if you have installed locally :

	node microscope/bin/microscope.js

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

www.microscopejs.com

Licence
-------

microscope is released under the MIT license.