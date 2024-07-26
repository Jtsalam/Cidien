let idleTime = 0;
const idleLimit = 600; //Idle limit of 10 minutes
let countdownTimer;

const idleInterval = setInterval(timerIncrement, 1000); // 1 second interval

function timerIncrement() {
    idleTime++;
    if (idleTime >= idleLimit) {
        window.location.href = '/General-page/UserLogin/userlogin-form.php';
        clearInterval(idleInterval); // Stop the timer
    } else if ((idleLimit - idleTime) === 300) {//If 5 minutes left on timer, show popup
        showCustomAlert();
        startCountdown();
    }
}

function showCustomAlert() {
    document.getElementById('customAlert').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function dismissAlert() {
    document.getElementById('customAlert').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    idleTime = 0; // Reset the idle timer when alert is dismissed
    clearInterval(countdownTimer);
}

function startCountdown() {
    let countdown = 300;
    updateCountdownDisplay(countdown);
    countdownTimer = setInterval(() => {
        countdown--;
        updateCountdownDisplay(countdown);
        if (countdown <= 0) {
            clearInterval(countdownTimer);
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/General-page/UserLogin/userlogin-unset.php", true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // Redirect to the sign-in form after unsetting the session
                    window.location.href = '/General-page/UserLogin/userlogin-form.php';
                }
            };
            xhr.send();
            
        }
    }, 1000);
}

function updateCountdownDisplay(countdown) {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    document.getElementById('countdown').innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function logOff() {
    var xhr_2 = new XMLHttpRequest();
    xhr_2.open("GET", "/General-page/UserLogin/userlogin-unset.php", true);
    xhr_2.onreadystatechange = function () {
        if (xhr_2.readyState == 4 && xhr_2.status == 200) {
            // Redirect to the sign-in form after unsetting the session
            window.location.href = '/General-page/UserLogin/userlogin-form.php';
        }
    };
    xhr_2.send();
}

function stayLoggedIn() {
    dismissAlert();
}

function resetIdleTime() {
    idleTime = 0;
}
// Assign event handlers to reset idle time on user activity
document.onmousemove = resetIdleTime;
document.onkeydown = resetIdleTime;
document.onclick = resetIdleTime;

//LOGOUT BUTTON
let logout_btn = document.querySelector("#logout");
logout_btn.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default behavior of the button click
    
    let text = "Are you sure you want to logout?";
    if (confirm(text) == true) {
        // Make an AJAX request to the PHP script to unset the session
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/General-page/UserLogin/userlogin-unset.php", true);
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