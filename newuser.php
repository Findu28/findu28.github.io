<?php 
$user = isset($_POST['user']) ? $_POST['user'] : "leer";
$password = isset($_POST['password']) ? $_POST['password'] : "leer";
$name = isset($_POST['name']) ? $_POST['name'] : "";
$color = isset($_POST['color']) ? $_POST['color'] : "";
$geo = isset($_POST['geo']) ? $_POST['geo'] : "";
$birthday = isset($_POST['birthday']) ? $_POST['birthday'] : "";

$myfile = fopen("user.json", "a+") or die("Unable to open file!");
$found = false;
$status = 0;

while(!feof($myfile)) {
  $line = fgets($myfile);
  if (strlen($line) > 0) {
    $a =json_decode($line);
    if ($a->user == $user) {
      // user found
      $found =  true;
      $status = 2;
      break;
    } 
  }
}

$row = 'no data';
if (!$found) {
  // user not found, save new user
  $row = array("id"=> uniqid(), 
    "user"=> $user,  
    "password"=> password_hash($password, PASSWORD_DEFAULT),
    "name"=> $name,
    "color"=> $color,
    "geo"=> $geo,
    "birthday"=> $birthday
    );
  fwrite($myfile, json_encode($row)."\n");
  $status = 1;
}
fclose($myfile);
 
// echo json_encode($row);
echo '{"status": ' .$status . ', "data":' . json_encode($row) . '}';
?>