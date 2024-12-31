<?php include_once '/xampp/htdocs/Mobile-Charter/header/header.php'; ?>

<?php
// Start the session
// session_start();

// Check if the form was submitted
if (!isset($_SESSION['userlogin-form-submitted']) || $_SESSION['userlogin-form-submitted'] !== true) {
    // Redirect to the form page or display an error
    header("Location: /Mobile-Charter/UserLogin/sign-in-form.php");
    exit();
}
$_SESSION['userlogin-form-submitted'] = true;
?>

<form class = "FolderUpload">
<input type="file" webkitdirectory mozdirectory/><br>
<input type="submit" id = "submit">
</form>
<?php include_once '/xampp/htdocs/Mobile-Charter/header/popup.php'; ?>

<script src="uploads.js"></script>
</body>
</html>