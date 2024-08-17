<?php include_once 'C:\xampp\htdocs\General-page\header\Adheader.php'; ?>

<?php

// Check if the form was submitted and if the user role is not "Staff"
if (!isset($_SESSION['userlogin-form-submitted']) || $_SESSION['userlogin-form-submitted'] !== true) {
    // Redirect to the form page or display an error
    header("Location: /General-page/UserLogin/sign-in-form.php");
    exit();
}elseif($_SESSION["user_role"] !== "Admin"){ // If role other than Admin tries to access, redirect back to their page
    header("Location: /General-page/UserLogin/sign-in-form.php");
    exit();
}
// Mark the form as submitted
$_SESSION['userlogin-form-submitted'] = true;
?>
<div class="container1">
    <div class="text1"><p>Device</p></div>
    <div class="text1"><p><a href="/AdminDashboard/Createaccount.php"></a>CREATE ACCOUNT</p></div>
</div>
<?php include_once '/xampp/htdocs/General-page/header/popup.php'; ?>
<!-- Other content of the webpage goes here -->
<script src="userdashboard.js"></script>
</body>
    
</html>