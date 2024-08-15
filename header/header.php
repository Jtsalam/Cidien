<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <link rel="icon" href="/pictures/logo.png" type="image/x-icon">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <title>
            dashboard    
        </title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/General-page/StaffDashboard/userdashboard.css">
    </head>

    <body>

        <header class="main-header">
            <div class="logo">
                <img src="<?php echo '/General-page/Center_images/' . $_SESSION['display_name'] . '.png'; ?>" alt="Organization logo">
            </div>
            <div class="header-content">
                <?php echo($_SESSION["display_name"])?><br>
                <b>Nurse ID: <?php echo($_SESSION["Nurse_Id"])?> </b> 
            </div>
            <a id = "logout"href="/General-page/UserLogin/userlogin-form.php" class="live-link">Logout</a>
        </header>



        <div class="upperbody">
            <div class="dropdown">
                <button class="dropbtn">Dropdown</button>
                <div class="dropdown-content">
                        <a href="/General-page/StaffDashboard/userdashboard.php">Home</a>
                        <a href="/General-page/uploads/uploadview.php">Uploads</a>       
                        <a href="/General-page/StaffDashboard/data.php">Data</a>
                        <a href="/General-page/StaffDashboard/clients.php">Clients</a>
                </div>
            </div>
            
        </div>