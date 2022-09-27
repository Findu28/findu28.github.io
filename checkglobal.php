<?php
$status = 0;

if ($_SERVER ["REQUEST_METHOD"] === "POST") {
  $path = $_POST['dir']; // "filedirectory/";

  // check Directories
  if (!is_dir($path)){
    mkdir($path);
  }
  $userFileName = $path . "/" . "user.json";
  $status = file_exists($userFileName) ? 1 : 0;
}

echo '{"status": ' .$status. "}";
?>