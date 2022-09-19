<?php 
$response = "";
$status = 0;
$user = isset($_POST['user']) ? $_POST['user'] : null;
$password = isset($_POST['password']) ? $_POST['password'] : null;
$status = 0;
$response = "no data";

if ($user && $password) {
  if (file_exists("user.json")) {
    $myfile = fopen("user.json", "r") or die("Unable to open file!");
    // Output one line until end-of-file

    while(!feof($myfile)) {
      $line = fgets($myfile);
      if (strlen($line) > 0) {
        $a =json_decode($line);
        if ($a->user == $user) {
          // user found -> check password
          $status = 1;
          if (password_verify($password, $a->password)) {
            $response = $a;
            $status = 1;
          } else {
            $status = 2;
          }
          // $response = password_verify($password, $a->password) ? $a : "";
          break;
        }
      }
    }
    fclose($myfile);
  }
}
// echo $response;
echo '{"status": ' .$status . ', "data":' . json_encode($response) . '}';
?>