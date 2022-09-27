<?php 
  // updates content of pictures.json
  $status = 0;
  if ($_SERVER ["REQUEST_METHOD"] === "POST") {
    
    $file_name = $_POST['filename'];
    $title = $_POST['title'];
    $subtitle = $_POST['subtitle'];
    $cat = $_POST['cat'];
    $user = $_POST['user'];
    $path = $_POST['dir']; // "filedirectory/";

    $found = false;
    $userDir = $path . "/" . $user;

    $pictureFile = $userDir  . "/" .  "pictures.json";
    if (file_exists($pictureFile)) {
      $pictures = json_decode(file_get_contents($pictureFile), true);
      $i = 0;
      while ($i < count($pictures)) {
        if ($pictures[$i]['file'] == $file_name) {
          $pictures[$i]['category'] = $cat;
          $pictures[$i]['title'] = $title;
          $pictures[$i]['subtitle'] = $subtitle;
          $found = true;
          //unset($pictures[$i]); // delete row
          //echo "gefunden";
          break;
        }
        $i++;
      }

      file_put_contents($pictureFile, json_encode($pictures, JSON_PRETTY_PRINT));
      $status = 1;
  
    } else {
      $pictures = array();
    }
    // print_r($pictures);
    // // pictures.json
    // $picture = array(
    // "file"=> $file_name,
    // "category"=> $cat,
    // "title"=> $title,
    // "subtitle"=> $subtitle
    // );
    // array_push($pictures, $picture);
    // print_r($pictures);
    // file_put_contents($pictureFile, json_encode($pictures, JSON_PRETTY_PRINT));
    // $status = 1;
      
  }
  echo '{"status": ' .$status. "}";
?>