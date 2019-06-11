//イベントの登録
document.addEventListener('DOMContentLoaded', function () {
    //検索ボタンクリック時のイベント登録
    document.getElementById('search-btn').addEventListener('click', upDateResultTable, false);
})


function upDateResultTable() {
    let api = new NemApi();
    let inputNameSpace = $('#input-namespace').val();
    let sendUrl = 'http://222.230.111.179:7890/namespace?namespace=' + inputNameSpace;
    api.getData(
        sendUrl,
        'GET',
        'json',
        function (data) {
            $('#result-message').html('ネームペースはすでに使用されています');
            $('#result-item-1').html('fgn');
            $('#result-item-2').html('owner');
            $('#result-item-3').html('height');
            $('#result-value-1').html(data.fqn);
            $('#result-value-2').html(data.owner);
            $('#result-value-3').html(data.height);

        },
        function (data) {
            $('#result-message').html('ネームペースはあいてるかも・・・');
            $('#result-item-1').html('error');
            $('#result-item-2').html('message');
            $('#result-item-3').html('status');
            $('#result-value-1').html(data.responseJSON.error);
            $('#result-value-2').html(data.responseJSON.message);
            $('#result-value-3').html(data.responseJSON.status);
        })
}