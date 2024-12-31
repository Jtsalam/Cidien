<?php include_once 'C:\xampp\htdocs\Mobile-Charter\header\Adheader.php'; ?>



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

<!-- <form class = "FolderUpload">
<input type="file" webkitdirectory mozdirectory/><br>
<input type="submit" id = "submit">
</form> -->
<?php include_once '/xampp/htdocs/Mobile-Charter/header/popup.php'; ?>

    <h2>Uploaded Audio Files</h2>
    <?php
        $directory = 'uploads/';
        $audioFiles = glob($directory . "*.{mp3,wav,ogg}", GLOB_BRACE);

        if (count($audioFiles) > 0) {
            echo "<ul>";
            foreach ($audioFiles as $file) {
                $fileName = basename($file);
                echo "<li>";
                echo "<p>$fileName</p>";
                echo "<audio controls>
                        <source src='$directory$fileName' type='audio/mpeg'>
                        <source src='$directory$fileName' type='audio/wav'>
                        <source src='$directory$fileName' type='audio/ogg'>
                        Your browser does not support the audio element.
                    </audio>";
                echo "</li>";
            }
            echo "</ul>";
        } else {
            echo "<p>No audio files uploaded yet.</p>";
        }
        ?>

    <link rel="stylesheet" href="uploads.css">
    <h2>Upload Audio File</h2>
    <form action="upload.php" method="post" enctype="multipart/form-data">
        <label for="audioFile">Choose an audio file:</label>
        <input type="file" name="audioFile" id="audioFile" accept="audio/*">
        <button type="submit">Upload</button>
    </form>

<script src="uploads.js"></script>



