<?php
$status = 0;
$response = "no data";

if ($_SERVER ["REQUEST_METHOD"] === "POST") {
  $path = $_POST['dir']; // "filedirectory/";

  $user = isset($_POST['user']) ? $_POST['user'] : null;
  $user = strtolower($user);
  $password = isset($_POST['password']) ? $_POST['password'] : null;

  // check Directories
  if (!is_dir($path)){
    mkdir($path);
  }
  $userFileName = $path . "/" . "user.json";
  
  if ($user && $password) {
    if (file_exists($userFileName)) {
      $users = json_decode(file_get_contents($userFileName), true);
      foreach ($users as $u) {
        // print_r($u);
        if ( $u['user'] == $user) {
          // User exists
          $found = true;

          // user found -> check password
          $status = 1;
          if (password_verify($password, $u['password'])) {
            $response = $u;
            $status = 1;
          } else {
            $status = 2;
          }
          break;
        }
      }
    }
  }
}
// echo $response;
echo '{"status": ' .$status . ', "data":' . json_encode($response) . '}';
?>