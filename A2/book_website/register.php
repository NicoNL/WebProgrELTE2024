<?php
$errors = [];
$userCreated = false;
function foundUser($users, $username, $email)
{
    foreach ($users as $user) {
        if ($user['username'] == $username || $email == $user['email']) {
            return true;
        }
    }
    return false;
}
if ($_POST) {
    $input =  $_POST;
    if (!isset($input['username']) || trim(($input['username']) =="")) {
        $errors[] = "Please enter an username";
    }
    if (!isset($input['email']) || trim($input['email']) == "") {
        $errors[] = "Please enter an email";
    }
    if (!isset($input['password']) || trim($input['password']) == "" || trim($input['password']) == "" || !isset($input['re-password'])) {
        $errors[] = "Please enter a password";
    }
    if ($input['password'] != $input['re-password']) {
        $errors[] = "Please enter the same password";
    }
    $users_str = file_get_contents('users.json');
    $users = json_decode($users_str, true);
    if (foundUser($users, $input['username'], $input['email'])) {
        $errors[] = "The given username or email is in used already";
    }
    if (count($errors) == 0) {
        $books =  [];
        $user = array(
            'username' => $input['username'],
            'email' => $input['email'],
            'password' => $input['password'],
            'admin' => $input['admin'],
            'books' => $books,
            'read' => []
        );
        $users[] = $user;
        $new = json_encode($users, JSON_PRETTY_PRINT);
        file_put_contents('users.json', $new);
    }
}
?>

<!DOCTYPE html>
<html lang="en">


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IK-Library | Register</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="styles/login.css">
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/cards.css">
    <link rel="icon" href="components/icon.ico" type="image/x-icon">

</head>

<body>
    <header>
        <div>
            <a href="index.php">
                <img href="index.php" class="logo" src="components/logo.png" alt="">
                <h1><a href="index.php">IK-Library</a> > Register</h1>
            </a>
        </div>
        <a href="login.php">
            <button class="loginButton">Login</button>
        </a>
    </header>
    <div class="loginForm">
        <form action="register.php" method="post" novalidate>
            <div class="form-floating mb-3">
                <input name="username" type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Username</label>
            </div>
            <div class="form-floating mb-3">
                <input name="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email</label>
            </div>
            <div class="form-floating mb-3">
                <input name="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            <div id="password" class="form-floating mb-3">
                <input name="re-password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Re-enter Password</label>
            </div>
            <input type="text" name="type" value="registration" hidden>
            <input type="text" name="admin" value=false hidden>
            <?php if (count($errors)  == 0 && $input['type'] == "registration") : ?>
                <div class="success">
                    The registration was succesful, now you can go back and log in
                </div>
            <?php elseif (count($errors) > 0 && $input['type'] == "registration") : ?>
                <div class="errors">
                    <?php foreach ($errors as $error) : ?>
                        <?= "- " . $error ?>
                        <br>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            <input id="RegisterButton" type="submit" value="register" class="loginButton">
        </form>
    </div>
    <footer>
        <p>IK-Library | ELTE IK Webprogramming</p>
    </footer>
</body>

</html>