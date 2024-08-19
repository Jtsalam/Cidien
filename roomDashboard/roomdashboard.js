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




function toggleView() {
    var section = document.getElementById("clientsSection");
    section.style.display = section.style.display === "none" ? "block" : "none";
}

function toggleAddClient() {
    var section = document.getElementById("addClientSection");
    section.style.display = section.style.display === "none" ? "block" : "none";
}

// Simulate search (replace with an AJAX call for real search)
function searchClient() {
    var searchInput = document.getElementById("searchClientInput").value;
    var searchResultsDiv = document.getElementById("searchResults");

    // Simulate search results (replace with actual database search)
    if (searchInput !== "") {
        searchResultsDiv.innerHTML = "<form method='post'>" +
            "<p onclick='selectClient(\"" + searchInput + "\")'>" + searchInput + "</p>" +
            "<input type='hidden' name='selected_client' value='" + searchInput + "'>" +
            "<button type='submit'>Add Client</button>" +
            "</form>";
    } else {
        searchResultsDiv.innerHTML = "<p>No results found</p>";
    }
}

function selectClient(clientName) {
    // The form submission will handle adding the client to the session and redirecting
}