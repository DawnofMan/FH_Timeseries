<?php

$staticUrl = "https://www.dropbox.com/s/q8nw8b8l91d3002/HR2019-04-10.json?dl=1";

//JSON data retrievel
$json = file_get_contents($staticUrl);
$jsonDataset = json_decode($json, true);

//mySQL connection setup
$sqlConnection = mysqli_connect('localhost', 'root', '', 'cc_dataset');

foreach ($jsonDataset['activities-heart-intraday']['dataset'] as $key => $value) {
        $sqlConnection->query("INSERT INTO `heartbeat_dataset` (`timeval`, `pulseval`) VALUES ('" . $value['time'] . "', '" . $value['value'] . "')");
}
    $sql = "SELECT * FROM heartbeat_dataset ";
    $output = $sqlConnection->query($sql);
    while ($row = $output->fetch_assoc()) {
        $jsonOutput[] = $row;
    }
    echo json_encode($jsonOutput);
?>

