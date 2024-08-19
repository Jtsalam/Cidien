<?php include_once '/xampp/htdocs/General-page/header/roomheader.php'; ?>







<?php
session_start();
include 'database_connection.php';

// Initialize session if not set
if (!isset($_SESSION['clients_checked'])) {
    $_SESSION['clients_checked'] = false;
    $_SESSION['selected_clients'] = []; // Initialize selected clients array
}

// Check if clients exist in the database
$query = "SELECT COUNT(*) as client_count FROM clients";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_assoc($result);
$clientCount = $row['client_count'];

if ($clientCount > 0) {
    $_SESSION['clients_checked'] = true;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['selected_client'])) {
    // Add selected client to session
    $_SESSION['selected_clients'][] = $_POST['selected_client'];
    // Redirect to roomData.php
    header("Location: roomData.php");
    exit();
}
?>

<div>
    <button onclick="toggleView()">View Clients</button>
</div>

<div id="clientsSection" style="display: none;">
    <?php if (!$_SESSION['clients_checked']): ?>
        <p>No clients found.</p>
        <button onclick="toggleAddClient()">Add Client</button>
    <?php else: ?>
        <!-- Display the list of clients -->
        <h3>Client List:</h3>
        <ul>
            <?php
            $clientQuery = "SELECT * FROM clients";
            $clientResult = mysqli_query($conn, $clientQuery);

            while ($client = mysqli_fetch_assoc($clientResult)) {
                echo "<li>" . $client['name'] . "</li>";
            }
            ?>
        </ul>
        <button onclick="toggleAddClient()">Add Client</button>
    <?php endif; ?>
</div>

<!-- Add Client Section -->
<div id="addClientSection" style="display: none;">
    <h3>Add a Client</h3>
    <input type="text" id="searchClientInput" placeholder="Search for a client...">
    <button onclick="searchClient()">Search</button>

    <!-- Search results and client selection -->
    <div id="searchResults"></div>
</div>

<script>
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
</script>














<div class="container1">
    <div class="text1"><p>Device</p></div>
</div>
<!-- <?php include_once '/xampp/htdocs/General-page/header/popup.php'; ?> -->
<!-- Other content of the webpage goes here -->
<script src="roomDashboard.js"></script>
</body>
    
</html>