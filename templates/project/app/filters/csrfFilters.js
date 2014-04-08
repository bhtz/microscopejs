
var express = require('express');

/**
 * overide startsWith String prototype.
 */
(function () {
	if (typeof String.prototype.startsWith != 'function') {
		String.prototype.startsWith = function(str) {
			return this.substring(0, str.length) === str;
		}
	};
})();

/**
 * init express.csrf filter.
 * 
 * @param  {request}   req
 * @param  {response}   res
 * @param  {Function} next
 */
var csrf = function (req, res, next) {
	(express.csrf())(req, res, next);
};

/**
 * antiforgerytoken filter
 * Deliver antiforgery token in http response based on _csrf session key.
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var antiForgeryToken = function (req, res, next) {
	res.locals.token = req.session._csrf;
	next();
};

module.exports = {
	csrf: csrf,
	antiForgeryToken: antiForgeryToken
};