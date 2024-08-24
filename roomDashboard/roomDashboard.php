<?php include_once '/xampp/htdocs/General-page/header/roomheader.php';
include_once 'C:\xampp\htdocs\General-page\Database\database.php';
?>



<!-- <div class="container1">
    <div class="text1"><p>Device</p></div>
</div> -->

<body>

<table id="myTable" border="1">
    <thead>
        <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Note</th>
            <th>Nurse</th>
        </tr>
    </thead>
    <tbody>
        <!-- Rows will be added here dynamically -->
    </tbody>
</table>

<button onclick="fetchData()">Fetch and Add Row</button>

<script>
let lastData = {};

async function fetchData() {
    try {
        const response = await fetch('http://localhost:5000/get_data');
        const data = await response.json();
        
        // Check if data is different from the last data
        if (data.room_id && JSON.stringify(data) !== JSON.stringify(lastData)) {
            // Get the table body element   
            var table = document.getElementById("myTable").getElementsByTagName('tbody')[0];

            // Create a new row
            var newRow = table.insertRow();

            // Insert cells in the new row
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);

            // Add values to the cells
            cell1.innerHTML = data.date;
            cell2.innerHTML = data.time;
            cell3.innerHTML = data.note;
            cell4.innerHTML = data.nurse;

            // Update the last data variable
            lastData = data;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        // alert('Failed to fetch data. Please try again later.');  // Provide user feedback
    }
}

function startFetchingData() {
    fetchData();  // Fetch data immediately
    setInterval(fetchData, 5000);  // Fetch data every 5 seconds
}

window.onload = startFetchingData;

</script>


<!-- <?php include_once '/xampp/htdocs/General-page/header/popup.php'; ?> -->
<!-- Other content of the webpage goes here -->
<script src="roomdashboard.js"></script>
</body>
    
</html>