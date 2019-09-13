var Like = (function() {
    // 初期設定
    var Like = function(options) {
        if (typeof NCMB !== 'undefined') {
            this.ncmb = new NCMB(options.applicationKey, options.clientKey);
            // 保存先クラスを定義するところ
            this.LikeClass = this.ncmb.DataStore("like");
        }
        
        // 記事リストを指定するためのID
        this.listEl = "#contents";
        
        // アプリ＋端末を特定するためのuuidを取得
        this.uuid = getUuid();
        
        // お気に入りのOn/Offイベントの有効フラグ
        this.clickEnabled = true;
        
        // タップした時の処理を記述
        this.addClickHandler();
        
        // オプションが指定されている場合はその値で上書き
        if (options) {
            $.extend(this, options);
        }
    }
    
    // 全ての記事に対してお気に入り状況を反映させる
    Like.prototype.applyAll = function() {
        var self = this;
            $(this.listEl).children('ons-list-item').each(function(index) {
            var item = $(this);
            self.apply(item);
        });
    };
    
    // 一つの記事に対してお気に入り状態を反映させる
    Like.prototype.apply = function(item) {  
        // 変数の定義
        /// 自分自身
        var self = this;
        /// 記事番号
        var url = item.data('link');
        /// アイコン
        var icon = item.find('i');
        
        // お気に入り登録数を検索
        this.LikeClass
            .equalTo("url", url)
            .count()
            .fetchAll()
            .then(function(results){
                if (results.count > 0){
                    icon.text(results.count);
                } else {
                    icon.text("0");
                }
            })
            .catch(function(error){
                console.log(error.message);
                icon.text("0");
            });
            
        // 自分がお気に入り登録済みか調べる
        this.LikeClass
            .equalTo("url", url)
            .count()
            .fetchAll()
            .then(function (results){
                if (results.count > 0){
                    // 登録済みであれば★マークを黄色に
                    icon.addClass('fa-smile-o');
                    icon.removeClass('fa-frown-o');
                } else {
                    // 未登録の場合は★マークを黒に
                    icon.removeClass('fa-smile-o');
                    icon.addClass('fa-frown-o');
                }
            })
            .catch(function(error){
                console.log('own like check error: ' + error.message);
            });
    };
    
    // イベント処理を設定
    Like.prototype.addClickHandler = function() {
        var self = this;
        
        // 記事一覧の中のloveクラスに対してイベントを指定します。
        $(this.listEl).on('click', '.love', function(event) {
            // タップ設定が有効であれば処理を行います
            // これは二重処理の防止です
            console.log("Tapped!")
            if (self.clickEnabled == true) {
                // 一旦二重処理を防ぎます
                self.clickEnabled = false;
                
                // フラグは1秒後に立て直します
                setTimeout(function(){ self.clickEnabled = true; }, 1000);
                
                // 星マークのクラスで処理を判別します。
                if ($(this).hasClass('fa-frown-o')) {
                    // 空であればお気に入り未登録→お気に入り登録処理
                    self.add($(this).closest('ons-list-item'));
                } else {
                    // 塗りつぶされている場合はお気に入り登録済み→お気に入り解除処理
                    self.remove($(this).closest('ons-list-item'));
                }
            }            
            event.stopPropagation();
        });
    };

    // お気に入り登録処理
    Like.prototype.add = function(item) {
        var self = this;
        
        // タップしたデータのURLを取得
        var url = item.data('link');
        
        // 保存するオブジェクトを生成
        var like = new this.LikeClass();
        like
            .set("uuid", self.uuid)
            .set("url", url)
            // 保存したい値をセットし、保存
            .save()
            .then(function(like){
                // 保存が成功した場合
                self.apply(item);
            })
            .catch(function(error){
                // 保存が失敗した場合
                self.apply(item);
            });
    };

    // お気に入り解除処理
    Like.prototype.remove = function(item) {
        var self = this;
        var url = item.data('link');
        
        // uuidとurlの両方が合致するオブジェクトを検索し、見つけたものを削除する
        this.LikeClass
            .equalTo("uuid", self.uuid)
            .equalTo("url", url)
            .fetch() // 今回はcountではなくfetchを利用
            .then(function(like){
                // データが見つかった場合
                like.delete()
                .then(function(result){
                    // 削除処理が成功した場合
                    self.apply(item);
                })
                .catch(function(error){
                    // 削除処理が失敗したばあい
                    self.apply(item);
                });
            })
            .catch(function(error){
                // エラーがあった場合
                self.apply(item);
            });
    };
 
    // アプリ+端末を特定するためのuuidを取得
    // uuidはアプリアンインストールで削除されます
    var getUuid = function() {
        var uuid = localStorage.getItem('uuid');
        if (uuid === null) {
          // uuid未生成の場合は新規に作る
          var S4 = function(){
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
          };
          uuid = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
          localStorage.setItem('uuid', uuid);
        }
        return uuid;
    };
    return Like;
})();
