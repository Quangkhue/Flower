'use strict';

app.directive('paging', function(){
    return {
        restrict: 'E',
        scope: {
            getData: '=getData',
            model: '=ngModel',
            count: '=count',
            itemsPerPage: '=itemsPerPage'
        },
        templateUrl: '/directives/paging/paging.html',
        controller: function($scope) {
            $scope.go2Page = function(page){
                $scope.currentPage = page;
                $scope.getData(page);
            }

            $scope.init = function(){
                initPaging();
                $scope.go2Page(1);
            }

            $scope.getRange = function(){
                var max = $scope.currentPage + 3;
                if (max > $scope.totalPage) max = $scope.totalPage;
                var min = $scope.currentPage - 3;
                if(min < 1) min = 1;
                var range =  _.range(min, max + 1);
                return range;
            }

            function initPaging(){
                $scope.count().then(function(count){
                    $scope.totalPage = Math.round(count / $scope.itemsPerPage);
                });
            }
        }
      }
})
