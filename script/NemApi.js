/**
 *NemのAPIにアクセスするクラスです。
 *
 * @class NemApi
 */
class NemApi {

    constructor() {

    }

    /**
     *NemのAPIからデータを取得する
     *
     * @param {string} url リクエストを送信するURL
     * @param {string} type リクエストのタイプ('GET','POST')
     * @param {string} dataType 取得するデータの方('xml','html','script','json','jsonp',text)
     * @param {function} successCallBack 通信成功時のコールバック関数
     * @param {function} failedCallBack　通信失敗時のコールバック関数
     * @memberof NemApi
     */
    getData(url, type, dataType, successCallBack, failedCallBack) {

        $.ajax({
            url: url,
            type: type,
            dataType: dataType
        })
            .then(
                //通信成功時のコールバック
                function (data) {
                    successCallBack(data);
                },
                //通信失敗時のコールバック
                function (data) {
                    failedCallBack(data);
                }
            );
    }

}


