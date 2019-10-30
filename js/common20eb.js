function Change_Money_String(szMoney) {
    var formatNum = "";
    szMoney = szMoney.replace(/,/g, "");
    formatNum = szMoney.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    return formatNum;
}
