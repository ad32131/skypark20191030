var bfRefreshTime = 500;
var newxml, oldxml;
var xmlLive = null;
var parser = null;
var oSerializer = null;
var isIE = true;
var SHOW_GAME;


if (window.ActiveXObject) {
    try {
        xmlLive = new ActiveXObject("Microsoft.XMLHTTP");
    }
    catch (e) {
        xmlLive = new ActiveXObject("MsXml2.XMLHTTP");
    }
    isIE = true;
}
else {
    xmlLive = new XMLHttpRequest();
    parser = new DOMParser();
    oSerializer = new XMLSerializer();
    isIE = false;
}
//------------------------------------------------------------------------------
function OpenXml_Live() {
    try {
        xmlLive.open("get", "/game_data/xml/" + ROOM_NUM + ".xml?v=" + Date.parse(new Date()), true);
        xmlLive.onreadystatechange = livexmlonreadystatechange;
        xmlLive.send(null);
    }
    catch (e) {
        ;
    }
    if (typeof (OpenXml_Timer) == "number")
        clearTimeout(OpenXml_Timer);
    OpenXml_Timer = setTimeout("OpenXml_Live()", bfRefreshTime);
}
//------------------------------------------------------------------------------
function livexmlonreadystatechange() {
    if (xmlLive.readyState != 4 || (xmlLive.status != 200 && xmlLive.status != 0)) return;
    if (isIE) {
        XmlDocLive = xmlLive.responseXML;
        newxml = XmlDocLive.xml;
        if (newxml == "" || oldxml == newxml)
            return;
    }
    else {
        XmlDocLive = parser.parseFromString(xmlLive.responseText, "text/xml");
        if (XmlDocLive.documentElement.tagName == "parsererror") return;
        newxml = oSerializer.serializeToString(XmlDocLive.documentElement);
        if (newxml == "" || oldxml == newxml) return;
    }
    oldxml = newxml;
    var root = XmlDocLive.documentElement;
    var oNode = root.firstChild;
    var cNode = oNode.firstChild;
    while (cNode != null) {
        if (cNode.nodeName == "STATE") {
            STATE = cNode.textContent;
        }
        if (cNode.nodeName == "NOW_GAME") {
            NOW_GAME = cNode.textContent;
        }
        if (cNode.nodeName == "GET_CARD") {
            GET_CARD = cNode.textContent;
        }
        if (cNode.nodeName == "CAL_CARD") {
            CAL_CARD = cNode.textContent;
        }
        if (cNode.nodeName == "RESULT_DETAIL") {
            RESULT_DETAIL = cNode.textContent;
        }
        if (cNode.nodeName == "HISTORY_ORDER") {
            HISTORY_ORDER = cNode.textContent;
        }
        if (cNode.nodeName == "HIS_INFO") {
            HIS_INFO = cNode.textContent;
        }
        if (cNode.nodeName == "EXPECT") {
            EXPECT = cNode.textContent;
        }
        if (cNode.nodeName == "CARD_COLOR") {
            CARD_COLOR = cNode.textContent;
        }
        if (cNode.nodeName == "END_BET_TIME") {
            END_BET_TIME = cNode.textContent;
        }
        if (cNode.nodeName == "CHECK_CARD_TIME") {
            CHECK_CARD_TIME = cNode.textContent;
        }
        if (cNode.nodeName == "BCI_RATE") {
            BCI_RATE = cNode.textContent;
        }
        if (cNode.nodeName == "SUB_GAME") {
            SUB_GAME = cNode.textContent;
        }
        if (cNode.nodeName == "NOW_HORSE") {
            NOW_HORSE = cNode.textContent;
        }
        if (cNode.nodeName == "SHOW_GAME") {
            SHOW_GAME = cNode.textContent;
        }
        if (cNode.nodeName == "ABLE_SUB_BET") {
            ABLE_SUB_BET = cNode.textContent;
        }
        cNode = cNode.nextSibling;
    }
    Game_Proc();
}
//------------------------------------------------------------------------------