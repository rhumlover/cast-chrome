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

  DM.init({
    apiKey: 'd2117b78de822e22bd58',
    status: true,
    cookie: true
  });

  window.DMCast = DMCast;

}).call(this);
