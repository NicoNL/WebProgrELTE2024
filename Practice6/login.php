<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@4.10.2/dist/full.min.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body>
<!-- c -->
    <body class="p-0">
        <div class="header w-full text-3xl bg-neutral p-5 font-bold text-neutral-content text-center "> Login/Registration <a class="btn btn-primary font-bold ml-10 mt-1" href="index.php">Back to main page</a> </div>
        <form action="login.php" method="post" class="p-5" novalidate>
            <h1 class="text-3xl font-bold">Register</h1> <label class="form-control w-full max-w-xs">
                <div class="label"> <span class="label-text">Name</span> </div> <input type="text" name="name" placeholder="Type here" class="input input-bordered w-full max-w-xs" value="<?= $data['name'] ?? '' ?>" />
            </label> <label class="form-control w-full max-w-xs">
                <div class="label"> <span class="label-text">E-mail</span> </div> <input type="email" name="email" placeholder="Type here" class="input input-bordered w-full max-w-xs" value="<?= $data['name'] ?? '' ?>" />
            </label> <label class="form-control w-full max-w-xs">
                <div class="label"> <span class="label-text">Password</span> </div> <input type="password" name="password" placeholder="Type here" class="input input-bordered w-full max-w-xs" value="<?= $data['name'] ?? '' ?>" />
            </label> <input type="submit" value="Registration" class="btn btn-primary mt-2">
        </form>
    </body>
</body>

</html>