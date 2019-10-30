var SHOW_CARD = [false, false, false, false, false, false];
var nShow_State = 0;
var dragon_card;
var tiger_card;
//-----------------------------------------------------------------------------
function Game_Proc() {
    if (HISTORY_ORDER != HISTORY_ORDER_PREV) {
        get_result_history();
    }
    
    if (STATE == 0) {
        clear_card();
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
    $("#bt_h").height(0);
    $("#bt_d").height(0);
    $("#bt_b").height(0);
    $("#result_rank").hide();
    document.getElementById("result_rank").style.top = "-230px";

    document.getElementById('hand_card_box').style.display = "none";
    document.getElementById("h_card").innerHTML = "";
    document.getElementById("d_card").innerHTML = "";
    document.getElementById("b_card").innerHTML = "";
    document.getElementById("sqc_1").className = "card_empty";
    document.getElementById("sqc_1t").className = "card_back" + CARD_COLOR;
    document.getElementById("sqc_1t").style.display = "none";

    document.getElementById("sqc_2").className = "card_empty";
    document.getElementById("sqc_2t").className = "card_back" + CARD_COLOR;
    document.getElementById("sqc_2t").style.display = "none";

    document.getElementById("sqc_3").className = "card_empty";
    document.getElementById("sqc_3t").className = "card_back" + CARD_COLOR;
    document.getElementById("sqc_3t").style.display = "none";

    document.getElementById('text_result_box').style.display = "none";
    for (var nLoop = 0; nLoop < 3; nLoop++) SHOW_CARD[nLoop] = false;

}
//------------------------------------------------------------------------------
function show_get_card() {
    if (STATE == 6) {
        set_hidden_card(1);
    }
    var szCards = GET_CARD.split(",");

    var szh_card = "";
    var szd_card = "";
    var szb_card = "";

    if (szCards[0] != "") szh_card += "<div class=\"c" + szCards[0] + "\"></div>";
    if (szCards[1] != "") szd_card += "<div class=\"c" + szCards[1] + "\"></div>";
    if (szCards[2] != "") szb_card += "<div class=\"c" + szCards[2] + "\"></div>";

    document.getElementById("h_card").innerHTML = szh_card;
    document.getElementById("d_card").innerHTML = szd_card;
    document.getElementById("b_card").innerHTML = szb_card;
    document.getElementById('hand_card_box').style.display = "block";
}
//------------------------------------------------------------------------------
function show_sort_card() {
    clear_hidden_card();
    var szCards = GET_CARD.split(",");

    var szh_card = "";
    var szd_card = "";
    var szb_card = "";
    var result_rank = "";

    var nH, nD, nB;

    nH = Number(szCards[0]);
    nD = Number(szCards[1]);
    nB = Number(szCards[2]);

    if (szCards[0] != "") szh_card += "<div class=\"c" + szCards[0] + "\"></div>";
    if (szCards[1] != "") szd_card += "<div class=\"c" + szCards[1] + "\"></div>";
    if (szCards[2] != "") szb_card += "<div class=\"c" + szCards[2] + "\"></div>";

    document.getElementById("h_card").innerHTML = szh_card;
    document.getElementById("d_card").innerHTML = szd_card;
    document.getElementById("b_card").innerHTML = szb_card;
    document.getElementById('hand_card_box').style.display = "block";

    if (nH > nD && nD > nB) {
        szh_card = "110px"
        szd_card = "60px"
        szb_card = "10px"
        result_rank = "hdb";
    }
    if (nH > nB && nB > nD) {
        szh_card = "110px"
        szd_card = "10px"
        szb_card = "60px"
        result_rank = "hbd";
    }
    if (nD > nH && nH > nB) {
        szh_card = "60px"
        szd_card = "110px"
        szb_card = "10px"
        result_rank = "dhb";
    }
    if (nD > nB && nB > nH) {
        szh_card = "10px"
        szd_card = "110px"
        szb_card = "60px"
        result_rank = "dbh";
    }
    if (nB > nH && nH > nD) {
        szh_card = "60px"
        szd_card = "10px"
        szb_card = "110px"
        result_rank = "bhd";
    }
    if (nB > nD && nD > nH) {
        szh_card = "10px"
        szd_card = "60px"
        szb_card = "110px"
        result_rank = "bdh";
    }

    $("#bt_h").stop().animate({ "height": szh_card }, { queue: false, duration: 500 });
    $("#bt_d").stop().animate({ "height": szd_card }, { queue: false, duration: 500 });
    $("#bt_b").stop().animate({ "height": szb_card }, { queue: false, duration: 500 });

    document.getElementById("img_rank").src = "/pc/game/hdb/img/result/" + result_rank + ".png";
    $("#result_rank").show();
    $("#result_rank").stop().animate({ "top": "-120px" }, { queue: false, duration: 1000 });
}
//------------------------------------------------------------------------------
function set_show_card(number) {
    if (number == 1) {
        document.getElementById("h_card").innerHTML = "";
        document.getElementById("d_card").innerHTML = "";
        document.getElementById("b_card").innerHTML = "";
    }
}
//------------------------------------------------------------------------------
function set_back_card(number) {
    document.getElementById("h_card").innerHTML = BACK_CARD_STR;
    document.getElementById("d_card").innerHTML = BACK_CARD_STR;
    document.getElementById("b_card").innerHTML = BACK_CARD_STR;
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

        document.getElementById("sqc_3").className = "card_case";
        document.getElementById("sqc_3t").style.left = "0px";
        document.getElementById("sqc_3t").style.top = "0px";
        document.getElementById("sqc_3t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_3t").style.display = "block";
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

        document.getElementById("sqc_3").className = "card_empty";
        document.getElementById("sqc_3t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_3t").style.display = "none";
    }
    else {
        document.getElementById("sqc_1").className = "card_empty";
        document.getElementById("sqc_1t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_1t").style.display = "none";

        document.getElementById("sqc_2").className = "card_empty";
        document.getElementById("sqc_2t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_2t").style.display = "none";

        document.getElementById("sqc_3").className = "card_empty";
        document.getElementById("sqc_3t").className = "card_back" + CARD_COLOR;
        document.getElementById("sqc_3t").style.display = "none";
    }
}
//------------------------------------------------------------------------------
