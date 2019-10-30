var BET_KIND_MAX;
var ABLE_BET_STATE;
var ABLE_BET_STATE1;
var ABLE_BET_STATE2;
var MAX_NORMAL_BET;
var GAME_SOUND = "Y";


var SUB_GAME = 0;
var PREV_SUB_GAME = -1;
var NOW_HORSE = "";
var ABLE_SUB_BET = "N";

var STATE = 0;
var NOW_GAME = 0;
var PREV_GAME = -1;
var GET_CARD = "";
var CAL_CARD = "";
var END_BET_TIME = 0;
var CHECK_CARD_TIME = 0;
var CARD_COLOR = "B";
var HISTORY_ORDER = "";
var HISTORY_ORDER_PREV = "-1";
var RESULT_DETAIL = "";
var BCI_RATE = "";

var GAME_KIND = "";


var USER_NICK;
var USER_MONEY;

var BACK_CARD_STR = "<div class=\"cback\"></div><div class=\"cback\"></div>";
var BACK_CARD_WIDE_STR = "<div class=\"cback_wide\"></div>";
var EMPTY_CARD_STR = "<div class=\"cHide\"></div >";
var HIDE_CARD_STR = "<div name=\"hide_card\" class=\"cMove\" onclick=\"hiden_card_click(this)\"></div >";

var BET_MONEY;
var TRY_MONEY;
var MAX_BET_MONEY;
var nTotal_Show_Bet_Money;
var NO_BET_GAME_COUNT = 0;

//-----------------------------------------------------------------------------------
//FOR BACCARAT
//-----------------------------------------------------------------------------------
var HIS_INFO = "";
var EXPECT = "";
//-----------------------------------------------------------------------------------
var time_gap = parseInt((dtS - dtP));
var effectSound = new Audio("/pc/game/common/sound/sec3.wav");
//-----------------------------------------------------------------------------------
function get_user_info() {
    ;
}
//--------------------------------------------------------------------------------------
function get_remain_bet_sec() {

    var dtNow = moment().tz("Asia/Seoul");
    dtNow = dtNow.add(time_gap, "milliseconds");
    var dtGet = moment(END_BET_TIME, 'YYYY-MM-DD HH:mm:ss.fff');
    return parseInt((dtGet - dtNow) / 1000);
}
//------------------------------------------------------------------------------
function get_remain_check_sec() {
    var dtNow = moment().tz("Asia/Seoul");
    dtNow = dtNow.add(time_gap, "milliseconds");
    var dtGet = moment(CHECK_CARD_TIME, 'YYYY-MM-DD HH:mm:ss.fff');
    return parseInt((dtGet - dtNow) / 1000);
}
//------------------------------------------------------------------------------
function get_result_history() {
    $.ajax({
        type: "get",
        url: "/game_data/history/" + ROOM_NUM + ".html?v=" + Date.parse(new Date()),
        success: function (oHtml) {
            HISTORY_ORDER_PREV = HISTORY_ORDER;
            document.getElementById("div_result_history_box").innerHTML = oHtml;
            
            get_table_info();
            //clear_all_bet();
        }
    });
}
//------------------------------------------------------------------------------
function last_bet_count() {
    if (STATE == ABLE_BET_STATE) {
        var nRemain_Sec = get_remain_bet_sec();
        if (nRemain_Sec > 0) setTimeout("last_bet_count()", 1000);
        if (nRemain_Sec <= 0) {
            show_mini_msg("베팅종료");
            nShow_State = -1;
            ShowMessage(3);
            document.getElementById("remain_time").innerText = "0";
        }
        else {

            show_mini_msg("베팅가능");
            if (nRemain_Sec >= 1 && nRemain_Sec <= 5) play_sound();
            if (nShow_State != STATE) ShowMessage(2);
            document.getElementById("remain_time").innerText = nRemain_Sec;
        }
    }
}
//------------------------------------------------------------------------------
function hiden_card_click(currentObj) {
    if (currentObj.className == "cMove") currentObj.className = "cHide";
    if (currentObj.className == "cMove_wide") currentObj.className = "cHide_wide";
}
//------------------------------------------------------------------------------
function show_money_and_bet_box() {
    ;
}
//------------------------------------------------------------------------------
function Change_Money_String(szMoney) {
    var formatNum = "";
    szMoney = szMoney.replace(/,/g, "");
    formatNum = szMoney.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    return formatNum;
}
//------------------------------------------------------------------------------
function live_video_play() {
    var myPlayer = WowzaPlayer.get('live_video');
    myPlayer.play();
}
//------------------------------------------------------------------------------
function try_change_sound_option() {
    if (GAME_SOUND == "Y") {
        GAME_SOUND = "N";
        document.getElementById('icon_sound').className = "sound_off";
    }
    else {
        GAME_SOUND = "Y";
        document.getElementById('icon_sound').className = "sound_on";
    }
}
//------------------------------------------------------------------------------
function play_sound() {
    if (GAME_SOUND == "Y") {
        effectSound.currentTime = 0;
        effectSound.play(); // HTML5
    }
}
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
function ShowMessage(msg_num) {
    document.getElementById("msg_text").className = "msg_text" + String(msg_num);
    $(".div_msg_box").fadeIn(350);
    setTimeout("HideMessage()", 1500);
}
//------------------------------------------------------------------------------
function HideMessage() {
    $(".div_msg_box").fadeOut(350);
}
//------------------------------------------------------------------------------
function show_mini_msg(msg) {
    document.getElementById('div_notice_line').innerText = msg;
}

//------------------------------------------------------------------------------
function clear_all_bet() {
    ;
}
//------------------------------------------------------------------------------
function clear_try_bet() {
    ;
}
//------------------------------------------------------------------------------
function cancel_bet(way) {
    ;
}
//------------------------------------------------------------------------------
function betting_chip(way) {
    ;
}
//------------------------------------------------------------------------------
function cancel_all_bet() {
    ;
}
//------------------------------------------------------------------------------
function try_bet() {
    ;
}
//------------------------------------------------------------------------------
