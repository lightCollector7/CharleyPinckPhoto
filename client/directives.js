angular.module('p2.Directives', [])
.directive('markdownRenderer',  function(){
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });

    return {
        template: '<div></div>',
        restrict: 'E',
        scope: {
            text: '='
        },
        link: function(scope, element, attrs) {
            scope.$watch('text', function(value) {
                if (value) {
                    marked(value, function(err, content) {
                        if (err) {
                            throw err;
                        } else {
                            element.html(content);
                        }
                    });
                }
            });
        }
    }


});