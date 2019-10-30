var SHOW_CARD = [false, false, false, false, false, false];
var nShow_State = 0;

//-----------------------------------------------------------------------------
function Game_Proc() {
    if (HISTORY_ORDER != HISTORY_ORDER_PREV) {
        get_result_history_CD();
    }
    if (STATE == 0) {
        nShow_State = STATE;
        show_mini_msg("준비중");
        ShowMessage(0);
        clear_card();
        clear_all_bet();
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

    if (STATE == 5) {
        clear_try_bet();
        show_sort_card();
    }
    show_horse();
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
    var RESULT_IMG = "<div style=\"height:30px;\"></div>";
    RESULT_IMG += "<img alt=\"\" src=\"/pc/game/yut/img/result/g" + szCards[0] + ".png\" />&nbsp;&nbsp;";
    RESULT_IMG += "<img alt=\"\" src=\"/pc/game/yut/img/result/" + szCards[0] + ".png\" />";

    document.getElementById("text_result").innerHTML = RESULT_IMG;
    document.getElementById("text_result_box").style.display = "block";
}
//------------------------------------------------------------------------------
function show_horse() {
}
//------------------------------------------------------------------------------
function get_result_history_CD() {
    $.ajax({
        type: "get",
        url: "/game_data/history/" + ROOM_NUM + ".html?v=" + Date.parse(new Date()),
        success: function (oHtml) {
            HISTORY_ORDER_PREV = HISTORY_ORDER;
            oHtml = oHtml.replace(/(_A_)/g, "A마");
            oHtml = oHtml.replace(/(_B_)/g, "B마");
            oHtml = oHtml.replace(/(_C_)/g, "C마");

            oHtml = oHtml.replace(/(-0-)/g, "빽");
            oHtml = oHtml.replace(/(-1-)/g, "도");
            oHtml = oHtml.replace(/(-2-)/g, "개");
            oHtml = oHtml.replace(/(-3-)/g, "걸");
            oHtml = oHtml.replace(/(-4-)/g, "윷");
            oHtml = oHtml.replace(/(-5-)/g, "모");

            oHtml = oHtml.replace(/(_N0)/g, "후진");
            oHtml = oHtml.replace(/(_N1)/g, "전진");
            oHtml = oHtml.replace(/(_N2)/g, "전진");
            oHtml = oHtml.replace(/(_N3)/g, "전진");
            oHtml = oHtml.replace(/(_B4)/g, "한번더");
            oHtml = oHtml.replace(/(_B5)/g, "한번더");

            oHtml = oHtml.replace(/(_G0)/g, "A마승리");
            oHtml = oHtml.replace(/(_G1)/g, "B마승리");
            oHtml = oHtml.replace(/(_G2)/g, "C마승리");

            oHtml = oHtml.replace(/(_K0)/g, "A마를 잡음");
            oHtml = oHtml.replace(/(_K1)/g, "B마를 잡음");
            oHtml = oHtml.replace(/(_K2)/g, "C마를 잡음");

            oHtml = oHtml.replace(/(-A_)/g, "다음:A마");
            oHtml = oHtml.replace(/(-B_)/g, "다음:B마");
            oHtml = oHtml.replace(/(-C_)/g, "다음:C마");
            document.getElementById("div_result_history_box").innerHTML = oHtml;

            get_table_info();
            clear_all_bet();
            get_user_info();
        }
    });
}
//------------------------------------------------------------------------------
