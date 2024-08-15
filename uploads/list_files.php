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