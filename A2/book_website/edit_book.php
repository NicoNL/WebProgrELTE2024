<?php

$data_str = file_get_contents('books.json');
$books = json_decode($data_str, true);

$errors = [];
$title;
$author;
$year;
$description;
$planet;
$image;

foreach ($books as $book) {
    if ($book['title'] == $_GET['title']) {
        $title = $book['title'];
        $author = $book['author'];
        $year = $book['year'];
        $description = $book['description'];
        $planet = $book['planet'];
        $image = $book['image'];
    }
}
function foundBook($books, $title, $original)
{
    foreach ($books as $book) {
        if ($book['title'] == $title && $original != $book['title']) {
            return true;
        }
    }
    return false;
}

$folder = 'assets/';
$files = glob($folder . '*.{jpg,jpeg,png,gif}', GLOB_BRACE);

session_start();
$in = false;

if (isset($_SESSION['username'])) {
    $in = true;
}
if ($_GET['type'] == "logout") {
    $in = false;
    session_destroy();
}


$foundBook  = false;
if ($_POST) {
    $input =  $_POST;
    if (!isset($input['title']) || trim(($input['title']) == "")) {
        $errors[] = "Please enter a Title";
    }
    if (foundBook($books, $input['title'], $_POST['originalTitle'])) {
        $errors[] = "This book has been registered already";
    }
    if (!isset($input['author']) || trim($input['author']) == "") {
        $errors[] = "Please enter an Author";
    }
    if (!isset($input['year']) || trim($input['year']) == "") {
        $errors[] = "Please enter a year";
    }
    if (!is_numeric($input['year'])) {
        $errors[] = "Please enter a valid a year";
    }
    if (!isset($input['planet']) || trim($input['planet']) == "") {
        $errors[] = "Please enter a planet";
    }
    if (!isset($input['description']) || trim($input['description']) == "") {
        $errors[] = "Please enter a description";
    }
    if (!isset($input['img']) || trim($input['img']) == "") {
        $errors[] = "Please choose an image for the cover";
    }

    if (count($errors) == 0 && $_POST['type'] == "editBook") {
        foreach ($books as &$book) {
            if ($book['title'] == $_POST['originalTitle']) {
                $book['title'] = $input['title'];
                $book['author'] = $input['author'];
                $book['year'] = (int)$input['year'];
                $book['planet'] = $input['planet'];
                $book['description'] = $input['description'];
                $book['image'] = $input['img'];
                $reviews = [];
                $new = json_encode($books, JSON_PRETTY_PRINT);
                file_put_contents('books.json', $new);
                header('Location: index.php');
                exit;
            }
        }

    } else {
        header('Location: edit_book.php?title=' . $_POST['originalTitle'] . '&error=repeat');
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IK-Library | Edit</title>
    <link rel="stylesheet" href="styles/book.css">
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/cards.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="icon" href="components/icon.ico" type="image/x-icon">

</head>

<body>
    <header>
        <div>
            <a href="index.php">
                <img href="index.php" class="logo" src="components/logo.png" alt="">
                <h1><a href="index.php">IK-Library</a> > Edit Book</h1>
            </a>
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
    <div class="BookForm">
        <form action="edit_book.php?title=<?= $_GET['originalTitle'] ?>&error=repeat" method="post" novalidate>
            <div class="form-floating mb-3">
                <input name="title" value="<?= $title ?>" type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Title</label>
            </div>
            <div class="form-floating mb-3">
                <input name="author" value="<?= $author ?>" type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Author</label>
            </div>
            <div class="form-floating mb-3">
                <input name="year" value="<?= $year ?>" type="number" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingInput">Publication Year</label>
            </div>
            <div class="form-floating mb-3">
                <input name="planet" value="<?= $planet ?>" type="text" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingInput">Planet</label>
            </div>
            <div class="form-floating">
                <textarea name="description" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"><?= $description ?></textarea>
                <label for="floatingTextarea2">Description</label>
            </div>
            <br>
            <div>
                <h3>Book Cover</h3>
                <?php foreach ($files as $file) : ?>
                    <?php $filename = basename($file) ?>
                    <label>
                        <div class="radio-option">
                            <input class="img-radio" type="radio" name="img" value="<?= $filename ?>" <?php if ($filename == $image) echo 'checked' ?>> <img class="img-option" src="<?= $file ?>">
                        </div>
                    </label>
                <?php endforeach; ?>
            </div>
            <input type="text" name="type" value="editBook" hidden>
            <input type="text" name="originalTitle" value="<?= $_GET['title'] ?>" hidden>
            <?php if (count($errors)  == 0 && $input['type'] == "editBook") : ?>
                <div class="success">
                    The new book was edited successfully
                </div>
            <?php elseif ((count($errors) > 0 && $input['type'] == "editBook")) : ?>
                <div class="errors">
                    <?php foreach ($errors as $error) : ?>
                        <?= "- " . $error ?>
                        <br>
                    <?php endforeach; ?>
                </div>
            <?php elseif ($_GET['error'] == "repeat") : ?>
                <div class="errors">
                    This book already exists!
                    <br>
                </div>
            <?php endif; ?>
            <input id="bookButton" value="Edit Book" type="submit" class="loginButton">
        </form>
    </div>
    <footer>
        <p>IK-Library | ELTE IK Webprogramming</p>
    </footer>
</body>

</html>