// ==UserScript==
// @name         Paid User - Get IMC Invoice Data
// @namespace    http://risingfinix.com
// @version      0.1
// @description  Get IMC Invoice Data
// @author       Dushyant Saharan
// @match        imcbusiness.co.in/Manage/InvoiceView
// @match        www.imcbusiness.co.in/Manage/InvoiceView
// @require      http://client.saharanherbal.com/assets/js/jquery.tabletojson.js
// @require      http://client.saharanherbal.com/assets/js/jquery.tabletojson.min.js
// @grant        none
// ==/UserScript==

(function() {
    var amt = document.getElementById("MainContent_myForm_txtPayable_amt").value;
    var client_code = document.getElementById("MainContent_myForm_txtCode1").value;

    $('#MainContent_myForm_pnlTaxtype').hide();
    $('#MainContent_myForm_pnlSaletype').hide();
    $('#MainContent_myForm_pnlBilltype').hide();
    $('#MainContent_myForm_pnlStockPoint').hide();
    $('#MainContent_myForm_pnlPurchasertype').hide();
    $('#MainContent_myForm_txtTin2_2').parent().parent().hide();
    $('#MainContent_myForm_txtSystemId').parent().parent().hide();
    $('#MainContent_myForm_txtState2_2').parent().parent().hide();
    $('#MainContent_myForm_txtState2_2').parent().parent().hide();
    $('#MainContent_myForm_txtTax_amt').parent().parent().hide();
    $('#MainContent_myForm_txtTax_amt1').parent().parent().hide();
    $('#MainContent_myForm_txtRound_amt').parent().parent().hide();
    $('#MainContent_myForm_txtPayable_amt').parent().parent().hide();
    $('#MainContent_myForm_txtTaxable_amt').parent().parent().hide();
    $('#MainContent_myForm_txtDiscount_amt').parent().parent().hide();


    var markupdiscount = '<input type="hidden" value="0" id="discount" autocomplete="off" class="form-control">';
    $("#MainContent_myForm_pnlFooter1 .form-horizontal").append(markupdiscount);
    var markupvalue = '<div class="form-group"><label class="col-sm-2 control-label">Amount To Pay</label><div class="col-sm-2"><input type="text" value="'+amt+'" id="value" autocomplete="off" class="form-control"></div></div>';
    $("#MainContent_myForm_pnlFooter1 .form-horizontal").append(markupvalue);
    var markupcash = '<div class="form-group"><label class="col-sm-2 control-label">Amount Paid</label><div class="col-sm-2"><input type="text" value="0" id="cash" autocomplete="off" class="form-control"></div></div>';
    $("#MainContent_myForm_pnlFooter1 .form-horizontal").append(markupcash);
    var markupcredit = '<div class="form-group"><label class="col-sm-2 control-label">Amount Pending</label><div class="col-sm-2"><input type="text" readonly="readonly" value="'+amt+'" id="credit" autocomplete="off" class="form-control"></div></div>';
    $("#MainContent_myForm_pnlFooter1 .form-horizontal").append(markupcredit);
    var markupseller_id = '<div class="form-group"><label class="col-sm-2 control-label">Seller ID</label><div class="col-sm-2"><input type="text" id="seller_id" autocomplete="off" class="form-control"></div></div>';
    $("#MainContent_myForm_pnlFooter1 .form-horizontal").append(markupseller_id);
    var markupseller_name = '<div class="form-group"><label class="col-sm-2 control-label">Seller Name</label><div class="col-sm-2"><input type="text" id="seller_name" autocomplete="off" class="form-control"></div></div>';
    $("#MainContent_myForm_pnlFooter1 .form-horizontal").append(markupseller_name);
    var markupref = '<div class="form-group"><label class="col-sm-2 control-label">Against Ref.</label><div class="col-sm-2"><Select type="text" class="form-control border-input" id="ref" ><option value="No">No</option><option value="Yes">Yes</option></select></div></div>';
    $("#MainContent_myForm_pnlFooter1 .form-horizontal").append(markupref);
    var markuptabledata = '<div class="form-group"><div class="col-sm-10"><input type="hidden" class="form-control border-input" id="tabledata"></div></div>';
    $("#MainContent_myForm_pnlFooter1 .form-horizontal").append(markuptabledata);

    var no = document.getElementById("MainContent_myForm_txtCinvoice_no").value;
    $.get("http://client.saharanherbal.com/fnGetData.php?client_code="+client_code+"no="+no, function(data)
    {
        var response = JSON.parse(data);
        if (response.status === "saved")
        {
            document.getElementById("seller_id").value=response.seller_id;
            document.getElementById("seller_name").value=response.seller_name;
            document.getElementById("value").value=response.value;
            document.getElementById("cash").value=response.cash;
            document.getElementById("credit").value=response.credit;
            document.getElementById("ref").value=response.ref;
            var markupupdatebutton = '<a id="UpdateData" class="btn btn-default" data-style="expand-right"><i class="fa fa-link"></i> Update Data</a>';
            $("#MainContent_myForm_pnlFooter3 .alert-dismissable").append(markupupdatebutton);
            alert("Data Saved Already");
        }else{
            var markupsavebutton = '<a id="SaveData" class="btn btn-default" data-style="expand-right"><i class="fa fa-link"></i> Save Data</a>';
            $("#MainContent_myForm_pnlFooter3 .alert-dismissable").append(markupsavebutton);
        }
    });


    $('#MainContent_myForm_pnlFooter1').on('keyup', '#value', function(ev){
        var value = document.getElementById("value").value;
        var cash = document.getElementById("cash").value;
        if (value > "0")
        {
            if (value.match(/^\d+$/))
            {
                document.getElementById("credit").value=parseInt(value) - parseInt(cash);
            }else{
                alert("Please Enter a Numeric Value only.");
                document.getElementById("credit").value=amt;
            }
        }else{
            document.getElementById("credit").value=amt;
        }
    });

    $('#MainContent_myForm_pnlFooter1').on('keyup', '#discount', function(ev){
        var value = parseInt(document.getElementById("MainContent_myForm_txtAmount").value);
        var disc = parseInt(document.getElementById("discount").value);
        var tbv = document.getElementById("MainContent_myForm_txtTpoints").value;
        if (disc > "0")
        {
            document.getElementById("value").value=value - (tbv * disc / 100);
            document.getElementById("credit").value=value - (tbv * disc / 100);
        }else{
            document.getElementById("value").value=value;
            document.getElementById("credit").value=value;
        }
    });

    $('#MainContent_myForm_pnlFooter1').on('keyup', '#cash', function(ev){
        var value = document.getElementById("value").value;
        var cash = document.getElementById("cash").value;
        if (cash > "0")
        {
            if (cash.match(/^\d+$/))
            {
                document.getElementById("credit").value=parseInt(value) - parseInt(cash);
            }else{
                alert("Please Enter a Numeric Value only.");
                document.getElementById("credit").value=value;
            }
        }else{
            document.getElementById("credit").value=value;
        }
    });

    $('#MainContent_myForm_pnlFooter1').on('keyup', '#seller_id', function(ev){
        var seller_id = document.getElementById("seller_id").value;
        $.get("http://client.saharanherbal.com/fnGetData.php?seller_id="+seller_id, function(data)
              {
            var response = JSON.parse(data);
            document.getElementById("seller_name").value=response.seller_name;
        });
    });

    $('#MainContent_myForm_pnlFooter3').on('click', '#SaveData', function(ev){
        if(confirm("Are you sure you want to save this Invoice?")===true)
        {
            var associate_id="";
            var associate_name="";
            var type="";
            if($("#MainContent_myForm_cmbPurchasertype option:selected").text()==="Associate"){
                associate_id = document.getElementById("MainContent_myForm_txtCcode2_2").value;
                associate_name = document.getElementById("MainContent_myForm_txtName2_2").value;
                type = $("#MainContent_myForm_cmbPurchasertype option:selected").text();
            }
            if($("#MainContent_myForm_cmbNlevel2_1 option:selected").text()==="Outlet") {
                associate_id = document.getElementById("MainContent_myForm_txtCode2_1").value;
                associate_name = document.getElementById("MainContent_myForm_txtName2_1").value;
                type = $("#MainContent_myForm_cmbNlevel2_1 option:selected").text();
            }
            var table = $('#MainContent_myForm_gvInvoiceItems').tableToJSON();
            var tabledata = JSON.stringify(table);
            document.getElementById("tabledata").value = tabledata;
            var no = document.getElementById("MainContent_myForm_txtCinvoice_no").value;
            var ref_type = 'Sale';
            var date =document.getElementById("MainContent_myForm_txtDdate").value.split("/");
            date = date.reverse().join("-");
            var seller_id = document.getElementById("seller_id").value;
            var seller_name = document.getElementById("seller_name").value;
            var noi = document.getElementById("MainContent_myForm_gvInvoiceItems").rows.length-1;
            var tbv = document.getElementById("MainContent_myForm_txtTpoints").value;
            var amt = document.getElementById("MainContent_myForm_txtPayable_amt").value;
            var disc = document.getElementById("discount").value;
            var value = document.getElementById("value").value;
            var cash = document.getElementById("cash").value;
            var credit = document.getElementById("credit").value;
            var ref = document.getElementById("ref").value;
            var client_code = document.getElementById("MainContent_myForm_txtCode1").value;
            $.ajax({
                url: 'http://client.saharanherbal.com/fnInvSave.php',
                async: false,
                type: 'POST',
                data: ({
                    'save':'yes',
                    'client_code':client_code,
                    'no':no,
                    'ref':ref,
                    'ref_type':ref_type,
                    'date':date,
                    'associate_id':associate_id,
                    'associate_name':associate_name,
                    'type':type,
                    'seller_id':seller_id,
                    'seller_name':seller_name,
                    'noi':noi,
                    'tbv':tbv,
                    'disc':disc,
                    'amt':amt,
                    'value':value,
                    'cash':cash,
                    'credit':credit,
                    'tabledata':tabledata
                }),
                dataType: 'html',
                success: function(data) {
                    alert('Invoice Data Saved.');
                },
                error:function(jqXHR, textStatus, errorThrown){
                    alert("Error type" + textStatus + "occured, with value " + errorThrown);
                }
            });

        }
    });
    $('#MainContent_myForm_pnlFooter3').on('click', '#UpdateData', function(ev){
        if(confirm("Are you sure you want to update this Invoice?")===true)
        {
            var table = $('#MainContent_myForm_gvInvoiceItems').tableToJSON();
            var tabledata = JSON.stringify(table);
            document.getElementById("tabledata").value = tabledata;
            var no = document.getElementById("MainContent_myForm_txtCinvoice_no").value;
            var seller_id = document.getElementById("seller_id").value;
            var seller_name = document.getElementById("seller_name").value;
            $.ajax({
                url: 'http://client.saharanherbal.com/fnInvSave.php',
                async: false,
                type: 'POST',
                data: ({
                    'update':'yes',
                    'no':no,
                    'seller_id':seller_id,
                    'seller_name':seller_name,
                    'tabledata':tabledata
                }),
                dataType: 'html',
                success: function(data) {
                    alert('Invoice Data Updated.');
                },
                error:function(jqXHR, textStatus, errorThrown){
                    alert("Error type" + textStatus + "occured, with value " + errorThrown);
                }
            });


         }
    });

})();

