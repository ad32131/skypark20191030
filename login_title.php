<?php


include_once('./asset.php');

function is_login($mb_id,$mb_level,$mb_nick,$mb_icon,$mb_point){
    if( !empty($mb_id)){
        echo "<div class=\"login_box\">";
        echo "<div style=\"padding:10px; height:120px; \">";
        echo "<div style=\"height:100px; width:100px; padding:9px; border: 1px solid #ddd; float:left;\">";
        echo "<img alt=\"\" src=\"";
        if(!empty($mb_id)) {
            $uicon_file = "/data/member/".substr($mb_id,0,2)."/".$mb_id.".gif";
            if(file_exists($mb_icon.$uicon_file))
                echo "admin/".$uicon_file;
        }
        echo "\" style=\"height:100px; width:100px; display:block;\">";
        echo "<img alt=\"\" src=\"/pc/img/level/elv1.gif\" style=\"display:block;padding:2px; background-color:white; position:relative; padding:2px; top:-109px; left:-9px; z-index:100;\">";
        echo "</div>";
        echo "<div style=\"height:100px; width:155px; border:1px solid #ddd; padding:9px; float:right; color:#556;\">";
        echo "<div style=\"height:20px; line-height:20px;\">";
        echo "<span>".asset_load("login_nick_name_msg")." </span><span style=\"float:right;\"><b>".$mb_nick."</b>".asset_load("login_nick_name2_msg")."</span>";
        echo "</div>";
        echo "<div style=\"height:20px; line-height:20px;\">";
        echo "<span>".asset_load("login_point_msg")." </span><span style=\"float:right; margin-left:4px;\"><img src=\"/img/coin_icon.png\" alt=\"\" style=\"margin-top:2px; display:block; width:12px;\"></span><span style=\"float:right;\"><b>".$mb_point." ".asset_load("login_point2_msg")."</b></span>";
        echo "</div>";
        echo "<div style=\"height:20px; line-height:20px;\">";
        echo "<span>".asset_load("login_grade_msg")." </span><span style=\"float:right;\"><b>".$mb_level."</b></span>";
        echo "</div>";
        echo "<div style=\"height:20px; line-height:20px;\">";
        echo "<span>".asset_load("login_win_msg")." </span><span style=\"float:right;\">";
        echo "0.00 %</span>";
        echo "</div>";
        echo "<div style=\"height:20px; line-height:20px;\">";
        echo "<span><a href=\"javascript:pop_note_list();\">".asset_load("login_msg_msg")." 0 </a></span><span style=\"float:right;\"><a href=\"javascript:pop_user_info();\">".asset_load("login_info_msg")."</a></span>";
        echo "</div>";
        echo "</div>";
        echo "</div>";
        echo "</div>";

    }
    else{
        echo $mb_id;
        echo "<div class=\"login_box\">";
        echo "<div style=\"height:4px;\"></div>";
        echo "<div>";
        echo "<div style=\"width:280px; margin-left:auto; margin-right:auto;\">";
        echo "<div style=\"height:40px; line-height:40px;\">";
        echo asset_load("no_login_msg");
        echo "</div> ";
        echo "<div class=\"login_button_box\">";
        echo "<a href=\"login.html\"><img alt=\"\" src=\"img/login_button.png\" /></a>";
        echo "</div>";
        echo "<div style=\"height:40px; line-height:40px;\">";
        echo "<span style=\"float:left;\"><a href=\"http://www.spark-pop.com/SignUp.aspx\">".asset_load("reg_title_msg")."</a></span>";
        echo "<span style=\"float:right;\"><a href=\"http://www.spark-pop.com/find_id.aspx\" style=\"font-weight:100;\">".asset_load("find_id_msg")."</a></span>";
        echo "<span style=\"float:right; padding:0 10px; font-size:8px; color:#dbdbdb\">|</span> <span style=\"float:right;\"><a href=\"http://www.spark-pop.com/find_passwd.aspx\" style=\"font-weight:100;\">".asset_load("find_passwd_msg")."</a></span>";
        echo "</div>";
        echo "</div>";
        echo "</div>";
        echo "</div>";

    }
    
}

?>