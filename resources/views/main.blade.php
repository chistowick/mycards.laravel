<!DOCTYPE html>
<html>
    <head>
        <title>MyCards</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!--Styles and favicon-->
        <link href="css/style.css" rel="stylesheet" type="text/css" />
        <!--    <link rel="shortcut icon" href="https://mrbooks.ru/favicon.png" type="image/png">-->
        <!--End Styles-->
    </head>
    <body>
        <form>{{csrf_field()}}</form> {{--CSRF token--}}
        
        <div id="header">
            <?php
            if (isset($_SESSION['login'], $_SESSION['access'])
                    AND $_SESSION['access'] == 'allowed'):
                ?>
                <div id="authentication-allowed">
                    <p>Привет, <?= $_SESSION['login'] ?> </p>
                </div>
            <?php else : ?>
                <div id="authentication-denied">
                    <label for="login">login: </label>
                    <input type="text" id="login" name="login" 
                           placeholder="maxlength = 16" maxlength="16" >
                    <label for="login">password: </label>
                    <input type="password" id="password" name="password" 
                           placeholder="maxlength = 16" maxlength="16" >
                    <button class="sign-in" id="sign-in" type="button" value="Sign-in">
                        Sign-in</button>
                </div>  
            <?php endif; ?>
        </div>
        <div id="wrapper">
            <div id="leftArea">
                <div id="stack_1" class="cards stack_switch"><p>stack_1</p></div>
                <div id="stack_2" class="cards stack_switch"><p>stack_2</p></div>
                <div id="stack_3" class="cards stack_switch"><p>stack_3</p></div>
            </div>
            <div id="rightArea">
                <div id="menuOptions">
                    <div id="search" class="top_menu">
                        <select id="search_select" size="1" name="word">
                            <option value="Карточка_1">Карточка_1</option>
                            <option value="Карточка_2">Карточка_2</option>
                            <option value="Карточка_3">Карточка_3</option>
                            <option value="Карточка_4">Карточка_4</option>
                        </select>
                    </div>
                    <div id="front_side_activation" class="top_menu set_active_side">
                        <p>front side</p>
                    </div>
                    <div id="back_side_activation" class="top_menu set_active_side">
                        <p>back side</p>
                    </div>
                    <div id="addCard" class="top_menu"><p>add</p></div>
                    <div id="rewriteCard" class="top_menu"><p>edit</p></div>
                    <div id="deleteCard" class="top_menu"><p>delete</p></div>
                </div>
                <div id="workArea">
                    <div id="back" class="navigation"><p>BACK</p></div>
                    <div id="active_stack" class="cards">
                        <div id="original_side">
                            <div class="wrap_inf_card">
                                <div id="original_div"><p id="original"></p></div>
                                <div id="original_comment_div"><p id="original_comment"></p></div>
                            </div>
                        </div>
                        <div id="translation_side" style="display: none">
                            <div class="wrap_inf_card">
                                <div id="translation_div"><p id="translation"></p></div>
                                <div id="translation_comment_div"><p id="translation_comment"></p></div>
                            </div>
                        </div>
                    </div>
                    <div id="forward" class="navigation"><p>FORWARD</p></div>
                </div>
            </div>
        </div>
        <div id="footer"><p id="copy">&copy; 2020 Анатолий Чиняев</p></div>

        <script src='js/jquery/jquery.min.js'></script>
        <script src='js/getCards.js'></script>
        <script src='js/stackSwitch.js'></script>
        <script src='js/showCard.js'></script>
        <script src='js/settings.js'></script>
        
    </body>
</html>
