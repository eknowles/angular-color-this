var app = angular.module('app', ['ngSanitize', 'ngColorThis']);

app.config(function () {

});

app.controller('MainCtrl', function ($scope, $interval) {

  $scope.progressBar = 50;
  $scope.color = 'asdf';
  $scope.salt = 5;
  $scope.selectedText = 'angular-color-this';
  $scope.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  //$interval(function () {
  //  if ($scope.progressBar >= 100) {
  //    $scope.progressBar = 0;
  //  }
  //  $scope.progressBar += 1;
  //}, 500)

});
