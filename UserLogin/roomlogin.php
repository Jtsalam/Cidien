<?php
include_once 'C:\xampp\htdocs\General-page\Database\database.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $room_Id = filter_input(INPUT_POST, "room_Id", FILTER_SANITIZE_SPECIAL_CHARS);
    $room_password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);
    $org_info_query = "SELECT * FROM `medicalcenter-info` WHERE `Center-name` = '" . $_SESSION['center_name'] . "'";
    $q_center_row = mysqli_query($conn, $org_info_query);//Queried center row
    $org_info_query = "SELECT * FROM `medicalcenter-info` WHERE `Center-name` = '" . $_SESSION['center_name'] . "'";
    $q_center_row = mysqli_query($conn, $org_info_query);//Queried center row

    if(mysqli_num_rows($q_center_row) > 0){
        $center_row = mysqli_fetch_assoc($q_center_row);
        $center_id = $center_row['Center-Id'];
    };

    $user_info_query = "SELECT * FROM `user-info` WHERE `Center-Id` = '" . $center_id . "'";
    $q_user_row = mysqli_query($conn, $user_info_query);//Queried user row
    $room_info_query = "SELECT * FROM `room-info` WHERE `Center-Id` = '" . $center_id . "'";
    $q_room_row = mysqli_query($conn, $room_info_query);

    if (mysqli_num_rows($q_room_row) > 0) {
        $room_found = false;
        while ($room_row = mysqli_fetch_assoc($q_room_row)) {
            $room_number = $room_row['Room-number'];
            $num_of_beds = $room_row['Number-of-beds'];
            if ($room_Id == $room_number) {
                $room_found = true;
                if (mysqli_num_rows($q_user_row) > 0) {
                    while ($user_row = mysqli_fetch_assoc($q_user_row)) {
                        $user_password = $user_row['Password'];
                        if (password_verify($room_password, $user_password)) {
                            $_SESSION['roomlogin-form-submitted'] = true;
                            $_SESSION['room_number'] = $room_Id;
                            header("Location: /General-page/roomDashboard/roomDashboard.php");
                            exit();
                        }
                    }
                    // Invalid password scenario after all users are checked
                    $_SESSION['show_second_form'] = true;
                    $_SESSION['room_error_message'] = "Invalid credentials";
                    header("Location: userlogin-form.php");
                    exit();
                }
            }
        }
        // If no room was found that matches the room_Id
        if (!$room_found) {
            $_SESSION['show_second_form'] = true;
            $_SESSION['room_error_message'] = "Invalid credentials";
            header("Location: userlogin-form.php");
            exit();
        }
    }
}else {
    // If the form was not submitted correctly, redirect to the form page
    echo("Access to this page cannot be reached.");
    exit();
      }
mysqli_close($conn);
?>