'use strict';

//Setting up route
angular.module('stocks').config(['$stateProvider',
	function($stateProvider) {
		// Stocks state routing
		$stateProvider.
		state('stocks', {
			url: '/stocks',
			templateUrl: 'modules/stocks/views/stocks.client.view.html'
		}).
		state('createStocks', {
			url: '/stocks/create',
			templateUrl: 'modules/stocks/views/create-stocks.client.view.html'
		});
	}
	]);