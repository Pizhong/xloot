

$(function () {
      if(getCookie("token")){
            getUSDRMBRate();
      }else{
            showMsg(get_lan("noLoginShow"));
            panelShow(0);
      }
})


function showBalanceType(self,num) {
      $(".mat-button-toggle").removeClass('mat-button-toggle-checked');
      $(self).addClass('mat-button-toggle-checked');
      if(num == 0){
            getUSDRMBRate();
            $("#balanceDepositShow").show();
            $("#balanceWithdrawtShow").hide();
      }else{
            getTelnumber();
            $("#balanceDepositShow").hide();
            $("#balanceWithdrawtShow").show();
      }
      
}
