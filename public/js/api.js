/** 
 * Api.js used to hit all api calls to controllers for different servces
*/

//Query Function :- Makes ajax call to backend server for different routes and methods
function query(e, t, n, r, success, error, showError) {
    showError = typeof showError !== "undefined" ? showError : true;
    var params = {};
    if (t == "GET" && n != undefined) {
        params = $.extend({}, params, n);
        n = undefined;
    }
    return $.ajax({
        url: "/api" + e + "?" + jQuery.param(params),
        async: r,
        method: t,
        data: n != undefined ? JSON.stringify(n) : "",
        dataType: "json",
        contentType: "application/json",
        success: function (msg) {
            success(msg);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (error != undefined) error(jqXHR.responseJSON);
        },
    });
}

var api = {
    source: {
        //api call to validate url 
        validateUrl: function (data, success, error) {
            return query("/domain/validateUrl/", "POST", data, 1, success, error);
        },
        //api call to validate if quote is from source or not
        validateSource: function (data, success, error) {
            return query("/domain/validateSource/", "POST", data, 1, success, error);
        },
        //finally submit the edit request
        submitEditRequest: function (success, error) {
            return query("/domain/submitEditRequest/", "GET", null, 1, success, error);
        },
    }
}