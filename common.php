<?php
    if( !empty($_GET['debugmode']) ) if($_GET['debugmode'] === "1"){
        echo "DEBUGBODE ON!";
        error_reporting(E_ALL);
        ini_set('display_errors', '1');
    }


    include_once('./asset.php');
    include_once ("./dbcon.php");
    include_once ("./main_menu.php");
    include_once ("./login_title.php");
    include_once('./admin/common.php');

    //user log
    $g5['lo_location'] = $_SERVER["PHP_SELF"];
    $g5['lo_url'] = $_SERVER['REQUEST_URI'];
    html_end();
?>

