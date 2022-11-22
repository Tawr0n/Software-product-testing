/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.535, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5625, 500, 1500, ""], "isController": true}, {"data": [0.25, 500, 1500, "-54-1"], "isController": false}, {"data": [1.0, 500, 1500, "-37-0"], "isController": false}, {"data": [0.0, 500, 1500, "-37-1"], "isController": false}, {"data": [1.0, 500, 1500, "-50"], "isController": false}, {"data": [1.0, 500, 1500, "-40"], "isController": false}, {"data": [1.0, 500, 1500, "-41"], "isController": false}, {"data": [1.0, 500, 1500, "-42"], "isController": false}, {"data": [1.0, 500, 1500, "-43"], "isController": false}, {"data": [0.25, 500, 1500, "-54"], "isController": false}, {"data": [1.0, 500, 1500, "-44"], "isController": false}, {"data": [1.0, 500, 1500, "-45"], "isController": false}, {"data": [1.0, 500, 1500, "-46"], "isController": false}, {"data": [1.0, 500, 1500, "-47"], "isController": false}, {"data": [0.0, 500, 1500, "-37"], "isController": false}, {"data": [1.0, 500, 1500, "-48"], "isController": false}, {"data": [1.0, 500, 1500, "-38"], "isController": false}, {"data": [1.0, 500, 1500, "-49"], "isController": false}, {"data": [1.0, 500, 1500, "-39"], "isController": false}, {"data": [1.0, 500, 1500, "-54-0"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 92, 0, 0.0, 2278.880434782609, 46, 5912, 223.5, 5434.7, 5605.599999999999, 5912.0, 15.376901220123683, 120.70038285559085, 7.313364428380412], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["", 8, 0, 0.0, 1409.625, 179, 3757, 784.0, 3757.0, 3757.0, 3757.0, 1.3785972772703774, 12.436993796312253, 2.742721975702223], "isController": true}, {"data": ["-54-1", 2, 0, 0.0, 1350.5, 1139, 1562, 1350.5, 1562.0, 1562.0, 1562.0, 1.2698412698412698, 19.74640376984127, 0.7328869047619048], "isController": false}, {"data": ["-37-0", 20, 0, 0.0, 159.35, 120, 231, 148.5, 229.50000000000003, 231.0, 231.0, 20.04008016032064, 7.867297094188377, 6.7322144288577155], "isController": false}, {"data": ["-37-1", 20, 0, 0.0, 4897.35, 3099, 5694, 5075.0, 5550.7, 5687.2, 5694.0, 3.4989503149055285, 55.704211588086075, 1.1754286214135758], "isController": false}, {"data": ["-50", 2, 0, 0.0, 64.0, 62, 66, 64.0, 66.0, 66.0, 66.0, 4.016064257028112, 0.9059676204819277, 1.8903739959839359], "isController": false}, {"data": ["-40", 2, 0, 0.0, 63.0, 63, 63, 63.0, 63.0, 63.0, 63.0, 3.883495145631068, 0.8760618932038835, 1.809010922330097], "isController": false}, {"data": ["-41", 2, 0, 0.0, 59.0, 58, 60, 59.0, 60.0, 60.0, 60.0, 3.9138943248532287, 0.8829195205479452, 1.857570939334638], "isController": false}, {"data": ["-42", 2, 0, 0.0, 57.5, 56, 59, 57.5, 59.0, 59.0, 59.0, 3.9447731755424065, 0.8898853550295858, 1.8683740138067062], "isController": false}, {"data": ["-43", 2, 0, 0.0, 61.5, 60, 63, 61.5, 63.0, 63.0, 63.0, 3.883495145631068, 0.8760618932038835, 1.8393507281553398], "isController": false}, {"data": ["-54", 2, 0, 0.0, 1399.5, 1190, 1609, 1399.5, 1609.0, 1609.0, 1609.0, 1.2330456226880395, 19.658287415228113, 1.4233007090012328], "isController": false}, {"data": ["-44", 2, 0, 0.0, 62.5, 61, 64, 62.5, 64.0, 64.0, 64.0, 3.8535645472061657, 0.8693099710982659, 1.8251746146435452], "isController": false}, {"data": ["-45", 2, 0, 0.0, 69.0, 69, 69, 69.0, 69.0, 69.0, 69.0, 3.8240917782026767, 0.8626613288718928, 1.81121534416826], "isController": false}, {"data": ["-46", 2, 0, 0.0, 68.0, 64, 72, 68.0, 72.0, 72.0, 72.0, 3.8240917782026767, 0.8626613288718928, 1.81121534416826], "isController": false}, {"data": ["-47", 2, 0, 0.0, 56.5, 56, 57, 56.5, 57.0, 57.0, 57.0, 3.976143141153081, 0.8969619781312127, 1.875465954274354], "isController": false}, {"data": ["-37", 20, 0, 0.0, 5057.65, 3258, 5912, 5223.0, 5782.7, 5905.9, 5912.0, 3.370407819346141, 54.98092954794405, 2.2644927536231885], "isController": false}, {"data": ["-48", 2, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 3.9603960396039604, 0.8934096534653465, 1.8641707920792079], "isController": false}, {"data": ["-38", 2, 0, 0.0, 139.5, 124, 155, 139.5, 155.0, 155.0, 155.0, 3.278688524590164, 0.7396260245901639, 1.5336834016393444], "isController": false}, {"data": ["-49", 2, 0, 0.0, 61.5, 57, 66, 61.5, 66.0, 66.0, 66.0, 3.9840637450199203, 0.8987487549800797, 1.8753112549800797], "isController": false}, {"data": ["-39", 2, 0, 0.0, 64.5, 63, 66, 64.5, 66.0, 66.0, 66.0, 3.8684719535783367, 0.8726728723404255, 1.8246796421663443], "isController": false}, {"data": ["-54-0", 2, 0, 0.0, 48.5, 46, 51, 48.5, 51.0, 51.0, 51.0, 4.140786749482402, 1.6255822981366461, 2.3898486024844723], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 92, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
