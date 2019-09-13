$(window).load(function(){
    var elemnt1 = document.getElementById("sendReport");
    var elemnt2 = document.getElementById("delAcount");
    var username = localStorage.getItem('user_login');
    elemnt1.addEventListener("click", function(evt){
        location.href = 'mailto:truecolorcreate@gmail.com?subject=不適切な書き込み通報&body=' + username + 'さん、下記の内容をお知らせください。<br>通報したいユーザー名：<br>投稿内容：<br>投稿番号（右の小さなグレーの番号）：<br>ご自身のユーザー名：' + username
    })
    elemnt2.addEventListener("click", function(evnt){
        location.href = 'mailto:truecolorcreate@gmail.com?subject=[Pom Squad] アカウント削除リクエスト&body=' + username + 'さん、アカウントの削除を行いますので、ご自身のユーザー名に間違いがないかご確認の上、このままリクエストメールを送信してください。<br>削除が完了するとメールが届きますので、内容をご確認ください。'
    })
})