angular.module('HMS').directive('ngReallyClick', [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                var message = attrs.ngReallyMessage;
                if (message && confirm(message)) {
                    scope.$apply(attrs.ngReallyClick);
                }
                //if (!confirm(message)) {
                //    event.stopImmediatePropagation();
                //    event.preventDefault;
                //}
                else {
                    event.stopImmediatePropagation();
                    event.preventDefault;
                }
            });
        }
    }
}]);