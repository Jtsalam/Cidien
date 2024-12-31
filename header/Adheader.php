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
        <link rel="stylesheet" href="/Mobile-Charter/AdminDashboard/userdashboard.css">
    </head>

    <body>

        <header class="main-header">
            <div class="logo">
                <img src="<?php echo '/Mobile-Charter/Center_images/' . $_SESSION['display_name'] . '.png'; ?>" alt="Organization logo">
            </div>
            <div class="header-content">
                <?php echo($_SESSION["display_name"])?><br>
                <b>Nurse ID: <?php echo($_SESSION["Nurse_Id"])?> </b> 
            </div>
            <a id = "logout"href="/Mobile-Charter/UserLogin/userlogin-form.php" class="live-link">Logout</a>
        </header>



        <div class="upperbody">
            <div class="dropdown">
                <button class="dropbtn">Dropdown</button>
                <div class="dropdown-content">
                        <a href="/Mobile-Charter/AdminDashboard/userdashboard.php">Home</a>
                        <a href="/Mobile-Charter/uploads/uploadview.php">Uploads</a>
                        <a href="/Mobile-Charter/AdminDashboard/data.php">Data</a>
                        <a href="/Mobile-Charter/AdminDashboard/staff.php">STAFF</a>
                        <a href="/Mobile-Charter/AdminDashboard/clients.php">Clients</a>
                </div>
            </div>
            
        </div>