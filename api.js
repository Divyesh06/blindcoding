function sendRequest(url,data,success_callback=function(e){}, failure_callback=function(e){}) {
    $.ajax({
        url: 'https://kre5q2bzgivv3o5a.anvil.app/6IBPBBBA5VSECVPZCY3BUWID/_/api/' + url,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        error : function (data) {
            failure_callback(data.responseText);
        },
        success: function (data, nvm,jxhr) {
            success_callback(data);
        }

    });
}

