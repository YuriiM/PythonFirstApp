// View clients
function select_clients()
{
    var data = {
        "request":"select"
    };
    $.ajax({
        type: "POST",
        url: "/ITBS/select_clients/",
        data: JSON.stringify(data),
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function(html) {
            $("#result").empty().html(html).show();
            $("#alert_error").hide();
        },
        error : function() {
            alert("Error");
        }
    });
    return false;
}

// Delete client
function delete_client(client_id)
{
    var data = {
        "client_id":client_id
    };
    $.ajax({
        type: "POST",
        url: "/ITBS/delete_client/",
        data: JSON.stringify(data),
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function(html) {
            $("#alert_error").hide();
            $("#alert_success").hide();
            $("#result").empty().append(html);
        },
        error : function() {
            alert("Error");
        }
    });
    return false;
}

// Add client
function add_client()
{
    var data_fname = $('#id_first_name').val();
    var data_lname = $('#id_last_name').val();
    var data_pcode = $('#id_p_code').val();
    var data_email = $('#id_email').val();
    var data_address = $('#id_address').val();
    var data_city = $('#id_city').val();
    var data_country = $('#id_country').val();
    if (validation(data_fname, data_lname, data_pcode, data_email, data_address,data_city, data_country)==false)
    {
        return false
    }
    var data={
        "first_name":data_fname,
        "last_name":data_lname,
        "p_code":data_pcode,
        "email":data_email,
        "address":data_address,
        "city":data_city,
        "country":data_country
    };
    $.ajax({
        type: "POST",
        url: "/ITBS/add_client/",
        data: JSON.stringify(data),
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function(html) {
            if(html.indexOf('upper') + 1) {
                $("#alert_success").hide();
                $("#alert_error").empty().html(html).show();
            }else
            {
                $("#alert_error").hide();
                $("#alert_success").empty().text("CLIENT SUCCESSFULLY ADDED.").show();
                $("#result").empty().html(html).show();
            }
        },
        error : function() {
            alert("Error");
        }
    });
}

// Put client information in new form
function prepare_update(client_id)
{
    $("body,html").animate({
        scrollTop:0
    }, 800);
    var data = {
        "client_id":client_id
    };
    $.ajax({
        type: "POST",
        url: "/ITBS/upd_prepare/",
        data: JSON.stringify(data),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        success: function(html) {
            $("#mForm").empty().html(html);
        },
        error : function() {
            alert("Error");
        }
    });
}

// Update client information
function update_client(client_id)
{
    var data_fname = $('#id_first_name').val();
    var data_lname = $('#id_last_name').val();
    var data_pcode = $('#id_p_code').val();
    var data_email = $('#id_email').val();
    var data_address = $('#id_address').val();
    var data_city = $('#id_city').val();
    var data_country = $('#id_country').val();
    if (validation(data_fname, data_lname, data_pcode, data_email, data_address,data_city, data_country)==false)
    {
        return false
    }
    var data={
        "client_id":client_id,
        "first_name":data_fname,
        "last_name":data_lname,
        "p_code":data_pcode,
        "email":data_email,
        "address":data_address,
        "city":data_city,
        "country":data_country
    };
    $.ajax({
        type: "POST",
        url: "/ITBS/update_client/",
        data: JSON.stringify(data),
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function(html) {
            if(html.indexOf('upper') + 1) {
                $("#alert_success").hide();
                $("#alert_error").empty().html(html).show();
            }else
            {
                $("#alert_error").hide();
                $("#alert_success").empty().text("CLIENT INFORMATION SUCCESSFULLY UPDATED.").show();
                $("#result").empty().html(html).show();
            }
        },
        error : function() {
            alert("Error");
        }
    });
}

// Field validation function
function validation(data_fname, data_lname, data_pcode, data_email, data_address,data_city, data_country)
{
    var e_reg = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;
    for(var i=0;i<arguments.length;i++) {
        if (arguments[i].length == 0) {
            $('#alert_error').empty().text('YOU MUST FILL IN ALL OF THE FIELDS.').show();
            $("#alert_success").hide();
            return false;
        }
    }
    //First Name
    if (data_fname.length>50){
        $('#alert_error').empty().text('THE "FIRST NAME" FIELD MUST BE LESS THEN 50 CHARACTERS LONG.').show();
        $("#alert_success").hide();
        return false;
    //Last Name
    }else if (data_lname.length>50){
        $('#alert_error').empty().text('THE "LAST NAME" FIELD MUST BE LESS THEN 50 CHARACTERS LONG.').show();
        $("#alert_success").hide();
        return false;
    //Personal Code
    }else if (data_pcode.length>50){
        $('#alert_error').empty().text('THE "PERSONAL CODE" FIELD MUST BE LESS THEN 50 CHARACTERS LONG.').show();
        $("#alert_success").hide();
        return false;
    //Email Address
    }else if (data_email.length>50){
        $('#alert_error').empty().text('THE "EMAIL ADDRESS" FIELD MUST BE LESS THEN 50 CHARACTERS LONG.').show();
        $("#alert_success").hide();
        return false;
    }else if (!e_reg.test(data_email)) {
        $('#alert_error').empty().text('EMAIL ADDRESS IS INCORRECT.').show();
        $("#alert_success").hide();
        return false;
    //Full Address
    }else if (data_address.length>100){
        $('#alert_error').empty().text('THE "FULL ADDRESS" FIELD MUST BE LESS THEN 100 CHARACTERS LONG.').show();
        $("#alert_success").hide();
        return false;
    //City
    }else if (data_city.length>50){
        $('#alert_error').empty().text('THE "CITY" FIELD MUST BE LESS THEN 50 CHARACTERS LONG.').show();
        $("#alert_success").hide();
        return false;
    //Country
    }else if (data_country.length>50){
        $('#alert_error').empty().text('THE "COUNTRY" FIELD MUST BE LESS THEN 50 CHARACTERS LONG.').show();
        $("#alert_success").hide();
        return false;
    }
    return true;
}

// Reload page
function cancel()
{
    location.reload();
}