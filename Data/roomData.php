<?php include_once '/xampp/htdocs/General-page/header/roomheader.php'; ?>

<?php
session_start();

// Check if selected clients exist in the session
$selectedClients = isset($_SESSION['selected_clients']) ? $_SESSION['selected_clients'] : [];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Selected Clients</title>
</head>
<body>
    <h3>Selected Clients</h3>

    <?php if (count($selectedClients) > 0): ?>
        <table border="1">
            <thead>
                <tr>
                    <th>Client Name</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($selectedClients as $client): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($client); ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php else: ?>
        <p>No clients selected.</p>
    <?php endif; ?>

    <a href="roomDashboard.php">Go Back</a>
</body>
</html>
