<?php
session_start();

if (isset($_SESSION['sign-in-form-submitted']) && isset($_SESSION['userlogin-form-submitted'])) {
  if($_SESSION["user_role"] == "Staff"){
    header("Location: /General-page/StaffDashboard/userdashboard.php");
    exit();
  }elseif($_SESSION["user_role"] == "Admin"){
      header("Location: /General-page/AdminDashboard/userdashboard.php");
      exit();
  }elseif($_SESSION["user_role"] == "IT"){
      header("Location: /General-page/ITDashboard/userdashboard.php");
      exit();        
  }
}
elseif(isset($_SESSION['sign-in-form-submitted'])){
  header("Location: userlogin-form.php");
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign In</title>
    <link rel="stylesheet" href="sign-in.css" />
  </head>
  <body>
    <div class="container">
      <h1>SIGN IN</h1>
      <form action = "sign-in.php" method = "POST">
        <select id="option" name="option">
          <option>Select your Organization</option>
          <option value="Erindale Health center">Erindale Health center</option>
          <option value="Parkville Manor">Parkville Manor</option>
          <option value="Kenderdine Medical Clinic">Kenderdine Medical Clinic</option>
          <option value="Jim Pattison Children's Hospital">Jim Pattison Children's Hospital</option>
          <option value="Evergreen Medical Clinic">Evergreen Medical Clinic</option>
        </select>
        <button type="submit">Submit</button><br>
        
        <?php
        if (isset($_SESSION['org_error_message'])) {
          echo '<p style="color: red;">' . nl2br(htmlentities($_SESSION['org_error_message'])) . '</p>';
          unset($_SESSION['org_error_message']);
        }
        ?>

      </form>
    </div>
    <script src="sign-in.js"></script>
  </body>
</html>