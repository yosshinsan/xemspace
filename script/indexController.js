//検証クラス
let validator = new Validator();

//判定結果のDictionary
let Judgement = {
    OK : 1,
    NG : 2
}

//Font Awesomに登録されているアイコンのクラス
let okIconClass = 'far fa-thumbs-up';
let ngIconClass = 'far fa-sad-tear';
let warnIconClass = 'fas fa-exclamation-triangle';
let iconSizeClass = 'fa-3x';

//イベントの登録
document.addEventListener('DOMContentLoaded', function () {
    //検索ボタンクリック時のイベント登録
    document.getElementById('search-btn').addEventListener('click', searchButtonClick, false);
})

/**
 *検索ボタンクリック時の処理
 *
 */
function searchButtonClick(){
    //結果の表示をクリア
    clearResult();
    //検索文字の検証
    if(validateNemSpaceText()){
        //検証OKの場合は果の表示を更新
        upDateResult();
    }
}

/**
 *結果の表示をクリアする
 *
 */
function clearResult(){
    //結果アイコンをクリア
    $('#result-icon').removeClass(okIconClass);
    $('#result-icon').removeClass(ngIconClass);
    $('#result-icon').removeClass(warnIconClass);
    $('#result-icon').removeClass(iconSizeClass);
    //結果テキストをクリア
    $('#result-text').html('');
    //詳細テーブルをクリア
    $('#result-item-1').html('');
    $('#result-item-2').html('');
    $('#result-item-3').html('');
    $('#result-value-1').html('');
    $('#result-value-2').html('');
    $('#result-value-3').html('');
}

/**
 *ネームスペースの入力テキストを検証する
 *
 *@returns {boolean} true:検証OK,false:検証NG
 */
function validateNemSpaceText(){
    let validator = new Validator();
    let inputNameSpace = validator.escapeHtml($('#input-namespace').val());
    let messageEmpty = 'You can not use empty characters';
    let messageNumeric = 'The beginning of the string is not good for numbers';
    let messageZenkaku = 'You can not use full-width characters';
    let messageReserved = 'Contains reserved words (nem, user, account, org, com, biz, net, edu, mil, gov, info)';

    //空文字判定
    if(validator.isNullOrWhiteSpace(inputNameSpace)){
        $('#result-icon').addClass(warnIconClass);
        $('#result-icon').addClass(iconSizeClass);
        $('#result-text').html(messageEmpty);
        return false;
    }
    //先頭が数字か判定
    if(validator.isNumericFirstCharacter(inputNameSpace)){
        $('#result-icon').addClass(warnIconClass);
        $('#result-icon').addClass(iconSizeClass);
        $('#result-text').html(messageNumeric);
        return false;
    }
    //全角文字が含まれているか判定
    if(validator.isInculdeZenkakuCharacter(inputNameSpace)){
        $('#result-icon').addClass(warnIconClass);
        $('#result-icon').addClass(iconSizeClass);
        $('#result-text').html(messageZenkaku);
        return false;
    }
    //ネームスペースの予約語がふくまれているか判定
    if(validator.isNameSpacesReservedWord(inputNameSpace)){
        $('#result-icon').addClass(warnIconClass);
        $('#result-icon').addClass(iconSizeClass);
        $('#result-text').html(messageReserved);
        return false;
    }
    return true;
}

/**
 *結果を表示するアイコンを更新する
 *
 */
function upDateResultIcon(judgement){
    if(judgement === Judgement.OK){  
        $('#result-icon').removeClass(ngIconClass);
        $('#result-icon').removeClass(iconSizeClass);  
        $('#result-icon').addClass(okIconClass);
        $('#result-icon').addClass(iconSizeClass);
    }else{
        $('#result-icon').removeClass(okIconClass);
        $('#result-icon').removeClass(iconSizeClass);
        $('#result-icon').addClass(ngIconClass);
        $('#result-icon').addClass(iconSizeClass);  
    }
}

/**
 *結果を表示するテキストを更新する
 *
 */
function upDateResultText(judgement){
    let okText = 'Maybe the namespace is empty';
    let ngText = 'That namespace is probably not available';

    if(judgement === Judgement.OK){  
        $('#result-text').html(okText);
    }else{
        $('#result-text').html(ngText); 
    }
}

/**
 *表示する結果を更新する
 *
 */
function upDateResult() {  
    let api = new NemApi();
    let inputNameSpace = validator.escapeHtml($('#input-namespace').val());
    let sendUrl = 'http://222.230.111.179:7890/namespace?namespace=' + inputNameSpace;
    api.getData(
        sendUrl,
        'GET',
        'json',
        function (data) {
            upDateResultIcon(Judgement.NG);
            upDateResultText(Judgement.NG);
            $('#result-item-1').html('fgn');
            $('#result-item-2').html('owner');
            $('#result-item-3').html('height');
            $('#result-value-1').html(data.fqn);
            $('#result-value-2').html(data.owner);
            $('#result-value-3').html(data.height);

        },
        function (data) {
            upDateResultIcon(Judgement.OK);
            upDateResultText(Judgement.OK);
            $('#result-item-1').html('error');
            $('#result-item-2').html('message');
            $('#result-item-3').html('status');
            $('#result-value-1').html(data.responseJSON.error);
            $('#result-value-2').html(data.responseJSON.message);
            $('#result-value-3').html(data.responseJSON.status);
        })
}