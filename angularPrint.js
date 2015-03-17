'use strict';

(function(){
    var AngularPrint = angular.module('AngularPrint',[]);
    AngularPrint.directive('printSection', ['printData', function(printData){
            return {
                restrict: 'A',
                link: {
                    pre: function(scope, element, attr){
                        var elem = document.getElementById(attr.printElementId);
                        elem.classList.add('printShow');
                        if(attr.addClass){
                            var classesToAdd = attr.addClass.split(' ');
                            for(var i = 0; i < classesToAdd.length; i++){
                                elem.classList.add(classesToAdd[i]);
                            }
                        }
                        if(attr.removeClass){
                            var classesToRemove = attr.removeClass.split(' ');
                            for(var j = 0; j < classesToRemove.length; j++){
                                elem.classList.remove(classesToRemove[j]);
                            }
                        }
                        var printSection = document.createElement('div');
                        printSection.appendChild(elem);
                        var parent = elem.parentNode;
                        parent.id = parent.id + ' ' + printData.assignParentId();
                        printData.addElem(printSection);
                    }
                }
            };
        }]);
    AngularPrint.directive('printBtn',['printData','$window', function(printData,$window){
        return {
            restrict: 'A',
            link: function(scope,element){

                function createTable(){
                    var AngularPrintTable = document.getElementById('AngularPrintTable');
                    if(!AngularPrintTable){
                        AngularPrintTable = document.createElement('div');
                        AngularPrintTable.id = 'AngularPrintTable';
                        document.body.appendChild(AngularPrintTable);
                    }
                    var table = document.createElement('table');
                    var colNames = printData.colNames;
                    var th = document.createElement('th');
                    for(var i = 0, text; i < colNames.length; i++){
                        th.addChildNode('td');
                        text = document.createTextNode(colNames[i]);
                        th.cells[i].appendChild(text);
                    }
                    table.appendChild(th);
                    var rows = printData.tableData;
                    for(var j = 0, tr; j < rows.length; j++){
                        tr = document.createElement('tr');
                        for(var k = 0, tdText; k < colNames.length; k++){
                            tr.appendChild('td');
                            tdText = document.createTextNode(printData[k]);
                            tr.cells[k].appendChild(tdText);
                        }
                        table.appendChild(tr);
                    }
                    var addClasses = printData.addClasses;
                    table.className = addClasses;
                    AngularPrintTable.appendChild(table);
                }

                element.on('click', function(){
                    if(printData.usingTable){
                        createTable();
                    }
                    for(var i = 1, parent; i <= printData.count; i++){
                        parent = document.getElementById('AngularPrintParent' + i);
                        parent.appendChild(printData.elems[i-1]);
                    }
                    $window.print();
                    document.getElementById('AngularPrintTable').innerHTML = '';
                });
            }
        };
    }]);
    AngularPrint.directive('printHide',function(){
        return {
            restrict: 'A',
            link: function(scope, element){
                var elem = element;
                elem.classList.addClass('hidePrint');
            }
        };
    });
    AngularPrint.directive('printRow', ['printData', function(printData){
        return {
            restrict: 'A',
            link: function(scope, element, attr){

                function validateRow(){
                    for(var i = 0; i < attr.colList.length; i++){
                        if(!attr.obj[Object.keys(attr.colList[i])[0]]){
                            return false;
                        }
                    }
                    return true;
                }

                if(!attr.strictPrint || validateRow()){
                    printData.usingtable = true;
                    var row = {};
                    for(var prop in attr.obj){
                        for(var i = 0; i < attr.colList.length; i++){
                            if(attr.colList[i][prop]){
                                row[attr.colList[i][prop]] = attr.obj[prop];
                            }
                        }
                    }
                    printData.addRow(row);
                    if(!printData.colNames.length){
                        var colNames = [];
                        for(var j = 0; j < attr.colList.length; j++){
                            colNames.push(attr.colList[j][Object.keys(attr.colList[j])[0]]);
                        }
                        printData.setColNames(colNames);
                    }
                    if(attr.addClass){
                        printData.setAddClasses(attr.addClass);
                    }
                }
            }
        };
    }]);
    AngularPrint.service('printData', function(){
        this.usingTable = false;
        this.tableData = [];
        this.addClasses = [];
        this.colNames = [];
        this.count = 0;
        this.elems = [];
        this.addRow = function(row){
            this.tableData.push(row);
        };
        this.setAddClasses = function(str){
            this.addClasses = str;
        };
        this.setColNames = function(arr){
            this.colNames = arr;
        };
        this.assignParentId = function(){
            this.count++;
            return 'AngularPrintParent' + this.count;
        };
        this.addElem = function(elem){
            this.elems.push(elem);
        };
    });
})();
