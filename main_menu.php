<?php

function title_menu_draw($TITLE_HREF,$TEXT){
//
    echo "<a href=\"$TITLE_HREF\">$TEXT</a>";
}

function content_menu_draw($MENU_URL,$MENU_IMG,$MENU_ALT){
    echo "<div class=\"main_menu\"><a href=\"$MENU_URL\"><img alt=\"\" src=\"$MENU_IMG\" alt=\"$MENU_ALT\" /></a></div>";
}

function content_menu_draw_tmp($MENU_URL,$MENU_IMG,$MENU_ALT){
    echo "<div class=\"main_menu\"><a href=\"$MENU_URL\">$MENU_ALT</a></div>";
}

function title_menu(){
    echo "<div class=\"main_page_top_line\">";
    echo "<div class=\"top_line_zone\" style=\"font-size:12px;\">";
    echo "<a href=\"javascript:pop_rand_box();\" style=\"padding:0; margin:0;\">";
echo "<div style=\"float:left; margin-left:10px;\">";
echo "<div style=\"width:23px; padding:5px 0px; height:20px; float:left;\"><img src=\"img/icon/rand_box_icon.png\" style=\"height:20px; display:block;\" /></div>";
echo "<div style=\"color:#c5cfff; float:left; text-align:left;\">랜덤박스</div>";
echo "<div style=\"width:100px; padding:9px; height:12px; float:left;\">";
echo "<div style=\"height:12px; border-radius:5px; background-color:#c2ebff;\">";
echo "<div style=\"float:left; height:12px; border-radius:5px; background-color:#2ef706; width:0px;\">";
echo "</div>";
echo "</div>";
echo "</div>";
echo "<div style=\"color:#c5cfff; float:left; text-align:left;\">달성률 0%</div>";
echo "</div>";
echo "</a>";
    title_menu_draw("javascript:pop_api_sample();","영상API샘플");
    title_menu_draw("Default.html","영상API문의");
    title_menu_draw("Default.html","고객센터");
    title_menu_draw("/admin/bbs/logout.php","로그아웃");

//is login??
//echo "<a href=\"Default.html\" style=\"margin-right:10px;\">로그아웃</a>";
echo "</div>";
echo "</div>";
}

function content_menu(){
    echo "<div class=\"logo_line\">";
    echo "<div class=\"logo_zone\">";
    echo "<a href=\"Default.html\">";
    echo "<img alt=\"\" src=\"img/main_logo4.png\" />";
    echo "</a>";
    echo "</div>";
    /*
    content_menu_draw("guide/gameguide.html","img/mnt01.png","스포츠중계");
    content_menu_draw("guide/gameguide.html","img/mnt02.png","라이브스코어");
    content_menu_draw("item_shop/item_shop.html","img/mnt03.png","스포츠분석");
    content_menu_draw("notice_board.html","img/mnt04.png","인증업체");
    content_menu_draw("guide/gameguide.html","img/mnt05.png","커뮤니티");
    content_menu_draw("guide/gameguide.html","img/mnt06.png","출석부");
    content_menu_draw("guide/gameguide.html","img/mnt07.png","아이콘샵");
    content_menu_draw("guide/gameguide.html","img/mnt08.png","포인트전환");
    */

    content_menu_draw_tmp("guide/gameguide.html","img/mnt01.png","스포츠중계");
    content_menu_draw_tmp("guide/gameguide.html","img/mnt02.png","라이브스코어");
    content_menu_draw_tmp("item_shop/item_shop.html","img/mnt03.png","스포츠분석");
    content_menu_draw_tmp("notice_board.html","img/mnt04.png","인증업체");
    content_menu_draw_tmp("guide/gameguide.html","img/mnt05.png","커뮤니티");
    content_menu_draw_tmp("guide/gameguide.html","img/mnt06.png","출석부");
    content_menu_draw_tmp("guide/gameguide.html","img/mnt07.png","아이콘샵");
    content_menu_draw_tmp("guide/gameguide.html","img/mnt08.png","포인트전환");
    //echo "<div class=\"main_menu\"><a href=\"guide/gameguide.html\"><img alt=\"\" src=\"img/mnt02.png\" alt=\"라이브스코어\" /></a></div>";
    //echo "<div class=\"main_menu\"><a href=\"item_shop/item_shop.html\"><img alt=\"\" src=\"img/mnt03.png\" alt=\"스포츠분석\" /></a></div>";
    //echo "<div class=\"main_menu\"><a href=\"notice_board.html\"><img alt=\"\" src=\"img/mnt04.png\" alt=\"인증업체\" /></a></div>";
    echo "</div>";
}

function uchat_writer($mb_id,$mb_level,$mb_nick,$mb_icon){

if(!function_exists('uchat_array2data')) {
	function uchat_array2data($arr) {
		$arr['time'] = time();
		ksort($arr);
		$arr = array_filter($arr);
		$arr['hash'] = md5(implode($arr['token'], $arr));
		unset($arr['token']);
		foreach ($arr as $k => &$v){ $v = $k.' '.urlencode($v); }
		return implode("|", $arr);
	}
}
$joinData = array();
$joinData['room'] = 'ad32131';
$joinData['token'] = '518df2cf6bf58d5b80f18827de943259';

$joinData['nick'] = $mb_nick;
$joinData['id'] = $mb_id;
$joinData['level'] = $mb_level;
if($mb_level === "10") $joinData['auth'] = "admin";
else $joinData['auth'] = "";
if(!empty($mb_id)) {
	$uicon_file = "/data/member/".substr($mb_id,0,2)."/".$mb_id.".gif";
	if(file_exists($mb_icon.$uicon_file))
		$joinData['icons'] = "admin/".$uicon_file;
}
//$joinData['nickcon'] = '';
//$joinData['other'] = '';

echo "<script async src=\"//client.uchat.io/uchat.js\"></script>";
echo "<u-chat room='";
echo $joinData['room'];
echo "'user_data='";
echo uchat_array2data($joinData);
echo "' style=\"display:inline-block; width:320px; height:500px;\"></u-chat>";

}

function bottom_content(){
    echo "<div class=\"div_game_menu_zone\">";
    echo "<div class=\"game_menu_title_line\"> <img alt=\"\" src=\"img/title_skypark_games.png\" /> </div>";
    echo "<div class=\"div_line_1px\"></div>";
    echo "<div class=\"game_menu_line\">";
    echo "<div class=\"game_menu_box\" onclick=\"move_game_lobby('14');\">";
    echo "<div class=\"game_menu_img\"><img alt=\"\" src=\"img/game_icon/gm_banner14.png\" /></div>";
    echo "<div class=\"game_menu_text\">";
    echo "<div class=\"game_name\">해달별</div>";
    echo "<div class=\"game_detail\">하늘의 최강자를 가린다!</div>";
    echo "</div>";
    echo "</div>";
    echo "</div>";
    echo "<div style=\"height:20px;\"></div>";
    echo "</div>";
}

function footer(){
    echo "<div class=\"div_footer\">";
    echo "<div style=\"height:46px; text-align:center; line-height:46px; color:#999;\">";
    echo "회사소개 &nbsp;&nbsp;<span style=\"color:#ddd;\">|</span>&nbsp;&nbsp; <a href=\"agreement.html\" style=\"text-decoration:none; color:#999;\">이용약관</a> &nbsp;&nbsp;<span style=\"color:#ddd;\">|</span>&nbsp;&nbsp;개인정보처리방침 &nbsp;&nbsp;<span style=\"color:#ddd;\">|</span>&nbsp;&nbsp; <a href=\"index.php\" style=\"text-decoration:none; color:#999;\">제휴문의</a> &nbsp;&nbsp;<span style=\"color:#ddd;\">|</span>&nbsp;&nbsp; <a href=\"index.php\" style=\"text-decoration:none; color:#999;\">고객센터</a>";
    echo "</div>";
    echo "<div class=\"div_line_1px\"></div>";
    echo "<div>";
    echo "<div style=\"width:1130px; margin-top:10px; margin-left:auto; margin-right:auto;\">";
    echo "<img alt=\"\" src=\"img/bottom4.png\" />";
    echo "</div>";
    echo "</div>";
    echo "</div>";
}

?>