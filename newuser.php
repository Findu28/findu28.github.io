<?php
$status = 0;
$newUser = "no data";
$found = false;

if ($_SERVER ["REQUEST_METHOD"] === "POST") {
  $path = $_POST['dir']; // "filedirectory/";

  $user = isset($_POST['user']) ? $_POST['user'] : "leer";
  $user = strtolower($user);
  $password = isset($_POST['password']) ? $_POST['password'] : "leer";
  $name = isset($_POST['name']) ? $_POST['name'] : "";
  $color = isset($_POST['color']) ? $_POST['color'] : "";
  $geo = isset($_POST['geo']) ? $_POST['geo'] : "";
  $birthday = isset($_POST['birthday']) ? $_POST['birthday'] : "";

  // User rights: 1 = admin, 2 = user, 3 = guest
  $rights = 2;


  // check Directories
  if (!is_dir($path)){
    mkdir($path);
  }
  $userFileName = $path . "/" . "user.json";
  if (file_exists($userFileName)) {
    $users = json_decode(file_get_contents($userFileName), true);
    foreach ($users as $u) {
      // print_r($u);
      if ( $u['user'] == $user) {
        // User exists
        $found = true;
        $status = 2;
        break;
      }
    }
  } else {
    $users = array();
    // first user becomes admin
    $rights = 1;
  }

  //  $status = 2; = found
  if (!$found) {
    $newUser = array("id"=> uniqid(), 
    "user"=> $user,
    "rights"=> $rights,  
    "password"=> password_hash($password, PASSWORD_DEFAULT),
    "name"=> $name,
    "color"=> $color,
    "geo"=> $geo,
    "birthday"=> $birthday
    );
    array_push($users, $newUser);
    file_put_contents($userFileName, json_encode($users, JSON_PRETTY_PRINT));
    $status = 1;
  }


}
echo '{"status": ' .$status . ', "data":' . json_encode($newUser) . '}';
?>