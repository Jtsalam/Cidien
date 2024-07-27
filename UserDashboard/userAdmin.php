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
        <link rel="stylesheet" href="UserDashboard.css">
    </head>

    <body>

        <header class="main-header">
            <div class="logo">
                <img src="/pictures/logo-no-background.png" alt="Organization logo">
            </div>
            <div class="header-content">
                <b>Nurse ID</b> - Organization 
            </div>
            <a id = "logout"href="/General-page/UserLogin/userlogin-form.php" class="live-link">Logout</a>
        </header>



        <div class="upperbody">
            <div class="dropdown">
                <button class="dropbtn">Dropdown</button>
                <div class="dropdown-content">
                        <a href="/General-page/UserDashboard/userdashboard.php">Home</a>
                        <a href="/General-page/UserDashboard/uploads.php">Uploads</a>
                        <a href="/connect/connect.html">Data</a>
                        <a href="/General-page/UserDashboard/STAFF">STAFF</a>
                        <a href="/General-page/UserDashboard/Clients">Clients</a>
                </div>
            </div>
            
        </div>

<div class="container1">
    <div class="text1"><p>Device</p></div>
    <div class="text1"><p>CREATE ACCOUNT</p></div>
</div>
<?php include_once '/xampp/htdocs/General-page/header/popup.php'; ?>
<!-- Other content of the webpage goes here -->
<script src="userdashboard.js"></script>
</body>
    
</html>