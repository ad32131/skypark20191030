<?php
include_once "./common.php";
?>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=utf-8" /><!-- /Added by HTTrack -->
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>
	스카이파크
</title>
    <script src="../Scripts/jquery-1.6.4.min.js"></script>
	<script src="../Scripts/jquery.signalR-2.4.0.min.js"></script>
	<script src="http://www.spark-pop.com/signalr/hubs"></script>
    
    <link rel="stylesheet" href="css/chat.css?v=1905271" /><link rel="stylesheet" href="css/layout7aff.css?v=1905271" /><link rel="stylesheet" href="css/common7aff.css?v=1905271" />
    <script type="text/javascript" src="js/common7aff.js?v=1905271" ></script>
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
            window.open("pop/pop_note_list.html", "note_list", "width=" + nWidth + ",height=" + nHeight + ",toolbar=no,top=" + y + ",left=" + x + ",directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
        }

        function pop_user_info() {
            var nWidth = 800;
            var nHeight = 500;
            var x = (screen.availWidth - nWidth) / 2;
            var y = (screen.availHeight - nHeight) / 2;
            window.open("pop/pop_user_info.html", "user_info", "width=" + nWidth + ",height=" + nHeight + ",toolbar=no,top=" + y + ",left=" + x + ",directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
        }

        function pop_rand_box() {
            var nWidth = 420;
            var nHeight = 600;
            var x = (screen.availWidth - nWidth) / 2;
            var y = (screen.availHeight - nHeight) / 2;
            window.open("pop/pop_rand_box.html", "rand_box", "width=" + nWidth + ",height=" + nHeight + ",toolbar=no,top=" + y + ",left=" + x + ",directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
        }
        function pop_api_sample() {
            var nWidth = 900;
            var nHeight = 1000;
            var x = (screen.availWidth - nWidth) / 2;
            var y = (screen.availHeight - nHeight) / 2;
            window.open("pop/api_sample_view.html", "rand_box", "width=" + nWidth + ",height=" + nHeight + ",toolbar=no,top=" + y + ",left=" + x + ",directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
        }

    </script>
    <script type="text/javascript" src="js/chat94b1.js?v=20190911212339" ></script>
    
    
    <link rel="stylesheet" href="css/bxslider06ae.css?v=0429"/> 
    <script type="text/javascript" src="js/jquery.bxslider.min06ae.js?v=0429"></script>
    <!--<script src="https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.min.js"></script>-->
    <script type="text/javascript">
        $(document).ready(function () {
            $('.bxslider').bxSlider({
                auto: true,
                touchEnabled: false,
                infiniteLoop: true,
                autoControls: false,
                controls: false,
                autoHover: false,
                pager: false,
                pause: 3000
            });
        });
    </script>
    <script type="text/javascript">
        var nRank_Change_Count = "1";
        var nBanner_Change_Count = "1";
        //--------------------------------------------------------------------------------------
        function go_board_read(IDX)
        {
            location.href = "board_view.php?IDX=" + IDX;
        }
        function change_rank_div(type) {
            document.getElementById("div_top10_rank1").style.display = "none";
            document.getElementById("div_top10_rank2").style.display = "none";
            document.getElementById("div_top10_rank" + type).style.display = "block";
            document.getElementById("bt_select_rank1").className = "prev_rank_button";
            document.getElementById("bt_select_rank2").className = "prev_rank_button";
            document.getElementById("bt_select_rank" + type).className = "now_rank_button";
            document.getElementById("top_right_banner1").style.display = "none";
            document.getElementById("top_right_banner2").style.display = "none";
            document.getElementById("top_right_banner" + type).style.display = "block";
        }
        function auto_change_rank_div() {
            if (nRank_Change_Count == "1") {
                change_rank_div('2');
                nRank_Change_Count = "2";
            }
            else {
                change_rank_div('1');
                nRank_Change_Count = "1";
            }
        }
        function get_rank1() {
            $.ajax({
                type: "get",
                url: "/game_data/rank/mr10.html?v=" + Date.parse(new Date()),
                success: function(oHtml) {
                    document.getElementById("div_top10_rank1").innerHTML = oHtml;
                }
            });
        }
        function get_rank2() {
            $.ajax({
                type: "get",
                url: "/game_data/rank/wr10.html?v=" + Date.parse(new Date()),
                success: function(oHtml) {
                    document.getElementById("div_top10_rank2").innerHTML = oHtml;
                }
            });
        }
    </script>
    <style type="text/css">
        .now_rank_button{background-color:#2d5288; border:1px solid #2d5288; color:#fff; font-size:12px; padding:3px 5px; cursor:pointer;}
        .prev_rank_button{background-color:white; border:1px solid #d8d7dc; color:#2d5288; font-size:12px; padding:3px 5px; cursor:pointer;}
    </style>
</head>
<body>
    
    <form method="post" action="index.php" id="form1">
<div class="aspNetHidden">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="YV/pLt7h5b+LuCyWgX0LX58ACwaOBGPFKL2t8OtoyZg1amQyOhi7U9fzBzT+UZgUXgpWtRtsweEhIp/u2zaRAOQzTbb8d+x+dpHn1KH4HzQ=" />
</div>

<div class="aspNetHidden">

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="15D2FB27" />
	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="VwdeuDnGkavhOaH8IW0/JC5EaD+CE+FXiXcYq0kyJbtCVxpzw1JcuWq+NvK/3FUswi3xnC/CT5b7TZHeJxiZH3z2ANFgFRWzAWu8oJ6EsqNrKwjryvMbYJd4pJlowiTG" />
</div>
        <div style="display:none"><input type="submit" name="ctl00$btnNull" value="" onclick="return false;" id="btnNull" /></div>
        <div style="position:fixed; left:-9000px;"><img alt="" src="img/main_logo4.png" /></div>
    <div>
        <?php
        title_menu();
        ?>
        <div class="main_body">
            <?php
            content_menu();
            ?>
            <div>
                <div class="div_chat">
                    <?php is_login($member['mb_id'],$member['mb_level'],$member['mb_nick'],(G5_PATH?G5_PATH:$g4['path']),$member['mb_point']); ?>

                    <div class="div_split_height"></div>
                    <?php
                    uchat_writer($member['mb_id'],$member['mb_level'],$member['mb_nick'],(G5_PATH?G5_PATH:$g4['path']) );
                    ?>
                </div>
                <div class="div_content">
                    
    <div class="promotion_line">

        <div class="div_promotion1">
            <ul class="bxslider">
                <li><img alt="" src="img/banner/95.png"/></li>
                <!--
                <li><img alt="" src="img/banner/96.png"/></li>
                <li><img alt="" src="img/banner/main_banner_kr1.jpg"/></li>
                -->
            </ul> 
        </div>

        <div class="div_promotion2">
            <div id="top_right_banner1">
                <a href="#">
                    <img alt="" src="img/banner/tazza16.png"/>
                </a>
            </div>
            <div id="top_right_banner2" style="display:none;">
                <a href="#">
                    <img alt="" src="img/banner/rand_box.gif"/>
                </a>
            </div>
        </div>
    </div>
    <div style="clear:both;"></div>
    <div class="game_banner_line">
        <div class="div_promot_game1">
            <div style="position:absolute; width:260px; height:330px; background-color:white; font-size:12px;">
                <div style="padding:8px 10px;">
                    <div style="height:23px; line-height:23px; background-image:url('img/rank_top_10.png'); background-repeat:no-repeat;background-position:left; background-position-x:5px; text-align:right;">
                        <a href="javascript:change_rank_div('1');" id="bt_select_rank1" class="now_rank_button">손익</a>
                        <a href="javascript:change_rank_div('2');" id="bt_select_rank2" class="prev_rank_button">승률</a>
                    </div>
                    <div style="height:10px;"></div>
                    <?php rank_write((G5_PATH?G5_PATH:$g4['path'])) ?>
                    <?php win_write((G5_PATH?G5_PATH:$g4['path'])) ?>
                    <script>get_rank1(); get_rank2();</script>
                </div>
            </div>
        </div>
        <script type="text/javascript">setInterval('auto_change_rank_div()', 10000);</script>



        <div class="div_promot_game2" ><img alt="" src="img/notice_title.png" />
                <?php select_main_event_subject_view(); ?>
        </div>
        <div class="div_promot_game3"><img alt="" src="img/notice_title.png" />
                <?php select_main_event_subject_view(); ?>
        </div>
    </div>
    <div style="clear:both;"></div>
    <div class="notice_line">
        <div class="div_event_banner"></div>
        <div class="div_notice_zone">
            
            <div class="div_notice_zone_title"><img alt="" src="img/notice_title.png" /></div>
                <div style="padding:0px 10px 10px 10px;">
                                <?php select_main_notice_subject_view(); ?>
                    </div>
            </div>
            
        </div>
    </div>
    <div style="clear:both;"></div>

                </div>
                <div style="clear:both;"></div>
                <?php bottom_content(); ?>
                
            </div>
        </div>


        <script type="text/javascript">connect_chat_server();</script>
    </div>
    </form>
</body>

<!-- Mirrored from www.spark-pop.com/pc/Default.aspx by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 11 Sep 2019 12:24:51 GMT -->
</html>
