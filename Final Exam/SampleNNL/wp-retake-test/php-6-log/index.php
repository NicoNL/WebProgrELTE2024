<?php
$data = [];
$input = $_POST;
$data['date'] = $input['date'];
$data['change'] = $input['change'];
$validData = false;
if( !empty($data['date']) && !empty($data['change'])){
    $validData = true;
}

$file = file_get_contents("expenses.json");
$json_array = json_decode($file, true);

function compareDates($a, $b) {
    $dateA = strtotime($a['date']);
    $dateB = strtotime($b['date']);
    return $dateA - $dateB;
}

// Sort the array using usort and the custom comparison function
usort($json_array , 'compareDates');

$found = false;

if(isset($_GET['delete'])){
    $deleteDate = $_GET['delete'];    
    for($i = 0; $i < count($json_array); $i++){
        if($json_array[$i]['date'] == $deleteDate){
            unset($json_array[$i]);
        }
    }
    $json_array = array_values($json_array); 
    $new_json = json_encode($json_array, JSON_PRETTY_PRINT);

    file_put_contents('expenses.json', $new_json);

    header('Location: index.php');
    exit();
    
}

if($json_array != NULL && isset($data['date']))
{
    var_dump($data['change']);
    for($i = 0; $i < count($json_array) ; $i++) {
        if ($data['date'] == $json_array[$i]['date']) {
            $json_array[$i]['change'] = (string)((int)$data['change'] + (int)$json_array[$i]['change']);
            $found = true;
            break;
        }
    }
    if (!$found && $validData) {
        $json_array[] = $data;
    }
    
    $new_json = json_encode($json_array, JSON_PRETTY_PRINT);

    file_put_contents('expenses.json', $new_json);

    header('Location: index.php');
    exit();
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task 6</title>
    <link rel="stylesheet" href="src/index.css">
    <link rel="stylesheet" href="src/task.css">
</head>

<body>
    <header>
        <h1>6. Napló / Log</h1>
    </header>

    <div id="content">
        <h2>Új bejegyzés / New entry</h2>
        <form action="" method="post" novalidate>
            <div class="input">
                <label for="date">Dátum / Date</label>
                <input type="date" name="date" id="date" placeholder="Teljesítmény neve / Achievement name">
            </div>
            <div class="input">
                <label for="change">Egyenlegváltozás / Balance change</label>
                <input type="number" name="change" id="change" placeholder="Egyenlegváltozás / Balance change">
            </div>
            <div class="input">
                <button type="submit">➕ Save / Mentés</button>
            </div>
        </form>

        <h2>Bejegyzések / Entries</h2>
        <ul>
            <?php foreach ($json_array as $expense) : ?>
                <li>Date: <?= $expense['date'] ?> <?= $expense['change'] ?> Ft  <a href="index.php?delete=<?php echo $expense["date"]?>">Delete </a></li>
            <?php endforeach; ?>
        </ul>
    </div>
</body>

</html>