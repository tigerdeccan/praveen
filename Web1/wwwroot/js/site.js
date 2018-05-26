// Write your JavaScript code.
var app = angular.module('staff', ['ui.bootstrap']);
app.run(function () { });

app.controller('StaffController', ['$rootScope', '$scope', '$http', '$timeout', function ($rootScope, $scope, $http, $timeout) {
    $scope.data = [];
    $scope.item = undefined;
    $scope.refresh = function () {
        $http.get('api/staff?c=' + new Date().getTime())
            .then(function (response, status) {
                $scope.data = response.data;
            }, function (response, status) {
                $scope.data = undefined;
            });
    };

    $scope.remove = function (item) {
        $http.delete('api/staff/' + item)
            .then(function (response, status) {
                $scope.refresh();
            })
    };
    $scope.add = function (item) {
        var fd = new FormData();
        fd.append('item', item);
        $http.put('api/staff/' + item, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
            .then(function (data, status) {
                $scope.refresh();
                $scope.item = undefined;
            })
    };
}]);