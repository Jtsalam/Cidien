<!-- <?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the text sent from the Flask server
    $text = $_POST['text'];

    // Process the text (for example, just echo it)
    echo "Received text: " . $text;
} else {
    echo "No text received.";
}
?>

<?php
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $charter_id = $_POST['charter_id'];
    $user_info_query = "SELECT * FROM `user-info` WHERE `charterId` = '" . $charter_id . "'";
    $q_user_row = mysqli_query($conn, $user_info_query);

    if(mysqli_num_rows($q_user_row) > 0){
        $user_row = mysqli_fetch_assoc($q_user_row);
        $nurse = $user_row['User-Name'];
    };
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <h1> <?php echo $text?> </h1>
</body>
</html> -->