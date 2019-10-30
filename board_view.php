<?php
include_once "common.php";
?>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>
    스카이파크
</title>
    <script src="/Scripts/jquery-1.6.4.min.js"></script>
    <script src="/Scripts/jquery.signalR-2.4.0.min.js"></script>
    <script src="/signalr/hubs"></script>

    <link rel="stylesheet" href="./css/chat.css?v=1905271" /><link rel="stylesheet" href="./css/layout.css?v=1905271" /><link rel="stylesheet" href="./css/common.css?v=1905271" />
    <script type="text/javascript" src="./js/common.js?v=1905271" ></script>
    <script type="text/javascript">
        var chat;
        var szAccount = "";
        var szNcik = "";
        var chat_id = "";

        function pop_note_list() {
            var nWidth = 800;
            var nHeight = 500;
            var x = (screen.availWidth - nWidth) / 2;
            var y = (screen.availHeight - nHeight) / 2;
            window.open("./pop/pop_note_list.aspx", "note_list", "width=" + nWidth + ",height=" + nHeight + ",toolbar=no,top=" + y + ",left=" + x + ",directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
        }

        function pop_user_info() {
            var nWidth = 800;
            var nHeight = 500;
            var x = (screen.availWidth - nWidth) / 2;
            var y = (screen.availHeight - nHeight) / 2;
            window.open("./pop/pop_user_info.aspx", "user_info", "width=" + nWidth + ",height=" + nHeight + ",toolbar=no,top=" + y + ",left=" + x + ",directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
        }

        function pop_rand_box() {
            var nWidth = 420;
            var nHeight = 600;
            var x = (screen.availWidth - nWidth) / 2;
            var y = (screen.availHeight - nHeight) / 2;
            window.open("./pop/pop_rand_box.aspx", "rand_box", "width=" + nWidth + ",height=" + nHeight + ",toolbar=no,top=" + y + ",left=" + x + ",directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
        }
        function pop_api_sample() {
            var nWidth = 900;
            var nHeight = 1000;
            var x = (screen.availWidth - nWidth) / 2;
            var y = (screen.availHeight - nHeight) / 2;
            window.open("./pop/api_sample_view.aspx", "rand_box", "width=" + nWidth + ",height=" + nHeight + ",toolbar=no,top=" + y + ",left=" + x + ",directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
        }

    </script>
    <script type="text/javascript" src="./js/chat.js?v=20191029145036" ></script>

    <style type="text/css">
        .div_content_pd5 .subject {background-image:url('./img/page_title/title_notice2.png'); background-repeat:no-repeat;}
        .tb_solid_table { width:100%; border-collapse:separate; empty-cells:show; padding:0px;  border-spacing:1px; background-color:#2d5288;}
        .tb_solid_table th {padding:0px;}
        .tb_solid_table td {padding:0px; background-color:white;}
        .tb_solid_table .title {width:19%; height:40px; background-color:#848bbd; color:white; font-weight:700; text-align:center;}
        .tb_solid_table .body {width:81%; height:40px; padding: 0px 0px 0px 10px; color:red;  }
        .tb_solid_table .body_white {width:81%; height:40px; padding: 0px 0px 0px 10px; color:white; }
        .tb_solid_table .body_normal { height:40px; padding: 0px 0px 0px 10px; color:#000; }
        .tb_solid_table .body_normal img {float:left; cursor:initial;}
        .tb_solid_table .body_normal embed {float:left; cursor:initial;}
        .tb_solid_table .body_normal span {float:left; line-height:35px; margin-left:4px;}
        .tb_solid_table .body_view { padding: 10px 10px 10px 10px; word-break:break-word; vertical-align:top; }
        .tb_solid_table .body .td_buttons{ padding:0px 3px 0px 3px;}
        .tb_solid_table .body img { vertical-align:middle; cursor:pointer;}
    </style>
    <script type="text/javascript">
        //--------------------------------------------------------------------------------------
        function write_reply( szIDX ) {
            PageMethods.Wrtie_Reply(szIDX, document.getElementById("ip_reply").value,
                function (result) {
                    if (result == "ok") {
                        location.href = location.href;
                        alert("요청이 완료되었습니다.");
                    }
                    else if (result == "rp") {
                        alert("댓글 작성 이벤트 포인트가 적립되었습니다.");
                        location.href = location.href;
                    }
                    else if (result == "logout") location.href = location.href;
                    else {
                        alert(result);
                    }
                });
        }
        //--------------------------------------------------------------------------------------
        function delete_reply(szReply_IDX, szBoard_IDX) {
            PageMethods.Delete_Reply(szReply_IDX, szBoard_IDX,
                function (result) {
                    if (result == "ok") {
                        location.href = location.href;
                        alert("요청이 완료되었습니다.");
                    }
                    else if (result == "logout") location.href = location.href;
                    else {
                        alert(result);
                    }
                });
        }
        //--------------------------------------------------------------------------------------
        function revise_board(szIDX) {
            PageMethods.Revise_Board(szIDX,
                function (result) {
                    if (result == "ok") {
                        location.href = "board_revise.aspx?IDX=" + szIDX;
                    }
                    else if (result == "logout") location.href = location.href;
                    else {
                        alert(result);
                    }
                });
        }
        //--------------------------------------------------------------------------------------
        function delete_board(szIDX) {
            PageMethods.Delete_Board(szIDX,
                function (result) {
                    if (result == "ok") {
                        alert("요청이 완료되었습니다.");
                        location.href = "board.aspx";
                    }
                    else if (result == "logout") location.href = location.href;
                    else {
                        alert(result);
                    }
                });
        }

        //--------------------------------------------------------------------------------------
    </script>
</head>
<body>

<form method="post" action="./board_view.aspx?IDX=93214" id="form1">
    <div class="aspNetHidden">
        <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="y88nX3nD6I5fcUTQHGKAatRZO6M1HIyop7abvGCzUlHN7c9dQfJPb3j7FWKwQotWI7IIXq6UKXJRkP9+xo+ilnOYI58JmRR5tzuF7MLom6E=" />
    </div>

    <div class="aspNetHidden">

        <input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="D76EBC5E" />
        <input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="ztr/VAvw166ykEAdZ0twATn/UNfdaTt2kkprcryatQpR16TZhiK30CJrT9ZDzome+UEUfK3LiCgeEItuiAPrA6DDrfnulmGR5i2aZxCPDm4XXaaDredgdheYL03BNCH7" />
    </div>
    <div style="display:none"><input type="submit" name="ctl00$btnNull" value="" onclick="return false;" id="btnNull" /></div>
    <div style="position:fixed; left:-9000px;"><img alt="" src="./img/main_logo4.png" /></div>
    <div>
        <div class="main_page_top_line">
            <div class="top_line_zone" style="font-size:12px;">
                <a href="javascript:pop_rand_box();" style="padding:0; margin:0;">
                    <div style="float:left; margin-left:10px;">
                        <div style="width:23px; padding:5px 0px; height:20px; float:left;"><img src="./img/icon/rand_box_icon.png" style="height:20px; display:block;" /></div>
                        <div style="color:#c5cfff; float:left; text-align:left;">랜덤박스</div>
                        <div style="width:100px; padding:9px; height:12px; float:left;">
                            <div style="height:12px; border-radius:5px; background-color:#c2ebff;">
                                <div style="float:left; height:12px; border-radius:5px; background-color:#2ef706; width:0px;">
                                </div>
                            </div>
                        </div>
                        <div style="color:#c5cfff; float:left; text-align:left;">달성률 0%</div>
                    </div>
                </a>
                <a href="javascript:pop_api_sample();">영상API샘플</a>
                <a href="./contact.aspx">영상API문의</a>
                <a href="./contact.aspx">고객센터</a>
                <a href="./logout.aspx" style="margin-right:10px;">로그아웃</a>
            </div>
        </div>
        <div class="main_body">
            <div class="logo_line">
                <div class="logo_zone">
                    <a href="./Default.aspx">
                        <img alt="" src="./img/main_logo4.png" />
                    </a>
                </div>
                <div class="main_menu"><a href="./lobby.aspx"><img alt="" src="./img/mnt01.png" /></a></div>
                <div class="main_menu"><a href="./guide/gameguide.aspx"><img alt="" src="./img/mnt02.png" /></a></div>
                <div class="main_menu"><a href="./item_shop/item_shop.aspx"><img alt="" src="./img/mnt03.png" /></a></div>
                <div class="main_menu"><a href="./notice_board.aspx"><img alt="" src="./img/mnt04.png" /></a></div>
                <div class="main_menu"><a href="./dealer_intro.aspx"><img alt="" src="./img/mnt05.png" /></a></div>
                <div class="main_menu"><a href="./free_refill.aspx"><img alt="" src="./img/mnt06.png" /></a></div>
                <div class="main_menu"><a href="./user_rank.aspx"><img alt="" src="./img/mnt07.png" /></a></div>
                <div class="main_menu"><a href="./game_result.aspx"><img alt="" src="./img/mnt08.png" /></a></div>
            </div>
            <div>
                <div class="div_chat">
                    <div class="login_box">

                        <div style="height:4px;"></div>
                        <div>
                            <div style="width:280px; margin-left:auto; margin-right:auto;">
                                <div style="height:40px; line-height:40px;">
                                    로그인 이후 컨텐츠 이용이 가능합니다.
                                </div>
                                <div class="login_button_box">
                                    <a href="./login.aspx"><img alt="" src="./img/login_button.png" /></a>
                                </div>
                                <div style="height:40px; line-height:40px;">
                                    <span style="float:left;"><a href="/SignUp.aspx">간편 회원가입</a></span>
                                    <span style="float:right;"><a href="/find_id.aspx" style="font-weight:100;">아이디 찾기</a></span>
                                    <span style="float:right; padding:0 10px; font-size:8px; color:#dbdbdb">|</span> <span style="float:right;"><a href="/find_passwd.aspx" style="font-weight:100;">비밀번호 찾기</a></span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="div_split_height"></div>
                    <div class="chat_box">
                        <div style="position:absolute; height:440px; width:60px; margin-left:-64px;margin-top:-3px;">
                            <div id="enter_room_chat" style="height:63px; cursor:pointer;">
                                <img alt="" src="./img/chat_room_icon2.png" />
                            </div>
                        </div>
                        <div id="msgs" class="msg_box">
                            <div style="text-align:center;">
                                <img alt="" src="./img/chat_loading.gif" style="margin-left:auto; margin-right:auto;" />
                            </div>
                        </div>
                        <div class="div_chat_input_line">
                            <input autocomplete="off" type="text" id="msg" onkeypress="javascript: msg_input_keypress(event);" class="chat_msg_input" />
                            <input type="button" id="send" value="전송" / class="send_button" />
                        </div>
                    </div>
                </div>
                <div class="div_content">

                    <div class="div_content_pd5">
                        <div class="subject" ></div>
                        <div class="w_rap">
                            <div class="div_list">
                                <table class="tb_solid_table">
                                    <?php
                                    select_main_notice_content_view($_GET[IDX]);
                                    ?>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="div_body">
                        <div class="content">
                            <div class="body_title">
                                <img alt="" src="images/tt9.png" />
                            </div>

                            <div class="height_20"></div>
                            <div id="div_Bet_List">
                            </div>
                            <div class="height_20"></div>
                            <div class="div_list" id="div_reply_list">
                            </div>

                        </div>
                        <div class="height_20"></div>
                        <div id="ContentPlaceHolder1_div_buttons" style="text-align:center;"></div>
                        <div class="height_10"></div>
                    </div>

                </div>
                <div style="clear:both;"></div>
                <div class="div_game_menu_zone">
                    <div class="game_menu_title_line"> <img alt="" src="./img/title_skypark_games.png" /> </div>
                    <div class="div_line_1px"></div>
                    <div class="game_menu_line">
                        <div class="game_menu_box" onclick="move_game_lobby('14');">
                            <div class="game_menu_img"><img alt="" src="./img/game_icon/gm_banner14.png" /></div>
                            <div class="game_menu_text">
                                <div class="game_name">해달별</div>
                                <div class="game_detail">하늘의 최강자를 가린다!</div>
                            </div>
                        </div>
                        <div class="game_menu_box" onclick="move_game_lobby('2');">
                            <div class="game_menu_img"><img alt="" src="./img/game_icon/gm_banner2.png" /></div>
                            <div class="game_menu_text">
                                <div class="game_name">바카라</div>
                                <div class="game_detail">두근두근 악마의 게임!</div>
                            </div>
                        </div>
                        <div class="game_menu_box" onclick="move_game_lobby('3');">
                            <div class="game_menu_img"><img alt="" src="./img/game_icon/gm_banner3.png" /></div>
                            <div class="game_menu_text">
                                <div class="game_name">스피드 바카라</div>
                                <div class="game_detail">쉴틈이 없다! 더욱 빠르게!</div>
                            </div>
                        </div>
                        <div class="game_menu_box" onclick="move_game_lobby('4');">
                            <div class="game_menu_img"><img alt="" src="./img/game_icon/gm_banner4.png" /></div>
                            <div class="game_menu_text">
                                <div class="game_name">보험 바카라</div>
                                <div class="game_detail">안전을 위한 선택!</div>
                            </div>
                        </div>
                        <div class="game_menu_box" onclick="move_game_lobby('5');">
                            <div class="game_menu_img"><img alt="" src="./img/game_icon/gm_banner5.png" /></div>
                            <div class="game_menu_text">
                                <div class="game_name">포커</div>
                                <div class="game_detail">최고의 패를 쥐어라!</div>
                            </div>
                        </div>
                    </div>

                    <div class="game_menu_line">
                        <div class="game_menu_box" onclick="move_game_lobby('6');">
                            <div class="game_menu_img"><img alt="" src="./img/game_icon/gm_banner6.png" /></div>
                            <div class="game_menu_text">
                                <div class="game_name">페어게임</div>
                                <div class="game_detail">아슬아슬한 한끗 승부!</div>
                            </div>
                        </div>
                        <div class="game_menu_box" onclick="move_game_lobby('7');">
                            <div class="game_menu_img"><img alt="" src="./img/game_icon/gm_banner7.png" /></div>
                            <div class="game_menu_text">
                                <div class="game_name">스카이 홀짝</div>
                                <div class="game_detail">둘중 하나만 골라 홀 OR 짝?</div>
                            </div>
                        </div>
                        <div class="game_menu_box" onclick="move_game_lobby('8');">
                            <div class="game_menu_img"><img alt="" src="./img/game_icon/gm_banner8.png" /></div>
                            <div class="game_menu_text">
                                <div class="game_name">드래곤 타이거</div>
                                <div class="game_detail">최강은 누구인가?</div>
                            </div>
                        </div>
                        <div class="game_menu_box" onclick="move_game_lobby('9');">
                            <div class="game_menu_img"><img alt="" src="./img/game_icon/gm_banner9.png" /></div>
                            <div class="game_menu_text">
                                <div class="game_name">스카이 블랙잭</div>
                                <div class="game_detail">버스트인가 메이드인가? 한장 더!</div>
                            </div>
                        </div>
                        <div class="game_menu_box" onclick="move_game_lobby('10');">
                            <div class="game_menu_img"><img alt="" src="./img/game_icon/gm_banner10.png" /></div>
                            <div class="game_menu_text">
                                <div class="game_name">삼치기</div>
                                <div class="game_detail">그시절 우리가 좋아했던 게임</div>
                            </div>
                        </div>
                    </div>

                    <div class="game_menu_line">
                        <div class="game_menu_box" onclick="move_game_lobby('11');">
                            <div class="game_menu_img"><img alt="" src="./img/game_icon/gm_banner11.png" /></div>
                            <div class="game_menu_text">
                                <div class="game_name">주사위</div>
                                <div class="game_detail">행운을 굴려보자!</div>
                            </div>
                        </div>
                        <div class="game_menu_box" onclick="move_game_lobby('12');">
                            <div class="game_menu_img"><img alt="" src="./img/game_icon/gm_banner12.png" /></div>
                            <div class="game_menu_text">
                                <div class="game_name">스카이 룰렛</div>
                                <div class="game_detail">판은 오늘도 돌고있다</div>
                            </div>
                        </div>
                        <div class="game_menu_box" onclick="move_game_lobby('13');">
                            <div class="game_menu_img"><img alt="" src="./img/game_icon/gm_banner13.png" /></div>
                            <div class="game_menu_text">
                                <div class="game_name">윷놀이</div>
                                <div class="game_detail">신선하게 즐기는 우리네 전통놀이</div>
                            </div>
                        </div>
                    </div>
                    <div style="height:20px;"></div>
                </div>

            </div>
        </div>
        <div class="div_footer">
            <div style="height:46px; text-align:center; line-height:46px; color:#999;">
                회사소개 &nbsp;&nbsp;<span style="color:#ddd;">|</span>&nbsp;&nbsp; <a href="./agreement.aspx" style="text-decoration:none; color:#999;">이용약관</a> &nbsp;&nbsp;<span style="color:#ddd;">|</span>&nbsp;&nbsp;개인정보처리방침 &nbsp;&nbsp;<span style="color:#ddd;">|</span>&nbsp;&nbsp; <a href="./contact.aspx" style="text-decoration:none; color:#999;">제휴문의</a> &nbsp;&nbsp;<span style="color:#ddd;">|</span>&nbsp;&nbsp; <a href="./contact.aspx" style="text-decoration:none; color:#999;">고객센터</a>
            </div>
            <div class="div_line_1px"></div>
            <div>
                <div style="width:1130px; margin-top:10px; margin-left:auto; margin-right:auto;">
                    <img alt="" src="./img/bottom4.png" />
                </div>
            </div>
        </div>
        <script type="text/javascript">connect_chat_server();</script>
    </div>
</form>
</body>
</html>
