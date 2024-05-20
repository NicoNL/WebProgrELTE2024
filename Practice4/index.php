<?php 
    $errors = []; // store the errors
    $data = []; // store the correct values
    $input = $_GET;

    function validate($input, &$errors, &$data) {
        
        return count($errors) === 0;
    }
    
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/elte-fi/www-assets@19.10.16/styles/mdss.min.css">
</head>
<body>
    <h1>You might have a chance to win a new Iphone!!!😍😍</h1>
    <h2>The only thing you have to do is fill out this form.</h2>
    <form action="" method="get" novalidate>

        <h4>Name</h4>
        <input type="text" name="name" id="">

        <h4>E-mail</h4>
        <input type="email" name="email" id="">

        <h4>Card Number</h4>
        <input type="text" name="cardnum" id="">

        <h4>CCV/CVV</h4>
        <input type="text" name="cvv" id="">

        <h4>Color</h4>
        <select name="color" id="">
            <option value="1">Blue</option>
            <option value="2">Red</option>
            <option value="3">Black</option>
        </select>

        <h4>Expiry date</h4>
        <input type="date" name="date" id="">

        <h4>Agreeing to the contract<input type="checkbox" name="agree" id=""></h4>
    
    <input type="submit" value="Send">
    </form>
        <ul style="color:red">
           <li>Error 1</li>
        </ul>
        <h1>YOU'VE JUST WON A NEW IPHONE! 😍😍</h1>
</body>
</html>