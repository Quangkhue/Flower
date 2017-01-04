'use strict';

app.directive('paging', function(){
    return {
    restrict: 'E',
    transclude: true,
    scope: {},
    templateUrl: 'my-dialog.html',
    link: function(scope) {
      scope.name = 'Jeff';
    }
  }
})
