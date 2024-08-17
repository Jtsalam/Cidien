const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");
const select_org = document.getElementById("select_org");
const my_org = document.getElementById('my_org');



registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});



// my_org.addEventListener('click', () => {
//     container.classList.add("active");
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", "/General-page/UserLogin/unset-session.php", true);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             // Redirect to the sign-in form after unsetting the session
//             window.location.href = "/General-page/UserLogin/sign-in-form.php";
//         }
//     };
//     xhr.send();
    
// });




togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    
    // toggle the icon
    this.classList.toggle("bi-eye");
});

// Unsetting the session only when the user clicks on "Select organization"
select_org.addEventListener("click", function(){
    // Make an AJAX request to the PHP script to unset the session
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/General-page/UserLogin/unset-session.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Redirect to the sign-in form after unsetting the session
            window.location.href = "/General-page/UserLogin/sign-in-form.php";
        }
    };
    xhr.send();
});


