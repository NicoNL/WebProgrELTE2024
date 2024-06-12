<?php
    include('data.php');

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task 4</title>
    <link rel="stylesheet" href="src/index.css">
    <link rel="stylesheet" href="src/task.css">
</head>

<body>
    <header>
        <h1>4. Statisztika / Statistics</h1>
    </header>
    <div id="content">
        <div id="last">
            Legutóbbi telitalálat / Latest jackpot win: <b>???</b>
        </div>
        <table>
            <tr>
                <th>
                    Sorsolás dátuma<br>
                    Draw date                    
                </th>
                <th>
                    Nyerőszámok<br>
                    Winning numbers
                </th>
                <th>
                    5 találat<br>
                    5 correct
                </th>
                <th>
                    4 találat<br>
                    4 correct
                </th>
                <th>
                    3 találat<br>
                    3 correct
                </th>
                <th>
                    2 találat<br>
                    2 correct
                </th>
            </tr>
            <tr>
                <?php foreach($data as $number):?>
                    <tr>
                        <td><?= $number['date'] ?></td>
                        <td><?= implode(", " ,$number['numbers'])?></td>
                        <?php for($i = 5; $i > 1; $i--):?>
                            <?php if($number['winners'][$i]['count'] == 0):?>
                                <td><?=  "-" ?></td>
                            <?php else:?>
                                <td> <strong><?=$number['winners'][$i]['count'] ?></strong><?= " " . "(" . $number['winners'][$i]['prize'] . " Ft)"?></td>
                            <?php endif;?>
                        <?php endfor;?>  
                    </tr>
                    <?php endforeach;?>
                </tr>
        </table>
    </div>
</body>
</html>