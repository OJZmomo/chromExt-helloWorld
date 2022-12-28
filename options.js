$(function (){
    chrome.storage.sync.get("limit",function (budget) {
        $('#limit').val(budget.limit);
    })

    $('#setLimit').click(function (){
        var limit = $('#limit').val();
        if (limit){
            chrome.storage.sync.set({'limit':limit},function (){
                close();
            })
        }
    })

    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total':0},function () {
            var notifyOptions = {
                type:'basic',
                title:'提示',
                iconUrl:'img/logo.png',
                message:'您消费的总金额已经清0'
            }
            chrome.notifications.create('limitNotify',notifyOptions);
        });
    })
})