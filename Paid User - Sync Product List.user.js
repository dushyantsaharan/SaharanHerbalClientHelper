// ==UserScript==
// @name         Paid User - Sync Product List
// @namespace    http://risingfinix.com
// @version      0.1
// @description  Sync Product List
// @author       Dushyant Saharan
// @match        http://imcbusiness.co.in/Manage/ProductList-SP
// @match        http://www.imcbusiness.co.in/Manage/ProductList-SP
// @grant        none
// ==/UserScript==

(function() {
    markupheaderright='<ul class="nav navbar-nav navbar-right"><li><a id="SyncList">Sync List</a></li></ul>';
    $(".navbar-ex1-collapse").append(markupheaderright);

    $('.navbar-right').on('click', '#SyncList', function(ev){
        for (var grid = 0; grid < 5; grid++) {
            var table = document.getElementById("MainContent_1_GridView1_"+grid);
            for(var i=1; i<table.rows.length;i++){
                var code=(table.rows[i].cells[1].innerHTML);
                var proname=(table.rows[i].cells[2].innerHTML);
                var mrp=(table.rows[i].cells[3].innerHTML);
                var ppu=(table.rows[i].cells[4].innerHTML);
                var bv=(table.rows[i].cells[5].innerHTML);
                var pcs=(table.rows[i].cells[6].innerHTML);
                $.ajax({
                    url: 'http://client.saharanherbal.com/fnProductsListSync.php',
                    async: false,
                    type: 'POST',
                    data: ({
                        'code':code,
                        'proname':proname,
                        'mrp':mrp,
                        'ppu':ppu,
                        'bv':bv,
                        'pcs':pcs
                    }),
                    dataType: 'html'
                });

            }
        }
        alert('Products List Synced.');
    });
})();