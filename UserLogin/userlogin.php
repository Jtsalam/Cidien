<?php
    include_once 'C:\xampp\htdocs\General-page\Database_test\database.php';
    session_start();

    if ($_SERVER["REQUEST_METHOD"] == "POST"){
        $staff_number = filter_input(INPUT_POST, "staff_number", FILTER_SANITIZE_SPECIAL_CHARS);
        $staff_password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);
        $org_info_query = "SELECT * FROM `medicalcenter-info` WHERE `Center-name` = '" . $_SESSION['center_name'] . "'";
        $q_center_row = mysqli_query($conn, $org_info_query);//Queried center row

        if(mysqli_num_rows($q_center_row) > 0){
            $center_row = mysqli_fetch_assoc($q_center_row);
            $center_id = $center_row['Center-Id'];
        };

        $user_info_query = "SELECT * FROM `user-info` WHERE `Center-Id` = '" . $center_id . "'";
        $q_user_row = mysqli_query($conn, $user_info_query);//Queried user row

        if(mysqli_num_rows($q_user_row) > 0){
            while($user_row = mysqli_fetch_assoc($q_user_row)){
                $user_number = $user_row['Center-number'];  
                $user_password = $user_row['Password'];
                if ($staff_number == $user_number and password_verify($staff_password, $user_password)){
                    $_SESSION['userlogin-form-submitted'] = true;
                    header("Location: /General-page/UserDashboard/userdashboard.php");
                    exit();
                };
            };  
            $_SESSION['user_error_message'] = "Invalid credentials";
            header("Location: userlogin-form.php");
            exit();
        }
    };
    mysqli_close($conn);
?>