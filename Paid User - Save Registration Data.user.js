// ==UserScript==
// @name         Paid User - Save Registration Data
// @namespace    http://risingfinix.com/
// @version      0.1
// @description  Save New Registration Data
// @author       Dushyant Saharan
// @match        http://www.imcbusiness.net/User/RegisterConfirm
// @match        http://awa1.imcbusiness.net/User/RegisterConfirm
// @match        http://awa2.imcbusiness.net/User/RegisterConfirm
// @match        http://awa3.imcbusiness.net/User/RegisterConfirm
// @grant        none
// ==/UserScript==

(function() {
            var d = new Date();
            var date = d.getFullYear()+1+"-"+d.getMonth()+"-"+d.getDate();
            var aid = document.getElementById("MainContent_myForm_txtCode").value;
            var aname = document.getElementById("MainContent_myForm_txtName").value;
            var sid = document.getElementById("MainContent_myForm_txtPcode").value;
            var sname = document.getElementById("MainContent_myForm_txtPname").value;
            var mobile = document.getElementById("MainContent_myForm_txtMobile").value;
            var email = document.getElementById("MainContent_myForm_txtEmail").value;
            var username = document.getElementById("MainContent_myForm_txtUsername").value;
            var password = document.getElementById("MainContent_myForm_txtPassword").value;

            $.ajax({
                url: 'http://client.saharanherbal.com/fnLoginSave.php',
                async: false,
                type: 'POST',
                data: ({
                    'save':'yes',
                    'date':date,
                    'associate_id':aid,
                    'associate_name':aname,
                    'seller_id':sid,
                    'seller_name':sname,
                    'mobile':mobile,
                    'email':email,
                    'username':username,
                    'password':password
                }),
                dataType: 'html',
                success: function(data) {
                    alert('Login Data Saved.');
                },
                error:function(jqXHR, textStatus, errorThrown){
                    alert("Error type" + textStatus + "occured, with value " + errorThrown);
                }
            });

})();