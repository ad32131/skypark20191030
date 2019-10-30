var SHOW_CARD = [false, false, false, false, false, false];
var nShow_State = 0;
//-----------------------------------------------------------------------------
function Game_Proc() {
    if (HISTORY_ORDER != HISTORY_ORDER_PREV) {
        get_result_history();
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
            clear_try_bet();
            ShowMessage(3);
            show_mini_msg("베팅마감");
        }
        nShow_State = STATE;
    }
    else {
        show_mini_msg("준비중");
    }
    if (STATE == 5) {
        clear_try_bet();
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
    var WIN_NUMBER = Number(szCards[0]);

    document.getElementById("text_result").innerHTML = "<img style=\"margin-top:10px;\" alt=\"\" src=\"/pc/game/fantan/img/result/" + String(WIN_NUMBER) + "win.png\" />";
    document.getElementById("text_result_box").style.display = "block";
}
//------------------------------------------------------------------------------
