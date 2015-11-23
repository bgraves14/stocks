'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
     errorHandler = require('./errors.server.controller'),
     Stocks = mongoose.model('Stocks'),
     _ = require('lodash');

/**
 * Create a Stock
 */
 exports.create = function(req, res) {
     var stocks = new Stocks(req.body);

     stocks.save(function(err) {
         if (err) {
             return res.status(400).send({
                 message: errorHandler.getErrorMessage(err)
             });
         } else {
             res.status(201).json(stocks);
         }
     });
 };

/**
 * Show the current Stock
 */
 exports.read = function(req, res) {
     Stocks.findById(req.params.stocksId).exec(function(err, stocks) {
         if (err) {
           return res.status(400).send({
               message: errorHandler.getErrorMessage(err)
           });
       } else {
          if (!stocks) {
                 return res.status(404).send({
                     message: 'Stock not found'
                 });
             }
             res.json(stocks);
       }
     });
 };

/**
 * Update a Stock
 */
 exports.update = function(req, res) {
 	var stocks = req.stocks;

 	  stocks = _.extend(stocks, req.body);

     	stocks.save(function(err) {
     		if (err) {
     		   return res.status(400).send({
     		      message: errorHandler.getErrorMessage(err)
     			});
     		} else {
     			res.json(stocks);
     		}
 	});
 };

/**
 * Delete an Stock
 */
 exports.delete = function(req, res) {
 	var stocks = req.stocks;

   	stocks.remove(function(err) {
   		if (err) {
   		  return res.status(400).send({
   				  message: errorHandler.getErrorMessage(err)
   			});
   		} else {
   			res.json(stocks);
   		}
   	});
 };

/**
 * List of Stocks
 */
 exports.list = function(req, res) {
     Stocks.find().exec(function(err, stocks) {
         if (err) {
             return res.status(400).send({
                 message: errorHandler.getErrorMessage(err)
             });
         } else {
             res.json(stocks);
         }
     });
 };

 /**
 * Category middleware
 */
exports.stocksByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Stock is invalid'
		});
	}

	Stocks.findById(id).exec(function(err, stocks) {
		if (err) return next(err);
		if (!stocks) {
			return res.status(404).send({
  				message: 'Stock not found'
  			});
		}
		req.stocks = stocks;
		next();
	});
};
