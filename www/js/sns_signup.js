window.onload = function(){
// [NCMB] APIキー設定
var appKey    = "9ab1de2d32e27a7915ea548af8763e5944cab345cf86efeedbcaf173e4892d99";
var clientKey = "3153af5772f1f5567f6ae573041d48ec94ae7c1c1ce8fa8af0a1cbfbea000e1e";

// [NCMB] SDKの初期化
var ncmb = new NCMB(appKey, clientKey);

// ログイン中の会員
var currentLoginUser;

//mask
this.maskEl = "#mask";
$(self.maskEl).hide();

/********** メールアドレス / PW 認証 **********/
    //Add event to "evtarget" id.
var target = document.getElementById("evtarget");
target.addEventListener('click', chk_value, false);

function chk_value(event) {
    //get value of checkbox
    var chkflg = document.formA.Checkbox.checked;
    //if no check return alert
    if (chkflg == false) {
        event.preventDefault(); //cancel registration
        alert('利用規約とプライバシーポリシーに同意してください（チェックボックスにチェック）。');
    } else {
        if(!confirm('会員登録用のメールを送信します。よろしいですか？')){
            /* キャンセルの時の処理 */
            return false;
        }else{
            /*　OKの時の処理 */
            // loading の表示
            $(this.maskEl).show();
            // 入力フォームからメールアドレス(mailAddress)を取得
            var mailAddress = $("#reg_mailAddress").val();
            // [NCMB] メールアドレス に会員登録を行うためのメールを送信
            ncmb.User.requestSignUpEmail(mailAddress)
                     .then(function(user){
                         /* 処理成功 */
                         alert("【メール / PW 認証】新規登録メールを配信しました。");
                         console.log("【メール / PW 認証】新規登録メールを配信しました。");
                         alert("届いたメールに記載されているURLにアクセスし、パスワードを登録してください。");
                         // フィールドを空に
                         $("#reg_mailAddress").val("");
                         // loading の表示終了
                         $(self.maskEl).hide();
                     })
                     .catch(function(error){
                         /* 処理失敗 */
                         alert("【メール / PW 認証】新規登録メールの配信に失敗しました：" + error);
                         console.log("【メール / PW 認証】新規登録メールの配信失敗しました：" + error);
                         // loading の表示終了
                         $(self.maskEl).hide();
                     });
                }
            }
}


// currentUser のデータを表示する処理
function getUserData() {
    // 値を取得
    var objectId = currentLoginUser.get("objectId");
    var userName = currentLoginUser.get("userName");
    var mailAddress = currentLoginUser.get("mailAddress");
    var authData = JSON.stringify(currentLoginUser.get("authData"));
    var date = new Date(currentLoginUser.get("createDate"));
    var createDate = date.getFullYear() + "-" 
                    + ((date.getMonth() < 10) ? "0" : "") + date.getMonth() + "-"
                    + ((date.getDate() < 10) ? "0" : "") + date.getDate() + "T"
                    + ((date.getHours() < 10) ? "0" : "") + date.getHours() + ":"
                    + ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes() + ":" 
                    + ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds() + "." 
                    + ((date.getMilliseconds() < 10) ? "0" : "") + date.getMilliseconds() + "+09:00";
    // リストに追加
    $("#currentUserData").append("<tr style='border-right: 1px solid #ccc; border-left: 1px solid #ccc; color: #FFFFFF; background: #04162e;'><th scope='row' id='key'>key</th><td scope='row' id='value' style='width: 100%;'>value</td></tr>");
    $("#currentUserData").append("<tr><th>objectId</th><td><input type='text' style='width: 95%; color: #959595;' readonly='readonly'; value='" + objectId + "'/></tr>");
    $("#currentUserData").append("<tr><th>userName</th><td><input type='text' style='width: 95%; color: #959595;' readonly='readonly'; value='" + userName + "'/></tr>");
    $("#currentUserData").append("<tr><th>password</th><td><input type='text' style='width: 95%; color: #959595;' readonly='readonly'; value='(hidden)'/></tr>");
    $("#currentUserData").append("<tr><th>mailAddress</th><td><input type='text' style='width: 95%; color: #959595;' readonly='readonly'; value='" + mailAddress + "'/></tr>");
    $("#currentUserData").append("<tr><th>authData</th><td><input type='text' style='width: 95%; color: #959595;' readonly='readonly'; value='" + authData + "'/></tr>");
    $("#currentUserData").append("<tr><th>createDate</th><td><input type='text' style='width: 95%; color: #959595;' readonly='readonly'; value='" + createDate + "'/></tr>");
    // リストを更新
    $("#currentUserData").listview('refresh');
}

function onDeleteField() {
    // フィールドを空に
    $("#reg_mailAddress").val("");
}
}