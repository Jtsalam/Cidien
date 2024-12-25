//LOGOUT BUTTON
let logout_btn = document.querySelector("#logout");
logout_btn.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default behavior of the button click
    
    let text = "Are you sure you want to logout?";
    if (confirm(text) == true) {
        // Make an AJAX request to the PHP script to unset the session
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/General-page/UserLogin/roomlogin-unset.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Redirect to the sign-in form after unsetting the session
                window.location.href = "/General-page/UserLogin/sign-in-form.php";
            }
        };
        xhr.send();
    }
    // If the user clicks "Cancel", do nothing and stay on the same page
});



