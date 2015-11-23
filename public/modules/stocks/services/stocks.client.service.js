'use strict';

//Stocks service used to communicate Stocks REST endpoints
angular.module('stocks').factory('Stocks', ['$resource',
    function($resource) {
        return $resource('stocks/:stocksId', { categoryId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);