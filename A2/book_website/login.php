<?php
session_start();

function foundUser($users, &$username, $password,&$admin,&$email)
{
    foreach ($users as $user) {
        if (($user['username'] == $username || $username == $user['email']) && $user['password'] == $password) {
            $admin = $user['admin'];
            $email = $user['email'];
            $username = $user['username'];
            return true;
        }
    }
    return false;
}
$found = false;
if ($_POST) {
    $input = $_POST;
    $input =  $_POST;
    if (!isset($input['username']) || trim(($input['username']) =="")) {
        $errors[] = "Please enter an username";
    }
    if (!isset($input['password']) || trim($input['password']) == "") {
        $errors[] = "Please enter a password";
    }
    $users_str = file_get_contents('users.json');
    $users = json_decode($users_str, true);
    $admin;
    $email;
    if (foundUser($users, $input['username'],$input['password'], $admin,$email)) {
        $found = true;
        date_default_timezone_set('Europe/Budapest');
        $date = date('d-m-y H:i');
        $_SESSION['date'] = $date;
        $_SESSION['username'] = $input['username'];
        $_SESSION['email'] = $email;
        $_SESSION['type'] = "login";
        $_SESSION['admin'] = $admin;
         header('Location: index.php');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IK-Library | Login</title>
    <link rel="stylesheet" href="styles/login.css">
    <link rel="stylesheet" href="styles/cards.css">
    <link rel="stylesheet" href="styles/main.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="icon" href="components/icon.ico" type="image/x-icon">

</head>

<body>
    <header>
        <div>
            <a href="index.php">
                <img href="index.php" class="logo" src="components/logo.png" alt="">
                <h1><a href="index.php">IK-Library</a> > Login</h1>
            </a>
        </div>
    </header>
    <div class="loginForm">
        <form action="login.php" method="post" novalidate>
            <div class="form-floating mb-3">
                <input name="username" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email or username</label>
            </div>
            <div id="password" class="form-floating">
                <input name="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>

            <input type="text" name="type" value="login" hidden>
            <input type="submit" value="login" class="loginButton">
        <?php if(!$found && $input['type'] == "login") :?>
            <div class="errors">
                The username or password is wrong, please try again.
            </div>
        <?php endif; ?>
        </form>
    </div>
    <div class="RegisterInfo">
        <p>No account yet? Register now!</p>
        <a href="singup"></a>
        <a href="register.php">
            <button class="loginButton">Register</button>
        </a>
    </div>

    <footer>
        <p>IK-Library | ELTE IK Webprogramming</p>
    </footer>
</body>

</html>