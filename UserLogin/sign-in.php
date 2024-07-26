<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Predefined options
  $valid_centers = ["Evergreen Medical Clinic",
                    "Jim Pattison Childrens Hospital",
                    "Kenderdine Medical Clinic",
                    "Parkville Manor",
                    "Erindale Health center"];

  // Get the selected option and sanitize it
  $selected_center = filter_input(INPUT_POST, 'option', FILTER_SANITIZE_STRING);
  $fselected_center = str_replace("&#39;","",$selected_center); //Filtered selected center

  // echo($selected_center);

  // Validate the selected option
  if (in_array($fselected_center, $valid_centers)) {
      // The selected option is valid
      $center_name = str_replace("&#39;", "''", $selected_center);
      $_SESSION['center_name'] = $center_name;
      $_SESSION['display_name'] = $selected_center;
      
      // Set a session variable to indicate successful submission
      $_SESSION['sign-in-form-submitted'] = true;
      // Redirect to the success page
      header("Location: userlogin-form.php");
      exit();
  }else {
    // Invalid option selected
    $_SESSION['org_error_message'] = 'Invalid Medical center chosen. please choose another from the listed centers.';
    $_SESSION['shared_variable'] = NULL;
    header("Location: sign-in-form.php");
    exit();

  }
}else {
  // If the form was not submitted correctly, redirect to the form page
  echo("Access to this page cannot be reached. Please try again later.");
  exit();
    }
?>