<?php
session_start();
$data_str = file_get_contents('books.json');
$books = json_decode($data_str, true);

$in = false;

if (isset($_SESSION['username'])) {
    $in = true;
}
if ($_GET['type'] == "logout") {
    $in = false;
    session_destroy();
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
                        <a href="profile.php" style="text-decoration: none;">
                            <p>Profile</p>
                        </a>
                    </div>
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
    <div id="content">
        <div id="card-list">
            <?php foreach ($books as $book) : ?>
                <div class="book-card">
                    <div class="image">
                        <img src="assets/<?= $book['image'] ?>" alt="">
                    </div>
                    <div class="details">
                        <h2><a href="book.php?title=<?= $book['title'] ?>&author=<?= $book['author'] ?>"><?= $book['author'] ?> - <?= $book['title'] ?></a></h2>
                    </div>
                    <?php if ($_SESSION['admin'] == "true" && $in) : ?>
                        <a href="edit_book.php?title=<?= $book['title'] ?>&author=<?= $book['author'] ?>">
                            <div class="edit">
                                Edit
                            </div>
                        </a>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    <footer>
        <p>IK-Library | ELTE IK Webprogramming</p>
    </footer>
</body>

</html>