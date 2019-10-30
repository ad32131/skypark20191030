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
    }

    if (STATE == 4) {
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
    if (STATE == 5) {
        show_get_card();
    }

    if (STATE == 7) {
        if (nShow_State != 6) {
            clear_try_bet();
            if (get_remain_check_sec() > 0) {
                ShowMessage(5);
                show_get_card();
                check_card_count();
            }
            else {
                ShowMessage(6);
                show_mini_msg("카드오픈");
                document.getElementById("remain_time").innerText = "0";
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
function set_back_card() {
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

    document.getElementById("result_zone_bk").style.display = "none";
    document.getElementById("result_zone_p1").style.display = "none";
    document.getElementById("result_zone_p2").style.display = "none";
    document.getElementById("result_zone_p3").style.display = "none";

    document.getElementById("text_result_zone0").style.display = "none";
    document.getElementById("text_result_zone1").style.display = "none";
    document.getElementById("text_result_zone2").style.display = "none";
    document.getElementById("text_result_zone3").style.display = "none";

    document.getElementById("text_result_zone0").innerHTML = "";
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

    document.getElementById("hide_card_p1").innerHTML = EMPTY_CARD_STR + HIDE_CARD_STR;
    document.getElementById("hide_card_p2").innerHTML = EMPTY_CARD_STR + HIDE_CARD_STR;
    document.getElementById("hide_card_p3").innerHTML = EMPTY_CARD_STR + HIDE_CARD_STR;

    var szCards = GET_CARD.split(",");

    var szCard_BK = "";
    var szCard_P1 = "";
    var szCard_P2 = "";
    var szCard_P3 = "";
    var szCard_P4 = "";

    for (var nLoop = 0; nLoop < 8; nLoop++) {
        if (nLoop >= 0 && nLoop < 2) szCard_BK += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 2 && nLoop < 4) szCard_P1 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 4 && nLoop < 6) szCard_P2 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 6 && nLoop < 8) szCard_P3 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
    }

    document.getElementById("card_top_bk").innerHTML = szCard_BK;
    document.getElementById("result_zone_bk").style.display = "block";
    if (STATE != 5) {
        document.getElementById("card_top_p1").innerHTML = szCard_P1;
        document.getElementById("card_top_p2").innerHTML = szCard_P2;
        document.getElementById("card_top_p3").innerHTML = szCard_P3;

        document.getElementById("hand_line_p1").style.display = "block";
        document.getElementById("hand_line_p2").style.display = "block";
        document.getElementById("hand_line_p3").style.display = "block";


        document.getElementById("result_zone_p1").style.display = "block";
        document.getElementById("result_zone_p2").style.display = "block";
        document.getElementById("result_zone_p3").style.display = "block";
    }
    else {
        szCards = RESULT_DETAIL.split(",");

        TOP_CARD_BK = "";
        var szTemp = "";
        var szWin_Mark = "";
        for (var nLoop = 0; nLoop < 1; nLoop++) {
            szTemp = "";
            szWin_Mark = "";
            if (szCards[nLoop].indexOf("W") > -1) {
                document.getElementById("result_zone_p" + nLoop).className = "div_result_zone_win_p" + nLoop;
                szCards[nLoop] = szCards[nLoop].replace("W", "");
                szWin_Mark = "<div style=\" width:218px; text-align:center; position:relative; margin-top:-150px; margin-left:-20px;\">" + "<img alt=\"\" src=\"/pc/game/pair/img/result/win_new.png\" />" + "</div>";
            }
            if (szCards[nLoop].indexOf("T") > -1) {
                szCards[nLoop] = szCards[nLoop].replace("L", "");
                szWin_Mark = "<div style=\" width:218px; text-align:center; position:relative; margin-top:-150px; margin-left:-21px;\">" + "<img alt=\"\" src=\"/pc/game/pair/img/result/tie_new.png\" />" + "</div>";
            }
            if (szCards[nLoop].indexOf("L") > -1) {
                szCards[nLoop] = szCards[nLoop].replace("L", "");
                szWin_Mark = "<div style=\" width:218px; text-align:center; position:relative; margin-top:-150px; margin-left:-21px;\">" + "<img alt=\"\" src=\"/pc/game/pair/img/result/lose_new.png\" />" + "</div>";
            }
            if (szCards[nLoop].indexOf("P") > -1) {
                szCards[nLoop] = szCards[nLoop].replace("P", "");
                szTemp = "<img alt=\"\" src=\"/pc/game/pair/img/result/pair2.png\" />";
            }
            else {
                szTemp = "<img alt=\"\" src=\"/pc/game/pair/img/result/nopair2.png\" />";
            }

            szTemp = "<img alt=\"\" src=\"/pc/game/pair/img/result/" + szCards[nLoop] + ".png\" />" + szTemp;
            if (nLoop == 0) szTemp = "<div style=\" width:222px; text-align:center; margin-top:25px;\">" + szTemp + "</div>";
            else szTemp = "<div style=\" width:222px; text-align:center; margin-top:60px;\">" + szTemp + "</div>";
            szTemp += szWin_Mark;
            document.getElementById("text_result_zone" + String(nLoop)).innerHTML = szTemp;

        }

        document.getElementById("text_result_zone0").style.display = "block";
    }
}
//------------------------------------------------------------------------------
function show_sort_card() {

    close_hand();

    var szTemp;
    var TOP_CARD;
    var BOTTOM_CARD;
    var TOP_CARD_BK = "";
    var TOP_CARD_P1 = "";
    var TOP_CARD_P2 = "";
    var TOP_CARD_P3 = "";

    var TOP_CARD_TEXT_BK = "";
    var TOP_CARD_TEXT_P1 = "";
    var TOP_CARD_TEXT_P2 = "";
    var TOP_CARD_TEXT_P3 = "";


    document.getElementById("hide_card_p1").innerHTML = EMPTY_CARD_STR + EMPTY_CARD_STR;
    document.getElementById("hide_card_p2").innerHTML = EMPTY_CARD_STR + EMPTY_CARD_STR;
    document.getElementById("hide_card_p3").innerHTML = EMPTY_CARD_STR + EMPTY_CARD_STR;

    var szCards = GET_CARD.split(",");

    var szCard_BK = "";
    var szCard_P1 = "";
    var szCard_P2 = "";
    var szCard_P3 = "";

    for (var nLoop = 0; nLoop < 10; nLoop++) {
        if (nLoop >= 0 && nLoop < 2) szCard_BK += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 2 && nLoop < 4) szCard_P1 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 4 && nLoop < 6) szCard_P2 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 6 && nLoop < 8) szCard_P3 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
    }

    document.getElementById("card_top_bk").innerHTML = szCard_BK;
    document.getElementById("card_top_p1").innerHTML = szCard_P1;
    document.getElementById("card_top_p2").innerHTML = szCard_P2;
    document.getElementById("card_top_p3").innerHTML = szCard_P3;

    document.getElementById("hand_line_p1").style.display = "block";
    document.getElementById("hand_line_p2").style.display = "block";
    document.getElementById("hand_line_p3").style.display = "block";

    document.getElementById("result_zone_bk").style.display = "block";
    document.getElementById("result_zone_p1").style.display = "block";
    document.getElementById("result_zone_p2").style.display = "block";
    document.getElementById("result_zone_p3").style.display = "block";

    szCards = RESULT_DETAIL.split(",");

    TOP_CARD_BK = "";
    TOP_CARD_P1 = "";
    TOP_CARD_P2 = "";
    TOP_CARD_P3 = "";
    TOP_CARD_P4 = "";
    var szTemp = "";
    var szWin_Mark = "";
    for (var nLoop = 0; nLoop < 4; nLoop++) {
        szTemp = "";
        szWin_Mark = "";
        if (szCards[nLoop].indexOf("W") > -1) {
            document.getElementById("result_zone_p" + nLoop).className = "div_result_zone_win_p" + nLoop;
            szCards[nLoop] = szCards[nLoop].replace("W", "");
            szWin_Mark = "<div style=\" width:218px; text-align:center; position:relative; margin-top:-150px; margin-left:-20px;\">" + "<img alt=\"\" src=\"/pc/game/pair/img/result/win_new.png\" />" + "</div>";
        }
        if (szCards[nLoop].indexOf("T") > -1) {
            szCards[nLoop] = szCards[nLoop].replace("L", "");
            szWin_Mark = "<div style=\" width:218px; text-align:center; position:relative; margin-top:-150px; margin-left:-21px;\">" + "<img alt=\"\" src=\"/pc/game/pair/img/result/tie_new.png\" />" + "</div>";
        }
        if (szCards[nLoop].indexOf("L") > -1) {
            szCards[nLoop] = szCards[nLoop].replace("L", "");
            szWin_Mark = "<div style=\" width:218px; text-align:center; position:relative; margin-top:-150px; margin-left:-21px;\">" + "<img alt=\"\" src=\"/pc/game/pair/img/result/lose_new.png\" />" + "</div>";
        }
        if (szCards[nLoop].indexOf("P") > -1) {
            szCards[nLoop] = szCards[nLoop].replace("P", "");
            szTemp = "<img alt=\"\" src=\"/pc/game/pair/img/result/pair2.png\" />";
        }
        else {
            szTemp = "<img alt=\"\" src=\"/pc/game/pair/img/result/nopair2.png\" />";
        }

        szTemp = "<img alt=\"\" src=\"/pc/game/pair/img/result/" + szCards[nLoop] + ".png\" />" + szTemp;
        if (nLoop == 0) szTemp = "<div style=\" width:222px; text-align:center; margin-top:25px;\">" + szTemp + "</div>";
        else szTemp = "<div style=\" width:222px; text-align:center; margin-top:60px;\">" + szTemp + "</div>";
        szTemp += szWin_Mark;
        document.getElementById("text_result_zone" + String(nLoop)).innerHTML = szTemp;

    }

    document.getElementById("text_result_zone0").style.display = "block";
    document.getElementById("text_result_zone1").style.display = "block";
    document.getElementById("text_result_zone2").style.display = "block";
    document.getElementById("text_result_zone3").style.display = "block";

    /*
    alert(RESULT_DETAIL);

    


    
    document.getElementById("hide_card_p1").innerHTML = "";
    document.getElementById("hide_card_p2").innerHTML = "";
    document.getElementById("hide_card_p3").innerHTML = "";
    document.getElementById("card_top_bk").innerHTML = TOP_CARD_BK;
    document.getElementById("card_top_p1").innerHTML = TOP_CARD_P1;
    document.getElementById("card_top_p2").innerHTML = TOP_CARD_P2;
    document.getElementById("card_top_p3").innerHTML = TOP_CARD_P3;
    document.getElementById("card_bottom_bk").innerHTML = BOTTOM_CARD_BK;
    document.getElementById("card_bottom_p1").innerHTML = BOTTOM_CARD_P1;
    document.getElementById("card_bottom_p2").innerHTML = BOTTOM_CARD_P2;
    document.getElementById("card_bottom_p3").innerHTML = BOTTOM_CARD_P3;

    

    szCards = RESULT_DETAIL.split("/");

    document.getElementById("result_zone_bk").style.display = "block";

    szTemp = szCards[0];
    szTemp = szTemp.replace(/(W)/g, "");
    szTemp = szTemp.replace(/(L)/g, "");
    szTemp = szTemp.replace(/(m)/g, "");
    szTemp = szTemp.split(",");

    if (szCards[0].indexOf('m') > -1) {
        TOP_CARD_TEXT_BK = szTemp[0] + " 메이드 - " + get_card_text(szTemp[1]) + "탑";
    }
    else if (szCards[0].indexOf('nn') > -1) {
        szTemp = szCards[0].split(",");
        TOP_CARD_TEXT_BK = "니우니우 - " + get_card_text(szTemp[1]) + "탑";
    }
    else {
        TOP_CARD_TEXT_BK = "노메이드 - " + get_card_text(szTemp[0]) + "탑";
    }

    szTemp = szCards[1];
    szTemp = szTemp.replace(/(W)/g, "");
    szTemp = szTemp.replace(/(L)/g, "");
    szTemp = szTemp.replace(/(m)/g, "");
    szTemp = szTemp.split(",");
    if (szCards[1].indexOf('m') > -1) {
        TOP_CARD_TEXT_P1 = szTemp[0] + " 메이드 - " + get_card_text(szTemp[1]) + "탑";
    }
    else if (szCards[1].indexOf('nn') > -1) {
        szTemp = szCards[1].split(",");
        TOP_CARD_TEXT_P1 = "니우니우" + get_card_text(szTemp[1]) + "탑";
    }
    else {
        TOP_CARD_TEXT_P1 = "노메이드 - " + get_card_text(szTemp[0]) + "탑";
    }

    szTemp = szCards[2];
    szTemp = szTemp.replace(/(W)/g, "");
    szTemp = szTemp.replace(/(L)/g, "");
    szTemp = szTemp.replace(/(m)/g, "");
    szTemp = szTemp.split(",");
    if (szCards[2].indexOf('m') > -1) {
        TOP_CARD_TEXT_P2 = szTemp[0] + " 메이드 - " + get_card_text(szTemp[1]) + "탑";
    }
    else if (szCards[2].indexOf('nn') > -1) {
        TOP_CARD_TEXT_P2 = "니우니우" + get_card_text(szTemp[1]) + "탑";
    }
    else {
        TOP_CARD_TEXT_P2 = "노메이드 - " + get_card_text(szTemp[0]) + "탑";
    }

    szTemp = szCards[3];
    szTemp = szTemp.replace(/(W)/g, "");
    szTemp = szTemp.replace(/(L)/g, "");
    szTemp = szTemp.replace(/(m)/g, "");
    szTemp = szTemp.split(",");
    if (szCards[3].indexOf('m') > -1) {
        TOP_CARD_TEXT_P3 = szTemp[0] + " 메이드 - " + get_card_text(szTemp[1]) + "탑";
    }
    else if (szCards[3].indexOf('nn') > -1) {
        szTemp = szCards[3].split(",");
        TOP_CARD_TEXT_P3 = "니우니우" + get_card_text(szTemp[1]) + "탑";
    }
    else {
        TOP_CARD_TEXT_P3 = "노메이드 - " + get_card_text(szTemp[0]) + "탑";
    }


    TOP_CARD_BK = "<div class=\"rt_banker_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_BK + "</div></div>";
    if (szCards[1].indexOf('W') > -1) {
        document.getElementById("result_zone_p1").className = "div_result_zone_win_p1";
        TOP_CARD_P1 = "<div class=\"rt_winner_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P1 + "</div></div>";
    }
    else {
        TOP_CARD_P1 += "<div class=\"rt_loser_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P1 + "</div></div>";
    }
    if (szCards[2].indexOf('W') > -1) {
        document.getElementById("result_zone_p2").className = "div_result_zone_win_p2";
        TOP_CARD_P2 = "<div class=\"rt_winner_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P2 + "</div></div>";
    }
    else {
        TOP_CARD_P2 += "<div class=\"rt_loser_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P2 + "</div></div>";
    }
    if (szCards[3].indexOf('W') > -1) {
        document.getElementById("result_zone_p3").className = "div_result_zone_win_p3";
        TOP_CARD_P3 = "<div class=\"rt_winner_text\"><div class=\"card_result_text\">" + TOP_CARD_TEXT_P3 + "</div></div>";
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

    document.getElementById("result_zone_p1").style.display = "block";
    document.getElementById("result_zone_p2").style.display = "block";
    document.getElementById("result_zone_p3").style.display = "block";
    */
}
//------------------------------------------------------------------------------
function check_card_count() {
    if (STATE == 7) {
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

    for (var nLoop = 0; nLoop < 8; nLoop++) {
        if (nLoop >= 0 && nLoop < 2) szCard_BK += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 2 && nLoop < 4) szCard_P1 += "<div class=\"c" + szCards[nLoop] + "\"></div><div style=\"width:5px;\"></div>";
        else if (nLoop >= 4 && nLoop < 6) szCard_P2 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
        else if (nLoop >= 6 && nLoop < 8) szCard_P3 += "<div class=\"c" + szCards[nLoop] + "\"></div>";
    }
    document.getElementById("big_cards").innerHTML = "";

    for (var nLoop = 1; nLoop <= 1; nLoop++) {
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