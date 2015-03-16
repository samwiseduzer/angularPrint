'use strict';
(function(){
    var AngularPrint = angular.module('AngularPrint',[]);
    AngularPrint.directive('printSection',function(){
        return {
            restrict: 'A',
            link: function(element, attr){

                function printElement(elem) {
                    // clones the element you want to print
                    if(!printData.usingTable){
                        printSection.appendChild(domClone);
                    }
                }

                function init(){
                    var printSection = document.getElementById('printSection');
                    // if there is no printing section, create one
                    if (!printSection) {
                        printSection = document.createElement('div');
                        printSection.id = 'printSection';
                        document.body.appendChild(printSection);
                    }

                    if(element){
                        var elem = element.cloneNode(true);
                        elem.classList.addClass('printShow');
                        if(attr.addClass){
                            var classesToAdd = attr.addClass.split(' ');
                            for(var i = 0; i < classesToAdd.length; i++){
                                elem.classList.add(classesToAdd[i]);
                            }
                        }
                        if(attr.removeClass){
                            var classesToRemove = attr.removeClass.spliy(' ');
                            for(var i = 0; i < classesToRemove.length; i++){
                                elem.classList.remove(classesToRemove[i]);
                            }
                        }
                        printElement(elem);
                    }
                }
                init();
            }
        }
    });
    AngularPrint.directive('printBtn',['printData','$window', function(printData,$window){
        return {
            restrict: 'A',
            link: function(element){

                function createTable(){
                    var table = createElement('table');
                    var colNames = printData.colNames;
                    var th = createElement('th');
                    for(var i = 0, text; i < colNames.length; i++){
                        th.addChildNode('td');
                        text = document.createTextNode(colNames[i]);
                        th.cells[i].appendChild(text);
                    }
                    table.appendChild(th);
                    var rows = printData.tableData;
                    for(i = 0, tr; i < rows.length; i++){
                        tr = createElement('tr');
                        for(var j = 0, text; j < colNames.length; j++){
                            tr.appendChild('td');
                            text = document.createTextNode(printData[j]);
                            tr.cells[j].appendChild(text);
                        }
                        table.appendChild(tr);
                    }
                    var addClasses = printData.addClasses;
                    table.className = addClasses;
                    printSection.appendChild(table);
                }

                element.on('click', function(){
                    if(printData.usingTable){
                        createTable();
                    }
                    $window.print();
                });

                $window.onafterprint = function () {
                    // clean the print section before adding new content
                    printSection.innerHTML = '';
                }

                function init(){
                    var printSection = document.getElementById('printSection');
                    if(!printSection){
                        printSection = document.createElement('div');
                        printSection.id = 'printSection';
                        document.body.appendChild(printSection);
                    }
                }
                init();
            }
        }
    }]);
    AngularPrint.directive('printHide',function(){
        return {
            restrict: 'A',
            link: function(element){
                var elem = element;
                elem.classList.addClass('hidePrint');
            }
        }
    });
    AngularPrint.directive('printRow', ['printData', function(printData){
        return {
            restrict: 'A',
            link: function(attr){

                function validateRow(){
                    for(var i = 0; i < attr.colList.length; i++){
                        if(!attr.obj[Object.keys(attr.colList[i])[0]]){
                            return false;
                        }
                    }
                    return true;
                }

                function init(){
                    if(!attr.strictPrint || validateRow()){
                        var row = {};
                        for(prop in attr.obj){
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
                                colNames.push(attr.colList[i][Object.keys(attr.colList[i])[0]]);
                            }
                            printData.setColNames(colNames);
                        }
                        if(attr.addClass){
                            printData.setAddClasses(attr.addClass);
                        }
                    }
                }
            }
        }
    }]);
    AngularPrint.service('printData', function(){
        this.tableData = [];
        this.addClasses = [];
        this.colNames = [];
        this.addRow = function(row){
            this.tableData.push(row);
        };
        this.clearTable = function(){
            this.tableData = [];
        };
        this.setAddClasses = function(str){
            this.addClasses = str;
        };
        this.setColNames = function(arr){
            this.colNames = arr;
        };
    });
})()