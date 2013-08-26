// Generated by CoffeeScript 1.6.3
(function() {
  'use strict';
  var DMCast;

  DMCast = angular.module('dmcast', ['ngRoute']);

  DMCast.config([
    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $routeProvider.when('/hello', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
      return $routeProvider.otherwise({
        redirectTo: '/hello'
      });
    }
  ]);

  window.DMCast = DMCast;

}).call(this);

/*
//@ sourceMappingURL=app.map
*/
