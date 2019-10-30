<?php
include_once('../common_login_title.php');





//include_once(G5_PATH.'/head.sub.php');

// IP보이기 사용 여부



include_once(G5_BBS_PATH.'/board_head.php');

// 게시물 아이디가 있다면 게시물 보기를 INCLUDE

// 전체목록보이기 사용이 "예" 또는 wr_id 값이 없다면 목록을 보임
//if ($board['bo_use_list_view'] || empty($wr_id))



include_once(G5_BBS_PATH.'/board_tail.php');

//echo "\n<!-- 사용스킨 : ".(G5_IS_MOBILE ? $board['bo_mobile_skin'] : $board['bo_skin'])." -->\n";

//include_once(G5_PATH.'/tail.sub.php');
?>
