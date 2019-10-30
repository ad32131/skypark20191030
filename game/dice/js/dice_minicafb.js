var SHOW_CARD = [false, false, false, false, false, false];
var nShow_State = 0;
//-----------------------------------------------------------------------------
function Game_Proc() {
    if (HISTORY_ORDER != HISTORY_ORDER_PREV) {
        get_result_history();
    }
    if (STATE == ABLE_BET_STATE) {
        ;
    }
    else {
        ;
    }
    if (STATE == 0) {
        nShow_State = STATE;
        show_mini_msg("준비중");
        ShowMessage(0);
        clear_card();
    }
    if (STATE == 2) {
        clear_card();
        if (get_remain_bet_sec() > 0) {
            last_bet_count();
        }
        else {
            ShowMessage(3);
            show_mini_msg("베팅마감");
        }
        nShow_State = STATE;
    }
    else {
        show_mini_msg("준비중");
    }

    if (STATE == 5) {
        show_sort_card();
    }
}
//------------------------------------------------------------------------------
// HAVE TO WRITE FUNCTION //
//------------------------------------------------------------------------------
function get_table_info() {
    ;
}
function set_back_card() {
    ;
}

//------------------------------------------------------------------------------
// PROCESS FUNCTION
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
function clear_card() {
    document.getElementById("text_result_box").style.display = "none";
}
//------------------------------------------------------------------------------
function show_sort_card() {

    var szCards = GET_CARD.split(",");
    var RED_DICE = Number(szCards[0]);
    var BLUE_DICE = Number(szCards[1]);

    var COLOR_RESULT = "";
    if (RED_DICE == BLUE_DICE) COLOR_RESULT = "<b style=\"color:#55ff55;\">TIE</b>";
    else if (RED_DICE > BLUE_DICE) COLOR_RESULT = "<b style=\"color:#ff5555;\">RED</b>";
    else COLOR_RESULT = "<b style=\"color:#5555ff;\">BLUE</b>";

    var OE_RESULT = "";
    if ((RED_DICE + BLUE_DICE) % 2 == 1) OE_RESULT = "<b style=\"color:#5555ff;\">홀</b>";
    else OE_RESULT = "<b style=\"color:#ff5555;\">짝</b>";

    var UO_RESULT = "";
    if ((RED_DICE + BLUE_DICE) == 7) UO_RESULT = "숫자합 : <b style=\"color:#ffcd00;\">7</b>";
    else if ((RED_DICE + BLUE_DICE) < 7) UO_RESULT = "숫자합 : <b style=\"color:#5555ff;\">7↓ 언더</b>";
    else UO_RESULT = "숫자합 : <b style=\"color:#ff5555;\">7↑ 오버</b>";

    document.getElementById("text_result").innerHTML = "결과 : " + OE_RESULT + " / 높은주사위 : " + COLOR_RESULT + " / " + UO_RESULT;
    document.getElementById("text_result_box").style.display = "block";
}
