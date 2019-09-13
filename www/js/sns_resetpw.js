$(window).load(function (){
    var ele = document.getElementById("pwResetRequest");
    var user_ID = localStorage.getItem('user_ID');
    var oldPw = localStorage.getItem('passwd');    
    ele.addEventListener("click", function(evt){
        var username = $('#chng_userName').val();
        var emailAdress = $('#chng_mailAddress').val();
        var password = $('#new_password').val();
        //click処理
        if(!confirm('パスワードを変更しますか？')){
            /* キャンセルの時の処理 */
            return false;
        }else{
            /*　OKの時の処理 */
            $.ajax({
                type: 'POST',
                url: 'https://pomsquad.tech/oauth/token', //通信先のURL
                data:{
                    username:username,
                    password:oldPw,
                    grant_type:'password',
                    client_id:'BcxjWLJRfdcwMhIVuD8X8NsaKgYtB6CwfemleHUS',
                    client_secret:'vy90kdZ2frj5ZgUhSrdEecFoaxfie85jjWelRcxt'
                }, //通信するデータ
                dataType: 'json', //応答のデータの種類
            })
            .done(function(data, status, jqXHR){
                //dataをJson形式の文字列に変換してdata1に入れる
                var data1 = JSON.stringify(data);
                console.log(data1);
                //JSON形式の文字列data1をオブジェクトdata2に変換し、
                //キーを指定して値（access_token）をlocalStorageに保存する
                var data2 = JSON.parse(data1);
                localStorage.setItem("access_token", data2.access_token);
                var access_token = localStorage.getItem('access_token');
                $.ajax({
                    type: 'POST',
                    url: 'https://pomsquad.tech/wp-json/wp/v2/users/' + user_ID + '?' + 'access_token=' + access_token,
                    data:{
                        username,
                        emailAdress,
                        password,
                        client_id:'BcxjWLJRfdcwMhIVuD8X8NsaKgYtB6CwfemleHUS',
                        client_secret:'vy90kdZ2frj5ZgUhSrdEecFoaxfie85jjWelRcxt'
                    },
                    dataType: 'json',
                    success: function(data, status, jqXHR) {
                        alert("パスワード変更メールを送信します。受信メール確認してください。")
                        },
                    error: function() {
                        alert("変更できませんでした。")
                    },
                    complete: function() {
                        setTimeout("location.reload()",3000);
                    }
                })
            })
            .fail(function(jqXHR, status, error){
                alert("変更できませんでした。")
                console.log(jqXHR);
            })
            .always(function(jqXHR, status){
            })
        event.stopPropagation();
        
        //defaultのイベント禁止
        evt.preventDefault();
        //イベント伝達禁止
        evt.stopPropagation();
        }
        }, false);

})