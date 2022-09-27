<!DOCTYPE html>
<html>
<body>

<?php
$age = array("Peter"=>35, "Ben"=>37, "Joe"=>43);

echo json_encode($age);
echo "<br>\n";
unset($age[1]);

echo "<br>\n";
echo json_encode($age);
echo "<br>\n";
$pictures = json_decode(file_get_contents('pictures.json'), true);
print_r($pictures);
echo "<br>\n";
echo json_encode($pictures);
echo "<br>\n";
unset($pictures[1]);
echo json_encode($pictures);
echo "<br>\n";
$picture = array(
  "file"=> "test.jpg",
  "category"=> "1",
  "title"=> "Titel",
  "subtitle"=> "Untertitel"
  );
  array_push($pictures, $picture);
  print_r($pictures);
  echo "<br>\n";
    echo json_encode($pictures);
    echo "<br>\n";
    $a= json_decode(file_get_contents('pictures.json'), false);
    print_r($a);
    echo "<br>\n";echo "<br>\n";
    $a  = array();
    foreach ($pictures as $p) {
      echo json_encode($p);
      array_push($a, $p);
      echo "<br>\n";
    }
    echo json_encode($a);
    ?>  
</body>
</html>