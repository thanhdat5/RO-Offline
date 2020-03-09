loadFile();

function loadFile() {
    readXMLFile('data/bookTitle.xml', function(res) {
        var rs = '';
        for (var i = 0; i < res.length; i++) {
            var item = res[i];
            rs += ' <div class="book-item">' +
                '<ul class="al_c">' +
                '<li class="book-item-image">' +
                '<img src="http://contents.successtesting.net/books/Goldfish are Boring.jpg" width="105" height="147" class="shadow_RD" alt="' + item.book_title + '" title="' + item.book_title + '" style="cursor:pointer" onclick="goStudy(\'001\',\'3198\',\'13744\')">' +
                '<div class="book-unit-name" title="' + item.unit_title + '">' + item.unit_title + '</div>' +
                '</li>' +
                '<li>' +
                '<img src="img/btn_5_over.png" width="31" height="25" alt="eBook" title="eBook" style="cursor:pointer" onclick="goStudy(\'001\',\'3198\',\'13744\')">' +
                '<img src="img/btn_2_over.png" width="31" height="25" alt="Watch" title="Watch" style="cursor:pointer" onclick="goStudy(\'002\',\'3198\',\'13744\');">' +
                '<img src="img/btn_6_over.png" width="31" height="25" alt="Quiz" title="Quiz" style="cursor:pointer" onclick="goStudy(\'003\',\'3198\',\'13744\');">' +
                '<img src="img/btn_7.png" alt="Extra" title="Extra" style="cursor:pointer" onclick="goStudy(\'006\',\'3198\',\'13744\');">' +
                '</li>' +
                '</ul>' +
                '</div>';
        }
        $('#BookData').html(rs);
    }, function(err) {
        debugger
    });
}