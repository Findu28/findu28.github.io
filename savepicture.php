<?php 
  // uploads picture file and puts filename in pictures.json
  $status = 0;
  if ($_SERVER ["REQUEST_METHOD"] === "POST") {
    if (isset($_FILES['files'])) {
      $errors = [];

      $file_name = $_FILES['files']['name'][0];
      $file_tmp = $_FILES['files']['tmp_name'][0];


      $user = $_POST['user'];
      $path = $_POST['dir']; // "filedirectory/";
      // $cat = $_POST['dirs'];
      $extensions = ["jpg", "jpeg", "png", "svg"];
      //$all_files = count ($_FILES ["files"]["tmp_name"]);

      $found = false;
      // check Directories
      if (!is_dir($path)){
        mkdir($path);
      }
      $userDir = $path . "/" . $user;
      if (!is_dir($userDir)) {
        mkdir($userDir);
      }
      

      $pictureFile = $userDir  . "/" .  "pictures.json";
      $arr = array();
      if (file_exists($pictureFile)) {
        $pictures = json_decode(file_get_contents($pictureFile), true);
        foreach ($pictures as $p) {
          if ($p['file'] == $file_name) {
            $found = true;
          } else {
            array_push($arr, $p);
          }
        }
      }
      // print_r($pictures);
      
      if (empty($errors)) {
        $status = 2;
        if (!$found) {
          // new file
          $file = $userDir . "/" . $file_name;
          move_uploaded_file($file_tmp, $file); // file > file_name
          $status = 1;
        }
  

        // pictures.json
        $picture = array(
        "file"=> $file_name,
        "category"=> "1",
        "title"=> "Titel",
        "subtitle"=> "Untertitel"
        );
        array_push($arr, $picture);
        // print_r($pictures);

        file_put_contents($pictureFile, json_encode($arr, JSON_PRETTY_PRINT));
        
        
      }
 
      if ($errors) print_r($errors);
    }
  }
  echo '{"status": ' .$status. "}";
?>