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
        if (
            isset($_SESSION['login'], $_SESSION['access'])
            and $_SESSION['access'] == 'allowed'
        ) :
        ?>
            <div id="authentication-allowed">
                <p>Привет, <?= $_SESSION['login'] ?> </p>
            </div>
        <?php else : ?>
            <div id="authentication-denied">
                <label for="login">login: </label>
                <input type="text" id="login" name="login" placeholder="maxlength = 16" maxlength="16">
                <label for="login">password: </label>
                <input type="password" id="password" name="password" placeholder="maxlength = 16" maxlength="16">
                <button class="sign-in" id="sign-in" type="button" value="Sign-in">
                    Sign-in</button>
            </div>
        <?php endif; ?>
    </div>
    <div id="wrapper">
        <div id="leftArea">
            <div id="stack_1" class="cards stack_switch">
                <p>stack_1</p>
            </div>
            <div id="stack_2" class="cards stack_switch">
                <p>stack_2</p>
            </div>
            <div id="stack_3" class="cards stack_switch">
                <p>stack_3</p>
            </div>
        </div>
        <div id="rightArea">

            <!-- Меню настроек -->
            <div id="menuOptions">
                <div id="search" class="top_menu">
                    <select id="fastSelectOriginal" size="1" class="fastSelect">
                        <option class="selectElementsOriginal" value="Select">Select</option>
                    </select>
                    <select id="fastSelectTranslation" size="1" class="fastSelect" style="display: none">
                        <option class="selectElementsTranslation" value="Select">Выбрать</option>
                    </select>
                </div>
                <div id="front_side_activation" class="top_menu set_active_side">
                    <p>front side</p>
                </div>
                <div id="back_side_activation" class="top_menu set_active_side">
                    <p>back side</p>
                </div>
                <div id="addCard" class="top_menu">
                    <p>add</p>
                </div>
                <div id="editCard" class="top_menu">
                    <p>edit</p>
                </div>
                <div id="deleteCard" class="top_menu">
                    <p>delete</p>
                </div>
            </div>
            <!-- Конец меню настроек -->

            <div id="workArea">
                <div id="back" class="navigation">
                    <p>BACK</p>
                </div>
                <div id="active_stack" class="cards">

                    <div id="move-card-up" class="move"></div>
                    <div id="move-card-down" class="move"></div>

                    <div id="original_side">
                        <div class="wrap_inf_card">
                            <div id="original_div">
                                <p id="original"></p>
                            </div>
                            <div id="original_comment_div">
                                <p id="original_comment"></p>
                            </div>
                        </div>
                    </div>
                    <div id="translation_side" style="display: none">
                        <div class="wrap_inf_card">
                            <div id="translation_div">
                                <p id="translation"></p>
                            </div>
                            <div id="translation_comment_div">
                                <p id="translation_comment"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- TODO Добавить ограничения на размер вводимой информации -->
                <div id="form_add_card" class="cards">
                    <div id="orig-part-form">
                        <div class="input-new-card"><label for="input-orig">Оriginal: </label>
                            <input type="text" id="input-orig" name="input-orig" placeholder="required">
                        </div>
                        <div class="input-new-card"><label for="input-orig-comment">Оriginal comment: </label>
                            <input type="text" id="input-orig-comment" name="input-orig-comment" placeholder="optional">
                        </div>
                    </div>
                    <div id="transl-part-form">
                        <div class="input-new-card"><label for="input-transl">Translation: </label>
                            <input type="text" id="input-transl" name="input-transl" placeholder="required">
                        </div>
                        <div class="input-new-card"><label for="input-transl-comment">Translation comment: </label>
                            <input type="text" id="input-transl-comment" name="input-transl-comment" placeholder="optional">
                        </div>
                    </div>
                    <div class="input-new-card" id="add-select-stack-div">
                        <p style="margin-bottom: 5px;">Choose a stack</p>
                        <select id="select-new-card-stack" size="1" name="select-new-card-stack">
                            <option value="1">New word</option>
                            <option value="2">To study</option>
                            <option value="3">Already know</option>
                        </select>
                    </div>
                    <button class="form-button add-or-edit" type="button" value="Save">
                        Save</button>
                </div>
                <div id="forward" class="navigation">
                    <p>FORWARD</p>
                </div>
            </div>
        </div>
    </div>
    <div id="footer">
        <p id="copy">&copy; 2020 Анатолий Чиняев</p>
    </div>

    <script src='js/jquery/jquery.min.js'></script>
    <script src='js/getCards.js'></script>
    <script src='js/stackSwitch.js'></script>
    <script src='js/showCard.js'></script>
    <script src='js/settings.js'></script>
    <script src='js/addCard.js'></script>
    <script src='js/editCard.js'></script>
    <script src='js/deleteCard.js'></script>
    <script src='js/fastSelectCard.js'></script>
    <script src='js/moveCard.js'></script>

</body>

</html>