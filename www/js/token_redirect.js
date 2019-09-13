$(document).ready(function(){

    $("#login_bt").click(function(event){
		//フォームが通常の動きをしないように
		event.preventDefault();
		//初期化
		$("#ajax_result").empty();
		loginToken();
	});
    
});
function loginToken(){
        
 	var username = $('#login_id').val();
 	var passwd = $('#login_password').val();
    localStorage.setItem("passwd", passwd); 
	$.ajax({
		type: 'POST', //使用するHTTPメソッド
		url: 'https://pomsquad.tech/oauth/token', //通信先のURL
		data:{
			username:username,
			password:passwd,
			grant_type:'password',
			client_id:'BcxjWLJRfdcwMhIVuD8X8NsaKgYtB6CwfemleHUS',
			client_secret:'vy90kdZ2frj5ZgUhSrdEecFoaxfie85jjWelRcxt'
		}, //通信するデータ
		dataType: 'json', //応答のデータの種類
        //通信に成功したら以下が実行される
        //引数dataは通信で取得したデータ
        //引数statusは通信結果のステータス（200/400など）
        //引数jqXHRはXMLHttpRequestオブジェクト
	})
	.done(function(data, status, jqXHR){
        //dataをJson形式の文字列に変換してdata1に入れる
		var data1 = JSON.stringify(data);
        console.log(data1);
        //JSON形式の文字列data1をオブジェクトdata2に変換し、
        //キーを指定して値（access_token）をlocalStorageに保存する
        var data2 = JSON.parse(data1);
        localStorage.setItem("access_token", data2.access_token);
		var url = 'sns_timeline.html';
		$( location ).attr("href", url);
	})
	.fail(function(jqXHR, status, error){
		 $("#errorMess").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span class='sr-only'>Error:</span>The username or password you entered is incorrect.</div>");
		 console.log(jqXHR);
	})
	.always(function(jqXHR, status){
	});

}