'use strict';

angular.module('stocks').controller('StocksController', ['$scope', '$location',
    function($scope, $location) {

        // Create new Stock
        $scope.create = function() {
            // Redirect after save
            $location.path('stocks');

            // Clear form fields
            $scope.name = '';
        };

        // Find a list of Stocks
        $scope.find = function() {
            // hard coded data
            $scope.stocks = [{
                'name': 'Beverages',
                'description': 'Soft drinks, coffees, teas, beers, and ales'
            },
            {
                'name': 'Condiments',
                'description': 'Sweet and savory sauces, relishes, spreads, and seasonings'
            }];
        };
    }
]);