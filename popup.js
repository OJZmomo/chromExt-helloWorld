$(function (){
    //在第一次运行时，如果总金额为0，也不会留空，而是有值显示
    chrome.storage.sync.get(['total','limit'],function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });
    $('#add').click(function (budget){
        var totalAmount = 0;
        if(budget.total){
            totalAmount = parseFloat(budget.total);
        }
        //2、将本次金额加到总金额中
        var amount = $('#amount').val();
        if(amount){
            console.log(amount,totalAmount);
            totalAmount += parseFloat(amount);
            chrome.storage.sync.set({'total':totalAmount},function () {
                if (totalAmount>parseFloat(budget.limit)){
                    var notifyOptions = {
                        type:'basic',
                        title:'提示',
                        iconUrl:'img/logo.png',
                        message:'您消费的总金额已经超过限制'
                    }
                    chrome.notifications.create('limitNotify',notifyOptions);
                }
            });
        }
        //3、更新显示ui
        $('#total').text(totalAmount);
        $('#amount').val('');
    })
})