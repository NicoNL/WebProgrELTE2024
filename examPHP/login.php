<?php

session_start();

if ($_POST) {
    if ($_POST['type'] == 'logout' && isset($_SESSION['email'])) {
        session_destroy();
    }
    //        var_dump($_POST); for showing inputs
    if ($_POST['type'] == 'login') {
        $users_str = file_get_contents('users.json');
        $users = json_decode($users_str, true);
        $found = false;
        foreach ($users as $user) {
            if ($user['email'] == $_POST['email'] && $user['password'] == $_POST['password']) {
                $found =  true;
                break;
            }
        }
        if ($found) {
            $_SESSION['email'] = $_POST['email'];
        }
    }
    if ($_POST['type'] == 'registration') {
        $users_str = file_get_contents('users.json');
        $users = json_decode($users_str, true);
        $users[] = $_POST;
        $new = json_encode($users, JSON_PRETTY_PRINT);
        file_put_contents('users.json', $new);
    }

    if ($_POST && $_POST['type'] != 'logout' && isset($_SESSION['email'])) {
        $in = true;
    }
    if ($_POST && $_POST['type'] == 'logout' && isset($_SESSION['email'])) {
        session_destroy();
        $in = false;
        $found = false;
    }
}

// var_dump($_POST['type'])

?>
<!DOCTYPE html>
<html lang="en" data-theme="forest">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@4.10.2/dist/full.min.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="p-0">
    <div class="header w-full text-3xl bg-neutral p-5 font-bold text-neutral-content text-center ">
        Login/Registration
        <a class="btn btn-primary font-bold ml-10 mt-1" href="index.php">Back to main page</a>
    </div>
    <?php if ($in) : ?>
        <div class="p-5">
            <div>You are logged in as <?= $_SESSION['email'] ?></div>
            <form action="login.php" method="post" class="p-5" novalidate>
                <input type="text" name="type" value="logout" hidden>
                <input type="submit" value="Log out" class="btn btn-primary mt-2">
            </form>
        </div>
    <?php else : ?>
        <div class="grid grid-cols-2 w-8/12 mx-auto">
            <form action="login.php" method="post" class="p-5" novalidate>
                <h1 class="text-3xl font-bold">Register</h1>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">Name</span>
                    </div>
                    <input type="text" name="name" placeholder="Type here" class="input input-bordered w-full max-w-xs" value="<?= $data['name'] ?? '' ?>" />
                </label>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">E-mail</span>
                    </div>
                    <input type="email" name="email" placeholder="Type here" class="input input-bordered w-full max-w-xs" value="<?= $data['name'] ?? '' ?>" />
                </label>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">Password</span>
                    </div>
                    <input type="password" name="password" placeholder="Type here" class="input input-bordered w-full max-w-xs" value="<?= $data['name'] ?? '' ?>" />
                </label>
                <input type="text" name="type" value="registration" hidden>
                <input type="submit" value="registration" class="btn btn-primary mt-2">
            </form>
            <form action="login.php" method="post" class="p-5" novalidate>
                <h1 class="text-3xl font-bold">Login</h1>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">E-mail</span>
                    </div>
                    <input type="email" name="email" placeholder="Type here" class="input input-bordered w-full max-w-xs" value="<?= $data['name'] ?? '' ?>" />
                </label>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">Password</span>
                    </div>
                    <input type="password" name="password" placeholder="Type here" class="input input-bordered w-full max-w-xs" value="<?= $data['name'] ?? '' ?>" />
                </label>
                <input type="text" name="type" value="login" hidden>
                <input type="submit" value="Login" class="btn btn-primary mt-2">
                <br>
                <?= $_POST && $_POST['type'] == 'login' && $found ? "You are logged in " : "You are not logged in" ?>
            </form>
        </div>
    <?php endif; ?>
</body>

</html>