var prev_chat_nick = "";
var arr_msg;
var bConnected = false;
var chat_msg_class = "";
var chat_line_empty = "";
//-----------------------------------------------------------------------------------------------------------------------
function move_game_lobby(num) {
    location.href = "/pc/lobby.aspx?gmn=" + num;
}
//-----------------------------------------------------------------------------------------------------------------------
function connect_chat_server_for_small() {
    chat = $.connection.chat;
    chat.client.serverToClient = function (msg) {
        if (!bConnected) {
            bConnected = true;
        }
        if (msg.indexOf("<") > -1) {
            if (msg == "<ENTER>") {
                chat.server.clientToServerConnect(chat_id);
            }
        }
    }
    $.connection.hub.start();
}
//-----------------------------------------------------------------------------------------------------------------------
function connect_chat_server_for_iframe() {
    proc_chat_msg();
    $.connection.hub.start();
}
//-----------------------------------------------------------------------------------------------------------------------
function proc_chat_msg() {
    chat = $.connection.chat;
    chat.client.serverToClient = function (msg) {
        if (!bConnected) {
            bConnected = true;
            $("#msgs").html("");
        }

        if (msg.indexOf("<") > -1) {
            if (msg == "<ENTER>") {
                chat.server.clientToServerConnect(chat_id);
                $("#msgs").append("<div class='div_enter'>채팅방에 입장하셨습니다.</div>");
            }
            else if (msg == "<RESET>") {
                document.getElementById('msgs').innerHTML = "";
            }
            else {
                arr_msg = msg.split(">");
                if (arr_msg[0] == "<NOTICE") {
                    $("#msgs").append("<div class='div_notice'>" + arr_msg[1] + "</div>");
                }
                else if (arr_msg[0] == "<ITEM1") {
                    $("#msgs").append("<div><table class='tb_item'><tr><td><img alt=\"\" src=\"/pc/img/chat_item/item1.gif\"></td><td><b>" + arr_msg[1] + "</b>님이 [아봉권]를 사용<br/><b>" + arr_msg[2] + "</b>님을 채팅금지 시켰습니다.<br/>남은시간 : <b>" + arr_msg[3] + "</b>초</td></tr></table></div>");
                }
                else if (arr_msg[0] == "<ITEM2") {
                    $("#msgs").append("<div><table class='tb_item'><tr><td><img alt=\"\" src=\"/pc/img/chat_item/item2.gif\"></td><td><b>" + arr_msg[1] + "</b>님이 [아봉쉴드]를 사용<br/>[아봉권]방어에 성공하였습니다.</td></tr></table></div>");
                }
                else if (arr_msg[0] == "<RANDBOX") {
                    $("#msgs").append("<div><table class='tb_item'><tr><td><img alt=\"\" src=\"/pc/img/chat_item/randbox_icon.png\"></td><td><b>" + arr_msg[1] + "</b>님이 랜덤박스에서<br/><b>" + Change_Money_String(arr_msg[2]) + "</b>골드를 획득하였습니다.</td></tr></table></div>");
                }
                else if (arr_msg[0] == "<NMT10") {
                $("#msgs").append("<div><table class='tb_item'><tr><td><img alt=\"\" src=\"/pc/img/chat_item/top10.gif\" style='height:40px;'></td><td><b>" + arr_msg[1] + "</b>님이<br/><b style='color:red;'>손익랭킹TOP10에 진입</b>하셨습니다.</td></tr></table></div>");
                }
                else if (arr_msg[0] == "<NRT10") {
                $("#msgs").append("<div><table class='tb_item'><tr><td><img alt=\"\" src=\"/pc/img/chat_item/top10.gif\" style='height:40px;'></td><td><b>" + arr_msg[1] + "</b>님이<br/><b style='color:red;'>승률랭킹TOP10에 진입</b>하셨습니다.</td></tr></table></div>");
                }
                else if (arr_msg[0] == "<UPMT10") {
                $("#msgs").append("<div><table class='tb_item'><tr><td><img alt=\"\" src=\"/pc/img/chat_item/top10.gif\" style='height:40px;'></td><td><b>" + arr_msg[1] + "</b>님 랭킹 상승<b style='color:red;'>▲<br/>손익랭킹 " + arr_msg[2] + "위</b>가 되었습니다.</td></tr></table></div>");
                }
                else if (arr_msg[0] == "<UPRT10") {
                $("#msgs").append("<div><table class='tb_item'><tr><td><img alt=\"\" src=\"/pc/img/chat_item/top10.gif\" style='height:40px;'></td><td><b>" + arr_msg[1] + "</b>님 랭킹 상승<b style='color:red;'>▲<br/>승률랭킹 " + arr_msg[2] + "위</b>가 되었습니다.</td></tr></table></div>");
                }
                arr_msg = null;
            }
        }
        else {
            arr_msg = msg.split(">");
            if (arr_msg.length < 3) $("#msgs").append("<div>" + msg + "</div>");
            else {
                if (arr_msg[1] == szNcik) chat_msg_class = "tdmy_chat";
                else chat_msg_class = "tdot_chat";
                if (prev_chat_nick == arr_msg[1]) {
                    prev_chat_nick = arr_msg[1];
                    chat_line_empty = "";
                }
                else {
                    prev_chat_nick = arr_msg[1];
                    chat_line_empty = "<div class=\"msg_line_empty\"></div>"

                }
                msg = chat_line_empty + "<div><table><tr><td class=\"tdlevel\"><img alt=\"\" src=\"/pc/img/level/elv"
                    + arr_msg[0] + ".gif\"/></td><td class=\"" + chat_msg_class + "\">" + "<div class='ept" + arr_msg[0] + "'></div>"
                    + "</font><font class=\"ftnick\">" + arr_msg[1]
                    + "</font><font class=\"ftmsg\">" + arr_msg[2] + "</font></td></tr></div>";
                $("#msgs").append(msg);
            }
            arr_msg = null;
        }
        $('#msgs').scrollTop($('#msgs').prop('scrollHeight'));
    };
}
//-----------------------------------------------------------------------------------------------------------------------
function connect_chat_server() {
    $("#enter_room_chat").click(function () {
        alert('준비중인 기능입니다.');
        return;
        var w = window.open("/pc/chat/room_chat_lobby.aspx", "", "width=1000px, height=700px");

        $.ajax({
            url: "/pc/chat/room_chat_lobby.aspx",
            success: function (data) {
                w.location = data;
            }
        });
        return false;
    });
    proc_chat_msg();
    $.connection.hub.start().done(start_chat());
}
//-----------------------------------------------------------------------------------------------------------------------
function start_chat() {

    $("#send").click(function () {
        //전송
        send_chat_msg();
    });
}
//-----------------------------------------------------------------------------------------------------------------------
function send_chat_msg() {
    if (szAccount == "") alert("로그인이 필요합니다.");
    else {
        if ($("#msg").val() != "") chat.server.clientToServer2($("#msg").val());
    }
    $("#msg").val("");
    $("#msg").focus();
}
//-----------------------------------------------------------------------------------------------------------------------
function send_chat_msg_rbbox(msg) {
    if (szAccount == "") alert("로그인이 필요합니다.");
    else
        chat.server.clientToServerRBM(msg);
}
//-----------------------------------------------------------------------------------------------------------------------
function msg_input_keypress(event) {
    if (event.keyCode == "13") {
        send_chat_msg();
        event.keyCode = 0;
    }
}
//-----------------------------------------------------------------------------------------------------------------------
function msg_input_keypress(event) {
    if (event.keyCode == "13") {
        send_chat_msg();
        event.keyCode = 0;
    }
}
//-----------------------------------------------------------------------------------------------------------------------