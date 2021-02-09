var loot = {};
var nodeIndex = 0;

var iostPendingStaus = true;
var iostSuccessStaus = true;
var prepareRechargeType;
var IWallet, target;
var bindTarget = "IOST";
var nftcontract = {
  "lootnftaxe11":{
    mid: 0,
    nftcontract: "lootnftaxe11",
    protocol: "UCAT"
  },
  "lootnftarrow":{
    mid: 0,
    nftcontract: "lootnftarrow",
    protocol: "UCAT"
  },
  "lootnfthamme":{
    mid: 0,
    nftcontract: "lootnfthamme",
    protocol: "UCAT"
  },
  "lootnftsickl":{
    mid: 0,
    nftcontract: "lootnftsickl",
    protocol: "UCAT"
  },
  "lootnftspear":{
    mid: 0,
    nftcontract: "lootnftspear",
    protocol: "UCAT"
  },
  "lootnftsword":{
    mid: 0,
    nftcontract: "lootnftsword",
    protocol: "UCAT"
  },
  "xlootndxbow1":{
    mid: 0,
    nftcontract: "xlootndxbow1",
    protocol: "UCAT"
  },
  "xlootshovel1":{
    mid: 0,
    nftcontract: "xlootshovel1",
    protocol: "UCAT"
  },
  "xpetartnftcc":{
    mid: 0,
    nftcontract: "xpetartnftcc",
    protocol: "UCAT"
  },
  "mhxpetgoldbr":{
    mid: 0,
    nftcontract: "mhxpetgoldbr",
    protocol: "UCAT"
  }



};
var nftcontractArray=[]
ScatterJS.plugins(new ScatterEOS());

var chainId, lootcontractName, network, xpetcontractName;

// const dexContractName = 'ContractHbqDdFkFoEoS3UnqvAM2XXukT2nJ6TYvySVoZDNdMKqi';
// const iostContractName = 'ContractAWD6RBwAXdvm6nnUtzuXU7q1dnFBxcF6rYMRhgozgTXK';
// xpetcontractName = "petxpetstore";
// lootcontractName = "loottokenspx";
// eosNFTcontractName = "xpetnftcore1";
// chainId = '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191';
// network = ScatterJS.Network.fromJson({
//   blockchain: 'eos',
//   host: 'api-kylin.eosasia.one',
//   protocol: 'https',
//   port: 443,
//   chainId: chainId
// })

//
var nftContractName, saleContractName , blindBoxContractName;

const API_ENDPOINTS2 = [
  'eospush.tokenpocket.pro',
  'eos.blockeden.cn',
  'eos.greymass.com',
  'nodes.get-scatter.com',
  // 'mainnet.meet.one',
  'api.eossweden.se',
  'api.eoslaomao.com',
];
function get_random_api2() {
  // const index = Math.floor(Math.random() * API_ENDPOINTS2.length);

  var index = getCookie("nodeIndex") || nodeIndex;
  // var node = 'https://'+API_ENDPOINTS2[index];
  var node = API_ENDPOINTS2[index];

  // var node = 'https://api-kylin.eosasia.one';
  // console.log(index,node);
  return node;
}
const dexContractName = 'xlootnftdex1';
const iostContractName = 'ContractBgWwzLsEb323Gt9cHb1aYVSzKepAQPuVVDHSsLRHSSBe';
xpetcontractName = "xpetpetstore";
lootcontractName = "loottokenspx";
eosNFTcontractName = "xpetnftcore1";
saleContractName = 'looreception';

chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';
network = ScatterJS.Network.fromJson({
  blockchain: 'eos',
  host: get_random_api2(),
  // host: 'nodes.eos42.io',https://mainnet.eoscannon.io
  protocol: 'https',
  port: 443,
  chainId: chainId
})

const API_ENDPOINTS = [
  'https://eospush.tokenpocket.pro',
  'https://eos.blockeden.cn',
  'https://eos.greymass.com',
  // 'https://mainnet.meet.one',
  'https://api.eossweden.se',
  'https://api.eoslaomao.com'

];

var isDev = true;
const EOS_CONFIG = {
  chainId: chainId, // 32 byte (64 char) hex string
  keyProvider: '', // WIF string or array of keys..
  httpEndpoint: network.protocol + '://' + get_random_api2(),
  mockTransactions: () => null, // or 'fail'
  expireInSeconds: 3600,
  broadcast: true,
  verbose: isDev,
  debug: isDev, // API and transactions
  sign: true
}

$(function() {
  if(!IsPC()){
    // getNavPanel();
  }
  $('#getCode').on('click', getCode);
  $('.c-exchangeMobileTabs__arrow').click();

  // $('#imgCodeBg').attr("src", "/api/imgcode.jpg?reqId=" + reqId);
  // $('#imgCodeBg').click(function() {
  //       reqId = getDateRandom();
  //       $('#imgCodeBg').attr("src", "/api/imgcode.jpg?reqId=" + reqId);
  // });
  if (getCookie("identity")) {
    $("#aId").val(getCookie("identity"));
  }
  if (getCookie("token")) {
    getUserMsg();
  } else {
    init();
  }


  
      $(".c-exchangeMobileTabs").addClass("c-exchangeMobileTabs--headerShow")

  $("body").on("click", ".c-exchangeMobileTabs__item", function() {


    return
    $(".c-exchangeMobileTabs__item").removeClass("c-exchangeMobileTabs__item--active");
    $(this).addClass("c-exchangeMobileTabs__item--active");
    if ($(this).attr("data-num") == "3") {
      // $(".c-exchange__side--user").hide();
      // $(".c-exchange__side--market").show();
      // getSaleMarket(0);
    } else if ($(this).attr("data-num") == "2") {
      $(".c-exchange__side--user").hide();
      $(".c-exchange__side--market").show();
      getSaleMarket(0);
    } else {
      $(".c-exchange__side--user").show();
      $(".c-exchange__side--market").hide();
      Navtab(Number($(this).attr("data-num")));
    }

  })
  $("body").on("click", ".c-exchangeHeader__menu", function() {

    $("#menuPanel").addClass("active");

    var html2 = '';
    if (getCookie("account")) {
      var account = getCookie("account");
     
        
      html2 += '<div class="c-sidebar__inner">';
      html2 += '  <div class="c-sidebar__user">';
      html2 += '    <div>';
      html2 += '      <div class="c-user__logo">';
      html2 += '        <figure class="c-user__figure">';
      html2 += '          <img class="c-user__img" alt="13553522743" src="images/userAvatar.jpg">';
      html2 += '        </figure>';
      html2 += '      </div>';
      html2 += '    </div>';
      html2 += '    <p class="c-sidebar__userText">' + account + '</p>';
      html2 += '  </div>';
      html2 += '</div>';



      html2 += '  <ul class="c-sidebar__list">';
      // html2 += '    <li class="c-sidebar__item" onclick="panelShow(\'Deposit\')">';
      // html2 += '      <i class="c-sidebar__icon o-icon">';
      // html2 += '        <img src="images/wallet.png" alt="" style="height:24px;">';
      // html2 += '      </i>';
      // html2 += '      <span class="c-sidebar__text" translate="">';
      // html2 += '        充值';
      // html2 += '      </span>';
      // html2 += '    </li>';
      // html2 += '    <li class="c-sidebar__item" onclick="panelShow(\'WithdrawCoin\')">';
      // html2 += '      <i class="c-sidebar__icon o-icon">';
      // html2 += '        <img src="images/withdraw.png" alt="" style="height:24px;">';
      // html2 += '      </i>';
      // html2 += '      <span class="c-sidebar__text" translate="">';
      // html2 += '        提现';
      // html2 += '      </span>';
      // html2 += '    </li>';
      // html2 += '    <li class="c-sidebar__item" onclick="getBankFlowLog(0)">';
      // html2 += '      <i class="c-sidebar__icon o-icon">';
      // html2 += '        <img src="images/Detail.png" alt="" style="height:24px;">';
      // html2 += '      </i>';
      // html2 += '      <span class="c-sidebar__text" translate="">';
      // html2 += '        银行流水';
      // html2 += '      </span>';
      // html2 += '    </li>';
      html2 += '    <li class="c-sidebar__item" onclick="getItemExchangeLog(0)">';
      html2 += '      <i class="c-sidebar__icon o-icon">';
      html2 += '        <img src="images/record.png" alt="" style="height:24px;">';
      html2 += '      </i>';
      html2 += '      <span class="c-sidebar__text" translate="">';
      html2 += '        ' + get_lan("transactionRecord") + '';
      html2 += '      </span>';
      html2 += '    </li>';

      if (getCookie("customerType") == "PC" || getCookie("customerType") == "WE_CHAT") {
        html2 += '    <li class="c-sidebar__item" onclick="panelShow(\'bindAccount\')">';
        html2 += '      <i class="c-sidebar__icon o-icon">';
        html2 += '        <img src="images/account.png" alt="" style="height:24px;">';
        html2 += '      </i>';
        html2 += '      <span class="c-sidebar__text" translate="">';
        html2 += '        ' + get_lan("bindAccount") + '';
        html2 += '      </span>';
        html2 += '    </li>';

      }
      html2 += '    <li class="c-sidebar__item" onclick="panelShow(\'about\')">';
      html2 += '      <i class="c-sidebar__icon o-icon">';
      html2 += '        <img src="images/aboutUs.png" alt="" style="height:24px;">';
      html2 += '      </i>';
      html2 += '      <span class="c-sidebar__text" translate="">';
      html2 += '        ' + get_lan("about") + '';
      html2 += '      </span>';
      html2 += '    </li>';
      html2 += '    <li class="c-sidebar__item" onclick="exit()">';
      html2 += '      <i class="c-sidebar__icon o-icon">';
      html2 += '        <img src="images/exit.png" alt="" style="height:24px;">';
      html2 += '      </i>';
      html2 += '      <span class="c-sidebar__text" translate="">';
      html2 += '        ' + get_lan("logOut") + '';
      html2 += '      </span>';
      html2 += '    </li>';
      html2 += '    <li class="c-sidebar__item" onclick="panelShow(\'nodePanel\')">';
      html2 += '      <i class="c-sidebar__icon o-icon">';
      html2 += '        <img src="images/lan.png" alt="" style="height:24px;">';
      html2 += '      </i>';
      html2 += '      <span class="c-sidebar__text" translate="">';
      html2 += '        ' + get_lan("setNode") + '';
      html2 += '      </span>';
      html2 += '    </li>';
      html2 += '  </ul>';
    } else {

      html2 += '  <div class="c-sidebar__login">';
      html2 += '    <div class="o-dmButton o-dmButton--green o-dmButton--fluid" onclick="eosLogin()">' + get_lan("login") + '</div>';
      // html2 += '    <div class="o-dmButton o-dmButton--blue o-dmButton--fluid" onclick="panelShow(1)">' + get_lan("signUp") + '</div>';
      html2 += '  </div>';
      html2 += '  <ul class="c-sidebar__list">';
      html2 += '    <li class="c-sidebar__item" onclick="panelShow(\'about\')">';
      html2 += '      <i class="c-sidebar__icon o-icon">';
      html2 += '        <img src="images/aboutUs.png" alt="" style="height:24px;">';
      html2 += '      </i>';
      html2 += '      <span class="c-sidebar__text" translate="">';
      html2 += '        ' + get_lan("about") + '';
      html2 += '      </span>';
      html2 += '    </li>';
      html2 += '  </ul>';

    }
    $("#menuPanel .c-sidebar__wrap").html(html2);

  })
  $("body").on("click", "#menuPanel", function() {

    $("#menuPanel").removeClass("active");
  })
  $("body").on("click", ".bindAccountBtn", function() {

    $(".bindAccountBtn").removeClass("active");
    $(this).addClass("active");
    bindTarget = $(this).attr("data-target");
    listMyAccountMapping();
  })

  

  connectEOS();
})
function get_random_api() {
  const index = Math.floor(Math.random() * API_ENDPOINTS.length);
  return API_ENDPOINTS[index];
}

function getUserToken(name){
  console.log(name);
  var api = get_random_api() ;
  $.post(api + "/v1/chain/get_currency_balance",'{"code":"eosio.token","symbol":"EOS","account":"'+ name +'"}',
  function(data,status){
    // var num = Number(parseFloat(data[0])).toFixed(8) || "0.00000000";
    var num = data[0] || "0.00000000";
    console.log(num);
    setCookie('eos',num)
  }, "json");
}





var amount = '';

function getUserMsg() {
  $.ajax({
    type: 'get',
    url: '/api/game/customers.do',
    dataType: "json",
    headers: {
      'Authorization': 'BASIC ' + getCookie("token")
    },
    success: function(data) {
      if (data.code == 401) {
        getToken();
        return;
      }
      if (data.success) {
        var html = '';
        var html2 = '';
        var html3 = '';
        var html4 = '';
        var obj = data.object;
        setCookie("customerType", obj.customerType);
        setCookie("telNumber", obj.telNumber);
        html += '<div class="c-navigationControls__balance ng-star-inserted" tabindex="0" data-analytics-id="navigation_balance">';
        html += '  <div class="c-dropdown">';
        html += '    <div class="c-dropdown__current">';
        html += '      <div class="c-dropdown__currentValue flex">';


        html += '       <div style="margin-right:10px;">';


        switch (getCookie("customerType")) {
          case "EOS":
            html += '        <svg t="1584014587957" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1499" width="28" height="28"><path d="M942.427421 234.839536a17.254917 17.254917 0 1 0-28.988261 18.715833 475.626037 475.626037 0 0 1 76.013661 258.559181c0 263.229511-214.145024 477.386038-477.386038 477.386038s-477.386038-214.156527-477.386038-477.386038 214.145024-477.386038 477.386038-477.386039a475.683553 475.683553 0 0 1 166.659492 29.908523 17.254917 17.254917 0 0 0 12.055436-32.335714 511.964892 511.964892 0 1 0 251.64571 202.538216z" fill="#ffffff" p-id="1500"></path><path d="M796.059711 128.365195a482.807533 482.807533 0 0 1 34.969965 28.562639 17.254917 17.254917 0 1 0 23.064073-25.663813c-11.963409-10.755565-24.571002-21.050999-37.47768-30.621726a17.256067 17.256067 0 1 0-20.556358 27.7229zM385.496215 534.22385L261.088263 751.647308l242.144003 144.12457-117.736051-361.548028zM257.614273 707.187138l117.402456-205.172466-42.32056-129.964036-75.081896 335.136502zM621.370931 503.65964l-108.671467-191.736638-110.385456 192.898469 110.523495 339.381212 108.533428-340.543043zM689.332298 373.074428l-40.721605 127.755406 116.447684 205.460049-75.726079-333.215455zM638.223233 533.407117L522.868361 895.35776l239.072628-143.664439L638.223233 533.407117zM673.423264 340.336099L525.514115 130.263235v153.361703l106.232773 187.457419 41.676376-130.746258zM500.413963 282.865722V129.29696L348.708732 340.175053l43.125789 132.448743 108.579442-189.758074z" fill="#ffffff" p-id="1501"></path></svg>';
            break;
          case "IOST":
            html += '        <svg t="1584015159513" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1857" width="24" height="24"><path d="M512.7 1022.5c-68.8 0-135.6-13.5-198.5-40.1-60.7-25.7-115.3-62.5-162.1-109.3C105.2 826.3 68.4 771.7 42.7 711c-26.6-62.9-40-129.7-40-198.5 0-68.8 13.5-135.6 40.1-198.5 25.7-60.7 62.5-115.3 109.3-162.1s101.3-83.7 162-109.4c62.9-26.6 129.7-40 198.6-40S648.3 16 711.2 42.6c60.7 25.7 115.3 62.5 162.1 109.3S956.9 253.3 982.6 314c26.6 62.9 40.1 129.7 40.1 198.5 0 68.8-13.5 135.6-40.1 198.5-25.7 60.7-62.5 115.3-109.3 162.1s-101.4 83.6-162.1 109.3c-62.9 26.6-129.7 40.1-198.5 40.1z m0-980c-259.2 0-470 210.8-470 470s210.8 470 470 470 470-210.8 470-470-210.9-470-470-470z" fill="#ffffff" p-id="1858"></path><path d="M520.2 193.3l286.5 165-61.5 48-225-132-160.4 100.5 88.5 59 52.7-30.9 62.7 34.9-43.5 36 54 37.4 45-28.4 58.5 28.8-45 31.1 198 105-304.5 183-332.9-186v-85.5L512 746.7l177.7-99.9-106.5-65.1-43.5 30-65.9-40.5 38.2-24-62.4-40-32.5 24.8-70.8-41.2 34.5-21.5-169.5-91.5z" fill="#ffffff" p-id="1859"></path></svg>';
            break;
          default:
            html += '        <svg t="1584015159513" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1857" width="24" height="24"><path d="M512.7 1022.5c-68.8 0-135.6-13.5-198.5-40.1-60.7-25.7-115.3-62.5-162.1-109.3C105.2 826.3 68.4 771.7 42.7 711c-26.6-62.9-40-129.7-40-198.5 0-68.8 13.5-135.6 40.1-198.5 25.7-60.7 62.5-115.3 109.3-162.1s101.3-83.7 162-109.4c62.9-26.6 129.7-40 198.6-40S648.3 16 711.2 42.6c60.7 25.7 115.3 62.5 162.1 109.3S956.9 253.3 982.6 314c26.6 62.9 40.1 129.7 40.1 198.5 0 68.8-13.5 135.6-40.1 198.5-25.7 60.7-62.5 115.3-109.3 162.1s-101.4 83.6-162.1 109.3c-62.9 26.6-129.7 40.1-198.5 40.1z m0-980c-259.2 0-470 210.8-470 470s210.8 470 470 470 470-210.8 470-470-210.9-470-470-470z" fill="#ffffff" p-id="1858"></path><path d="M520.2 193.3l286.5 165-61.5 48-225-132-160.4 100.5 88.5 59 52.7-30.9 62.7 34.9-43.5 36 54 37.4 45-28.4 58.5 28.8-45 31.1 198 105-304.5 183-332.9-186v-85.5L512 746.7l177.7-99.9-106.5-65.1-43.5 30-65.9-40.5 38.2-24-62.4-40-32.5 24.8-70.8-41.2 34.5-21.5-169.5-91.5z" fill="#ffffff" p-id="1859"></path></svg>';

            // html += '        <img src="images/loot.png" alt="" style="width:18px;height:18px;">';

        } // html += '        <dm-currency-icon class="c-dropdown__currencyIcon">';
        // html += '          <span class="o-currencies--USD"></span>';
        // html += '        </dm-currency-icon>';
        html += '       </div>';

        html2 += '        <span class="c-dropdown__currentTitle ng-star-inserted" id="lootMoney">';
        html2 += '          0.00';
        html2 += '        </span>';

        html4 += '        <span class="c-dropdown__currentTitle ng-star-inserted" id="phoneLootMoney">';
        html4 += '          0.00';
        html4 += '        </span>';

        html3 += '      </div>';
        html3 += '    </div>';
        html3 += '  </div>';
        html3 += '</div>';
        $("#panelMsg").html(html + html2 + html3);
        $("#phonePanelMsg").html(html + html4 + html3);
        amount = obj.decryptAccount;
        getLootNum();

      }
    },
    error: function(data) {
      //判断token是否有效
      if (data.code == 401) {
        getToken();
      }
    }
  });
}

function getNavPanel(){
  var active = 'active';
  var active1 = '1';
  var active2 = '2';
  var active3 = '3';
  if(window.location.pathname.indexOf("/dex.html") > -1){
    active2 = active;
  }else if(window.location.pathname.indexOf("/gold.html") > -1){
    active3 = active;
  }else{
    active1 = active;
  }
  console.log(active1,active2,active3)
  var html = '';
  html += '  <a href="index.html" class="mobileTabs__item '+ active1 +'">';
  html += '    <i class="c-exchangeMobileTabs__icon o-icon o-icon-market">';
  html += '      <img src="images/logo.png" alt="" style="height:100%;">';
  html += '    </i>';
  html += '    <strong class="c-exchangeMobileTabs__title">';
  html += '      <font style="text-transform: uppercase;">NFT资产</font>';
  html += '    </strong>';
  html += '  </a>';
  html += '  <a href="dex.html" class="mobileTabs__item '+ active2 +'">';
  html += '    <i class="c-exchangeMobileTabs__icon o-icon o-icon-market">';
  html += '      <img src="images/sale.png" alt="" style="height:100%;">';
  html += '    </i>';
  html += '    <strong class="c-exchangeMobileTabs__title">';
  html += '      <font style="text-transform: uppercase;">代币交易（IOST）</font>';
  html += '    </strong>';
  html += '  </a>';

  if(location.href.indexOf("xloot.io") == -1){
    html += '  <a href="gold.html" class="mobileTabs__item '+ active3 +'">';
    html += '    <i class="c-exchangeMobileTabs__icon o-icon o-icon-market">';
    html += '      <img src="images/sale.png" alt="" style="height:100%;">';
    html += '    </i>';
    html += '    <strong class="c-exchangeMobileTabs__title">';
    html += '      <font style="text-transform: uppercase;">金币 / 账号</font>';
    html += '    </strong>';
    html += '  </a>';
  }

                // <a href="index.html"></a>
  $(".c-exchangeMobileTabs__list").html(html)

}


function getDateRandom() {
  var n = 10000,
    m = 99999
  return Date.now() + parseInt(Math.random() * (n - m + 1) + m);
}

function register(this_but) {
  if (!$("#telNumber").val()) {
    alert(get_lan("input"));
    return false;
  }
  if (!$("#smscode").val()) {
    alert(get_lan("input2"));
    return false;
  }
  if (!$("#nps").val()) {
    alert(get_lan("input3"));
    return false;
  }

  if ($('#nps').val().length < 8) {
    alert(get_lan("input4"));
    return;
  }

  if ($("#nps").val() != $("#nps2").val()) {
    alert('密码不一致!');
    return false;
  }
  var thirdTag = getURLPara('thirdTag');
  $.ajax({
    type: 'POST',
    url: '/api/regByTel.do',
    dataType: 'json',
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    data: {
      nickName: $("#telNumber").val(),
      tel: $("#telNumber").val(),
      pwd: $("#nps").val(),
      code: $("#smscode").val(),
      aId: $("#aId").val() || 0,
      thirdTag: thirdTag
    },
    success: function(data) {

      if (data.code == 200) {
        alert(get_lan("input5"));
        setTimeout(function() {
          window.location.href = "index.html";
        }, 2000);
      } else {
        alert(data.message);
      }
    },
    error: function(data) {
      //判断token是否有效
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });
}


function getCode() {
  telNumber = $('#telNumber').val();
  if (telNumber.length != 11) {
    alert(get_lan("input6"));
    return;
  }
  $('#getCode').off('click');
  var opt = {
    countTime: 120,
    getContent: "获取验证码",
    reGetContent: "重新获取",
    sC: '#000',
    eC: '#fff',
    obj: $('#getCode'),
    callback: getCode
  };
  $.ajax({
    type: 'GET',
    url: '/api/codes.do',
    dataType: "json",
    data: {
      reason: 'LOOT_REGISTER',
      telNumber: telNumber,
      // imgcode:img_code,
      // reqId : reqId,
    },
    success: function(data) {
      console.log(data);
      if (data.success == false) {
        alert(data.message);
        $('#getCode').text("获取验证码");
        $('#getCode').on('click', getCode);
        return;
      }
      // $('#getCode').text(get_lan("forgetPasswordMsg4"));
      countSixty(opt);
      code = data.object;
      $('#getCode').text(data.message);
    },
    error: function(data) {
      //判断token是否有效
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });
}

function getCode2() {
  telNumber = $('#telNumber').val();
  if (telNumber.length != 11) {
    alert(get_lan("input6"));
    return;
  }
  $('#getCode').off('click');
  var opt = {
    countTime: 120,
    getContent: "获取验证码",
    reGetContent: "重新获取",
    sC: '#000',
    eC: '#fff',
    obj: $('#getCode'),
    callback: getCode2
  };
  $.ajax({
    type: 'GET',
    url: '/api/lootcodes.do',
    dataType: "json",
    data: {
      reason: 'LOOT_OP',
      telNumber: telNumber,
      // imgcode:img_code,
      // reqId : reqId,
    },
    success: function(data) {
      console.log(data);
      if (data.success == false) {
        alert(data.message);
        $('#getCode').text("获取验证码");
        $('#getCode').on('click', getCode2);
        return;
      }
      // $('#getCode').text(get_lan("forgetPasswordMsg4"));
      countSixty(opt);
      code = data.object;
      $('#getCode').text(data.message);
    },
    error: function(data) {
      //判断token是否有效
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });
}


function KYCSubmit() {
  if (getCookie("token")) {
    var selfData = {};
    if (getCookie("customerType") == "EOS") {
      if (!$("#telNumber").val()) {
        alert(get_lan("input"));
        return false;
      }
      if (!$("#smscode").val()) {
        alert(get_lan("input2"));
        return false;
      }
    }

    if (!$("#name").val()) {
      alert(get_lan("input8"));
      return false;
    }

    // if(getCookie("customerType") == "EOS"){

    //   selfData = {
    //     telNumber: $("#telNumber").val(),
    //     code: $("#smscode").val(),
    //     realName: $("#name").val()
    //   }
    // }else{
    //   selfData = {
    //     realName: $("#name").val()
    //   }
    // }
    $.ajax({
      type: 'POST',
      url: '/api/KYC.do',
      dataType: 'json',
      headers: {
        'Authorization': "BASIC " + getCookie("token")
      },
      data: {
        telNumber: $("#telNumber").val() || '',
        code: $("#smscode").val() || '',
        realName: $("#name").val()
      },
      success: function(data) {

        if (data.code == 200) {
          KYC = data.object;
          setTimeout(function() {
            panelShow('recharge');
          }, 1000);
        } else {
          KYC = '';
          alert(data.message);
        }
      },
      error: function(data) {
        if (data.status == 401) {
          alert(data.message);
        }
      }
    });
  }

}

function withdrawSubmit() {
  if (getCookie("token")) {
    var selfData = {};
    if (!$("#withdrawNum").val()) {
      // alert(get_lan("input"));
      alert("请输入提现金额");
      return false;
    }

    // if (!$("#telNumber").val()) {
    //   alert(get_lan("input"));
    //   return false;
    // }
    if (!$("#smscode").val()) {
      alert(get_lan("input2"));
      return false;
    }


    if (!$("#account").val()) {
      alert(get_lan("input9"));
      return false;
    }

    $.ajax({
      type: 'POST',
      url: '/api/withdrawal.do',
      dataType: 'json',
      headers: {
        'Authorization': "BASIC " + getCookie("token")
      },
      data: {
        paymentType: paymentType,
        amount: $("#withdrawNum").val() || '',
        code: $("#smscode").val() || '',
        account: $("#account").val()
      },
      success: function(data) {

        if (data.code == 200) {
          if (getCookie("customerType") == "EOS") {
            var obj = data.object;

            $("#withdrawalBtn").attr("disabled", "true");
            $("#withdrawNum").val(obj.amount).attr("disabled", "true");
            $("#getCode").attr("disabled", "true");
            $("#account").attr("disabled", "true");
            $(".payImg").attr("onclick", "").removeClass("active");
            if (obj.paymentType == "PAYPAL") {
              $(".payImg").eq(0).addClass("active");
            } else {
              $(".payImg").eq(1).addClass("active");
            }
            orderMsg = obj;
            getLootPay();
          } else {
            showMsg("提现申请成功，请等待客服处理");
            $('.cdk-overlay-container').hide();
          }

          // panelShow('withdraw');
        } else {
          alert(data.message);
        }
      },
      error: function(data) {
        if (data.status == 401) {
          alert(data.message);
        }
      }
    });
  }

}

function countSixty(opt) {
  var def = {
    countTime: 60,
    getContent: '免费获取验证码',
    reGetContent: '重新发送',
    sC: '#000',
    eC: 'red',
    callback: function() {
      console.log('callback');
    }
  };
  var opt = $.extend(def, opt);
  var countdown = opt.countTime,
    getContent = opt.getContent,
    reGetContent = opt.reGetContent,
    obj = opt.obj;
  var isRun = 1;
  settime(obj);

  function settime(val) {
    if (countdown == 0) {
      // val.css('color', opt.eC);
      val.removeAttr('disabled');
      val.text(getContent);
      val.on('click', opt.callback);
      if (isRun) {
        countdown = opt.countTime;
      } else {
        return;
      }
    } else {
      /*val.attr('disabled', true);*/
      val.prop('disabled', true);
      // val.css('color', opt.sC);
      val.text(reGetContent + "(" + countdown + ")");
      countdown--;
      isRun = 0;
    }
    setTimeout(function() {
      settime(val)
    }, 1000);
  }
}

function eosLogin() {
  checkScatter(function(name) {
    pubKeySign(name);
  })
}

function iostLoginShow() {
  checkIWallet(function(name) {
    IOSTBeforeAuth(name);
  });
}

function getScatter() {
  if (window.scatter) {
    loot.scatter = window.scatter;
  }
  return loot.scatter;
}

function checkScatter(fun) {
  var scatter = getScatter();
  if (scatter) {
    if (scatter.identity) {
      // console.log(scatter.identity);
      const user = loot.scatter.identity.accounts.find(account => account.blockchain === 'eos');
      if (user.publicKey) {
        loot.publicKey = user.publicKey
      }
      loot.bomber = user.name;
      // fun(user.name);
      fun(user)
    } else {
      const requiredFields = {
        accounts: [network]
      };
      if (scatter.getIdentity) {
        scatter.getIdentity(requiredFields).then(identity => {
          var user = '';
          if (getCookie("customerType") == 'BOS' || getCookie("blockchain") == 'BOS') {
            user = identity.accounts.find(account => account.blockchain === 'bos');
          } else {
            user = identity.accounts.find(account => account.blockchain === 'eos');
          }
          if (user.publicKey) {
            loot.publicKey = user.publicKey
          }
          if (isMYKEY()) {
            loot.publicKey = identity.publicKey;
          }
          loot.bomber = user.name;
          fun(user);
        }).catch(error => {
          eosErrorShow(error);
        });
      } else {
        showMsg("请打开scatter");
      }
    }
  } else {
    noScatterShow();
  }
}

function checkIWallet(fun) {
  IWallet = window.IWalletJS;
  if (IWallet) {
    if (IWallet.account) {
      if (typeof(IWallet.account) == 'string') {
        fun(IWallet.account);
      } else {
        if (IWallet.account.name) {
          fun(IWallet.account.name);
        } else {
          showMsg("你的IWallet钱包已锁定，请解锁IWallet再操作");
        }
      }
    } else {
      IWalletJS.enable().then((account) => {
        if (account) {
          fun(account);
        } else {
          showMsg("你的IWallet钱包已锁定，请解锁IWallet再操作");
        }
      })
    }
  } else {
    showMsg("你还没有IWallet插件钱包，请下载IWallet再操作");
  }
}

function isMYKEY() {
  return navigator.userAgent.indexOf("MYKEY") > -1;
}

function noScatterShow() {
  alert("没有")
}

function pubKeySign(eosName) {
  if (loot.publicKey) {
    eosSign(eosName);
  } else {
    const scatter = getScatter();
    const eos = loot.scatter.eos(network, Eos);
    eos.getAccount(eosName).then(data => {
      const pubKey = data.permissions[0].required_auth.keys[0].key;
      loot.publicKey = pubKey;
      eosSign(eosName);
      console.log(111111);
    });
  }

}

function eosSign(eosName) {

  console.log(eosName);
  if(!isNaN(eosName.name)){
    showMsg("请选择不是全数字的eos账号登录LOOTDEX")
    return
  }
  if(getCookie("account") == ''){
    setCookie("account",eosName.name);
    setTimeout(()=>{
      window.location.reload();
    },1000)
    // window.location.reload();
  }else{
    setCookie("account",eosName.name);
    
  }
  $('#panelMsg #my-login').show()
  $('#phonePanelMsg #my-login').show()

  getUserToken(eosName.name);
  

  
}


// function eosSign(eosName) {

//   var pubKey = loot.publicKey;
//   const scatter = getScatter();
//   const whatfor = "Login";
//   const account = eosName;
//   const isHash = false;
//   scatter.getArbitrarySignature(pubKey, eosName, whatfor, isHash).then(signature => {
//     // alert("pubKey, eosName, whatfor, isHash:",pubKey, eosName, whatfor, isHash)
//     // setInvitor(eosName);
//     eosSignLogin(eosName, signature);
//   }).catch(error => {
//     console.log("error:", error);
//     alert(error.message);
//   });
//   // eosSignLogin(eosName,"signature");
//   // setInvitor(eosName);
// }

function eosSignLogin(eosName, sign) {
  var pubKey = loot.publicKey;
  var url = '/api/xpet/eosReg.do';
  if (getCookie("customerType") == 'BOS' || getCookie("blockchain") == 'BOS') {
    url = '/api/xpet/bosReg.do';
  }
  
  var selfData = {
      eosAccount:eosName,
      pubKey:pubKey,
      sign:sign,
      agentId:getCookie("identity") || 0
  }
  if(isMYKEY()){
    selfData = {
      eosAccount:eosName,
      pubKey:pubKey,
      sign:sign,
      agentId:getCookie("identity") || 0,
      isMykey:true
    }
  }

  $.ajax({
    type: 'post',
    url: url,
    data: selfData,
    dataType: 'json',
    success: function(data) {
      if (data.code == 200) {
        var token = data.object;
        var units = token.split(".");
        var jwt_payload = JSON.parse($d.decodeBase64Url(units[1]));
        var time_cookie = (jwt_payload.exp - jwt_payload.iat) / 3600000;
        setCookie('token', token, time_cookie / 24);
        setCookie('eos', true);
        if (getCookie("customerType") == 'BOS' || getCookie("blockchain") == 'BOS') {
          console.log("customerType = BOS");
          setCookie("customerType", "BOS");
        } else {
          console.log("customerType = EOS");
          setCookie("customerType", "EOS");
        }
        setCookie('eosAccount', eosName);
        var date_obj = new Date();
        setTimeout(function() {
          // window.location.href = "breed.html";
          window.location.reload(true);
        }, 500);
      } else {
        alert(data.message);
      }
    },
    error: function(data) {
      //判断token是否有效
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });
}


function IOSTBeforeAuth(name) {
  // alert("IOSTBeforeAuth");
  $.ajax({
    type: 'get',
    url: '/api/IOSTBeforeAuth.do',
    data: {
      account: name
    },
    dataType: 'json',
    success: function(data) {
      if (data.code == 200) {
        var obj = data.object;
        iostSignature(obj.code);
      } else {
        showMsg(data.message);
      }
    },
    error: function(data) {
      //判断token是否有效
      if (data.status == 401) {
        showMsg(data.message);
      }
    }
  });
}

function IOSTBeforeAuth2(name) {
  $.ajax({
      type: 'get',
      url: '/api/IOSTBeforeAuth.do',
      data:{
          account:name
      },
      dataType: 'json',
      success: function(data) {
          if (data.code == 200) {
            var obj = data.object;
            iostSignature2(obj.code);
          }else{
            showMsg(data.message);
          }
      },
      error: function(data) {
          //判断token是否有效
          if (data.status == 401) {
              showMsg(data.message);
          }
      }
  });
}

function iostSignature(code) {
  // alert("iostSignature");
  $("#showLoading").show();
  IWalletJS.enable().then((account) => {
    if (account) {
      // alert("account:"+account);
      var iost = IWalletJS.newIOST(IOST);
      var tx = iost.callABI(iostContractName, "signature", [code]);
      tx.addApprove('iost', '0.0001');
      iost.signAndSend(tx).on('pending', (pending) => {
        // alert("pending:"+JSON.stringify(pending));status_code
        getTxReceipt(pending, function(data) {
          iostLogin(account);
          $("#showLoading").hide();
        })
        // console.log(pending, 'pending')
      }).on('success', (result) => {
        if (iostSuccessStaus == true) {

          iostSuccessGo(result, function() {
            iostLogin(account);
            $("#loadingBox").hide();
            $("#showLoading").hide();
            iostPendingStaus = false;

          })

        }
        // alert("result:"+JSON.stringify(result));
        // iostLogin(account);
        // console.log(result,'result')
      }).on('failed', (failed) => {
        $("#showLoading").hide(); // console.log("failed:"+JSON.stringify(failed));
        // showMsg(JSON.stringify(failed));
      })
    } else {
      showMsg('not login')
    }
  })
}

function iostLogin(account) {
  $.ajax({
    type: 'post',
    url: '/api/iostAuth.do',
    data: {
      account: account,
      agentId: getCookie("identity") || 0
    },
    dataType: 'json',
    success: function(data) {
      if (data.code == 200) {
        var token = data.object;
        var units = token.split(".");
        var jwt_payload = JSON.parse($d.decodeBase64Url(units[1]));
        var time_cookie = (jwt_payload.exp - jwt_payload.iat) / 3600000;
        // setCookie('eos', true);
        setCookie('account', account);
        setCookie("customerType", "IOST");
        setCookie('token', token, time_cookie / 24);
        var date_obj = new Date();
        setTimeout(function() {
          window.location.reload(true);
        }, 500);
      } else {
        alert(data.message);
      }
    },
    error: function(data) {
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });
}

function getTxReceipt(txId, fun) {
  // showLoadingMsg(get_lan("loading"));
  iostPendingStaus = true;
  iostSuccessStaus = true;
  var url = '/api/iost/getTxReceipt.do';
  $.ajax({
    type: 'get',
    url: url,
    data: {
      txId: txId
    },
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      $("#showLoading").hide();
      if (iostPendingStaus == true) {
        // $("#loadingBox").hide();
        if (data.status_code) {
          if (data.status_code == "SUCCESS") {

            console.log("SUCCESS:", JSON.stringify(data))
            var result = data.returns;
            if (result) {
              if (String(result[0]).indexOf("IOST_") > -1) {
                fun(data);
                return
              }

              var obj = JSON.parse(JSON.parse(result[0]));

              if (obj.success) {
                fun(data);
              } else {

                if (obj.message) {
                  showMsg(obj.message);
                }
              }
            } else {
              fun(data);
            }
          } else {
            console.log("failed:" + JSON.stringify(data));
            showMsg(data.message);
          }
        } else {
          showMsg("网络错误");
        }
        console.log("pending", data);
        iostSuccessStaus = false;
      }


    },
    error: function(data) {
      $("#showLoading").hide();
      $("#loadingBox").hide();
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });
}


function iostSuccessGo(data, fun) {
  if (data.status_code) {
    if (data.status_code == "SUCCESS") {

      // var obj = JSON.parse(JSON.parse(result.returns[0]));
      console.log("result:", data)
      var result = data.returns;
      if (result) {
        if (String(result[0]).indexOf("IOST_") > -1) {
          fun(data);
          return
        }

        var obj = JSON.parse(JSON.parse(result[0]));

        if (obj.success) {
          fun(data);
        } else {
          if (obj.message) {
            showMsg(obj.message);
          }

        }
      } else {
        fun(data);
      }
    } else {
      console.log("failed:" + JSON.parse(data));
      showMsg(JSON.stringify(data));
    }
  } else {
    showMsg("网络错误");
  }
}


function connectEOS() {
  if (window.ScatterJS) {
    ScatterJS.connect(lootcontractName, {
      network
    }).then(connected => {
      console.log("connected", connected)
      if (!connected) return false;
      // if(getCookie("token")) getLootNum();
      // ScatterJS.someMethod();
    });
    loot.scatter = window.ScatterJS.scatter;
    window.ScatterJS = null;
  }
}

function showMsg(content) {
  if ($('#msg').length == 0) {
    var str = '<div id="msg" class="msgCon hide">' +
      '<p class="msg">--</p>' +
      '</div>';
    $('body').append(str);
  }
  $(".msg").html(content);
  $("#msg").removeClass('hide').show();
  setTimeout('$("#msg").fadeOut()', 1500);
}

function exit() {
  setCookie("token", '');
  setCookie("id", '');
  setCookie('eos', false);
  setCookie("account",'');
  setCookie('eos','')

  if(getCookie("customerType") == "IOST" || getCookie("customerType") == "PC"){
    setCookie('account', '');
  }else{
    if(loot){
      if(loot.scatter){
          loot.scatter.forgetIdentity();
      }
    }
    setCookie('eosAccount', '');
  }

  setCookie('customerType','');
  window.location.reload();
}

function setLanguage(lan) {
  setCookie('lan', lan);
  window.location.href = window.location.href;
}

function eosErrorShow(error) {
  if (error) {
    if (error.isError) {
      if (error.code == 423) {
        showMsg(error.message);
      } else {
        alert(error.message);
      }
    } else {
      var obj = JSON.stringify(error);
      if (obj.indexOf("{")) {
        obj = JSON.parse(error);
        if (obj.code) {
          if (obj.code == 500 && obj.error.code == 3050003) {
            alert(obj.error.details[0].message);
            // alert(error);
          } else {
            showMsg(obj.error.details[0].message);
            // showMsg(error);
          }
        } else {
          showMsg(error);
        }
      } else {
        showMsg(obj);
      }
      console.log("error:", error);
    }
  }
}

function getLootNum() {
  // // var contant = 'eosio.token';
  // // var contantName = 'EOS';
  // var contant = lootcontractName;
  // var contantName = 'LOOT';
  // var name = getCookie("eosAccount");
  // var eos = loot.scatter.eos(network, Eos, EOS_CONFIG, 'https');
  // eos.getCurrencyBalance(contant, name,contantName).then(res => {
  //     console.log("res:",res,res[0])
  //     if (res[0]) {
  //       $("#lootMoney").html(String(res[0]).split(" ")[0]);
  //     }
  // }).catch(error => {
  //   // eosErrorShow(error);
  //     console.log(error);
  // })


  // var url = '/api/getLootBalance.do';
  var url = '/api/getBalance.do';
  $.ajax({
    type: 'get',
    url: url,
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.code == 200) {
        var obj = data.object;
        if (obj || obj == 0) {
          $("#lootMoney").html(obj);
          $("#phoneLootMoney").html(obj);

          $("#myBalanceMoneyShow").html(obj);
        }

      } else {
        alert(data.message);
      }
    },
    error: function(data) {
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });

}

function buyGoShow() {

  // if(itemMsg.lock == true){
  //   showMsg("该资产已锁定，不能购买");
  //   return
  // }
  // $("#buyShopMoneyShow").html(itemMsg.salePrice);
  $("#buyShopOkShow").show();
  $("#buyShopOkAction").attr('onclick','buyNftOk()');
}

// function buyGo() {

//   checkLogin(function() {
//     var price, bankMoney, assetType;
//     price = String(itemMsg.salePrice).split(' ')[0];
//     if(getCookie("customerType") == 'EOS'){
//       if(itemMsg.assetType == "EOSNFT"){
//         bankMoney = Number(String($("#lootMoney").html()).split(' ')[0]);
//         assetType = "EOS";
//       }else{
//         bankMoney = 0;
//       }
//     }else{
//       assetType = "IOST";
//       if(itemMsg.assetType == "IOSTNFT"){
//         bankMoney = Number(String($("#lootMoney").html()).split(' ')[0]);
//       }else{
//         bankMoney = 0;
//       }
//     }

//     if(bankMoney >= price){
//       $("#showLoading").show();
//       var selfData = {
//             assetId:itemId,
//             categoryId:gameType,
//             price:price,
//             assetType:assetType,
//             contractId: nftContractId
//       }
//       buyAsset(selfData,function (data) {
//         console.log("saleData:",data);
//         var obj = data.object;

//         buyDo();
//         function buyDo() {

//           $("#showLoading").hide();
//           showMsg("购买成功！");
//           $('.cdk-overlay-container').hide();
//           $("#buyShopOkShow").hide();
//           $('#saleItemId_'+itemId).remove();
//           getLootNum();


//         }
//       })
//     }else if (getCookie("customerType") == 'EOS') {
//       // price = Number(shopPrice).toFixed(4) + " EOS";
//       checkScatter(function(name) {
//         $("#showLoading").show();
//         var selfData = {
//           assetId: itemId,
//           categoryId: gameType,
//           price: price,
//           assetType: getCookie("customerType"),
//           contractId: nftContractId
//         }
//         buyAsset(selfData, function(data) {
//           console.log("saleData:", data);
//           var obj = data.object;

//           buyDo(name);

//           function buyDo(name) {

//             $("#showLoading").show();

//             // const account = name;
//             // const scatter = getScatter();
//             // const eos = loot.scatter.eos(network, Eos);


//             prepareResource(function(cpuName) {
//               var authorization;
//               const eos = loot.scatter.eos(network, Eos);
//               const account = name;
//               if (cpuName == '') {
//                 authorization = [{
//                   actor: account,
//                   permission: "active"
//                 }]
//               } else {
//                 authorization = [{
//                   actor: cpuName,
//                   permission: "active"
//                 }, {
//                   actor: account,
//                   permission: "active"
//                 }]
//               }

//               eos.transaction({
//                 actions: [{
//                   account: obj.contract,
//                   name: obj.functionName,
//                   authorization: authorization,
//                   data: obj.params
//                 }]
//               }).then(res => {
//                 $("#showLoading").hide();
//                 showMsg("购买成功！");
//                 $('.cdk-overlay-container').hide();
//                 $("#buyShopOkShow").hide();
//                 recycleResource();
//                 $('#saleItemId_' + itemId).remove();


//                 // setTimeout(function () {
//                 //   if($(".c-exchangeTabs__item").eq(0).hasClass("c-exchangeTabs__item--active") == true){
//                 //     getMyItem(0);
//                 //   }else{
//                 //     getMySaleItem(0); 
//                 //   }
//                 //   getSaleMarket(0);
//                 // },1000)

//               }).catch(e => {
//                 $("#showLoading").hide();
//                 console.log("error:", e);
//                 eosErrorShow(e);
//               });
//             })


//           }
//         })
//       })
//     } else if (getCookie("customerType") == 'IOST') {
//       checkIWallet(function(name) {
//         $("#showLoading").show();
//         var selfData = {
//           assetId: itemId,
//           categoryId: gameType,
//           price: price,
//           assetType: getCookie("customerType"),
//           contractId: nftContractId
//         }
//         buyAsset(selfData, function(data) {
//           console.log("saleData:", data);
//           var obj = data.object;

//           buyDo(name);

//           function buyDo(name) {

//             $("#showLoading").show();

//             var price = obj.params.price;
//             var sn = obj.params.sn;

//             var iost = IWalletJS.newIOST(IOST);
//             var tx = iost.callABI(obj.contract, obj.functionName, [price, sn]);
//             tx.addApprove('iost', price);
//             iost.signAndSend(tx).on('pending', (pending) => {
//               getTxReceipt(pending, function(data) {

//                 $("#showLoading").hide();
//                 showMsg("购买成功！");
//                 $('.cdk-overlay-container').hide();
//                 $("#buyShopOkShow").hide();
//                 $('#saleItemId_' + itemId).remove();

//               })
//             }).on('success', (result) => {
//               if (iostSuccessStaus == true) {

//                 iostSuccessGo(result, function() {
//                   $("#showLoading").hide();
//                   showMsg("购买成功！");
//                   $('.cdk-overlay-container').hide();
//                   $("#buyShopOkShow").hide();
//                   $('#saleItemId_' + itemId).remove();
//                   iostPendingStaus = false;


//                 })

//               }
//             }).on('failed', (failed) => {
//               $("#showLoading").hide()
//             })



//           }
//         })
//       });
//     }
//     // else{
//     //   $("#showLoading").show();
//     //   price = itemMsg.price;


//     //   var url = '/api/buyItem.do';
//     //   $.ajax({
//     //         type: 'get',
//     //         url: url,
//     //         data: {
//     //               itemId:itemId
//     //         },
//     //         headers: {
//     //               'Authorization': "BASIC " + getCookie("token")
//     //         },
//     //         dataType: 'json',
//     //         success: function(data) {
//     //               $("#showLoading").hide();
//     //               if (data.code == 200) {
//     //                     showMsg("购买成功！");
//     //                     $('.cdk-overlay-container').hide();
//     //                     $('#saleItemId_'+playID).remove();
//     //                     // setTimeout(function () {
//     //                     //   if($(".c-exchangeTabs__item").eq(0).hasClass("c-exchangeTabs__item--active") == true){
//     //                     //     getMyItem(0);
//     //                     //   }else{
//     //                     //     getMySaleItem(0);
//     //                     //   }
//     //                     //   getSaleMarket(0);
//     //                     // },1000)
//     //               } else {
//     //                     alert(data.message);
//     //               }
//     //         },
//     //         error: function(data) {
//     //               $("#showLoading").hide();
//     //               if (data.status == 401) {
//     //                     alert(data.message);
//     //               }
//     //         }
//     //   });

//     // }

//   })
// }


function buyGo() {

  checkLogin(function() {
    var price, assetType;
    price = String(itemMsg.salePrice).split(' ')[0];

    if (getCookie("customerType") == 'EOS') {
      
      if (itemMsg.assetType == "EOSNFT") {
        bankMoney = Number(String($("#lootMoney").html()).split(' ')[0]);
      } else {
        bankMoney = 0;
      }
    } else {
      if (itemMsg.assetType == "IOSTNFT") {
        bankMoney = Number(String($("#lootMoney").html()).split(' ')[0]);
      } else {
        bankMoney = 0;
      }
    }
    if(itemMsg.assetType == "EOSNFT"){
      assetType = "EOS";
    }else if(itemMsg.assetType == "IOSTNFT"){
      assetType = "IOST";
    }else{
      assetType = "IOST";
    }
    var selfData = {
      assetId: itemId,
      categoryId: gameType,
      price: price,
      assetType: assetType,
      contractId: nftContractId
    }

    buyAsset(selfData, function(data) {
      $("#showLoading").show();
      console.log("saleData:", data);
      var obj = data.object;
      if (obj.autoComplete == true) {

        $("#showLoading").hide();
        showMsg("购买成功！");
        $('.cdk-overlay-container').hide();
        $("#buyShopOkShow").hide();
        $('#saleItemId_' + itemId).remove();
        getLootNum();

      } else {
        // if (bankMoney < price) {
        if (getCookie("customerType") == "EOS" || getCookie("customerType") == "IOST") {

          if (obj.chainType == "EOS") {


            checkScatter(function(name) {


              buyDo(name);

              function buyDo(name) {

                $("#showLoading").show();
                prepareResource(function(cpuName) {
                  var authorization;
                  const eos = loot.scatter.eos(network, Eos);
                  const account = name;
                  if (cpuName == '') {
                    authorization = [{
                      actor: account,
                      permission: "active"
                    }]
                  } else {
                    authorization = [{
                      actor: cpuName,
                      permission: "active"
                    }, {
                      actor: account,
                      permission: "active"
                    }]
                  }

                  eos.transaction({
                    actions: [{
                      account: obj.contract,
                      name: obj.functionName,
                      authorization: authorization,
                      data: obj.params
                    }]
                  }).then(res => {
                    $("#showLoading").hide();
                    showMsg("购买成功！");
                    $('.cdk-overlay-container').hide();
                    $("#buyShopOkShow").hide();
                    recycleResource();
                    $('#saleItemId_' + itemId).remove();


                    // setTimeout(function () {
                    //   if($(".c-exchangeTabs__item").eq(0).hasClass("c-exchangeTabs__item--active") == true){
                    //     getMyItem(0);
                    //   }else{
                    //     getMySaleItem(0); 
                    //   }
                    //   getSaleMarket(0);
                    // },1000)

                  }).catch(e => {
                    $("#showLoading").hide();
                    console.log("error:", e);
                    eosErrorShow(e);
                  });
                })


              }

            })
          } else if (obj.chainType == "IOST") {


            checkIWallet(function(name) {


              buyDo(name);

              function buyDo(name) {

                $("#showLoading").show();

                var price = obj.params.price;
                var sn = obj.params.sn;

                var iost = IWalletJS.newIOST(IOST);
                var tx = iost.callABI(obj.contract, obj.functionName, [price, sn]);
                tx.addApprove('iost', price);
                iost.signAndSend(tx).on('pending', (pending) => {
                  getTxReceipt(pending, function(data) {

                    $("#showLoading").hide();
                    showMsg("购买成功！");
                    $('.cdk-overlay-container').hide();
                    $("#buyShopOkShow").hide();
                    $('#saleItemId_' + itemId).remove();

                  })
                }).on('success', (result) => {
                  if (iostSuccessStaus == true) {

                    iostSuccessGo(result, function() {
                      $("#showLoading").hide();
                      showMsg("购买成功！");
                      $('.cdk-overlay-container').hide();
                      $("#buyShopOkShow").hide();
                      $('#saleItemId_' + itemId).remove();
                      iostPendingStaus = false;


                    })

                  }
                }).on('failed', (failed) => {
                  $("#showLoading").hide()
                })



              }

            });

          } else {

          }
        } else {

          showMsg("余额不足");
          $("#showLoading").hide();
        }
        // }
      }
    })



  })
}

function transferAssetShow() {
  if(itemMsg.lock == true){
    showMsg("该资产已锁定，不能转账");
    return
  }
  $("#transferAmount").val('');
  $("#transferMemo").val('');
  $("#transferAssetOKShow").show();
}


function transferAssetGo() {

  checkLogin(function() {
    var price, bankMoney, assetType;
    price = String(itemMsg.salePrice).split(' ')[0];

    var selfData = {
      assetId: itemId,
      categoryId: gameType,
      to: $("#transferAmount").val(),
      memo: '',
      contractId: nftContractId
    }
    if ($("#transferMemo").val()) {
      selfData.memo = $("#transferMemo").val();
    }

    if ($("#transferAmount").val() == '') {
      showMsg("请输入要转账的账号");
      return
    }
    if (getCookie("customerType") == 'EOS') {
      // price = Number(shopPrice).toFixed(4) + " EOS";
      checkScatter(function(name) {
        $("#showLoading").show();

        transferAsset(selfData, function(data) {
          console.log("saleData:", data);
          var obj = data.object;

          transferAssetDo(name);

          function transferAssetDo(name) {


            $("#showLoading").show();
            prepareResource(function(cpuName) {
              var authorization;
              const eos = loot.scatter.eos(network, Eos);
              const account = name;
              if (cpuName == '') {
                authorization = [{
                  actor: account,
                  permission: "active"
                }]
              } else {
                authorization = [{
                  actor: cpuName,
                  permission: "active"
                }, {
                  actor: account,
                  permission: "active"
                }]
              }

              // alert("资源信息："+JSON.stringify(authorization));
              eos.transaction({
                actions: [{
                  account: obj.contract,
                  name: obj.functionName,
                  authorization: authorization,
                  data: obj.params
                }]
              }).then(res => {
                showMsg("转账成功！");
                $('#myItemId_' + itemId).remove();
                $("#showLoading").hide();
                recycleResource();
                $('.cdk-overlay-container').hide();
                $('#transferAssetOKShow').hide();
                setTimeout(function() {
                  getMyItem(0);
                }, 10000)

              }).catch(e => {
                $("#showLoading").hide();
                console.log("error:", e);
                eosErrorShow(e);

                // alert("错误信息："+JSON.stringify(e));
              });
            })



          }
        })
      })
    } else if (getCookie("customerType") == 'IOST') {
      checkIWallet(function(name) {
        $("#showLoading").show();
        transferAsset(selfData, function(data) {
          console.log("saleData:", data);
          var obj = data.object;

          transferAssetDo(name);

          function transferAssetDo(name) {
            $("#showLoading").show();
            var id = Number(obj.params.id);
            var from = obj.params.from;
            var to = obj.params.to;
            var amount = obj.params.amount;
            var memo = obj.params.memo;
            var iost = IWalletJS.newIOST(IOST);
            var tx = iost.callABI(obj.contract, obj.functionName, [id, from, to, amount, memo]);

            tx.addApprove('iost', '0.0001');
            iost.signAndSend(tx).on('pending', (pending) => {
              getTxReceipt(pending, function(data) {
                showMsg("转账成功！");
                $('#myItemId_' + itemId).remove();
                $("#showLoading").hide();
                $('#transferAssetOKShow').hide()
                $('.cdk-overlay-container').hide();
                setTimeout(function() {
                  getMyItem(0);
                }, 10000)
              })
            }).on('success', (result) => {
              if (iostSuccessStaus == true) {

                iostSuccessGo(result, function() {
                  showMsg("转账成功！");
                  $('#myItemId_' + itemId).remove();
                  $("#showLoading").hide();
                  $('#transferAssetOKShow').hide()
                  $('.cdk-overlay-container').hide();
                  setTimeout(function() {
                    getMyItem(0);
                  }, 10000)
                  iostPendingStaus = false;


                })

              }
            }).on('failed', (failed) => {$("#showLoading").hide();})



          }
        })
      });
    } else if (getCookie("customerType") == 'PC') {

      transferAsset(selfData, function(data) {
        var obj = data.object;
        if(obj.autoComplete == true){
          showMsg("转账成功！");
          $('#myItemId_' + itemId).remove();
          $("#showLoading").hide();
          $('#transferAssetOKShow').hide()
          $('.cdk-overlay-container').hide();
          setTimeout(function() {
            getMyItem(0);
          }, 10000)
        }else{
          showMsg("转账失败！");
        }
        
      })
      
    } else {
      showMsg("暂不支持");
    }
  })
}

function transferAsset(selfData, fun) {
  // alert("转账信息："+JSON.stringify(selfData));
  var url = '/api/transferAsset.do';
  $.ajax({
    type: 'POST',
    url: url,
    data: selfData,
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      $("#showLoading").hide();
      if (data.code == 200) {
        fun(data);
      } else {
        alert(data.message);
      }
    },
    error: function(data) {
      $("#showLoading").hide();
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });

}


function migrateAssetShow() {
  if(itemMsg.lock == true){
    showMsg("该资产已锁定，不能转账");
    return
  }
  if (getCookie("customerType") == 'IOST') {
    target = "EOS";
  } else {
    target = "IOST";
  }
  var style = 'padding:14px;color: #82817d;line-height: normal;border-radius: 5px;margin-right: 18px;display: inline-block;border: 1px solid #82817d;cursor: pointer; color: #fff;border: 1px solid #3495f9;background: #3495f9;';
  var html = '<span style="' + style + '">' + target + '</span>';

  $("#migrateBlockchainGround").html(html);

  $("#migrateAmount").val('');
  // $("#transferMemo").val('');
  $("#migrateOKShow").show();
}


function migrateAssetGo() {

  checkLogin(function() {
    var price, bankMoney, assetType;
    price = String(itemMsg.salePrice).split(' ')[0];

    if ($("#migrateAmount").val() == '') {
      showMsg("请输入要转账的账号");
      return
    }
    if (getCookie("customerType") == 'EOS') {
      // price = Number(shopPrice).toFixed(4) + " EOS";
      checkScatter(function(name) {
        $("#showLoading").show();
        var selfData = {
          assetId: itemId,
          categoryId: gameType,
          account: $("#migrateAmount").val(),
          target: target,
          contractId: nftContractId
        }
        migrateAsset(selfData, function(data) {
          console.log("saleData:", data);
          var obj = data.object;

          migrateAssetDo(name);

          function migrateAssetDo(name) {


            $("#showLoading").show();
            prepareResource(function(cpuName) {
              var authorization;
              const eos = loot.scatter.eos(network, Eos);
              const account = name;
              if (cpuName == '') {
                authorization = [{
                  actor: account,
                  permission: "active"
                }]
              } else {
                authorization = [{
                  actor: cpuName,
                  permission: "active"
                }, {
                  actor: account,
                  permission: "active"
                }]
              }

              eos.transaction({
                actions: [{
                  account: obj.contract,
                  name: obj.functionName,
                  authorization: authorization,
                  data: obj.params
                }]
              }).then(res => {
                showMsg("转链成功！");
                $('#myItemId_' + itemId).remove();
                $("#showLoading").hide();
                recycleResource();
                $('.cdk-overlay-container').hide();
                $('#migrateOKShow').hide();
                setTimeout(function() {
                  getMyItem(0);
                }, 10000)

              }).catch(e => {
                $("#showLoading").hide();
                console.log("error:", e);
                eosErrorShow(e);
              });
            })



          }
        })
      })
    } else if (getCookie("customerType") == 'IOST') {
      checkIWallet(function(name) {
        $("#showLoading").show();
        var selfData = {
          assetId: itemId,
          categoryId: gameType,
          account: $("#migrateAmount").val(),
          target: target,
          contractId: nftContractId
        }
        migrateAsset(selfData, function(data) {
          console.log("saleData:", data);
          var obj = data.object;

          migrateAssetDo(name);

          function migrateAssetDo(name) {
            $("#showLoading").show();
            var id = Number(obj.params.id);
            var target = obj.params.target;
            var account = obj.params.account;


            var iost = IWalletJS.newIOST(IOST);
            var tx = iost.callABI(obj.contract, obj.functionName, [id, target, account]);

            tx.addApprove('iost', '0.0001');
            iost.signAndSend(tx).on('pending', (pending) => {
              getTxReceipt(pending, function(data) {
                showMsg("转链成功！");
                $('#myItemId_' + itemId).remove();
                $("#showLoading").hide();
                $('#migrateOKShow').hide()
                $('.cdk-overlay-container').hide();
                setTimeout(function() {
                  getMyItem(0);
                }, 10000)
              })
            }).on('success', (result) => {
              if (iostSuccessStaus == true) {
                iostSuccessGo(result, function() {
                  showMsg("转链成功！");
                  $('#myItemId_' + itemId).remove();
                  $("#showLoading").hide();
                  $('#migrateOKShow').hide()
                  $('.cdk-overlay-container').hide();
                  setTimeout(function() {
                    getMyItem(0);
                  }, 10000)

                })
                iostPendingStaus = false;
              }
            }).on('failed', (failed) => {$("#showLoading").hide();})



          }
        })
      });
    }
  })
}

function migrateAsset(selfData, fun) {

  var url = '/api/migrate.do';
  $.ajax({
    type: 'POST',
    url: url,
    data: selfData,
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      $("#showLoading").hide();
      if (data.code == 200) {
        fun(data);
      } else {
        alert(data.message);
      }
    },
    error: function(data) {
      $("#showLoading").hide();
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });

}



function buyAsset(selfData, fun) {

  var url = '/api/buyAsset.do';
  $.ajax({
    type: 'POST',
    url: url,
    data: selfData,
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      $("#showLoading").hide();
      if (data.code == 200) {
        fun(data);
        // showMsg("上架成功！");
      } else {
        alert(data.message);
      }
    },
    error: function(data) {
      $("#showLoading").hide();
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });

}

function saleGo() {
  if(itemMsg.lock == true){
    showMsg("该资产已锁定，不能出售");
    return
  }
  if ($("#lootNum").val() == '') {
    showMsg("请输入出售金额");
    return
  }
  if (itemMsg.itemCount > 1) {
    if ($("#lootOnsaleNum").val() == '') {
      showMsg("请输入出售数量");
      return
    }
  }

  // $("#showLoading").show();
  shopPrice = Number($("#lootNum").val());
  var price;
  var playID = itemId;
  var assetType = "";
  switch (itemMsg.assetType){
    case "IOSTNFT":
      assetType = "IOST";
      break;
    case "EOSNFT":
      assetType = "EOS";
      break;
    default :
      assetType = "IOST";
  }

  price = Number(shopPrice).toFixed(4);
  var selfData = {
    assetId: itemId,
    categoryId: myGameType,
    price: price,
    assetType: assetType,
    contractId: nftContractId
  }
  if (getCookie("customerType") == 'EOS') {

    checkScatter(function(name) {

      saleAsset(selfData, function(data) {
        console.log("saleData:", data);
        var obj = data.object;

        saleDo(name);

        function saleDo(name) {

          $("#showLoading").show();
          prepareResource(function(cpuName) {
            var authorization;
            const eos = loot.scatter.eos(network, Eos);
            const account = name;
            if (cpuName == '') {
              authorization = [{
                actor: account,
                permission: "active"
              }]
            } else {
              authorization = [{
                actor: cpuName,
                permission: "active"
              }, {
                actor: account,
                permission: "active"
              }]
            }

            eos.transaction({
              actions: [{
                account: obj.contract,
                name: obj.functionName,
                authorization: authorization,
                data: obj.params
              }]
            }).then(res => {
              console.log("res:", res);
              showMsg("上架成功！");
              $('#myItemId_' + itemId).remove();
              $("#showLoading").hide();
              recycleResource();
              $('.cdk-overlay-container').hide();
              setTimeout(function() {
                getMyItem(0);
              }, 10000)

            }).catch(e => {
              $("#showLoading").hide();
              console.log("error:", e);
              eosErrorShow(e);
            });
          })



        }
      })
    })

    // saleAsset(selfData,function (data) {
    //   console.log("saleData:",data);
    //   // var scatter = getScatter();
    //   // var obj = data.object;
    //   // if (scatter) {
    //   //     if (scatter.identity) {
    //   //         console.log(scatter.identity);
    //   //         const user = loot.scatter.identity.accounts.find(account => account.blockchain === 'eos');
    //   //         loot.bomber = user.name;
    //   //         saleDo(loot.bomber, price, playID);
    //   //     } else {
    //   //         const requiredFields = {
    //   //             accounts: [network]
    //   //         };
    //   //         scatter.getIdentity(requiredFields).then(identity => {
    //   //             console.log(identity);
    //   //             const user = identity.accounts.find(account => account.blockchain === 'eos');
    //   //             loot.bomber = user.name;
    //   //             saleDo(loot.bomber, price, playID);
    //   //         }).catch(error => {
    //   //             eosErrorShow(error);
    //   //         });
    //   //     }
    //   // } else {
    //   //     noScatterShow();
    //   // }
    //   checkScatter(function (name) {
    //       saleDo(name);
    //   })
    //   function saleDo(name) {

    //       $("#showLoading").show();
    //       const account = name;
    //       const scatter = getScatter();
    //       const eos = loot.scatter.eos(network, Eos);
    //       // const memo = "BUY-" + playID;
    //       // console.log("memo:", memo);
    //       eos.transaction({
    //           actions: [{
    //               account: obj.contract,
    //               name: obj.functionName,
    //               authorization: [{
    //                   actor: obj.fromUser, //发件人
    //                   permission: "active"
    //               }],
    //               data: obj.params


    //           }]
    //       }).then(res => {
    //           console.log("res:", res);
    //           showMsg("上架成功！");
    //           $("#showLoading").hide();
    //           $('.cdk-overlay-container').hide();
    //           setTimeout(function () {
    //             getMyItem(0);
    //           },1000)

    //       }).catch(e => {
    //           $("#showLoading").hide();
    //           console.log("error:", e);
    //           eosErrorShow(e);
    //       });
    //   }

    // })
  } else if (getCookie("customerType") == 'IOST') {
    checkIWallet(function(name) {
      saleAsset(selfData, function(data) {
        console.log("saleData:", data);
        var obj = data.object;


        saleDo(name);

        function saleDo(name) {
          $("#showLoading").show();
          var id = Number(obj.params.id);
          var from = obj.params.from;
          var to = obj.params.to;
          var amount = obj.params.amount;
          var memo = obj.params.memo;

          // var id = 13417;
          // var from = "lootcounter";
          // var to = "lootcounter";
          // var amount = "lootcounter";
          // var memo = "SALE-100.0000 IOST";

          var iost = IWalletJS.newIOST(IOST);
          var tx = iost.callABI(obj.contract, obj.functionName, [id, from, to, amount, memo]);
          tx.addApprove('iost', '0.0001');
          iost.signAndSend(tx).on('pending', (pending) => {
            getTxReceipt(pending, function(data) {
              showMsg("上架成功！");
              $('#myItemId_' + itemId).remove();
              $("#showLoading").hide();
              $('.cdk-overlay-container').hide();
              setTimeout(function() {
                getMyItem(0);
              }, 10000)
            })
          }).on('success', (result) => {
            if (iostSuccessStaus == true) {

              iostSuccessGo(result, function() {
                showMsg("上架成功！");
                $('#myItemId_' + itemId).remove();
                $("#showLoading").hide();
                $('.cdk-overlay-container').hide();
                setTimeout(function() {
                  getMyItem(0);
                }, 10000)
                iostPendingStaus = false;


              })

            }
          }).on('failed', (failed) => {$("#showLoading").hide();})


        }
      })
    });
  } else if (getCookie("customerType") == 'PC') {
    $("#showLoading").show();
    saleAsset(selfData, function(data) {
      var obj = data.object;
      if(obj.autoComplete == true){
        showMsg("上架成功！");
        $('#myItemId_' + itemId).remove();
        $("#showLoading").hide();
        $('.cdk-overlay-container').hide();
      }else{
        showMsg("上架失败！");
        $("#showLoading").hide();
      }
      
    })
    
  } else {
    showMsg("暂不支持");
  }

  // }else{


  // var url = '/api/saleItem.do';
  // $.ajax({
  //       type: 'POST',
  //       url: url,
  //       data: {
  //             itemId:playID,
  //             count:$("#lootOnsaleNum").val() || 1,
  //             price:Number(shopPrice).toFixed(4)
  //       },
  //       headers: {
  //             'Authorization': "BASIC " + getCookie("token")
  //       },
  //       dataType: 'json',
  //       success: function(data) {
  //             $("#showLoading").hide();
  //             if (data.code == 200) {
  //                   showMsg("上架成功！");
  //                   $('.cdk-overlay-container').hide();
  //                   $('#myItemId_'+playID).remove();
  //                   // setTimeout(function () {
  //                   //   getMyItem(0);
  //                   //   getSaleMarket(0);
  //                   // },1000)
  //             } else {
  //                   alert(data.message);
  //             }
  //       },
  //       error: function(data) {
  //             $("#showLoading").hide();
  //             if (data.status == 401) {
  //                   alert(data.message);
  //             }
  //       }
  // });


  // }


}



function saleAsset(selfData, fun) {

  var url = '/api/saleAsset.do';
  $.ajax({
    type: 'POST',
    url: url,
    data: selfData,
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      // $("#showLoading").hide();
      if (data.code == 200) {
        fun(data);
        // showMsg("上架成功！");
      } else {
        alert(data.message);
      }
    },
    error: function(data) {
      // $("#showLoading").hide();
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });

}



function unsaleGo() {
  $("#showLoading").show();
  var selfData = {
    assetId: itemId,
    categoryId: myGameType,
    contractId: nftContractId
  }
  UnSaleAsset(selfData, function(data) {
    showMsg("下架成功！");
    $('.cdk-overlay-container').hide();
    setTimeout(function() {
      getMySaleItem(0);
    }, 1000)

  })

}


function UnSaleAsset(selfData, fun) {

  var url = '/api/UnSaleAsset.do';
  $.ajax({
    type: 'POST',
    url: url,
    data: selfData,
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      $("#showLoading").hide();
      if (data.code == 200) {
        fun(data);
      } else {
        alert(data.message);
      }
    },
    error: function(data) {
      $("#showLoading").hide();
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });

}


function prepareResource(fun) {
  var url = '/api/prepareResource.do';
  $.ajax({
    type: 'post',
    url: url,
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.code == 200) {
        fun(data.object);
        console.log(data.object)
      } else {
        alert(data.message);
      }
    },
    error: function(data) {
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });
}

function recycleResource() {
  var url = '/api/recycleResource.do';
  $.ajax({
    type: 'post',
    url: url,
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.code == 200) {
        console.log(data.object)
      } else {
        alert(data.message);
      }
    },
    error: function(data) {
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });
}



//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
//例子：
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}



//写入cookie函数
function setCookie(name, value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//获取cookie
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
//清除cookie  
function delCookie(name) {
  setCookie(name, "", -1);
}
//获取URL的参数
function getURLPara(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}


function unsaleLandXpcShow(id) {
  itemId = id;
  $("#unsaleLandXpcShow").show();
}


function getItemMsg(type) {
  var PROP_AP = "propAP";
  var PROP_MAP = "propMAP";
  var PROP_DEF = "propDEF";
  var PROP_MDEF = "propMDEF";
  var PROP_STR = "propSTR";
  var PROP_INT = "propINT";
  var PROP_AGI = "propAGI";
  var PROP_VIT = "propVIT";
  var PROP_CRI = "propCRI";
  var PROP_MCRI = "propMCRI";
  var PROP_SPEED = "propSPEED";
  var PROP_DODGE = "propDODGE";
  var PROP_HIT = "propHIT";
  var PROP_LUCK = "propLUCK";
  var PROP_MHIT = "propMHIT";
  var PROP_MDODGE = "propMDODGE";

  var ARMOBREAK = "ARMOBREAK"; //破甲
  var MAGICBREAK = "MAGICBREAK"; //屠魔
  var BURNING = "BURNING"; //铬印
  var WEAKNESS = "WEAKNESS"; //弱化
  var LISTLESSNESS = "LISTLESSNESS"; //凋零
  var STUMRESIST = "STUMRESIST"; //抗晕         -- 装备被动
  var FREEZERESIST = "FREEZERESIST"; //抗凝结       -- 装备被动
  var REMANA = "REMANA"; //回魔
  var SPEEDUP = "SPEEDUP"; //加速
  var SLOW = "SLOW"; //减速
  var ENCOURAGE = "ENCOURAGE"; //振奋
  var ROUSE = "ROUSE"; //唤醒
  var MANABURN = "MANABURN"; //燃魔

  //type = 0, 主要属性， type=1 次要属性,   type=3 特殊属性, 
  var PROP_LIST = [{
      key: PROP_AP,
      name: "物理伤害",
      type: 0
    }, {
      key: PROP_MAP,
      name: "法术伤害",
      type: 0
    }, {
      key: PROP_DEF,
      name: "物理防御",
      type: 0
    }, {
      key: PROP_MDEF,
      name: "法术防御",
      type: 0
    },

    {
      key: PROP_STR,
      name: "力量",
      type: 1
    }, {
      key: PROP_INT,
      name: "智力",
      type: 1
    }, {
      key: PROP_AGI,
      name: "敏捷",
      type: 1
    }, {
      key: PROP_VIT,
      name: "耐力",
      type: 1
    }, {
      key: PROP_CRI,
      name: "物理爆击",
      type: 1
    }, {
      key: PROP_MCRI,
      name: "法术爆击",
      type: 1
    }, {
      key: PROP_SPEED,
      name: "速度",
      type: 1
    }, {
      key: PROP_DODGE,
      name: "闪避",
      type: 1
    }, {
      key: PROP_HIT,
      name: "命中",
      type: 1
    }, {
      key: PROP_LUCK,
      name: "幸运",
      type: 1
    }, {
      key: PROP_MHIT,
      name: "法术穿透",
      type: 1
    }, {
      key: PROP_MDODGE,
      name: "法术回避",
      type: 1
    },

    {
      key: ARMOBREAK,
      name: "破甲",
      type: 2,
      msg: "物理攻击/法术攻击时命中对方时",
      msg2: "机率减少对方(",
      msg3: "* 攻击者敏捷数值)物理防御效果，持续2回合",
      // description: "特效：[破甲] 物理攻击/法术攻击时命中对方时 {0} 机率减少对方( {1} * 攻击者敏捷数值)物理防御效果，持续2回合"
    }, {
      key: MAGICBREAK,
      name: "屠魔",
      type: 2,
      msg: "物理攻击/法术攻击时命中对方时有",
      msg2: "机率减少对方( ",
      msg3: "* 攻击者智力数值） 法术防御效果，持续2回合",
      description: "特效：[屠魔] 物理攻击/法术攻击时命中对方时有 {0} 机率减少对方 （ {1} * 攻击者智力数值） 法术防御效果，持续2回合"
    }, {
      key: BURNING,
      name: "铬印",
      type: 2,
      msg: "法术攻击时命中对方时有",
      msg2: "机率造成对方持续伤害效果5回合，效能为： ",
      msg3: "法术伤害",
      description: "特效：[铬印] 法术攻击时命中对方时有 {0} 机率造成对方持续伤害效果5回合，效能为：{1} * 法术伤害"
    }, {
      key: WEAKNESS,
      name: "弱化",
      type: 2,
      msg: "物理攻击/法术攻击时命中对方时有",
      msg2: "机率弱化对方物理攻击力",
      msg3: "，持续2回合",
      description: "特效：[弱化] 物理攻击/法术攻击时命中对方时有 {0} 机率弱化对方物理攻击力 {1}，持续2回合",
    }, {
      key: LISTLESSNESS,
      name: "凋零",
      type: 2,
      msg: "物理攻击/法术攻击命命中对方时有",
      msg2: "机率弱化对方法术攻击力",
      msg3: "，持续2回合",
      description: " 特效：[凋零] 物理攻击/法术攻击命命中对方时有 {0} 机率弱化对方法术攻击力 {1}，持续2回合"
    }, {
      key: STUMRESIST,
      name: "抗晕",
      type: 2,
      msg: "所有晕迷类控制技能的抗性增加",
      msg2: "",
      msg3: "",
      description: "特效：[抗晕] 所有晕迷类控制技能的抗性增加{0}",
    }, {
      key: FREEZERESIST,
      name: "抗凝结",
      type: 2,
      msg: "所有凝结类控制技能的抗性增加",
      msg2: "",
      msg3: "",
      description: "特效：[抗凝结] 所有凝结类控制技能的抗性增加{0}",
    }, {
      key: REMANA,
      name: "回魔",
      type: 2,
      msg: "物理攻击/法术攻击/施法时命中有",
      msg2: "机率恢复自身智力",
      msg3: "法力",
      description: "特效：[回魔] 物理攻击/法术攻击/施法时命中有 {0} 机率恢复自身智力 {1} 法力",
    }, {
      key: SPEEDUP,
      name: "加速",
      type: 2,
      msg: "物理攻击/法术攻击命中有",
      msg2: "机率增加自身速度",
      msg3: "，持续2回合",
      description: "特效：[加速] 物理攻击/法术攻击命中有 {0} 机率增加自身速度 {1}，持续2回合",
    }, {
      key: SLOW,
      name: "减速",
      type: 2,
      msg: "物理攻击/法术攻击命中有",
      msg2: "机率减低目标速度",
      msg3: "，持续2回合",
      description: "特效：[减速] 物理攻击/法术攻击命中有 {0} 机率减低目标速度 {1}，持续2回合",
    }, {
      key: ENCOURAGE,
      name: "振奋",
      type: 2,
      msg: "物理攻击/法术攻击命中有",
      msg2: "机率增加自身物理攻击",
      msg3: "，持续2回合",
      description: "特效：[振奋] 物理攻击/法术攻击命中有 {0} 机率增加自身物理攻击 {1}，持续2回合",
    }, {
      key: ROUSE,
      name: "唤醒",
      type: 2,
      msg: "物理攻击/法术攻击命中有",
      msg2: "机率增加自身法术攻击",
      msg3: "，持续2回合",
      description: "特效：[唤醒] 物理攻击/法术攻击命中有 {0} 机率增加自身法术攻击 {1}，持续2回合",
    }, {
      key: MANABURN,
      name: "燃魔",
      type: 2,
      msg: "物理攻击/法术攻击命中有",
      msg2: "机率减少目标魔法值，效果为自身(敏捷/智力最高值) *",
      msg3: "",
      description: "特效：[燃魔] 物理攻击/法术攻击命中有 {0} 机率减少目标魔法值，效果为自身(敏捷/智力最高值) * {1} "
    },
  ];

  for (var i = 0; i < PROP_LIST.length; i++) {
    if (type == PROP_LIST[i].key) {
      return PROP_LIST[i];
      break;
    }
  }

  // var obj = {};
  // switch (type){
  //   case "jk":
  //     obj = {
  //       type:2,
  //       name:"sjkjksj"
  //     }
  //     return obj
  //     break;
  // }
}

window.addEventListener('neoline.ready', () => {
  // console.log("shjhjshjj")
  const neoline = new NEOLine.Init();
  // neoline.getAccount().then(account => console.log(account))
});


function getCurrencyNameShow(tag) {
  switch (tag) {
    case 'CNY':
      return '￥';
      break;
    case 'USD':
      return '$';
      break;
  }
}


function getSpeed(num) {
  switch (String(num)) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "FASTEST":
      return "极快"; //get_lan("getSpeed");
      break;
    case "4":
    case "5":
    case "6":
    case "7":
    case "FAST":
      return "快速"; //;
      break;
    case "8":
    case "9":
    case "10":
    case "11":
    case "MID":
      return "中速"; //;
      break;
    case "12":
    case "13":
    case "14":
    case "15":
    case "SLOW":
      return "慢速"; //;
      break;
  }
}

function getRace(name) {
  switch (name) {
    case "FISH":
      return "水族";
      break;
    case "SPRIT":
      return "精灵族";
      break;
    case "BEAST":
      return "兽族";
      break;
    case "BIRD":
      return "鸟族";
      break;
  }
}


function prepareRecharge() {
  var prepareRechargeType = getCookie("customerType");
  if ($("#prepareRechargeAmount").val() == '') {
    showMsg("请输入你要充值的数量");
    return
  } else {

    if (prepareRechargeType == "EOS") {
      if ($("#prepareRechargeAmount").val() < 1) {
        showMsg("EOS至少充 1 EOS");
        return
      }
      if ($("#prepareRechargeAmount").val() > 1000) {
        showMsg("EOS最多充 1000 EOS");
        return
      }

    } else if (prepareRechargeType == "IOST") {
      if ($("#prepareRechargeAmount").val() < 100) {
        showMsg("IOST至少充 100 IOST");
        return
      }
      if ($("#prepareRechargeAmount").val() > 10000) {
        showMsg("IOST最多充 10000 IOST");
        return
      }
    } else {
      showMsg("暂时没开通充值");
      return
    }
  }
  var updatePrice = Math.floor($("#prepareRechargeAmount").val()).toFixed(4);
  $("#prepareRechargeAmount").val(updatePrice);
  $.ajax({
    type: 'post',
    url: '/api/prepareRecharge.do',
    data: {
      assetType: prepareRechargeType,
      amount: $("#prepareRechargeAmount").val()
    },
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.success) {
        var obj = data.object;
        var price = '';
        if (prepareRechargeType == "IOST") {
          price = Number($("#prepareRechargeAmount").val()).toFixed(4);
        } else {
          price = Number($("#prepareRechargeAmount").val()).toFixed(4) + " " + prepareRechargeType;
        }
        prepareRechargeGo(price, obj);
      } else {
        alert(data.message)
      }
    }
  });
}

function getRechargeType() {
  return getCookie("customerType") || "IOST";
}

function prepareRechargeGo(price, playID) {

  if (getRechargeType() == "IOST") {
    console.log(playID, price);
    prepareRechargeIOST(price, playID);
  } else {
    var scatter = getScatter();
    if (scatter) {
      if (scatter.identity) {
        console.log(scatter.identity);
        const user = loot.scatter.identity.accounts.find(account => account.blockchain === 'eos');
        loot.bomber = user.name;
        prepareRechargeDo(loot.bomber, price, playID);
      } else {
        const requiredFields = {
          accounts: [network]
        };
        scatter.getIdentity(requiredFields).then(identity => {
          console.log(identity);
          const user = identity.accounts.find(account => account.blockchain === 'eos');
          loot.bomber = user.name;
          prepareRechargeDo(loot.bomber, price, playID);
        }).catch(error => {
          eosErrorShow(error);
        });
      }
    } else {
      noScatterShow();
    }

    function prepareRechargeDo(name, price, playID) {

      prepareResource(function(cpuName) {
        var authorization;
        var prepareRechargeName = 'eosio.token';
        // if(prepareRechargeType == "XPC"){
        //   prepareRechargeName = xpccontractName;
        // }
        const account = name;
        const eos = loot.scatter.eos(network, Eos);
        const memo = "RECHARGE-" + playID;
        console.log("memo:", memo);
        if (cpuName == '') {
          authorization = [{
            actor: account,
            permission: "active"
          }]
        } else {
          authorization = [{
            actor: cpuName,
            permission: "active"
          }, {
            actor: account,
            permission: "active"
          }]
        }
        eos.transaction({
          actions: [{
            account: prepareRechargeName,
            name: 'transfer',
            authorization: authorization,
            data: {
              from: account,
              to: xpetcontractName,
              quantity: price,
              memo: memo
            }
          }]
        }).then(res => {
          showMsg("充值成功！");
          $('.cdk-overlay-container').hide();
          recycleResource();
          setTimeout(function() {
            getLootNum();
          }, 10000)
        }).catch(e => {
          $("#showLoading").hide();
          console.log("error:", e);
          eosErrorShow(e);
        });

      });
    }
  }
}

function prepareRechargeIOST(amount, sn) {



  IWalletJS.enable().then((account) => {
    if (account) {
      // alert("account:"+account);
      $("#showLoading").show();
      var iost = IWalletJS.newIOST(IOST);
      var tx = iost.callABI(iostContractName, "reCharge", [account, sn, amount]);
      tx.addApprove('iost', amount);
      iost.signAndSend(tx).on('pending', (pending) => {

        getTxReceipt(pending, function(data) {
          showMsg("充值成功！");
          $('.cdk-overlay-container').hide();
          $("#showLoading").hide();
          setTimeout(function() {
            getLootNum();
          }, 10000)

        })
      }).on('success', (result) => {

        if (iostSuccessStaus == true) {

          iostSuccessGo(result, function() {

            showMsg("充值成功！");
            $('.cdk-overlay-container').hide();
            setTimeout(function() {
              getLootNum();
            }, 10000)
            $("#loadingBox").hide();
            $("#showLoading").hide();
            iostPendingStaus = false;

          })

        }
        // alert("result:"+JSON.stringify(result));
        // showMsg("充值成功！");
        // $("#prepareRechargeShow").hide();
        // // recycleResource();
        // setTimeout(function(){
        //   getLootNum();
        // },10000)
        // console.log(result,'result')
      }).on('failed', (failed) => {$("#showLoading").hide();
        // console.log("failed:"+JSON.stringify(failed));
        // showMsg(JSON.stringify(failed));
      })
    } else {
      showMsg('not login')
    }
  })
}


function getEosMapBonus2() {
  var prepareRechargeType = getCookie("customerType");
  if(getCookie("customerType") == "PC"){
    prepareRechargeType = $(".coinName").html();
  }

  if ($("#bindAccountMsgShow").html() == '') {
    showMsg("请绑定账号再提现");
    panelShow('bindAccount');
    return
  }

  if ($("#withdrawMoneyAmount").val() == '') {
    showMsg("请输入提现金额");
    return
  }
  $.ajax({
    type: 'post',
    url: '/api/withdraw.do',
    data: {
      type: prepareRechargeType,
      amount: $("#withdrawMoneyAmount").val()
    },
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.success) {
        showMsg("提取成功");
        $('.cdk-overlay-container').hide();
        setTimeout(function() {
          getLootNum();
        }, 10000)

      } else {
        alert(data.message)
      }
    }
  });
}


function getAssitAccount() {
  var url = '/api/getAssitAccount.do';
  $.ajax({
    type: 'get',
    url: url,
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.code == 200) {
        var obj = data.object;
        // var html = '<p style="line-height:50px;color:#848484;">我的 ' + obj.chainType + ' 链上账号：<span style="color:#fff;">' + obj.account + '</span></p>';
        // $("#getAssitAccountShow").html(html);
        // $(".coinName").html(obj.chainType);
        // getAssitAccountBalance();
        var html = '<p style="margin-bottom: 20px;color:#848484;">我的 ' + obj.chainType + ' 链上账号：<span style="color:#fff;">' + obj.account + '</span></p>';
        $("#getAssitAccountShow").html(html);
        $(".coinName").html(obj.chainType);
        getAssitAccountBalance(obj.chainType);
      } else {
        alert(data.message);
      }
    },
    error: function(data) {
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });
}


function listMyAccountMapping() {
  var url = '/api/listMyAccountMapping.do';
  $.ajax({
    type: 'get',
    url: url,
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.code == 200) {
        var obj = data.object;
        var string = "";
        $.each(obj,function (i,n) {
          if(n.chainType == bindTarget){
            string = n.account;
          }
        })
        $("#bindAccountMsgShow").html(string);
        $(".coinName").html(bindTarget);
      } else {
        alert(data.message);
      }
    },
    error: function(data) {
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });
}

function rechargeByAssitAccount() {
  var url = '/api/rechargeByAssitAccount.do';
  $.ajax({
    type: 'post',
    url: url,
    data:{
      quantity:$(".moneyAll").html()
    },
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.code == 200) {
        var obj = data.object;
        showMsg("充值成功，请稍后查看银行余额");
        // getLootNum();
        // getAssitAccount();
      } else {
        alert(data.message);
      }
    },
    error: function(data) {
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });
}

function getAssitAccountBalance(chainType) {
  var url = '/api/getAssitAccountBalance.do';
  $.ajax({
    type: 'get',
    url: url,
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.code == 200) {
        var obj = data.object;
        var html = '';
        var moneyAll = '';
        if(obj){
          $.each(obj,function (i,n) {
            console.log(n)
            if(n.symbol == chainType){
              moneyAll = n.quantity;
              html = '<p style="margin-bottom: 20px;color:#848484;">我的 ' + n.symbol + ' 链上账号余额：<span style="color:#fff;">' + n.quantity + '</span></p>';
            }
            
          })
        }
        
        $(".moneyAll").append(moneyAll);
        $("#getAssitAccountShow").append(html);
        // var html = '<p style="line-height:50px;color:#848484;">我的 ' + obj.chainType + ' 链上账号：<span style="color:#fff;">' + obj.account + '</span></p>';
        // $("#getAssitAccountShow").html(html);
        // $(".coinName").html(obj.chainType);
      } else {
        alert(data.message);
      }
    },
    error: function(data) {
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });
}


function getTaxType(name) {
  switch (name) {

    case "XPC_MINING":
      return "挖矿";
      break;
    case "XPC_AUCTION":
    case "XPC_AUCTION_EOS":
    case "XPET_AUCTION_BID":
      return "竞拍";
      break;
    case "XPC_HEROLIST":
      return "英雄榜";
      break;
    case "XPET_HATCH":
      return "孵化";
      break;
    case "XPET_CAREHATCH":
      return "精细孵化";
      break;
    case "XPET_ITEM_EXCHANGE":
      return "道具交易";
      break;
    case "XPET_RENT":
      return "租宠";
      break;
    case "EOS_CANDY":
    case "XPC_CANDY":
      return "糖果";
      break;



    case "XPC_GIFT":
      return "赠送";
      break;
    case "XPET_AGENT_DIV":
    case "XPET_INCOME":
      return "XPET收入";
      break;
    case "XPC_RECHARGE":
    case "LOOT_RECHARGE":
    case "EOS_RECHARGE":
      return "充值";
      break;
    case "XPC_CONSUME":
    case "EOS_CONSUME":
      return "消费";
      break;
    case "XPC_EXCHNAGE":
      return "兑换";
      break;
    default:
      return "未知类型";
  }
}

function getCode3() {
  telNumber = $('#telNumber').val();
  if (telNumber.length != 11) {
    alert("手机号码错误")
    return;
  }
  $('#getCode').off('click');
  var opt = {
    countTime: 120,
    getContent: "获取验证码",
    reGetContent: "重新获取验证码",
    sC: '#000',
    eC: '#fff',
    obj: $('#getCode'),
    callback: getCode3
  };
  $.ajax({
    type: 'GET',
    url: '/api/codes.do',
    dataType: "json",
    data: {
      reason: 'FIND_PWD',
      telNumber: telNumber,
      // imgcode:$imgcode,
      // reqId : reqId,
    },
    success: function(data) {
      console.log(data);
      if (data.success == false) {
        alert(data.message);
        $('#getCode').text("获取验证码");
        $('#getCode').on('click', getCode3);
        return;
      }
      // $('#getCode').text(get_lan("forgetPasswordMsg4"));
      // countSixty(opt);
      code = data.object;
      countSixty(opt);
      $('#getCode').text(data.message);
    },
    error: function(data) {
      //判断token是否有效
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });
}

function updatePass(this_but) {
  if (!$("#telNumber").val()) {
    alert('请输入手机号码!');
    return false;
  }
  if (!$("#smscode").val()) {
    alert('请输入验证码!');
    return false;
  }
  if (!$("#newpass").val()) {
    alert('请输入新密码!');
    return false;
  }
  if ($("#newpass").val() != $("#newpass2").val()) {
    alert('密码不一致!');
    return false;
  }

  $.ajax({
    type: 'PUT',
    url: '/api/forgetPassword.do',
    dataType: 'json',
    data: {
      telNumber: $("#telNumber").val(),
      newPassword: $("#newpass").val(),
      code: $("#smscode").val()
    },
    success: function(data) {

      if (data.code == 200) {
        alert('密码修改' + data.message + ',正在跳转首页...');
        setTimeout(function() {
          if (getCookie("token")) {
            exit();
          } else {
            window.location.href = "index.html";
          }

        }, 2000);
      } else {
        alert(data.message);
      }
    },
    error: function(data) {
      //判断token是否有效
      if (data.status == 401) {
        alert(data.message);
      }
    }
  });
}

function bindAccount() {
  if($("#smscode").val() == ''){
    showMsg("请输入验证码");
    return
  }
  if($("#bindAmountName").val() == ''){
    showMsg("请输入要绑定的账号");
    return
  }
  if(bindTarget == 'IOST'){
    bindIOSTAccount();
  }else{
    bindEOSAccount();
  }
}

function bindIOSTAccount() {
  $.ajax({
      type: 'post',
      url: '/api/bindIOSTAccount.do',
      data:{
          account:$("#bindAmountName").val(),
          code:$("#smscode").val()
      },
      headers: {
        'Authorization': "BASIC " + getCookie("token")
      },
      dataType: 'json',
      success: function(data) {
          if (data.code == 200) {
              showMsg("绑定成功");
              listMyAccountMapping();
          } else {
              alert(data.message);
          }
      },
      error: function(data) {
            alert(data.message);
      }
  });
}

function bindEOSAccount() {
  $.ajax({
      type: 'post',
      url: '/api/bindEOSAccount.do',
      data:{
          account:$("#bindAmountName").val(),
          code:$("#smscode").val()
      },
      headers: {
        'Authorization': "BASIC " + getCookie("token")
      },
      dataType: 'json',
      success: function(data) {
          if (data.code == 200) {
              showMsg("绑定成功");
              listMyAccountMapping();
          } else {
              alert(data.message);
          }
      },
      error: function(data) {
            alert(data.message);
      }
  });
}
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
// function getSex(sex) {
//     switch (sex) {
//         case 0:
//             return get_lan("getSex"); //"雄性";
//             break;
//         case 1:
//             return get_lan("getSex2"); //"雌性";
//             break;
//     }
// }

function getContractsList() {
  var api = get_random_api();
  var selfData = {
    json: true, // Get the response as json
    code: dexContractName, // Contract that we target
    scope: dexContractName, // Account that owns the data
    table: 'contracts', // Table name
    // index_position: 329,          // Table secondary index
    // lower_bound: getCookie("account"), // Table primary key value
    limit: 10, // Here we limit to 1 to get only the single row with primary key equal to 'testacc'
    reverse: false, // Optional: Get reversed data
    show_payer: false,
  }
  $.post(api + "/v1/chain/get_table_rows", JSON.stringify(selfData),
    function(data, status) {
      // var html = '';
      // $("#") = data["rows"];
      for (x in data["rows"]) {

        console.log("sdfff:", data["rows"][x]);
        nftcontract[data["rows"][x].nftcontract] = data["rows"][x];
        nftcontractArray.push(data["rows"][x].nftcontract)
        console.log('ffffffff',nftcontractArray);
      }
    }, "json");
    
}