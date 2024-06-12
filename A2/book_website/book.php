<?php
session_start();
$in = false;
$errors = [];
$reviews = [];
$userBooks = [];
if (isset($_SESSION['username'])) {
    $in = true;
}
if ($_GET['type'] == "logout") {
    $in = false;
    session_destroy();
}
$data_str = file_get_contents('books.json');
$books = json_decode($data_str, true);

$users_str = file_get_contents('users.json');
$users = json_decode($users_str, true);

function readBook($users, $username, $title)
{
    foreach ($users as $user) {
        if ($user['username'] == $username) {
            foreach ($user['read'] as $b1) {
                if ($b1['title'] == $title) {
                    return true;
                }
            }
        }
    }
    return false;
}

$foundBook  = false;
if (isset($_GET['title']) && isset($_GET['author'])) {
    $title = urldecode($_GET['title']);
    $author = urldecode($_GET['author']);
    $img;
    $desc;
    $year;
    $planet;
    foreach ($books as $book) {
        if ($title == $book['title'] && $author == $book['author']) {
            $img =  $book['image'];
            $desc = $book['description'];
            $year = $book['year'];
            $planet = $book['planet'];
            $reviews = $book['reviews'];
            $foundBook = true;
        }
    }
}
$correctForm = true;
if ($_POST) {
    $input = $_POST;
    if (!isset($input['rating'])) {
        $errors[] = "Please enter a rating";
        $correctForm = false;
    }
}
if ($_POST && $_POST['type'] ==  "read") {
    foreach ($users as &$user) {
        if ($user['username'] == $_SESSION['username']) {
            date_default_timezone_set('Europe/Budapest');
            $date = date('d-m-y H:i');
            $read_b = array(
                'title' => $_GET['title'],
                'date' => $date,
            );
            $user['read'][] = $read_b;  
        }
    }
    $new_users = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents('users.json', $new_users);
}

function avgRat($reviews)
{
    $sum = 0;
    foreach ($reviews as $review) {
        $sum += $review['rating'];
    }
    $avg = (float)$sum / count($reviews);
    return $avg;
}

function hasBook($books, $title)
{
    foreach ($books as $book) {
        if ($book['title'] == $title) {
            return true;
        }
    }
    return false;
}
function getBookS($users, $username)
{
    foreach ($users as $u) {
        if ($u['username'] == $username) {
            return $u['books'];
        }
    }
    return NULL;
}


if ($_POST && $correctForm) {
    $comment = "";
    if (isset($_POST['review'])) {
        $comment = $_POST['review'];
    }
    if (hasBook(getBookS($users, $_SESSION['username']), $_GET['title'])) {
        foreach ($books as &$book) {
            if ($book['title'] == $_GET['title']) {
                foreach ($book['reviews'] as $reviewKey => $review) {
                    if ($review['username'] == $_SESSION['username']) {
                        unset($book['reviews'][$reviewKey]);
                    }
                }
            }
            $book['reviews'] = array_values($book['reviews']);
        }
        foreach ($users as &$user) {
            if ($user['username'] == $_SESSION['username']) {
                foreach ($user['books'] as $bookKey => $b) {
                    if ($b['title'] == $_GET['title']) {
                        unset($user['books'][$bookKey]);
                    }
                }
            }
            $user['books'] = array_values($user['books']);
        }
    }

    foreach ($books as &$book) {
        if ($book['title'] == $_GET['title']) {
            $review = array(
                'username' => $_SESSION['username'],
                'rating' => (int)$_POST['rating'],
                'comment' => $comment
            );
            array_unshift($book['reviews'], $review);
            $reviews = $book['reviews'];
        }
    }
    foreach ($users as &$user) {
        if ($user['username'] == $_SESSION['username']) {
            $b = array(
                'title' => $_GET['title'],
                'rating' => (int)$_POST['rating'],
                'comment' => $comment
            );
            array_unshift($user['books'], $b);
            $userBooks = $user['books'];
        }
    }
    $new = json_encode($books, JSON_PRETTY_PRINT);
    file_put_contents('books.json', $new);


    $new_users = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents('users.json', $new_users);
}
$book_was_read = readBook($users, $_SESSION['username'], $_GET['title']);

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IK-Library | Book</title>
    <link rel="stylesheet" href="styles/book.css">
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/cards.css">
    <link rel="icon" href="assets/icon.ico" type="image/x-icon">

</head>

<body>
    <header>
        <div>
            <a href="index.php">
                <img href="index.php" class="logo" src="assets/logo.png" alt="">
                <h1><a href="index.php">IK-Library</a> > <?= $title ?></h1>
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
                    <?php if ($_SESSION['admin'] == true) : ?>
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
    <?php if ($foundBook) : ?>
        <section>
            <div>
                <div class="Basics">
                    <div>
                        <h2 class="Title"><?= $title ?></h2>
                        <h3 class="Author">By <?= $author ?></h3>
                        <?php if ($in) : ?>
                            <div>
                                <?php if (!$book_was_read) :  ?>
                                    <form method="post">
                                        <input type="text" name="type" value="read" hidden>
                                        <button id="mark-button" class="loginButton" type="submit" name="read">Mark as Read</button>
                                    </form>
                                <?php else :  ?>
                                    <button id="mark-button" class="loginButton" type="submit" name="read">Read</button>
                                <?php endif; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="Content">
                    <figure>
                        <img class="book-cover-pic" src="assets/<?= $img ?>" alt="Book cover">
                    </figure>
                    <div class="Information">
                        <div>
                            <h3 class="Title">Description</h3>
                            <p>
                                <?= $desc ?>
                            </p>
                            <br>
                        </div>
                        <div>
                            <div class="About">
                                <h3 class="Title">About</h3>
                                <div>
                                    <h5>Publication Year</h5>
                                    <?= $year ?>
                                </div>
                                <div>
                                    <h5>Planet</h5>
                                    <?= $planet ?>
                                </div>
                            </div>
                            <br>
                        </div>
                        <?php if (count($reviews) != 0) : ?>
                            <div>
                                <h3 class="Title">Rating</h3>
                                <h5 class="Rating"><?= number_format(avgRat($reviews), 1) ?></h5>
                                <div>
                                    <?php for ($i = 1; $i <= 5; $i++) : ?>
                                        <?php if ($i <= avgRat($reviews)) : ?>
                                            <label class="c-rating" for="star">&#9733;</label>
                                        <?php else : ?>
                                            <label class="n-rating" for="star">&#9733;</label>
                                        <?php endif; ?>
                                    <?php endfor; ?>
                                </div>
                            </div>
                        <?php endif; ?>
                        <div class="reviews">
                            <?php if ($in) : ?>
                                <div>
                                    <form action="book.php?title=<?= $_GET['title'] ?>&author=<?= $_GET['author'] ?>" method="post" novalidate>
                                        <h3 class="Title">Rate Book</h3>
                                        <div class="review-box">
                                            <div class="star-rating">
                                                <input type="radio" id="star5" name="rating" value="5"><label for="star5" title="5">&#9733;</label>
                                                <input type="radio" id="star4" name="rating" value="4"><label for="star4" title="3">&#9733;</label>
                                                <input type="radio" id="star3" name="rating" value="3"><label for="star3" title="3">&#9733;</label>
                                                <input type="radio" id="star2" name="rating" value="2"><label for="star2" title="2">&#9733;</label>
                                                <input type="radio" id="star1" name="rating" value="1"><label for="star1" title="1">&#9733;</label>
                                            </div>
                                        </div>
                                        <div>
                                            <textarea name="review" class="comment-box" placeholder="(Optional) Write a comment" id="review"></textarea>
                                        </div>
                                        <div>
                                            <input type="text" name="type" value="newBook" hidden>
                                            <?php if (!$correctForm && $_POST['type'] == "newBook") : ?>
                                                <div class="errors">
                                                    <?php foreach ($errors as $error) : ?>
                                                        <?= "- " . $error ?>
                                                        <br>
                                                    <?php endforeach; ?>
                                                </div>

                                            <?php endif; ?>
                                            <input id="bookButton" value="Submit" type="submit" class="loginButton">
                                        </div>
                                    </form>
                                </div>
                            <?php endif; ?>
                            <div class="Comments">
                                <?php if (count($reviews) == 0) : ?>
                                    <div>
                                        <br>
                                        <h4>This Book has no reviews yet :( , be the first one :)</h4>
                                        <br>
                                    </div>
                                <?php else : ?>
                                    <h3 class="Title">Reviews</h3>
                                    <?php foreach ($reviews as $review) : ?>
                                        <div class="comment">
                                            <div class="comment-info">
                                                <img class="user-pic" src="profiles/default.png">
                                                <label for="profile"><?= $review['username'] ?></label>
                                            </div>
                                            <div>
                                                <?php for ($i = 1; $i <= 5; $i++) : ?>
                                                    <?php if ($i <= $review['rating']) : ?>
                                                        <label class="color-star" for="star">&#9733;</label>
                                                    <?php else : ?>
                                                        <label class="no-star" for="star">&#9733;</label>
                                                    <?php endif; ?>
                                                <?php endfor; ?>
                                            </div>
                                            <div>
                                                <p class="comment-desc"><?= $review['comment'] ?></p>
                                            </div>
                                            <hr>
                                            <br>
                                        </div>
                                    <?php endforeach; ?>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    <?php else : ?>
        <h2>The given book was not found</h2>
        <p>The given book was removed or it does not exist </p>
    <?php endif; ?>
    <footer>
        <p>IK-Library | ELTE IK Webprogramming</p>
    </footer>
</body>

</html>