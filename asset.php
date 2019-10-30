<?php


function asset_load($load_str)
{
    if (0) echo "!!";
    //login_title
    elseif ($load_str === "login_nick_name_msg") return "닉네임 : ";
    elseif ($load_str === "login_nick_name2_msg") return " 님";
    elseif ($load_str === "login_point_msg") return "보유 : ";
    elseif ($load_str === "login_point2_msg") return " 점";
    elseif ($load_str === "login_grade_msg") return "레벨 : ";
    elseif ($load_str === "login_win_msg") return "승률 : ";
    elseif ($load_str === "login_msg_msg") return "쪽지 :  ";
    elseif ($load_str === "login_info_msg") return "[내 정보]";


    elseif ($load_str === "no_login_msg") return "로그인 이후 컨텐츠 이용이 가능합니다.";
    elseif ($load_str === "reg_title_msg") return "간편 회원가입";
    elseif ($load_str === "find_id_msg") return "아이디 찾기";
    elseif ($load_str === "find_passwd_msg") return "비밀번호 찾기";
}
?>