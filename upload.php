<?php 
  if ($_SERVER ["REQUEST_METHOD"] === "POST") {
    if (isset($_FILES['files'])) {
      $errors = [];
      $user = $_POST['user'];
      $dirs = $_POST['dirs']; // enthaelt die Unterverzeichnisse 0 ...
      $path = $_POST['dir']; // "filedirectory/";
      $extensions = ["jpg", "jpeg", "png", "svg"];
      $all_files = count ($_FILES ["files"]["tmp_name"]);

      // check Directories
      if (!is_dir($path)){
        mkdir($path);
      }
      $user_dir = $path . "/" . $user;
      if (!is_dir($user_dir)) {
        mkdir($user_dir);
        for ($i = 1; $i  <= 4; $i++) {
          $cat_dir = $user_dir . "/" . $i;
          mkdir($cat_dir);
        }
      }
      

      $myfile = fopen($user_dir . "/pictures.json", "a+") or die("Unable to open file!");

      for ($i = 0; $i < $all_files; $i++) {
        $file_name = $_FILES['files']['name'][$i];
        $file_tmp = $_FILES['files']['tmp_name'][$i];
        // $file_type = $_FILES['files']['type'][$i];
        // $file_size = $_FILES['files']['size'][$i];
        // $file_ext = strtolower(end(explode('.', $_FILES['files']['name'][$i])));
  
        $file = $user_dir . "/" . $dirs[$i] . "/" . $file_name;
        
        // checks File extensions
        // if (!in_array($file_ext, $extensions)) {
        //   $errors[] = 'Dateityp nicht erlaubt: ' . $file_name . ' ' . $file_type;
        // }
  
        // checks file size
        // if ($file_size > 2097152) {
        //   $errors[] = 'Datei zu groß: ' . $file_name . ' ' . $file_type;
        // }
        
        if (empty($errors)) {
          move_uploaded_file($file_tmp, $file); // file > file_name

          // pictures.json
          $row = array(
          "file"=> $file_name,
          "category"=> $dirs[$i],
          "title"=> "Titel",
          "subtitle"=> "Untertitel"
          );
          fwrite($myfile, json_encode($row)."\n");
        }
    
      }
      
      fclose($myfile);

      if ($errors) print_r($errors);
    }
  }
?>