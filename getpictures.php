<?php
$status = 0;
$response = "no data";

if ($_SERVER ["REQUEST_METHOD"] === "POST") {
    $userId = $_POST['userId'];
    $path = $_POST['dir']; // "filedirectory/";

    $userDir = $path . "/" . $userId;

    $pictureFile = $userDir  . "/" .  "pictures.json";
    if (file_exists($pictureFile)) {
      // Pictures found
      $response = json_decode(file_get_contents($pictureFile), true);
      $status = 1;
    }
}
echo '{"status": ' .$status . ', "data":' . json_encode($response) . '}';
?>