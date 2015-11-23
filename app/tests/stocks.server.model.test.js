'use strict';

/**
* Module dependencies.
*/
var should = require('should'),
   mongoose = require('mongoose'),
   Stocks = mongoose.model('Stocks');

/**
* Unit tests
*/
describe('Stocks Model', function() {

   describe('Saving', function() {
       it('saves new record', function(done) {
           var stocks = new Stocks({
               name: 'Beverages',
               description: 'Soft drinks, coffees, teas, beers, and ales'
           });

           stocks.save(function(err, saved) {
               should.not.exist(err);
               done();
           });
       });

       it('throws validation error when name is empty', function(done) {
           var stocks = new Stocks({
               description: 'Soft drinks, coffees, teas, beers, and ales'
           });

           stocks.save(function(err) {
               should.exist(err);
               err.errors.name.message.should.equal('name cannot be blank');
               done();
           });
       });

       it('throws validation error when name longer than 15 chars', function(done) {
           var stocks = new Stocks({
               name: 'Grains/Cereals/Chocolates'
           });

           stocks.save(function(err, saved) {
               should.exist(err);
               err.errors.name.message.should.equal('name must be 15 chars in length or less');
               done();
           });
       });

       it('throws validation error for duplicate stocks name', function(done) {
           var stocks = new Stocks({
               name: 'Beverages'
           });

           stocks.save(function(err) {
               should.not.exist(err);

               var duplicate = new Stocks({
                   name: 'Beverages'
               });

               duplicate.save(function(err) {
                   err.err.indexOf('$name').should.not.equal(-1);
                   err.err.indexOf('duplicate key error').should.not.equal(-1);
                   should.exist(err);
                   done();
               });
           });
       });
   });

   afterEach(function(done) {
       // NB this deletes ALL stocks (but is run against a test database)
       Stocks.remove().exec();
       done();
   });
});
