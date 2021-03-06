'use strict';

angular.module('stocks').controller('StocksController', ['$http', '$scope', '$stateParams', '$location', 'Authentication', 'Stocks',
  function($http, $scope, $stateParams, $location, Authentication, Stocks) {

    $scope.authentication = Authentication;
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.offset = 0;

    $scope.init = function() {
      $scope.find();
      $scope.stocksJSON().then(function(result) {
        $scope.stocksList = result.data;
        console.log($scope.stocksList[0]);
      });
    };

    $scope.stocksJSON = function() {
      return $http.get('modules/stocks/controllers/stocksList.json');
    };

     // Page changed handler
    $scope.pageChanged = function() {
      $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
    };


    // Create new Stock
    $scope.create = function() {
        // Create new Stock object
        var stocks = new Stocks ({
          name: this.name,
          description: this.description
        });

        // Redirect after save
        stocks.$save(function(response) {
          $location.path('stocks/' + response._id);

            // Clear form fields
            $scope.name = '';
          }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
          });
      };

    // Remove existing Stock
    $scope.remove = function(stocks) {
      if ( stocks ) {
        stocks.$remove();

        for (var i in $scope.stocks) {
          if ($scope.stocks [i] === stocks) {
            $scope.stocks.splice(i, 1);
          }
        }
      } else {
        $scope.stocks.$remove(function() {
          $location.path('stocks');
        });
      }
    };

    // Update existing Stock
    $scope.update = function() {
      var stocks = $scope.stocks;

      stocks.$update(function() {
        $location.path('stocks/' + stocks._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Stocks
    $scope.find = function() {
      $scope.stocks = Stocks.query();
    };

    // Find existing Stock
    $scope.findOne = function() {
      $scope.stocks = Stocks.get({
        stocksId: $stateParams.stocksId
      });
    };

   // Search for a stock
   $scope.stocksSearch = function(product) {
    $location.path('stocks/' + product._id);
  };

  $scope.url = function() {
    $scope.urlText = 'http://finance.yahoo.com/webservice/v1/symbols/' + $scope.symbol + '/quote?format=json&view=detail';
  };
}
]);
