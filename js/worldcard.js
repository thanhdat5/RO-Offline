var rs = [];
count = 0;
loadFile1();
loadFile2();
loadFile3();

function loadFile1() {
    readXMLFile('data/Unit01/GetActivityWord/CBWM.xml', function(res) {
        count++;
        rs = rs.concat(res);
        if (count == 3) success();
    }, function(err) {
        debugger
    });
}

function loadFile2() {
    readXMLFile('data/Unit01/GetActivityWord/CBWF.xml', function(res) {
        count++;
        rs = rs.concat(res);
        if (count == 3) success();
    }, function(err) {
        debugger
    });
}

function loadFile3() {
    readXMLFile('data/Unit01/GetActivityWord/CBMQ.xml', function(res) {
        count++;
        rs = rs.concat(res);
        if (count == 3) success();
    }, function(err) {
        debugger
    });
}

function success() {
    for (var i = 0; i < rs.length; i++) {

    }
}