//エラーメッセージと成功時のメッセージをセット
var loginErrorMessage = "<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span class='sr-only'>Error:</span>Please login:To post article needs to login</div>";
var commentSuccessMessage = "<div class='alert alert-success' role='alert'><strong>投稿完了</strong><p>タイムラインに戻るか、右上のボックスボタンをタップして自分の投稿一覧で投稿を確認できます。</p></div></div>";
var commentError = "<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span class='sr-only'>Error:</span>投稿できませんでした。ログインして１時間以上経過しているか、インターネットにつながっていません。</div>";

get_UserInfo();

function get_UserInfo() {
    $.ajax({
        type: 'POST',
        url: 'https://pomsquad.tech/oauth/me',
        data:{
            access_token:localStorage.getItem("access_token"),
            client_id:'BcxjWLJRfdcwMhIVuD8X8NsaKgYtB6CwfemleHUS',
            client_secret:'vy90kdZ2frj5ZgUhSrdEecFoaxfie85jjWelRcxt'
        },
        dataType: 'json'
    })
    .done(function(data, status, jqXHR){
        var data3 = JSON.stringify(data);
        var data4 = JSON.parse(data3);
        localStorage.setItem("user_login", data4.user_login);
        localStorage.setItem("user_ID", data4.ID)
    });
}

$(document).on('click', '#sbmtBtn', function(event) {
    var bodyText = $('#body').val();
    var access_token = localStorage.getItem("access_token");
    console.log(access_token);
        $.ajax({
        type: 'POST',
        url: 'https://pomsquad.tech/wp-json/wp/v2/posts?access_token=' + access_token,
        data:{
            content:bodyText,
            status:"publish",
        },
        dataType: 'json'
    }).done(function(json){
        $("#message").html(commentSuccessMessage);
        $("#body").val("");
    }).fail(function(json){
        $("#message").html(commentError);
    });
})
