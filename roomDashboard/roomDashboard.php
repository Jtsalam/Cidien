<?php include_once '/xampp/htdocs/Mobile-Charter/header/roomheader.php';
include_once 'C:\xampp\htdocs\Mobile-Charter\Database\database.php';
?>

<?php
// Check if the form was submitted and if the user role is not "Staff"
if (!isset($_SESSION['roomlogin-form-submitted']) || $_SESSION['roomlogin-form-submitted'] !== true) {
    // Redirect to the form page or display an error
    header("Location: /Mobile-Charter/UserLogin/sign-in-form.php");
    exit();
};
// Mark the form as submitted
$_SESSION['roomlogin-form-submitted'] = true;
?>
<!-- <div class="container1">
    <div class="text1"><p>Device</p></div>
</div> -->

<body>

<table id="myTable" border="1" style="width: 100%;"><br><br><br>
    <thead>
        <tr>
            <th>#Index</th>
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

<button onclick="fetchData()" style="display: none;">Fetch and Add Row</button>

<script>
let lastData = {};
let rowIndex = 0;
async function fetchData() {
    try {
        const response = await fetch('http://localhost:5000/get_data');
        const data = await response.json();
        
        // Check if data is different from the last data
        if (data.room_id && data.room_id == <?php echo $_SESSION["room_number"]?> && JSON.stringify(data) !== JSON.stringify(lastData)) {
            // Get the table body element   
            var table = document.getElementById("myTable").getElementsByTagName('tbody')[0];

            // Create a new row
            var newRow = table.insertRow();
            rowIndex++;  // Increment the row index

            // Insert cells in the new row
            var cell0 = newRow.insertCell(0);
            var cell1 = newRow.insertCell(1);
            var cell2 = newRow.insertCell(2);
            var cell3 = newRow.insertCell(3);
            var cell4 = newRow.insertCell(4);

            // Add values to the cells
            cell0.innerHTML = rowIndex;  // Add the row index
            cell1.innerHTML = data.date;
            cell2.innerHTML = data.time;
            cell3.innerHTML = data.note;
            cell4.innerHTML = data.nurse; 

            // Update the last data variable
            lastData = data;
        }else if(data.room_id !== <?php echo $_SESSION["room_number"]?>){
            console.error("Error fetching data: Different room number");
        };
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


<!-- Other content of the webpage goes here -->
<script src="roomdashboard.js"></script>
</body>
    
</html>