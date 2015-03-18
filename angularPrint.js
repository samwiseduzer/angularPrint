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

                var makeTable = function(newVal) {
                    if (newVal == null)
                        return;

                    function validateRow(row){
                        for(var i = 0; i < colNames.length; i++){
                            if(!row[colNames[i]]){
                                return false;
                            }
                        }
                        return true;
                    }

                    function addRow(row){

                        var tr = document.createElement('tr');
                        for(var i = 0, value, td, div; i < colNames.length; i++){
                            td = document.createElement('td');
                            if(compMap[colNames[i]]){
                                var argsArr = [];
                                for(var j = 0; j < compMap[colNames[i]].params.length; j++){
                                    argsArr.push(row[compMap[colNames[i]].params[j]]);
                                }
                                row[colNames[i]] = compMap[colNames[i]].fn.apply(this,argsArr);
                            }
                            if(scope.options.strictObj && !validateRow(row)){
                                return;
                            }
                            value = document.createTextNode(row[colNames[i]] ? row[colNames[i]] : '');
                            div = document.createElement('div');
                            div.appendChild(value);
                            div.className = 'avoidPageBreak';
                            td.appendChild(div);
                            tr.appendChild(td);
                            if(classMap[colNames[i]]){
                                tr.cells[i].className = classMap[colNames[i]];
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
                    var compMap = {};
                    for(var prop in colMap){
                        colNames.push(colMap[prop].colName);
                        classMap[colMap[prop].colName] = colMap[prop].addClass;
                        if(colMap[prop].composition){
                            compMap[colMap[prop].colName] = colMap[prop].composition;
                        }
                    }

                    var thead = document.createElement('thead');
                    var tr = document.createElement('tr');
                    for(var i = 0, text, th; i < colNames.length; i++){
                        th = document.createElement('th');
                        text = document.createTextNode(colNames[i]);
                        th.appendChild(text);
                        tr.appendChild(th);
                    }
                    thead.appendChild(tr);
                    table.appendChild(thead);

                    var data = scope.options.data;
                    var tbody = document.createElement('tbody');

                    for(var j = 0, row = {}; j < data.length; j++){
                        row = data[j];
                        for(var key in data[j]){
                            if(key in colMap){
                                row[colMap[key].colName] = data[j][key];
                            }
                        }
                        addRow(row);
                    }
                    table.appendChild(tbody);
                    if(scope.options.tableClasses){
                        table.className = scope.options.tableClasses;
                    }
                    elem.appendChild(table);
                };

                scope.$watchCollection('options.data', makeTable);
            }
        };
    });
})();
