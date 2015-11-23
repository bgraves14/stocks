'use strict';

module.exports = function(app) {
   app.route('/stocks')
       .get(function (request, response) {
           response.json([{ name: 'Beverages' }, { name: 'Condiments' }]);
       });
};
