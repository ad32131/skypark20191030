<?php

function connect(&$connect){
    $connect=mysqli_connect( "localhost", "root", "ghkdtjs2","basel") or die( "SQL server에 연결할 수 없습니다.");
}

function select_run($sql, &$total_record , &$result, &$connect){
    connect($connect);
    $result = mysqli_query($connect, $sql);

    $row = mysqli_fetch_array($result);
    $total_record = mysqli_num_rows($result);

}

function select_main_notice_subject_view(){
    $total_record = "";
    $result = "";
    $connect = "";

    select_run("SELECT * FROM g5_write_notice order by wr_id desc limit 0,6;", $total_record , $result, $connect);
    for ($i=0; $i < $total_record; $i++)
    {
        mysqli_data_seek($result, $i);
        $row = mysqli_fetch_array($result);
        echo "<div style=\"height:1px; background-color:#eee;\"></div>";
        echo "<div style=\"height:21px; padding:1px 0px; line-height:21px;\">";
        echo "<table style=\"width:100%;\">";
        echo "<tr>";
        echo "<td style=\"cursor:pointer;\" onclick=\"go_board_read('$row[wr_id]');\" >$row[wr_subject]</td>";
        echo "<td style=\"width:80px; text-align:center;color:#555; font-size:11px;\">$row[wr_content]</td>";
        echo "</tr>";
        echo "</table>";
        echo "</div> ";
    }
}


function select_main_notice_content_view($idx){
    $idx = preg_replace("/[ #\&\+\-%@=\/\\\:;,\.'\"\^`~\_|\!\?\*$#<>()\[\]\{\}]/i", "", $idx);
    $total_record = "";
    $result = "";
    $connect = "";

    select_run("SELECT * FROM g5_write_notice where wr_id='$idx';", $total_record , $result, $connect);
    for ($i=0; $i < $total_record; $i++)
    {
        mysqli_data_seek($result, $i);
        $row = mysqli_fetch_array($result);

        echo "<tr>";
        echo "<td class=\"title\">제목</td>";
        echo "<td id=\"ContentPlaceHolder1_tdTitle\" class=\"body_normal\">$row[wr_subject]</td>";

        echo "</tr>";
        echo "<tr>";
        echo "<td class=\"title\" style=\"height:460px !important;\">내용</td>";
        echo "<td id=\"ContentPlaceHolder1_tdBody\" class=\"body_view\" style=\"\">$row[wr_content]</td>";

        echo "</tr>";
    }
}

function select_main_event_subject_view(){
    $total_record = "";
    $result = "";
    $connect = "";

    select_run("SELECT * FROM g5_write_notice order by wr_id desc limit 0,6;", $total_record , $result, $connect);
    for ($i=0; $i < $total_record; $i++)
    {
        mysqli_data_seek($result, $i);
        $row = mysqli_fetch_array($result);
        echo "<div style=\"height:1px; background-color:#eee;\"></div>";
        echo "<div style=\"height:21px; padding:1px 0px; line-height:21px;\">";
        echo "<table style=\"width:100%;\">";
        echo "<tr>";
        echo "<td style=\"cursor:pointer;\" onclick=\"go_board_read('$row[wr_id]');\" >$row[wr_subject]</td>";
        echo "<td style=\"width:80px; text-align:center;color:#555; font-size:11px;\">$row[wr_content]</td>";
        echo "</tr>";
        echo "</table>";
        echo "</div> ";
    }
}

function select_main_analysis_subject_view(){
    $total_record = "";
    $result = "";
    $connect = "";

    select_run("SELECT * FROM g5_write_notice order by wr_id desc limit 0,6;", $total_record , $result, $connect);
    for ($i=0; $i < $total_record; $i++)
    {
        mysqli_data_seek($result, $i);
        $row = mysqli_fetch_array($result);
        echo "<div style=\"height:1px; background-color:#eee;\"></div>";
        echo "<div style=\"height:21px; padding:1px 0px; line-height:21px;\">";
        echo "<table style=\"width:100%;\">";
        echo "<tr>";
        echo "<td style=\"cursor:pointer;\" onclick=\"go_board_read('$row[wr_id]');\" >$row[wr_subject]</td>";
        echo "<td style=\"width:80px; text-align:center;color:#555; font-size:11px;\">$row[wr_content]</td>";
        echo "</tr>";
        echo "</table>";
        echo "</div> ";
    }
}

function rank_write($mb_icon){
    echo "<div id=\"div_top10_rank1\">";
    echo "<div id=\"div_top10_rank1\" style=\"display: block;\"><div style=\"height:1px; background-color:#eee;\"></div>";
    echo "<div style=\"height:25px; padding:1px 0px;\"><table style=\"width:100%;\">";
    echo "<tbody>";


    $total_record = "";
    $result = "";
    $connect = "";

    select_run("SELECT * FROM g5_member order by mb_point desc limit 0,10;", $total_record , $result, $connect);
    for ($i=0; $i < $total_record; $i++)
    {
        mysqli_data_seek($result, $i);
        $row = mysqli_fetch_array($result);
        echo "<tr>";
        echo "<td style=\"width:20px; text-align:center;\">".($i+1)."</td>";
        echo "<td style=\"width:25px;\"><div style=\"height:2px;\"></div><img alt=\"\" src=\"";
        $uicon_file = "/admin/data/member/".substr($row[mb_id],0,2)."/".$row[mb_id].".gif";
        echo $uicon_file;
        if(file_exists($mb_icon.$uicon_file))
            var_dump(file_exists($mb_icon.$uicon_file));
        echo "\"></td>";
        echo "<td style=\"width:120px; text-align:center;color:#555;\"><b>$row[mb_id]</b></td>";
        echo "<td style=\"text-align:right; font-size:10px; color:#fb7300;\">$row[mb_point]</td>";
        echo "<td style=\"width:18px; text-align:right;\"><img alt=\"\" src=\"/pc/img/coin_icon.png\" style=\"display:block; margin-top:-1px;\"></td>";
        echo "</tr>";
    }

    echo "</tbody>";
    echo "</table>";
    echo "</div>";
    echo "</div>";
    echo "</div>";

}

function win_write($mb_icon){
    echo "<div id=\"div_top10_rank2\" style=\"display:none;\">";
    echo "<div id=\"div_top10_rank2\" style=\"display: block;\"><div style=\"height:1px; background-color:#eee;\"></div>";
    echo "<div style=\"height:25px; padding:1px 0px;\"><table style=\"width:100%;\">";
    echo "<tbody>";


    $total_record = "";
    $result = "";
    $connect = "";

    select_run("SELECT * FROM g5_member order by mb_point asc limit 0,10;", $total_record , $result, $connect);
    for ($i=0; $i < $total_record; $i++)
    {
        mysqli_data_seek($result, $i);
        $row = mysqli_fetch_array($result);
        echo "<tr>";
        echo "<td style=\"width:20px; text-align:center;\">".($i+1)."</td>";
        echo "<td style=\"width:25px;\"><div style=\"height:2px;\"></div><img alt=\"\" src=\"";
        $uicon_file = "/admin/data/member/".substr($row[mb_id],0,2)."/".$row[mb_id].".gif";
        echo $uicon_file;
        if(file_exists($mb_icon.$uicon_file))
            var_dump(file_exists($mb_icon.$uicon_file));
        echo "\"></td>";
        echo "<td style=\"width:120px; text-align:center;color:#555;\"><b>$row[mb_id]</b></td>";
        echo "<td style=\"text-align:right; font-size:10px; color:#fb7300;\">$row[mb_point]</td>";
        echo "<td style=\"width:18px; text-align:right;\"><img alt=\"\" src=\"/pc/img/coin_icon.png\" style=\"display:block; margin-top:-1px;\"></td>";
        echo "</tr>";
    }

    echo "</tbody>";
    echo "</table>";
    echo "</div>";
    echo "</div>";
    echo "</div>";

}
?>