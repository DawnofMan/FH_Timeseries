<?php
require 'composer/vendor/autoload.php';
use InfluxDB2\Client;
use InfluxDB2\Point;
//Building an URL
 $staticUrl = "https://www.dropbox.com/s/q8nw8b8l91d3002/HR2019-04-10.json?dl=1";


// //JSON data retrievel
$json = file_get_contents($staticUrl);
$jsonDataset = json_decode($json, true);
//print_r($jsonDataset['activities-heart-intraday']['dataset'][0]['value']);
$username = 'root';
$password = '';

$database = 'heartrate';
$retentionPolicy = 'autogen';
$bucket = 'mydb';

//mySQL connection
$client = new Client([
    "url" => "http://localhost:8086",
    "token" => "$username:$password",
    "bucket" => $bucket,
    "org" => "-",
    "precision" => InfluxDB2\Model\WritePrecision::S
]);

//Writing the data to database
$writeApi = $client->createWriteApi();
$points = array();
 foreach ($jsonDataset['activities-heart-intraday']['dataset'] as $key => $value) {
     if($key < 100) {
    $points = Point::measurement("timeseries")
    //->addTag("host", "host1")
    ->addField("pulse_rate", $value['value'])
    ->time(microtime(true));
$writeApi->write($points);
$writeApi->close();

//Quering the data from database
$queryApi = $client->createQueryApi();
$query = "from(bucket: \"{$bucket}\") |> range(start: -1h)";
$tables = $queryApi->query($query);
    }
 }
 $i = 0;
 $test = array();

foreach ($tables as $table) {
    foreach ($table->records as $record) {
        $time = $record->getTime();
        $measurement = $record->getMeasurement();
        $value = $record->getValue();
        $test[$i]["time"] = $time;
        $test[$i]["value"] = $value;
        //print "$time $value\n";
        $i++;
    }
}
//echo json_encode($test);
$client->close();