
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="registration.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
    <title>Login</title>
</head>
<body>



<div class="container" id="container">
        <div class="form-container sign-up">
            <form>
                <h1>Create Account defect</h1>
                <span>Register your Organization</span>
                <input type="text" placeholder="Name">
                <input type="staff ID" placeholder="staff ID">
                <input type="email" placeholder="Enter E-mail">
                <input type="password" placeholder="Enter Password">
                <input type="password" placeholder="Retype Password">
                <button>Sign Up</button>
            </form>
        </div>


        <div class="form-container sign-in">
            <form>
            <h1>Create Account</h1>
                <span>Register your Organization</span>
                <input type="text" placeholder="Name">
                <input type="text" placeholder="Organization Name">
                <input type="staff ID" placeholder="staff ID">
                <input type="email" placeholder="Enter E-mail">
                <input type="password" placeholder="Enter Password">
                <input type="password" placeholder="Retype Password">
                <button>Sign Up</button>
            </form>
        </div>


        <div class="toggle-container">
            <div class="toggle">
                 <div class="toggle-panel toggle-left">
                    <h1><?php echo($_SESSION['display_name']);?></h1><br>
                    <img src="#" alt="Organization logo">
                    <button class="hidden" id="login">Sign in with Staff Id</button>
                </div>
                <div class="toggle-panel toggle-right">
                <h1>APPNAME</h1><br>
                <img src="#" alt="Organization logo">
                    <!-- <button class="hidden" id="#">Sign Up</button> -->
                    <p><a class = "bi bi-arrow-return-right" href = "/Mobile-Charter/UserLogin/sign-in-form.php"> Select Organization</a></p>
                </div>
            </div>
        </div>











<script src="registration.js"></script>
</body>

</html>