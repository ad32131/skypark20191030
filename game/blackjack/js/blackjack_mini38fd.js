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
    //alert(STATE);
    if (STATE == 4) {
        clear_card();
        set_order_card();
        if (get_remain_bet_sec() > 0) {
            last_bet_count();
        }
        else {
            hide_bet_zone();
            ShowMessage(3);
            show_mini_msg("베팅마감");
        }
        nShow_State = STATE;
    }

    if (STATE == 5) {
        clear_try_bet();
        show_get_card();
    }
    if (STATE == 6) {
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
//------------------------------------------------------------------------------
// PROCESS FUNCTION
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
function clear_card() {
    document.getElementById("card_top_bk").innerHTML = "";
    document.getElementById("card_top_p1").innerHTML = "";
    document.getElementById("card_top_p2").innerHTML = "";
    document.getElementById("card_top_p3").innerHTML = "";

    document.getElementById("igcard_sum_bk").src = "/pc/game/blackjack/img/result/number/0.png";
    document.getElementById("igcard_sum_p1").src = "/pc/game/blackjack/img/result/number/0.png";
    document.getElementById("igcard_sum_p2").src = "/pc/game/blackjack/img/result/number/0.png";
    document.getElementById("igcard_sum_p3").src = "/pc/game/blackjack/img/result/number/0.png";

    document.getElementById("card_bottom_bk").innerHTML = "";
    document.getElementById("card_bottom_p1").innerHTML = "";
    document.getElementById("card_bottom_p2").innerHTML = "";
    document.getElementById("card_bottom_p3").innerHTML = "";

    document.getElementById("result_zone_bk").style.display = "none";
    document.getElementById("result_zone_p1").style.display = "none";
    document.getElementById("result_zone_p2").style.display = "none";
    document.getElementById("result_zone_p3").style.display = "none";

    document.getElementById("order_card_zone").style.display = "none";
    document.getElementById("order_card_text").style.display = "none";

    document.getElementById("text_result_zone1").style.display = "none";
    document.getElementById("text_result_zone2").style.display = "none";
    document.getElementById("text_result_zone3").style.display = "none";
    //alert('clear_card');
    document.getElementById("text_result_zone1").innerHTML = "";
    document.getElementById("text_result_zone2").innerHTML = "";
    document.getElementById("text_result_zone3").innerHTML = "";

    document.getElementById("result_zone_p1").className = "div_result_zone_p1";
    document.getElementById("result_zone_p2").className = "div_result_zone_p2";
    document.getElementById("result_zone_p3").className = "div_result_zone_p3";
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
    var szCards = GET_CARD.split(",");

    var szCard_TOP_BK = "";
    var szCard_TOP_P1 = "";
    var szCard_TOP_P2 = "";
    var szCard_TOP_P3 = "";

    var szCard_BOT_BK = "";
    var szCard_BOT_P1 = "";
    var szCard_BOT_P2 = "";
    var szCard_BOT_P3 = "";


    for (var nLoop = 0; nLoop < 40; nLoop++) {
        if (nLoop >= 0 && nLoop < 2) szCard_TOP_BK += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 2 && nLoop < 10) szCard_BOT_BK += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 10 && nLoop < 12) szCard_TOP_P1 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 12 && nLoop < 20) szCard_BOT_P1 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 20 && nLoop < 22) szCard_TOP_P2 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 22 && nLoop < 30) szCard_BOT_P2 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 30 && nLoop < 32) szCard_TOP_P3 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 32 && nLoop < 40) szCard_BOT_P3 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
    }
    document.getElementById("card_top_bk").innerHTML = szCard_TOP_BK;
    document.getElementById("card_top_p1").innerHTML = szCard_TOP_P1;
    document.getElementById("card_top_p2").innerHTML = szCard_TOP_P2;
    document.getElementById("card_top_p3").innerHTML = szCard_TOP_P3;

    document.getElementById("card_bottom_bk").innerHTML = szCard_BOT_BK;
    document.getElementById("card_bottom_p1").innerHTML = szCard_BOT_P1;
    document.getElementById("card_bottom_p2").innerHTML = szCard_BOT_P2;
    document.getElementById("card_bottom_p3").innerHTML = szCard_BOT_P3;

    szCards = RESULT_DETAIL.split(",");

    if (szCards[0] != 0) document.getElementById("igcard_sum_bk").src = "/pc/game/blackjack/img/result/number/" + szCards[0] + ".png";
    else document.getElementById("igcard_sum_bk").src = "";
    if (szCards[1] != 0) document.getElementById("igcard_sum_p1").src = "/pc/game/blackjack/img/result/number/" + szCards[1] + ".png";
    else document.getElementById("igcard_sum_p1").src = "";
    if (szCards[2] != 0) document.getElementById("igcard_sum_p2").src = "/pc/game/blackjack/img/result/number/" + szCards[2] + ".png";
    else document.getElementById("igcard_sum_p2").src = "";
    if (szCards[3] != 0) document.getElementById("igcard_sum_p3").src = "/pc/game/blackjack/img/result/number/" + szCards[3] + ".png";
    else document.getElementById("igcard_sum_p3").src = "";

    document.getElementById("result_zone_bk").style.display = "block";
    document.getElementById("result_zone_p1").style.display = "block";
    document.getElementById("result_zone_p2").style.display = "block";
    document.getElementById("result_zone_p3").style.display = "block";
}
//------------------------------------------------------------------------------
function set_order_card() {
    var szCards = GET_CARD.split(",");

    var ORDER_CARD = "<div class=\"c" + szCards[40] + "\"></div>";
    document.getElementById("order_card").innerHTML = ORDER_CARD;
    document.getElementById("order_card_zone").style.display = "block";

    var order_number = Number(szCards[40]) / 10;

    order_number = parseInt(order_number);
    order_number %= 4;
    document.getElementById("order_card_text").className = "div_order_card_zone_text" + order_number;
    document.getElementById("order_card_text").style.display = "block";


}
//------------------------------------------------------------------------------
function show_sort_card() {
    set_order_card();
    var szCards = GET_CARD.split(",");

    var szCard_TOP_BK = "";
    var szCard_TOP_P1 = "";
    var szCard_TOP_P2 = "";
    var szCard_TOP_P3 = "";

    var szCard_BOT_BK = "";
    var szCard_BOT_P1 = "";
    var szCard_BOT_P2 = "";
    var szCard_BOT_P3 = "";


    for (var nLoop = 0; nLoop < 40; nLoop++) {
        if (nLoop >= 0 && nLoop < 2) szCard_TOP_BK += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 2 && nLoop < 10) szCard_BOT_BK += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 10 && nLoop < 12) szCard_TOP_P1 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 12 && nLoop < 20) szCard_BOT_P1 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 20 && nLoop < 22) szCard_TOP_P2 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 22 && nLoop < 30) szCard_BOT_P2 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 30 && nLoop < 32) szCard_TOP_P3 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 32 && nLoop < 40) szCard_BOT_P3 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
    }

    document.getElementById("card_top_bk").innerHTML = szCard_TOP_BK;
    document.getElementById("card_top_p1").innerHTML = szCard_TOP_P1;
    document.getElementById("card_top_p2").innerHTML = szCard_TOP_P2;
    document.getElementById("card_top_p3").innerHTML = szCard_TOP_P3;

    document.getElementById("card_bottom_bk").innerHTML = szCard_BOT_BK;
    document.getElementById("card_bottom_p1").innerHTML = szCard_BOT_P1;
    document.getElementById("card_bottom_p2").innerHTML = szCard_BOT_P2;
    document.getElementById("card_bottom_p3").innerHTML = szCard_BOT_P3;

    szCards = RESULT_DETAIL.split(",");
    for (var nLoop = 1; nLoop < 4; nLoop++) {
        if (szCards[nLoop].indexOf("W") > -1) {
            szCards[nLoop] = szCards[nLoop].replace('W', '');
            document.getElementById("result_zone_p" + nLoop).className = "div_result_zone_win_p" + String(nLoop);
            document.getElementById("text_result_zone" + nLoop).className = "rt_winner_text";
            document.getElementById("text_result_zone" + nLoop).style.display = "block";

        }
        else if (szCards[nLoop].indexOf("L") > -1) {
            szCards[nLoop] = szCards[nLoop].replace('L', '');
            document.getElementById("text_result_zone" + nLoop).className = "rt_lose_text";
            document.getElementById("text_result_zone" + nLoop).style.display = "block";
        }
        else {
            szCards[nLoop] = szCards[nLoop].replace('D', '');
            document.getElementById("text_result_zone" + nLoop).className = "rt_draw_text";
            document.getElementById("text_result_zone" + nLoop).style.display = "block";
        }
    }

    if (szCards[0] != 0) document.getElementById("igcard_sum_bk").src = "/pc/game/blackjack/img/result/number/" + szCards[0] + ".png";
    else document.getElementById("igcard_sum_bk").src = "";
    if (szCards[1] != 0) document.getElementById("igcard_sum_p1").src = "/pc/game/blackjack/img/result/number/" + szCards[1] + ".png";
    else document.getElementById("igcard_sum_p1").src = "";
    if (szCards[2] != 0) document.getElementById("igcard_sum_p2").src = "/pc/game/blackjack/img/result/number/" + szCards[2] + ".png";
    else document.getElementById("igcard_sum_p2").src = "";
    if (szCards[3] != 0) document.getElementById("igcard_sum_p3").src = "/pc/game/blackjack/img/result/number/" + szCards[3] + ".png";
    else document.getElementById("igcard_sum_p3").src = "";

    document.getElementById("result_zone_bk").style.display = "block";
    document.getElementById("result_zone_p1").style.display = "block";
    document.getElementById("result_zone_p2").style.display = "block";
    document.getElementById("result_zone_p3").style.display = "block";
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