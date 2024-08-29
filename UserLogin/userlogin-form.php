<?php
// Start the session
session_start();

// Check if the form was submitted
if (!isset($_SESSION['sign-in-form-submitted']) || $_SESSION['sign-in-form-submitted'] !== true) {
    // Redirect to the form page or display an error
    header("Location: sign-in-form.php");
    exit();
}
$_SESSION['sign-in-form-submitted'] = true;
?>

<!DOCTYPE html>
<html lang="en">
    
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="userlogin.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
    <title>Login</title>
</head>
<body>
<div class="container" id="container">


        <div class="form-container sign-up">

            <form action="roomlogin.php" method="POST">
                <h1>Sign In</h1>
                <span>Login With Room Id</span>
                <input type="text" name="room_Id" placeholder="Enter Room Id" required>
                
                <div class="password-container">
                    <input type="password" name="password" id="password1" placeholder="Enter Password" required>
                    <i class="bi bi-eye-slash" id="showPassword"></i>
                </div>
                
                <a href="#">Forgot Password?</a>
                <button>Sign In</button>
                <p><a class = "bi bi-arrow-return-left" id = "select_org" href = "/General-page/UserLogin/sign-in-form.php"> Select Organization</a></p>
                
                <?php
                if (isset($_SESSION['room_error_message'])) {
                    echo '<p style="color: red;">' . nl2br(htmlentities($_SESSION['room_error_message'])) . '</p>';
                    unset($_SESSION['room_error_message']);
                }
                ?>
            </form>
        </div>

        <div class="form-container sign-in">
            <form action="userlogin.php" method="POST">
                <h1>Sign In</h1>
                <span>Login With Staff Id</span>
                <input type="text" name="staff_Id" placeholder="Enter Staff Id" required>
                
                <div class="password-container">
                    <input type="password" name="password" id="password" placeholder="Enter Password" required>
                    <i class="bi bi-eye-slash" id="togglePassword"></i>
                </div>
                
                <a href="#">Forgot Password?</a>
                <button>Sign In</button>
                <p><a class = "bi bi-arrow-return-right" id = "my_org" href = "/General-page/UserLogin/sign-in-form.php"> Select Organization</a></p>
                
                <?php
                if (isset($_SESSION['user_error_message'])) {
                    echo '<p style="color: red;">' . nl2br(htmlentities($_SESSION['user_error_message'])) . '</p>';
                    unset($_SESSION['user_error_message']);
                }
                ?>
            </form>
        </div>
        
        <div class="toggle-container">
            <div class="toggle">
                 <div class="toggle-panel toggle-left">
                    <h1><?php echo($_SESSION['display_name']);?></h1><br>
                    <img src="<?php echo '/General-page/Center_images/' . $_SESSION['display_name'] . '.png'; ?>" alt="Organization logo">
                    <button class="hidden" id="login">Sign in with Staff Id</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1><?php echo($_SESSION['display_name']);?></h1><br>
                    <img src="<?php echo '/General-page/Center_images/' . $_SESSION['display_name'] . '.png'; ?>" alt="Organization logo">
                    <button class="hidden" id="register">Sign in with Room Id</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        window.onload = function() {
        // PHP will output true or false
        var showSecondForm = <?php echo json_encode($_SESSION['show_second_form'] ?? false); ?>;
        
        if (showSecondForm) {
            document.getElementById('container').classList.add('active');  // Add this class if you want to show the second form
            unsetSession();
        } else {
            document.getElementById('container').classList.remove('active');
        }
    };
    function unsetSession() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "roomlogin-display.php", true);    
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText); // Response from PHP script
            }
        };
        xhr.send();
    };
    </script>
    <script src="userlogin.js"></script>
</body>

</html>