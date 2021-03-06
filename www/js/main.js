window.onload = function(){
    /*全体共通のアクション*/
    //イベントを設定するタブバーのアイコンを読み出し
    var ele = document.getElementsByClassName("tab-bar__item");
    //[0](ハートicon)にイベントリスナーを設定
    ele[0].addEventListener("click", function(evt){
        //click処理
        document.location.href="index.html";
        //defaultのイベント禁止
        evt.preventDefault();
        //イベント伝達禁止
        evt.stopPropagation();
    }, false);
    //[1](ピープルicon)にイベントリスナーを設定
    ele[1].addEventListener("click", function(evt){
        //click処理
        document.location.href="sns.html";
        //defaultのイベント禁止
        evt.preventDefault();
        //イベント伝達禁止
        evt.stopPropagation();
    }, false);
    //[2](資料室ツール icon)にイベントリスナーを設定
    ele[2].addEventListener("click", function(evt){
        //click処理
        document.location.href="study.html";
        //defaultのイベント禁止
        evt.preventDefault();
        //イベント伝達禁止
        evt.stopPropagation();
    }, false);
    //[3](その他icon)にイベントリスナーを設定
    ele[3].addEventListener("click", function(evt){
        //click処理
        document.location.href="about.html";
        //defaultのイベント禁止
        evt.preventDefault();
        //イベント伝達禁止
        evt.stopPropagation();
    }, false);
};
