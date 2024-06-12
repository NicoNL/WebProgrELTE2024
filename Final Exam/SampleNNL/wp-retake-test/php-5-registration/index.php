<!-- 
Hooray! You've won the lottery! However, before you can claim your prize, you need to register by providing your personal details. In this task, you are required to create a PHP script to validate the information needed to claim the prize.

- a. (2 points) Filling in the full name, email address, year of birth, and bank account number fields is mandatory.
- b. (1 point) The full name must consist of at least 2 words.
- c. (1 point) The email format must be correct.
- d. (1 point) The year of birth must be an integer.
- e. (1 point) The year of birth must be between 1900 and 2006.
- f. (1 point) The bank account number must consist of exactly 26 characters.
- g. (3 points) The 9th and 18th characters of the bank account number must be a hyphen (`-`), and all other characters must be digits 0-9. (e.g. `12345678-00000000-12345678`)
- h. (1 point) It's mandatory to check the checkbox.
- i. (1 point) Upon successful validation, the `success` element should appear, and the `errors` element should be hidden. -->
<?php
$errors = [];
$data = [];
$input = $_GET;

function validate(&$data, &$errors, $input)
{
    $errors = [];

    if (!isset($input['fullname']) || trim($input['fullname']) == "") {
        $errors[] = "Enter a name";
    } else if (strlen($input['fullname']) < 2 || str_word_count($input['fullname']) < 2) {
        $errors[] = "Please enter a name longer than 2 characters or at least two names";
    } else {
        $data['name'] = $input['name'];
    }

    if (!isset($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please enter a valid email address";
    } else {
        $data['email'] = $input['email'];
    }

    if (!isset($input['year']) || !is_numeric($input['year'])) {
        $errors[] = "Please enter a valid year numner";
    } else if ($input['year'] < 1900 || $input['year'] > 2006) {
        $errors[] = "Please enter a year between 1900 and 2006";
    } else {
        $data['year'] = $input['year'];
    }
    $valid_card = true;
    if (!isset($input['account']) || strlen($input['account']) < 26) {
        $errors[] = "Please enter a 26 characters for the Bank account";
    } else {
        for ($i = 0; $i < strlen($input['account']); $i++) {
            if (($i == 8 || $i == 17) && $input['account'][$i] != '-') {
                $errors[] = "Please enter a valid format for the Bank account";
                $valid_card = false;
                break;
            } else if (!ctype_digit($input['account'][$i]) && $i != 8 && $i != 17) {
                $errors[] = "Please enter just numbers for the Bank account";
                $valid_card = false;
                break;
            }
        }
    }
    if($valid_card){
        $data['year'] = $input['year'];
    }

    if (!isset($input['accept'])) {
        $errors[] = "Please accept the rules";
    }

    return count($errors) == 0;
}

$validInput = validate($data, $errors, $input);

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task 5</title>
    <link rel="stylesheet" href="src/index.css">
    <link rel="stylesheet" href="src/task.css">
</head>

<body>
    <header>
        <h1>5. Regisztráció / Registration</h1>
    </header>

    <div id="content">
        <form novalidate action="">
            <div class="input">
                <label for="fullname">Teljes név / Full name</label>
                <input type="text" name="fullname" id="fullname" placeholder="Teljes név / Full name">
            </div>
            <div class="input">
                <label for="email">E-mail cím / E-mail address</label>
                <input type="email" name="email" id="email" placeholder="E-mail cím / E-mail address">
            </div>
            <div class="input">
                <label for="year">Születési év / Year of birth</label>
                <input type="number" name="year" id="year" placeholder="Születési év / Year of birth">
            </div>
            <div class="input">
                <label for="account">Bankszámlaszám / Bank account number</label>
                <input type="text" name="account" id="account" placeholder="Bankszámlaszám / Bank account number">
            </div>
            <div class="input">
                <input type="checkbox" name="accept" id="accept">
                <label for="accept">Elfogadom a szabályzatot. / I accept the rules.</label>
            </div>
            <div class="input">
                <button type="submit">Küldés / Send</button>
            </div>
        </form>
        <?php if ($validInput) : ?>
            <div id="success">
                <img src="img/success.jpg">
            </div>
        <?php else : ?>
            <div id="error">
                <img src="img/error.jpg">
                <ul>
                    <?php foreach ($errors as $err) : ?>
                        <li><?= $err ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>

        <div id="testing">
            <h2>Linkek a teszteléshez / Links for testing</h2>
            <div>A megoldásod nem elég, ha helyes eredményt az ezekre a tesztekre! Ez csak segítség, ha szeretnéd
                ellenőrizni.</div>
            <div>Your solution is not necessarily correct if it passes these tests! This is just a help if you want to
                check.</div>

            <ul>
                <li><a href="index.php?fullname=John%20Doe&email=jdoe99%40inf.elte.hu&year=1999&account=12345678-12345678-12345678&accept=on">Helyes
                        / Correct</a></li>
                <li><a href="index.php?fullname=&email=jdoe99%40inf.elte.hu&year=1999&account=12345678-12345678-12345678&accept=on">Hiányzó
                        név / Missing name</a></li>
                <li><a href="index.php?fullname=John&email=jdoe99%40inf.elte.hu&year=1999&account=12345678-12345678-12345678&accept=on">Helytelen
                        név / Incorrect name</a></li>
                <li><a href="index.php?fullname=John%20Doe&email=elte.hu&year=1999&account=12345678-12345678-12345678&accept=on">Helytelen
                        e-mail / Incorrect e-mail</a></li>
                <li><a href="index.php?fullname=John%20Doe&email=jdoe99%40inf.elte.hu&year=old&account=12345678-12345678-12345678&accept=on">Születési
                        év nem szám / Year of birth is not a number</a></li>
                <li><a href="index.php?fullname=John%20Doe&email=jdoe99%40inf.elte.hu&year=1980.7&account=12345678-12345678-12345678&accept=on">Születési
                        év nem egész szám / Year of birth is not an integer</a></li>
                <li><a href="index.php?fullname=John%20Doe&email=jdoe99%40inf.elte.hu&year=2008&account=12345678-12345678-12345678&accept=on">Születési
                        év tartományon kívüli / Year of birth is out of range</a></li>
                <li><a href="index.php?fullname=John%20Doe&email=jdoe99%40inf.elte.hu&year=1999&account=12345678-12345678-123456&accept=on">Bankszámlaszám
                        hossza hibás / Length of account number is wrong</a></li>
                <li><a href="index.php?fullname=John%20Doe&email=jdoe99%40inf.elte.hu&year=1999&account=12345678-1A345678-12345678&accept=on">Helytelen
                        bankszámlaszám / Incorrect account number</a></li>
                <li><a href="index.php?fullname=John%20Doe&email=jdoe99%40inf.elte.hu&year=1999&account=12345678-12345678-123-5678&accept=on">Helytelen
                        bankszámlaszám / Incorrect account number</a></li>
                <li><a href="index.php?fullname=John%20Doe&email=jdoe99%40inf.elte.hu&year=1999&account=12345678-12345678-12345678">Jelölőmező
                        hiányzik / Checkbox is missing</a></li>
            </ul>
        </div>
    </div>
</body>

</html>