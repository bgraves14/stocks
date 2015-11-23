'use strict';

module.exports = function(app) {
    var stocks = require('../../app/controllers/stocks.server.controller');
    var users = require('../../app/controllers/users.server.controller');

    app.route('/stocks')
      .get(users.requiresLogin, stocks.list)
      .post(stocks.create);

      // the stocksId param is added to the params object for the request
    app.route('/stocks/:stocksId')
      .get(users.requiresLogin, stocks.read)
      .put(users.requiresLogin, stocks.update)
      .delete(users.requiresLogin, stocks.delete);

	// Finish by binding the article middleware
	// What's this? Where the stocksID is present in the URL
	// the logic to 'get by id' is handled by this single function
	// and added to the request object i.e. request.stocks.
	app.param('stocksId', stocks.stocksByID);
};
