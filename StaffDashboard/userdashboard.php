<?php include_once '/xampp/htdocs/Mobile-Charter/header/header.php'; ?>

<?php

// Check if the form was submitted and if the user role is not "Staff"
if (!isset($_SESSION['userlogin-form-submitted']) || $_SESSION['userlogin-form-submitted'] !== true) {
    // Redirect to the form page or display an error
    header("Location: /Mobile-Charter/UserLogin/sign-in-form.php");
    exit();
}elseif($_SESSION["user_role"] !== "Staff"){ // If role other than Staff tries to access, redirect back to their page
    header("Location: /Mobile-Charter/UserLogin/sign-in-form.php");
    exit();
}
// Mark the form as submitted
$_SESSION['userlogin-form-submitted'] = true;
?>
<div class="container1">
    <div class="text1"><p>Device</p></div>
</div>
<?php include_once '/xampp/htdocs/Mobile-Charter/header/popup.php'; ?>
<!-- Other content of the webpage goes here -->
<script src="userdashboard.js"></script>
</body>
    
</html>