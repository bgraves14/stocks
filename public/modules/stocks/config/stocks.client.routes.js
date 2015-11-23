'use strict';

//Setting up route
angular.module('stocks').config(['$stateProvider',
	function($stateProvider) {
		// Stocks state routing
		$stateProvider.
		state('listStocks', {
			url: '/stocks',
			templateUrl: 'modules/stocks/views/stocks.client.view.html'
		}).
		state('createStocks', {
			url: '/stocks/create',
			templateUrl: 'modules/stocks/views/create-stocks.client.view.html'
		}).
		state('viewStocks', {
			url: '/stocks/:stocksId',
			templateUrl: 'modules/stocks/views/view-stocks.client.view.html'
		}).
		state('editStocks', {
			url: '/stocks/:stocksId/edit',
			templateUrl: 'modules/stocks/views/edit-stocks.client.view.html'
		});
	}
]);