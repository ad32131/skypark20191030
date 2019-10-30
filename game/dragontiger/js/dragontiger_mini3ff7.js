var SHOW_CARD = [false, false, false, false, false, false];
var nShow_State = 0;
var dragon_card;
var tiger_card;
//-----------------------------------------------------------------------------
function Game_Proc() {
    if (HISTORY_ORDER != HISTORY_ORDER_PREV) {
        get_result_history();
        get_game_history_for_api();
    }
    if (NOW_GAME != PREV_GAME) {
        PREV_GAME = NOW_GAME;
        document.getElementById('game_idx').innerText = SHOW_GAME;
    }

    if (STATE == 0) {
        clear_card();
        clear_all_bet();
        show_mini_msg("준비중");
    }

    if (STATE == 2) {
        clear_card();
        if (get_remain_bet_sec() > 0) {
            last_bet_count();
        }
        else {
            ShowMessage(3);
            document.getElementById("remain_time").innerText = "0";
            clear_try_bet();
            show_mini_msg("베팅종료");
        }
    }

    if (STATE == 6 || STATE == 11 || STATE == 16) {
        if (nShow_State != STATE) {
            show_get_card();
            check_card_count();
            nShow_State = STATE;
        }
    }
    else {
        nShow_State = STATE;
    }

}
//------------------------------------------------------------------------------
function get_table_info() {
    var arINFO = HIS_INFO.split(',');
    document.getElementById('pcount').innerText = arINFO[0];
    document.getElementById('bcount').innerText = arINFO[1];
    document.getElementById('tcount').innerText = arINFO[2];
    document.getElementById('total_count').innerText = arINFO[5];

    arINFO = EXPECT.split(',');

    document.getElementById('bej1').className = "bej1" + arINFO[0];
    document.getElementById('bej2').className = "bej2" + arINFO[2];
    document.getElementById('bej3').className = "bej3" + arINFO[4];
    document.getElementById('bej4').className = "bej4" + arINFO[6];

    document.getElementById('pej1').className = "pej1" + arINFO[1];
    document.getElementById('pej2').className = "pej2" + arINFO[3];
    document.getElementById('pej3').className = "pej3" + arINFO[5];
    document.getElementById('pej4').className = "pej4" + arINFO[7];
}
//------------------------------------------------------------------------------
function clear_card() {

    document.getElementById('hand_card_box').style.display = "none";
    document.getElementById("player_cards").innerHTML = "";
    document.getElementById("banker_cards").innerHTML = "";

    document.getElementById("sqc_1").className = "card_empty";
    document.getElementById("sqc_1t").className = "card_back" + CARD_COLOR;
    document.getElementById("sqc_1t").style.display = "none";

    document.getElementById("sqc_2").className = "card_empty";
    document.getElementById("sqc_2t").className = "card_back" + CARD_COLOR;
    document.getElementById("sqc_2t").style.display = "none";

    document.getElementById('text_result_box').style.display = "none";
    for (var nLoop = 0; nLoop < 2; nLoop++) SHOW_CARD[nLoop] = false;
    hide_text_result();

}
//------------------------------------------------------------------------------
function show_get_card() {
    if (STATE == 6) {
        set_hidden_card(1);
    }
    var szCards = GET_CARD.split(",");

    var szPlayer_Cards = "";
    var szBanker_Cards = "";

    if (szCards[0] != "") szPlayer_Cards += "<div class=\"c" + szCards[0] + "\"></div>";
    if (szCards[1] != "") szBanker_Cards += "<div class=\"c" + szCards[1] + "\"></div>";

    document.getElementById("player_cards").innerHTML = szPlayer_Cards;
    document.getElementById("banker_cards").innerHTML = szBanker_Cards;
    document.getElementById('hand_card_box').style.display = "block";
}
//------------------------------------------------------------------------------
function show_sort_card() {
    clear_hidden_card(4);

    var szCards = GET_CARD.split(",");

    var szPlayer_Cards = "";
    var szBanker_Cards = "";

    if (szCards[0] != "") szPlayer_Cards += "<div class=\"c" + szCards[0] + "\"></div>";
    if (szCards[1] != "") szBanker_Cards += "<div class=\"c" + szCards[1] + "\"></div>";

    document.getElementById("player_cards").innerHTML = szPlayer_Cards;
    document.getElementById("banker_cards").innerHTML = szBanker_Cards;
    show_text_result(0);

}
//------------------------------------------------------------------------------
function set_show_card(number) {
    if (number == 1) {
        document.getElementById("player_cards").innerHTML = "";
        document.getElementById("banker_cards").innerHTML = "";
    }
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
function show_text_result(player) {
    var szCards = RESULT_DETAIL.split(",");
    szCards[0] = parseInt(Number(szCards[0]) / 10);
    szCards[1] = parseInt(Number(szCards[1]) / 10);

    if (player == 1) {
        document.getElementById("igdragon_num").src = "/pc/game/dragontiger/img/result/dragon_num/" + szCards[0] + ".png";
        document.getElementById("tbplayer_text").style.display = "block";
    }
    else if (player == 2) {
        document.getElementById("igtiger_num").src = "/pc/game/dragontiger/img/result/tiger_num/" + szCards[1] + ".png";
        document.getElementById("tbbanker_text").style.display = "block";
    }
    else {
        document.getElementById("igdragon_num").src = "/pc/game/dragontiger/img/result/dragon_num/" + szCards[0] + ".png";
        document.getElementById("igtiger_num").src = "/pc/game/dragontiger/img/result/tiger_num/" + szCards[1] + ".png";

        document.getElementById("tbplayer_text").style.display = "block";
        document.getElementById("tbbanker_text").style.display = "block";

        if (szCards[2] == "Y") {
            szCards = RESULT_DETAIL.split(",");
            dragon_card = parseInt(Number(szCards[0]));
            tiger_card = parseInt(Number(szCards[1]));
            if (dragon_card > tiger_card) document.getElementById('text_result').className = "dragon_win";
            else if (tiger_card > dragon_card) document.getElementById('text_result').className = "tiger_win";
            else document.getElementById('text_result').className = "tie";
            document.getElementById('text_result_box').style.display = "block";
        }
    }
}
//------------------------------------------------------------------------------
function hide_text_result() {
    document.getElementById("tbplayer_text").style.display = "none";
    document.getElementById("tbbanker_text").style.display = "none";
}
//------------------------------------------------------------------------------
function set_back_card(number) {
    document.getElementById("player_cards").innerHTML = BACK_CARD_STR;
    document.getElementById("banker_cards").innerHTML = BACK_CARD_STR;
}
//------------------------------------------------------------------------------
function check_card_count() {
    if (STATE == 6 || STATE == 11 || STATE == 16) {
        var nRemain_Sec = get_remain_check_sec();
        if (nRemain_Sec > 0) setTimeout("check_card_count()", 1000);
        if (nRemain_Sec <= 0) {
            show_mini_msg("카드오픈");
            ShowMessage(6);
            document.getElementById("remain_time").innerText = "0";
            show_sort_card();
        }
        else {
            show_mini_msg("카드확인");
            if (nShow_State != STATE) ShowMessage(5);
            document.getElementById("remain_time").innerText = nRemain_Sec;
        }
    }
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
    if (POM == "M") {
        currentObj.style.left = "0px";
        currentObj.style.top = "0px";
        currentObj.style.display = "none";
        bMouse_Down = false;
        document.getElementById(currentObj.id.replace('t', '')).className = "card_empty";
        TEMP_ID = currentObj.id;
        TEMP_ID = TEMP_ID.replace('sqc_', '');
        TEMP_ID = TEMP_ID.replace('t', '');
        SHOW_CARD[Number(TEMP_ID) - 1] = true;

        if (TEMP_ID == 1) {
            if (SHOW_CARD[0]) {
                show_text_result(1);
            }
        }
        if (TEMP_ID == 2) {
            if (SHOW_CARD[1]) {
                show_text_result(2);
            }
        }
    }

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
        if (Math.abs(nLeft + nMove_X) % 147 > 70 || Math.abs((nTop + nMove_Y) % 209) > 90) {
            currentObj.style.left = "0px";
            currentObj.style.top = "0px";
            currentObj.style.display = "none";
            bMouse_Down = false;
            document.getElementById(currentObj.id.replace('t', '')).className = "card_empty";
            TEMP_ID = currentObj.id;
            TEMP_ID = TEMP_ID.replace('sqc_', '');
            TEMP_ID = TEMP_ID.replace('t', '');
            SHOW_CARD[Number(TEMP_ID) - 1] = true;

            if (TEMP_ID == 1) {
                if (SHOW_CARD[0]) {
                    show_text_result(1);
                }
            }
            if (TEMP_ID == 2) {
                if (SHOW_CARD[1]) {
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
    }
    else {
        document.getElementById("sqc_1").className = "card_empty";
        document.getElementById("sqc_1t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_1t").style.display = "none";

        document.getElementById("sqc_2").className = "card_empty";
        document.getElementById("sqc_2t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_2t").style.display = "none";
    }
}
//------------------------------------------------------------------------------
function get_game_history_for_api() {
    $.ajax({
        type: "get",
        url: "/game_data/game_history/" + ROOM_NUM + ".html?v=" + Date.parse(new Date()),
        success: function (oHtml) {
            document.getElementById("div_game_history_box").innerHTML = oHtml;
        }
    });
}

