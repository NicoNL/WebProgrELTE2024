<?php 

$errors = [];
$data = [];
$input = $_GET;

session_start();


function validate(&$data, &$errors, $input) {
    // CREATE VALIDATION LOGIC HERE!

   // setting img , no need to validate since no error possible
   if(isset($input['img']))
   {
       $data['img'] = $input['img']; 
   }
   
   
   //validation for name
    if(!isset($input['name']) || trim($input['name']) == ""){
       $errors[]= "Enter a name!";
    }
    else if(strlen($input['name']) < 4 ){
       $errors[]= "Enter a name longer than 4 characters!";
    }
    else{
       $data['name'] = $input['name'];
    }

    
   // validation for positions
   if(!isset($input['positions']) || trim($input['positions']) == "")
    {
       $errors []= "Enter the positions!";
       
    }
    else{

    $poss = explode(",", $input['positions']);
    $flag = true;
    
    foreach ($poss as $p) {
        
        if (!preg_match("/^([^,]+)(,\s*[^,]+)*$/", $p)) {
           $flag = false;
    }
    if ($flag) {
       $data["positions"] = $input["positions"];
    }
    else{
        $errors []= "Enter the positions separated with comas!";
    }   
    }

   }
   
   /// validate for age 
   if (!isset($input['goals2024']) || trim($input['goals2024']) == ""){
       $errors []= "Enter the number of goals!";
   }

   else if(!filter_var($input['goals2024'], FILTER_VALIDATE_INT)) {
       $errors []= "Enter valid integer!";
   }

   else{
       $data['goals2024']= $input['goals2024'];
       $data['goals2023']= 0;

    }

    return count($errors) === 0;
}

$is_valid = validate($data, $errors, $input);
// var_dump($is_valid);
// echo "<br>";

// echo "this is data array = ";
// var_dump($data);
// echo "<br>";

// echo "errors array = ";
// var_dump($errors);
// echo "<br>";




// Add to the JSON if valid!
if($is_valid){
    
    $file_string = file_get_contents("players.json");
    $json_array = json_decode($file_string, true);


    array_push($json_array, $data);

    $new_json_file = json_encode($json_array, JSON_PRETTY_PRINT);

    file_put_contents('players.json', $new_json_file);

}


?>



<!DOCTYPE html>
<html lang="en" data-theme="forest">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Addplayer</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@4.10.2/dist/full.min.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body>
    <div class="header w-full text-3xl bg-neutral p-5 font-bold text-neutral-content text-center ">
        Roaster of Team Webprog
        <a class="btn btn-primary font-bold ml-10 mt-1" href="index.php?type=login">Main Page</a>
    </div>
    <div class="flex">
        <form action="addplayer.php" method="get" class="mx-auto mt-3 w-3/12 p-10">
            <h1 class="text-3xl  p-5 font-bold">Add a new player</h1>
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text">Name</span>
                </div>
                <input type="text" name="name" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
            </label>

            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text">Goals</span>
                </div>
                <input type="number" name="goals2024" placeholder="Type here"
                    class="input input-bordered w-full max-w-xs" />
            </label>

            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text">Positions</span>
                </div>
                <input type="text" name="positions" placeholder="Type here"
                    class="input input-bordered w-full max-w-xs" />
                <div class="label">
                    <span class="label-text-alt">Write down the positions separated with a coma! ','</span>
                </div>
            </label>

            <select class="select w-full max-w-xs mb-3 select-bordered" name="img">
                <option disabled selected>Select the picture</option>
                <option value="batorini">Batorini</option>
                <option value="benke">Benke</option>
                <option value="carlaise">Carlaise</option>
                <option value="cher">Cher</option>
                <option value="dace">Dace</option>
                <option value="kiss">Kiss</option>
            </select>
            <input type="submit" value="Add new player" class="btn btn-primary font-bold">
        </form>

        
        <?php if(!count($errors) == 0): ?>
        <div class="results w-6/12  m-auto p-10">
            <div class="errors">
                <h2 class="text-3xl mb-5 font-bold">Failed addition</h2>
                <?php foreach($errors as $err): ?>
                <div role="alert" class="alert alert-error mb-2">
                    <span><?php echo $err ?></span>
                </div>
                <?php endforeach; ?>
                
            </div>
        <?php else: ?>
            <div class="success">
                <h2 class="text-3xl mb-2 font-bold">Successful addition</h2>
                <a class="btn btn-primary font-bold mt-1" href="index.php">Go back to Main Page</a>
            </div>
        </div>
        <?php endif; ?>
    </div>
</body>

</html>