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
    AngularPrint.directive('printBtn',['$window', function($window){
        return {
            restrict: 'A',
            link: function(scope, element){
                element.on('click', function(){
                    $window.print();
                });
            }
        };
    }]);
    //attrs: colMap{objProp:{colName:string,addClassess:string}}, data[{}], strictObj(bool), tableClasses(string)
    AngularPrint.directive('printTable', function(){
        return{
            restrict: 'E',
            scope: {options: '='},
            link: function(scope, element){

                var makeTable = function(){

                    function validateRow(row){
                        for(var i = 0; i < colNames.length; i++){
                            if(!row[colNames[i]]){
                                return false;
                            }
                        }
                        return true;
                    }

                    function addRow(row){
                        if(!scope.options.strictObj || validateRow(row)){
                            var tr = document.createElement('tr');
                            for(var i = 0, value; i < colNames.length; i++){
                                value = document.createTextNode(row[colNames[i]] ? row[colNames[i]] : '');
                                tr.appendChild('td');
                                tr.cells[i].appendChild(value);
                                if(classMap[colNames[i]]){
                                    tr.cells[i].className = classMap[colNames[i]];
                                }
                            }
                            tbody.appendChild(tr);
                        }
                    }

                    var elem = element[0];
                    elem.innerHTML = '';
                    elem.id = 'printTable';
                    var colMap = scope.options.colMap;
                    var table = document.createElement('table');
                    var colNames = [];
                    var classMap = {};
                    for(var prop in colMap){
                        colNames.push(colMap[prop].colName);
                    }
                    for(var index in colMap){
                        classMap[colMap[index].colName] = colMap[index].addClass;
                    }

                    var thead = document.createElement('thead');
                    var tr = document.createElement('tr');
                    for(var i = 0, text; i < colNames.length; i++){
                        tr.addChildNode('th');
                        text = document.createTextNode(colNames[i]);
                        tr.cells[i].appendChild(text);
                    }
                    thead.appendChild(tr);
                    table.appendChild(thead);

                    var data = scope.options.data;
                    var tbody = document.createElement('tbody');

                    for(var j = 0, row = {}; j < data.length; j++){
                        for(var key in data[j]){
                            if(key in colMap){
                                row[colMap[key].colName] = data[j][key];
                            }
                        }
                        addRow(row);
                    }
                    table.appendChild(tbody);
                    table.className = scope.options.tableClasses;
                    elem.appendChild(table);
                };

                if(scope.options.data){
                    makeTable();
                }
                else{
                    scope.$watch(scope.options, makeTable);
                }
            }
        };
    });
})();
