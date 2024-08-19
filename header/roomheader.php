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
        <link rel="stylesheet" href="/General-page/roomDashboard/roomdashboard.css">
    </head>

    <body>

        <header class="main-header">
            <div class="logo">
                <img src="<?php echo '/General-page/Center_images/' . $_SESSION['display_name'] . '.png'; ?>" alt="Organization logo">
            </div>
            <div class="header-content">
                <?php echo($_SESSION["display_name"])?><br>
                <b>ROOM ID: <?php echo($_SESSION["Nurse_Id"])?> </b> 
            </div>
            <a id = "logout"href="/General-page/UserLogin/userlogin-form.php" class="live-link">Logout</a>
        </header>



        <div class="upperbody">
            <div class="dropdown">
                <div class="dropdown-content">
                        <a href="/General-page/StaffDashboard/userdashboard.php">Home</a>
                        <a href="/General-page/uploads/uploadview.php">Uploads</a>       
                        <a href="/General-page/Data/roomData.php">Data</a>
                        <div class="drop">
                        <button class="dropbtn"  onclick="toggleView()" >view Clients</button>
                        <div class="more-items">
                            <!-- <a href="/General-page/AdminDashboard/userdashboard.php">A</a>
                            <a href="/General-page/AdminDashboard/uploads.php">B</a>
                            <a href="/General-page/AdminDashboard/data.php">C</a>
                            <a href="/General-page/AdminDashboard/staff.php">D</a>
                            <a href="/General-page/AdminDashboard/clients.php">E</a> -->
                            <!-- <button onclick="window.location.href='addClient.php'">Add Client</button> -->
                                                        
                            <div id="clientsSection" style="display: none;">
                                <?php if (!$_SESSION['clients_checked']): ?>
                                    <p>No clients found.</p>
                                    <button onclick="toggleAddClient()">Add Client</button>
                                <?php else: ?>
                                    <!-- Display the list of clients -->
                                    <h3>Client List:</h3>
                                    <ul>
                                        <?php
                                        $clientQuery = "SELECT * FROM clients";
                                        $clientResult = mysqli_query($conn, $clientQuery);

                                        while ($client = mysqli_fetch_assoc($clientResult)) {
                                            echo "<li>" . $client['name'] . "</li>";
                                        }
                                        ?>
                                    </ul>
                                    <button onclick="toggleAddClient()">Add Client</button>
                                <?php endif; ?>
                            </div>

                            <!-- Add Client Section -->
                            <div id="addClientSection" style="display: none;">
                                <h3>Add a Client</h3>
                                <input type="text" id="searchClientInput" placeholder="Search for a client...">
                                <button onclick="searchClient()">Search</button>

                                <!-- Search results and client selection -->
                                <div id="searchResults"></div>
                            </div>




                        </div>      
                </div>
            </div>
            
        </div>
<script src="/roomDashboard/roomdashboard.js"></script>