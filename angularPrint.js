'use strict';

(function(){
    var AngularPrint = angular.module('AngularPrint',[]);
    AngularPrint.directive('printSection', function(){
            return {
                restrict: 'A',
                link: {
                    post: function(scope, element){
                        element[0].classList.add('printSection');
                    }
                }
            };
        });
    AngularPrint.directive('printHide', function(){
            return {
                restrict: 'A',
                link: {
                    post: function(scope, element){
                        element[0].classList.add('printHide');
                    }
                }
            };
        });
    AngularPrint.directive('printRemove', function(){
            return {
                restrict: 'A',
                link: {
                    post: function(scope, element){
                        element[0].classList.add('printRemove');
                    }
                }
            };
        });
    AngularPrint.directive('printOnly', function(){
            return {
                restrict: 'A',
                link: {
                    post: function(scope, element){
                        element[0].classList.add('printOnly');
                    }
                }
            };
        });
    AngularPrint.directive('printBtn',['$window', function($window){
        return {
            restrict: 'A',
            link: function(scope, element, attr){
                element.on('click', function(){
                    $window.print();
                });
            }
        };
    }]);
    AngularPrint.directive('printLandscape',function(){
        return {
            restrict: 'A',
            link: function(){
                var sheet = (function() {
                    var style = document.createElement('style');
                    style.appendChild(document.createTextNode(''));
                    document.head.appendChild(style);
                    return style.sheet;
                })();
                sheet.insertRule('@page{size:landscape;}', 0);
            }
        };
    });
    AngularPrint.directive('printTable', function(){
        return{
            restrict: 'A',
            scope: {printData:'='},
            link: function(scope, element){
                function makeTable(newVal){
                    if(newVal == null) return;
                    setTimeout(function(){
                        var elem = element[0];
                        elem.classList.add('printSection');                        
                        elem.id = 'print-table';
                        var tds = elem.getElementsByTagName('td');
                        for(var i = 0, content, div; i < tds.length; i++){
                            content = tds[i].innerHTML;
                            tds[i].innerHTML = '';
                            div = document.createElement('div');
                            div.className = 'avoidPageBreak';
                            div.innerHTML = content;
                            tds[i].appendChild(div);
                        }
                    },1000);
                }
                scope.$watchCollection('printData', makeTable);
            }
        };
    });

})();