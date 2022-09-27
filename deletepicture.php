<?php
// deletes a picture and the content of pictures.json
  $status = 0;
  if ($_SERVER ["REQUEST_METHOD"] === "POST") {
    
    $file_name = $_POST['filename'];
    $user = $_POST['user'];
    $path = $_POST['dir']; // "filedirectory/";

    $found = false;
    $userDir = $path . "/" . $user;
    $file = $userDir . "/" . $file_name;

    $pictureFile = $userDir  . "/" .  "pictures.json";
    if (file_exists($pictureFile)) {
      if (file_exists($pictureFile)) {
        $arr = array();
        $pictures = json_decode(file_get_contents($pictureFile), true);
        foreach ($pictures as $p) {
          if ($p['file'] == $file_name) {
            $found = true;
          } else {
            array_push($arr, $p);
          }
        }
        // when found - delete file and entry
        if ($found){
          unlink($file);
          file_put_contents($pictureFile, json_encode($arr, JSON_PRETTY_PRINT));
          $status = 1;
        }
      }
    }
  }
  echo '{"status": ' .$status. "}";
?>