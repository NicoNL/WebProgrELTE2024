<?php
session_start();

$in = false;
$users_str = file_get_contents('users.json');
$users = json_decode($users_str, true);

if (isset($_SESSION['username'])) {
    $in = true;
}
if ($_GET['type'] == "logout") {
    $in = false;
    session_destroy();
}
$books = [];
$read = [];

foreach ($users as $user) {
    if ($user['username'] == $_SESSION['username']) {
        $books = $user['books'];
        $read = $user['read'];
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IK-Library | Home</title>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/cards.css">
    <link rel="stylesheet" href="styles/profile.css">
    <link rel="icon" href="components/icon.ico" type="image/x-icon">
</head>

<body>
    <header>
        <div class="HeaderLeft">
            <div>
                <a href="index.php">
                    <img href="index.php" class="logo" src="components/logo.png" alt="">
                    <h1><a href="index.php">IK-Library</a> > Home</h1>
                </a>
            </div>
        </div>
        <?php if ($in) : ?>
            <div class="dropdown">
                <button class="dropbtn">
                    <img src="profiles/default.png" alt="<?= $_SESSION['username'] ?>">
                </button>
                <div class="dropdown-content">
                    <span id="username">
                        <p><?= $_SESSION['username'] ?></p>
                    </span>
                    <?php if ($_SESSION['admin'] == "true") : ?>
                        <div>
                            <a href="new_book.php" style="text-decoration: none;">
                                <p>New Book</p>
                            </a>
                        </div>
                    <?php endif; ?>
                    <div>
                        <a href="index.php?type=logout" style="text-decoration: none;">
                            <p>Logout</p>
                        </a>
                    </div>
                </div>
            </div>
        <?php else : ?>
            <a href="login.php">
                <button class="loginButton">Login</button>
            </a>
        <?php endif; ?>

    </header>
    <section class="UserInfo">
        <div>
            <figure>
                <img class="UserPic" src="profiles/default.png" alt="">
            </figure>
        </div>
        <div class="UserData">
            <div>
                <h2 class="Username"><?= $_SESSION['username'] ?></h2>
            </div>
            <div>
                <h3>Email:</h3>
                <p><?= $_SESSION['email'] ?></p>
            </div>
            <div>
                <h3>Last login:</h3>
                <p><?= $_SESSION['date'] ?></p>
            </div>
            <div>
                <h2>Reviews:</h2>
                <?php if (count($books) > 0) : ?>
                    <?php foreach ($books as $book) : ?>
                        <div class="review">
                            <h4><?= $book['title'] ?></h4>
                            <p>Rating: <?= $book['rating'] ?></p>
                            <?php if (trim($book['comment']) != "") : ?>
                                <p><?= $book['comment'] ?></p>
                            <?php endif; ?>
                        </div>
                        <br>
                    <?php endforeach; ?>
                <?php else : ?>
                    <p>You haven't reviewed any book yet</p>
                <?php endif; ?>
            </div>
            <div>
                <h2>Read Books:</h2>
                <?php if (count($read) > 0) : ?>
                    <?php foreach ($read as $r) : ?>
                        <div class="review">
                            <h4><?= $r['title'] ?></h4>
                            <p>Date: <?= $r['date'] ?></p>
                        </div>
                        <br>
                    <?php endforeach; ?>
                <?php else : ?>
                    <p>You haven't marked as 'read' any book yet</p>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <footer>
        <p>IK-Library | ELTE IK Webprogramming</p>
    </footer>
</body>

</html>