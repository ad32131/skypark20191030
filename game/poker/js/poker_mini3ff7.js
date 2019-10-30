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
        clear_all_bet();
    }
    if (STATE == 2) {
        ShowMessage(1);
        show_mini_msg("준비중");
    }
    if (STATE == 3) {
        set_order_card();
        show_mini_msg("준비중");
    }
    if (STATE == 4) {
        clear_card();
        set_order_card();

        if (get_remain_bet_sec() > 0) {
            last_bet_count();
        }
        else {
            ShowMessage(3);
            show_mini_msg("베팅마감");
        }
        nShow_State = STATE;
    }
    if (STATE == 6) {
        if (nShow_State != 6) {
            if (get_remain_check_sec() > 0) {
                ShowMessage(5);
                show_get_card();
                check_card_count();
            }
            else {
                ShowMessage(6);
                show_mini_msg("카드오픈");
                document.getElementById("remain_time").innerText = "0";
                //show_get_card();
                show_sort_card();
            }
        }
        nShow_State = STATE;
    }
    else {
        nShow_State = STATE;
    }
}
//------------------------------------------------------------------------------
// HAVE TO WRITE FUNCTION //
//------------------------------------------------------------------------------
function get_table_info() {
    ;
}
//------------------------------------------------------------------------------
// PROCESS FUNCTION
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
function clear_card() {
    document.getElementById("card_top_p1").innerHTML = "";
    document.getElementById("card_top_p2").innerHTML = "";
    document.getElementById("card_top_p3").innerHTML = "";

    document.getElementById("card_bottom_p1").innerHTML = "";
    document.getElementById("card_bottom_p2").innerHTML = "";
    document.getElementById("card_bottom_p3").innerHTML = "";

    document.getElementById("result_zone_p1").style.display = "none";
    document.getElementById("result_zone_p2").style.display = "none";
    document.getElementById("result_zone_p3").style.display = "none";

    document.getElementById("final_result_zone_bk").style.display = "none";
    document.getElementById("final_result_zone_p1").style.display = "none";
    document.getElementById("final_result_zone_p2").style.display = "none";
    document.getElementById("final_result_zone_p3").style.display = "none";

    document.getElementById("order_card_zone").style.display = "none";
    document.getElementById("share_card_zone").style.display = "none";
    document.getElementById("order_card_text").style.display = "none";
    document.getElementById("text_result_zone1").style.display = "none";
    document.getElementById("text_result_zone2").style.display = "none";
    document.getElementById("text_result_zone3").style.display = "none";

    document.getElementById("text_result_zone1").innerHTML = "";
    document.getElementById("text_result_zone2").innerHTML = "";
    document.getElementById("text_result_zone3").innerHTML = "";

    document.getElementById("result_zone_p1").className = "div_result_zone_p1";
    document.getElementById("result_zone_p2").className = "div_result_zone_p2";
    document.getElementById("result_zone_p3").className = "div_result_zone_p3";

    document.getElementById("hand_card_box").style.display = "none";

}
//------------------------------------------------------------------------------
function set_show_card() {
    document.getElementById("card_bottom_bk").innerHTML = "";
    document.getElementById("card_bottom_p1").innerHTML = "";
    document.getElementById("card_bottom_p2").innerHTML = "";
    document.getElementById("card_bottom_p3").innerHTML = "";

    document.getElementById("card_top_bk").innerHTML = BACK_CARD_STR;
    document.getElementById("card_top_p1").innerHTML = BACK_CARD_STR;
    document.getElementById("card_top_p2").innerHTML = BACK_CARD_STR;
    document.getElementById("card_top_p3").innerHTML = BACK_CARD_STR;
}
//------------------------------------------------------------------------------
function show_get_card() {
    set_order_card();

    document.getElementById("hide_card_p1").innerHTML = HIDE_CARD_STR + HIDE_CARD_STR + HIDE_CARD_STR;
    document.getElementById("hide_card_p2").innerHTML = HIDE_CARD_STR + HIDE_CARD_STR + HIDE_CARD_STR;
    document.getElementById("hide_card_p3").innerHTML = HIDE_CARD_STR + HIDE_CARD_STR + HIDE_CARD_STR;

    var szCards = GET_CARD.split(",");

    var szCard_BK = "";
    var szCard_P1 = "";
    var szCard_P2 = "";
    var szCard_P3 = "";

    for (var nLoop = 3; nLoop < 20; nLoop++) {
        //if (nLoop >= 0 && nLoop < 3) szCard_BK += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        if (nLoop >= 3 && nLoop < 6) szCard_P1 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 6 && nLoop < 9) szCard_P2 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 9 && nLoop < 12) szCard_P3 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
    }

    document.getElementById("card_top_p1").innerHTML = szCard_P1;
    document.getElementById("card_top_p2").innerHTML = szCard_P2;
    document.getElementById("card_top_p3").innerHTML = szCard_P3;

    document.getElementById("card_bottom_p1").innerHTML = "<div class=\"bt_open_all\" onclick=\"oepn_card_all(1)\"></div>"
        + "<div class=\"bt_sort_card\" onclick=\"sort_card(1)\"></div>";
    document.getElementById("card_bottom_p2").innerHTML = "<div class=\"bt_open_all\" onclick=\"oepn_card_all(2)\"></div>"
        + "<div class=\"bt_sort_card\" onclick=\"sort_card(2)\"></div>";
    document.getElementById("card_bottom_p3").innerHTML = "<div class=\"bt_open_all\" onclick=\"oepn_card_all(3)\"></div>"
        + "<div class=\"bt_sort_card\" onclick=\"sort_card(3)\"></div>";

    szCards = CAL_CARD.split(",");
    var LEFT_CARD_BK = "<div class=\"left_empty\"></div>";
    var RIGHT_CARD_BK = "";
    for (var nLoop = 0; nLoop < 7; nLoop++) {
        if (nLoop >= 0 && nLoop < 5) LEFT_CARD_BK += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 5 && nLoop < 7) RIGHT_CARD_BK += "<div class=\"c" + szCards[nLoop] + "\"></div>";
    }
    document.getElementById("card_left_bk").innerHTML = LEFT_CARD_BK;
    document.getElementById("card_right_bk").innerHTML = RIGHT_CARD_BK;

    document.getElementById("final_result_zone_bk").style.display = "block";
    document.getElementById("result_zone_p1").style.display = "block";
    document.getElementById("result_zone_p2").style.display = "block";
    document.getElementById("result_zone_p3").style.display = "block";

    szCards = RESULT_DETAIL.split(",");

    var TOP_CARD_TEXT_BK = change_result_str(szCards[0]);
    var TOP_CARD_BK = "";
    TOP_CARD_BK = "<div class=\"rt_banker_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_BK + "</div></div>";
    document.getElementById("text_result_zone_bk").innerHTML = TOP_CARD_BK;
    document.getElementById("text_result_zone_bk").style.display = "block";

}
//------------------------------------------------------------------------------
function set_order_card() {
    var szCards = GET_CARD.split(",");

    var ORDER_CARD = "<div class=\"c" + szCards[12] + "\"></div>";
    document.getElementById("order_card").innerHTML = ORDER_CARD;
    document.getElementById("order_card_zone").style.display = "block";

    var order_number = Number(szCards[12]) / 10;
    order_number = parseInt(order_number);
    if (order_number == 14) order_number = 1;
    order_number %= 4;
    document.getElementById("order_card_text").className = "div_order_card_zone_text" + order_number;
    document.getElementById("order_card_text").style.display = "block";
    var SHARE_CARD = "";
    if (szCards[13] != "0") {
        SHARE_CARD = "<div class=\"c" + szCards[13] + "\"></div>";
        SHARE_CARD += "<div class=\"c" + szCards[14] + "\"></div>";
        SHARE_CARD += "<div class=\"c" + szCards[15] + "\"></div>";
        SHARE_CARD += "<div class=\"c" + szCards[16] + "\"></div>";
        document.getElementById("share_card").innerHTML = SHARE_CARD;
        document.getElementById("share_card_zone").style.display = "block";
    }
}
//------------------------------------------------------------------------------
function show_sort_card() {

    close_hand();
    set_order_card();
    var szTemp;
    var TOP_CARD;
    var BOTTOM_CARD;
    var LEFT_CARD_BK = "<div class=\"left_empty\"></div>";
    var LEFT_CARD_P1 = "<div class=\"left_empty\"></div>";
    var LEFT_CARD_P2 = "<div class=\"left_empty\"></div>";
    var LEFT_CARD_P3 = "<div class=\"left_empty\"></div>";

    var CARD_TEXT_BK = "";
    var CARD_TEXT_P1 = "";
    var CARD_TEXT_P2 = "";
    var CARD_TEXT_P3 = "";

    var RIGHT_CARD_BK = "";
    var RIGHT_CARD_P1 = "";
    var RIGHT_CARD_P2 = "";
    var RIGHT_CARD_P3 = "";
    var szCards = CAL_CARD.split(",");

    for (var nLoop = 0; nLoop < 28; nLoop++) {
        if (nLoop >= 0 && nLoop < 5) LEFT_CARD_BK += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 5 && nLoop < 7) RIGHT_CARD_BK += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 7 && nLoop < 12) LEFT_CARD_P1 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 12 && nLoop < 14) RIGHT_CARD_P1 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 14 && nLoop < 19) LEFT_CARD_P2 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 19 && nLoop < 21) RIGHT_CARD_P2 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 21 && nLoop < 26) LEFT_CARD_P3 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 26 && nLoop < 28) RIGHT_CARD_P3 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
    }

    document.getElementById("card_left_bk").innerHTML = LEFT_CARD_BK;
    document.getElementById("card_left_p1").innerHTML = LEFT_CARD_P1;
    document.getElementById("card_left_p2").innerHTML = LEFT_CARD_P2;
    document.getElementById("card_left_p3").innerHTML = LEFT_CARD_P3;
    document.getElementById("card_right_bk").innerHTML = RIGHT_CARD_BK;
    document.getElementById("card_right_p1").innerHTML = RIGHT_CARD_P1;
    document.getElementById("card_right_p2").innerHTML = RIGHT_CARD_P2;
    document.getElementById("card_right_p3").innerHTML = RIGHT_CARD_P3;

    document.getElementById("result_zone_p1").style.display = "none";
    document.getElementById("result_zone_p2").style.display = "none";
    document.getElementById("result_zone_p3").style.display = "none";

    document.getElementById("final_result_zone_bk").style.display = "block";
    document.getElementById("final_result_zone_p1").style.display = "block";
    document.getElementById("final_result_zone_p2").style.display = "block";
    document.getElementById("final_result_zone_p3").style.display = "block";

    szCards = RESULT_DETAIL.split(",");

    TOP_CARD_TEXT_BK = change_result_str(szCards[0]);
    TOP_CARD_TEXT_P1 = change_result_str(szCards[1]);
    TOP_CARD_TEXT_P2 = change_result_str(szCards[2]);
    TOP_CARD_TEXT_P3 = change_result_str(szCards[3]);

    var TOP_CARD_BK = "";
    var TOP_CARD_P1 = "";
    var TOP_CARD_P2 = "";
    var TOP_CARD_P3 = "";

    TOP_CARD_BK = "<div class=\"rt_banker_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_BK + "</div></div>";
    if (szCards[1].indexOf('_W') > -1) {
        document.getElementById("result_zone_p1").className = "div_result_zone_win_p1";
        TOP_CARD_P1 = "<div class=\"rt_winner_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P1 + "</div></div>";
    }
    else if (szCards[1].indexOf('_D') > -1) {
        TOP_CARD_P1 += "<div class=\"rt_draw_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P1 + "</div></div>";
    }
    else {
        TOP_CARD_P1 += "<div class=\"rt_loser_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P1 + "</div></div>";
    }
    if (szCards[2].indexOf('_W') > -1) {
        document.getElementById("result_zone_p2").className = "div_result_zone_win_p2";
        TOP_CARD_P2 = "<div class=\"rt_winner_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P2 + "</div></div>";
    }
    else if (szCards[2].indexOf('_D') > -1) {
        TOP_CARD_P2 += "<div class=\"rt_draw_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P2 + "</div></div>";
    }
    else {
        TOP_CARD_P2 += "<div class=\"rt_loser_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P2 + "</div></div>";
    }
    if (szCards[3].indexOf('_W') > -1) {
        document.getElementById("result_zone_p3").className = "div_result_zone_win_p3";
        TOP_CARD_P3 = "<div class=\"rt_winner_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P3 + "</div></div>";
    }
    else if (szCards[3].indexOf('_D') > -1) {
        TOP_CARD_P3 = "<div class=\"rt_draw_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P3 + "</div></div>";
    }
    else {
        TOP_CARD_P3 = "<div class=\"rt_loser_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P3 + "</div></div>";
    }

    document.getElementById("text_result_zone_bk").innerHTML = TOP_CARD_BK;
    document.getElementById("text_result_zone1").innerHTML = TOP_CARD_P1;
    document.getElementById("text_result_zone2").innerHTML = TOP_CARD_P2;
    document.getElementById("text_result_zone3").innerHTML = TOP_CARD_P3;

    document.getElementById("text_result_zone_bk").style.display = "block";
    document.getElementById("text_result_zone1").style.display = "block";
    document.getElementById("text_result_zone2").style.display = "block";
    document.getElementById("text_result_zone3").style.display = "block";
}
//------------------------------------------------------------------------------
function sort_card(player) {

    close_hand();
    set_order_card();
    var szTemp;
    var TOP_CARD;
    var BOTTOM_CARD;
    var LEFT_CARD_BK = "<div class=\"left_empty\"></div>";
    var LEFT_CARD_P1 = "<div class=\"left_empty\"></div>";
    var LEFT_CARD_P2 = "<div class=\"left_empty\"></div>";
    var LEFT_CARD_P3 = "<div class=\"left_empty\"></div>";

    var CARD_TEXT_BK = "";
    var CARD_TEXT_P1 = "";
    var CARD_TEXT_P2 = "";
    var CARD_TEXT_P3 = "";

    var RIGHT_CARD_BK = "";
    var RIGHT_CARD_P1 = "";
    var RIGHT_CARD_P2 = "";
    var RIGHT_CARD_P3 = "";
    var szCards = CAL_CARD.split(",");

    for (var nLoop = 0; nLoop < 28; nLoop++) {
        if (nLoop >= 0 && nLoop < 5) LEFT_CARD_BK += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 5 && nLoop < 7) RIGHT_CARD_BK += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 7 && nLoop < 12) LEFT_CARD_P1 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 12 && nLoop < 14) RIGHT_CARD_P1 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 14 && nLoop < 19) LEFT_CARD_P2 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 19 && nLoop < 21) RIGHT_CARD_P2 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 21 && nLoop < 26) LEFT_CARD_P3 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 26 && nLoop < 28) RIGHT_CARD_P3 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
    }
    szCards = RESULT_DETAIL.split(",");

    var TOP_CARD_TEXT_P1 = "";
    var TOP_CARD_TEXT_P2 = "";
    var TOP_CARD_TEXT_P3 = "";
    var TOP_CARD_P1 = "";
    var TOP_CARD_P2 = "";
    var TOP_CARD_P3 = "";

    if (player == 1) {

        document.getElementById("card_left_p1").innerHTML = LEFT_CARD_P1;
        document.getElementById("card_right_p1").innerHTML = RIGHT_CARD_P1;

        TOP_CARD_TEXT_P1 = change_result_str(szCards[1]);
        if (szCards[1].indexOf('_W') > -1) {
            document.getElementById("result_zone_p1").className = "div_result_zone_win_p1";
            TOP_CARD_P1 = "<div class=\"rt_winner_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P1 + "</div></div>";
        }
        else {
            TOP_CARD_P1 += "<div class=\"rt_loser_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P1 + "</div></div>";
        }
        document.getElementById("result_zone_p1").style.display = "none";
        document.getElementById("final_result_zone_p1").style.display = "block";
        document.getElementById("text_result_zone1").innerHTML = TOP_CARD_P1;
        document.getElementById("text_result_zone1").style.display = "block";
    }
    if (player == 2) {
        document.getElementById("card_left_p2").innerHTML = LEFT_CARD_P2;
        document.getElementById("card_right_p2").innerHTML = RIGHT_CARD_P2;
        TOP_CARD_TEXT_P2 = change_result_str(szCards[2]);
        if (szCards[2].indexOf('_W') > -1) {
            document.getElementById("result_zone_p2").className = "div_result_zone_win_p2";
            TOP_CARD_P2 = "<div class=\"rt_winner_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P2 + "</div></div>";
        }
        else {
            TOP_CARD_P2 += "<div class=\"rt_loser_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P2 + "</div></div>";
        }
        document.getElementById("result_zone_p2").style.display = "none";
        document.getElementById("final_result_zone_p2").style.display = "block";
        document.getElementById("text_result_zone2").innerHTML = TOP_CARD_P2;
        document.getElementById("text_result_zone2").style.display = "block";
    }
    if (player == 3) {
        document.getElementById("card_left_p3").innerHTML = LEFT_CARD_P3;
        document.getElementById("card_right_p3").innerHTML = RIGHT_CARD_P3;

        TOP_CARD_TEXT_P3 = change_result_str(szCards[3]);
        if (szCards[3].indexOf('_W') > -1) {
            document.getElementById("result_zone_p3").className = "div_result_zone_win_p3";
            TOP_CARD_P3 = "<div class=\"rt_winner_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P3 + "</div></div>";
        }
        else {
            TOP_CARD_P3 = "<div class=\"rt_loser_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P3 + "</div></div>";
        }
        document.getElementById("result_zone_p3").style.display = "none";
        document.getElementById("final_result_zone_p3").style.display = "block";
        document.getElementById("text_result_zone3").innerHTML = TOP_CARD_P3;
        document.getElementById("text_result_zone3").style.display = "block";
    }


}
//------------------------------------------------------------------------------
function set_back_card() {
    ;
}
//------------------------------------------------------------------------------
function check_card_count() {
    if (STATE == 6) {
        var nRemain_Sec = get_remain_check_sec();
        if (nRemain_Sec > 0) setTimeout("check_card_count()", 1000);
        if (nRemain_Sec <= 0) {
            ShowMessage(6);
            document.getElementById("div_notice_line").innerText = "카드오픈";
            document.getElementById("remain_time").innerText = "0";
            show_sort_card();
        }
        else {
            if (nShow_State != STATE) ShowMessage(5);
            document.getElementById("div_notice_line").innerText = "카드확인";
            document.getElementById("remain_time").innerText = nRemain_Sec;
        }
    }
}
//------------------------------------------------------------------------------
function hiden_card_click(currentObj) {
    currentObj.className = "cHide";
}
//------------------------------------------------------------------------------
function oepn_card_all(player) {
    if (player == 1) document.getElementById("hide_card_p1").innerHTML = "";
    if (player == 2) document.getElementById("hide_card_p2").innerHTML = "";
    if (player == 3) document.getElementById("hide_card_p3").innerHTML = "";
}
//------------------------------------------------------------------------------
function open_hand_card(player) {

    var szCards = GET_CARD.split(",");

    var szCard_BK = "";
    var szCard_P1 = "";
    var szCard_P2 = "";
    var szCard_P3 = "";

    for (var nLoop = 3; nLoop < 12; nLoop++) {
        if (nLoop >= 3 && nLoop < 6) szCard_P1 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 6 && nLoop < 9) szCard_P2 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 9 && nLoop < 12) szCard_P3 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
    }
    document.getElementById("big_cards").innerHTML = "";

    for (var nLoop = 1; nLoop <= 3; nLoop++) {
        document.getElementById("sqc_" + String(nLoop) + "t").className = "card_back";
        document.getElementById("sqc_" + String(nLoop) + "t").style.left = 0;
        document.getElementById("sqc_" + String(nLoop) + "t").style.top = 0;
        document.getElementById("sqc_" + String(nLoop) + "t").style.display = "block";
        document.getElementById("sqc_" + String(nLoop)).className = "card_case";
    }

    document.getElementById("hand_card_box").style.display = "block";
    if (player == 1) {
        document.getElementById("big_cards").innerHTML = szCard_P1;
    }
    if (player == 2) {
        document.getElementById("big_cards").innerHTML = szCard_P2;
    }
    if (player == 3) {
        document.getElementById("big_cards").innerHTML = szCard_P3;
    }
}
//------------------------------------------------------------------------------
function close_hand() {
    document.getElementById("hand_card_box").style.display = "none";
}
//------------------------------------------------------------------------------
function get_card_text(card_num) {
    var szReturn = "";
    if (card_num % 10 == 4) szReturn = "♠";
    if (card_num % 10 == 3) szReturn = "♥";
    if (card_num % 10 == 2) szReturn = "♣";
    if (card_num % 10 == 1) szReturn = "◆";

    card_num = parseInt(card_num / 10);
    if (card_num == 11) card_num = "J";
    if (card_num == 12) card_num = "Q";
    if (card_num == 13) card_num = "K";

    szReturn = card_num + szReturn;
    return szReturn;

}
//------------------------------------------------------------------------------
var bMouse_Down = false;
var nMouse_X = 0;
var nMouse_Y = 0;
var nDown_X = 0;
var nDown_Y = 0;
var nNow_X = 0;
var nNow_Y = 0;
var nMove_X = 0;
var nMove_Y = 0;
var PREV_OBJ = null;
//------------------------------------------------------------------------------
function popupMouseUp() {
    bMouse_Down = false;
}
//------------------------------------------------------------------------------
function cardMouseDown(evt, currentObj) {
    if (!bMouse_Down || PREV_OBJ != currentObj) {

        nDown_X = evt.offsetX;
        nDown_Y = evt.offsetY;
        bMouse_Down = true;
        PREV_OBJ = currentObj;
        var cards = document.getElementsByName("move_cards");
        var obj;
        for (nLoop = 0; nLoop < cards.length; nLoop++) {
            cards[nLoop].style.zIndex = 3000;
        }
        currentObj.style.zIndex = 3001;

        var left = currentObj.style.left;
        left = left.replace("px", "");
        var nLeft = Number(left);
    }
}
//------------------------------------------------------------------------------
function cardMouseMove(evt, currentObj) {
    var TEMP_ID;
    if (PREV_OBJ != currentObj) {
        popupMouseUp();
    }
    if (bMouse_Down == true) {
        nNow_X = evt.offsetX;
        nNow_Y = evt.offsetY;
        nMove_X = nNow_X - nDown_X;
        nMove_Y = nNow_Y - nDown_Y;
        nMove_X = nMove_X / 2;
        nMove_Y = nMove_Y / 2;

        var left = currentObj.style.left;
        left = left.replace("px", "");
        var nLeft = Number(left);

        var top = currentObj.style.top;
        top = top.replace("px", "");
        var nTop = Number(top);

        var coords = "-" + String(Math.abs(nLeft + nMove_X) % 72);
        //document.getElementById("temp").innerHTML = coords;

        currentObj.style.left = String(nLeft + nMove_X) + "px";
        currentObj.style.top = String(nTop + nMove_Y) + "px";
        if (Math.abs(nLeft + nMove_X) % 147 > 70 || Math.abs((nTop + nMove_Y) % 209) > 60) {
            currentObj.style.left = "0px";
            currentObj.style.top = "0px";
            currentObj.style.display = "none";
            bMouse_Down = false;
            document.getElementById(currentObj.id.replace('t', '')).className = "card_empty";
            TEMP_ID = currentObj.id;
            TEMP_ID = TEMP_ID.replace('sqc_', '');
            TEMP_ID = TEMP_ID.replace('t', '');
            SHOW_CARD[Number(TEMP_ID) - 1] = true;

            if (TEMP_ID == 1 || TEMP_ID == 2) {
                if (SHOW_CARD[0] && SHOW_CARD[1]) {
                    show_text_result(1);
                }
            }
            if (TEMP_ID == 3) {
                if (SHOW_CARD[2]) {
                    show_text_result(1);
                }
            }
            if (TEMP_ID == 4 || TEMP_ID == 5) {
                if (SHOW_CARD[3] && SHOW_CARD[4]) {
                    show_text_result(2);
                }
            }
            if (TEMP_ID == 6) {
                if (SHOW_CARD[5]) {
                    show_text_result(2);
                }
            }
        }
    }
    else {
        document.getElementById("temp").innerHTML = "..";
    }
}
//------------------------------------------------------------------------------
function set_hidden_card(card_num) {
    if (card_num == 1) {
        document.getElementById("sqc_1").className = "card_case";
        document.getElementById("sqc_1t").style.left = "0px";
        document.getElementById("sqc_1t").style.top = "0px";
        document.getElementById("sqc_1t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_1t").style.display = "block";

        document.getElementById("sqc_2").className = "card_case";
        document.getElementById("sqc_2t").style.left = "0px";
        document.getElementById("sqc_2t").style.top = "0px";
        document.getElementById("sqc_2t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_2t").style.display = "block";

        document.getElementById("sqc_4").className = "card_case";
        document.getElementById("sqc_4t").style.left = "0px";
        document.getElementById("sqc_4t").style.top = "0px";
        document.getElementById("sqc_4t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_4t").style.display = "block";

        document.getElementById("sqc_5").className = "card_case";
        document.getElementById("sqc_5t").style.left = "0px";
        document.getElementById("sqc_5t").style.top = "0px";
        document.getElementById("sqc_5t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_5t").style.display = "block";
    }
    else if (card_num == 2) {
        document.getElementById("sqc_3").className = "card_case";
        document.getElementById("sqc_3t").style.left = "0px";
        document.getElementById("sqc_3t").style.top = "0px";
        document.getElementById("sqc_3t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_3t").style.display = "block";
    }
    else if (card_num == 3) {
        document.getElementById("sqc_6").className = "card_case";
        document.getElementById("sqc_6t").style.left = "0px";
        document.getElementById("sqc_6t").style.top = "0px";
        document.getElementById("sqc_6t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_6t").style.display = "block";
    }
}
//------------------------------------------------------------------------------
function clear_hidden_card(card_num) {
    if (card_num == 1) {
        document.getElementById("sqc_1").className = "card_empty";
        document.getElementById("sqc_1t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_1t").style.display = "none";

        document.getElementById("sqc_2").className = "card_empty";
        document.getElementById("sqc_2t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_2t").style.display = "none";

        document.getElementById("sqc_4").className = "card_empty";
        document.getElementById("sqc_4t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_4t").style.display = "none";

        document.getElementById("sqc_5").className = "card_empty";
        document.getElementById("sqc_5t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_5t").style.display = "none";
    }
    else if (card_num == 2) {
        document.getElementById("sqc_3").className = "card_empty";
        document.getElementById("sqc_3t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_3t").style.display = "none";
    }
    else if (card_num == 3) {
        document.getElementById("sqc_6").className = "card_empty";
        document.getElementById("sqc_6t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_6t").style.display = "none";
    }
    else {
        document.getElementById("sqc_1").className = "card_empty";
        document.getElementById("sqc_1t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_1t").style.display = "none";

        document.getElementById("sqc_2").className = "card_empty";
        document.getElementById("sqc_2t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_2t").style.display = "none";

        document.getElementById("sqc_4").className = "card_empty";
        document.getElementById("sqc_4t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_4t").style.display = "none";

        document.getElementById("sqc_5").className = "card_empty";
        document.getElementById("sqc_5t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_5t").style.display = "none";

        document.getElementById("sqc_3").className = "card_empty";
        document.getElementById("sqc_3t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_3t").style.display = "none";

        document.getElementById("sqc_6").className = "card_empty";
        document.getElementById("sqc_6t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_6t").style.display = "none";
    }
}
//------------------------------------------------------------------------------
function change_result_str(param) {

    var result_str = param;
    result_str = result_str.replace(/(-0-)/g, "탑");
    result_str = result_str.replace(/(-1-)/g, "원페어");
    result_str = result_str.replace(/(-2-)/g, "투페어");
    result_str = result_str.replace(/(-3-)/g, "트리플");
    result_str = result_str.replace(/(-4-)/g, "스트레이트");
    result_str = result_str.replace(/(-5-)/g, "백스트레이트");
    result_str = result_str.replace(/(-6-)/g, "마운틴 스트레이트");
    result_str = result_str.replace(/(-7-)/g, "플러쉬");
    result_str = result_str.replace(/(-8-)/g, "풀하우스");
    result_str = result_str.replace(/(-9-)/g, "포카드");
    result_str = result_str.replace(/(-10-)/g, "스트레이트 플러쉬");
    result_str = result_str.replace(/(-11-)/g, "백스트레이트 플러쉬");
    result_str = result_str.replace(/(-12-)/g, "로얄 스트레이트 플러쉬");

    result_str = result_str.replace(/(_n14)/g, "A");
    result_str = result_str.replace(/(_n13)/g, "K");
    result_str = result_str.replace(/(_n12)/g, "Q");
    result_str = result_str.replace(/(_n11)/g, "J");
    result_str = result_str.replace(/(_n)/g, "");

    result_str = result_str.replace(/(_s)/g, ", ");

    result_str = result_str.replace(/(_W)/g, "<font color=#ffCD00></font> ");
    result_str = result_str.replace(/(_L)/g, "<font color=#959595>LOSE</font> ");
    result_str = result_str.replace(/(_D)/g, "<font color=#ffffff>DRAW</font> ");
    return result_str;
}
//------------------------------------------------------------------------------
