"use strict";

// Добавляем обработчик клика на кнопку сохранения новой карточки:
$(document).ready(function () {
    $('body').delegate('#edit-form-button', 'click', function () {
        submitEditedCard();
    });
});

// Добавляем обработчик клика на кнопку редактирования карточки:
$(document).ready(function () {
    $('#editCard').click(function () {

        // Если массив активных карточек пуст - не реагируем на клик
        if (activeCardsArray.length == 0) {

            return;
        }

        // Добавляем единицу, если нужно, если стек только переключился, но карта не активна
        if (curentNumberActiveCard == -1) {
            curentNumberActiveCard = 0;
        }

        // Переводим кнопку формы в режим EDIT
        $('.add-or-edit').attr('id', 'edit-form-button');

        // Если переключение в режим EDIT происходит при активном режиме ADD
        // просто заполняем поля формы данными из активной карточки
        if (addOrEdit === 'add') {

            // Отменяем подсветку
            setDefaultButtonsColour();

            // Подсвечиваем индикатор, по которому был клик
            $('#editCard').css({ 'background-color': activeIndicatorColour });

            // Заполняем поля формы данными из активной карточки
            fillEditForm();

            // Задаем значение маркера активного действия add or edit
            addOrEdit = 'edit';

            return;
        }

        // Если происходит второе подряд нажатие на EDIT
        // отменяем подсветку, скрываем форму и показываем активный стек
        if (addOrEdit === 'edit') {

            // Отменяем подсветку
            setDefaultButtonsColour();

            // скрываем форму и показываем активный стек
            $(activeStackId).css({ 'display': 'block' });
            $(addFormId).css({ 'display': 'none' });

            // Делаем видимыми навигационные кнопки .navigation
            $('.navigation').css({ 'display': 'flex' });

            // Задаем значение маркера активного действия add or edit
            addOrEdit = 'off';

            return;
        }

        // Если происходит 'правильный' переход в режим EDIT
        if (addOrEdit === 'off') {

            // Подсвечиваем индикатор, по которому был клик
            $('#editCard').css({ 'background-color': activeIndicatorColour });

            // скрываем активный стек и показываем форму
            $(activeStackId).css({ 'display': 'none' });
            $(addFormId).css({ 'display': 'block' });

            // Скрываем навигационные кнопки .navigation
            $('.navigation').css({ 'display': 'none' });

            // Заполняем поля формы данными из активной карточки
            fillEditForm();

            addOrEdit = 'edit';

            return;

        }

        console.log('Не удалось определить предыдущий активный режим');
        return;

    });
});

function fillEditForm() {

    // Если активный стек еще не выбран, 
    // то очищаем форму и позволяем пользователю создать новую карточку
    if (activeCardsArray.length == 0) {

        clearForm();

        return;
    }

    let z = curentNumberActiveCard;

    // Если стек был только что выбран, но активная карта не известна,
    // то предлагаем редактировать карточку с индексом 0
    if (z == -1) {
        z = 0;
    }

    // Задаем переменные, ссылающиеся на соответствующие данные в текущей активной карточке
    let original = activeCardsArray[z].original;
    let originalComment = activeCardsArray[z].originalComment;
    let translation = activeCardsArray[z].translation;
    let translationComment = activeCardsArray[z].translationComment;
    let stack = activeCardsArray[z].stack;

    // Выводим информацию активной карточки в поля формы add/edit
    document.querySelector('#input-orig').value = original;
    document.querySelector('#input-orig-comment').value = originalComment;
    document.querySelector('#input-transl').value = translation;
    document.querySelector('#input-transl-comment').value = translationComment;
    document.querySelector('#select-new-card-stack').value = stack;

    return;
}

// Submit the edited card form to the server
function submitEditedCard() {

    let url = 'http://mycards.laravel/ajax/edit-card';

    // Получаем защитный токен Laravel из скрытого input
    let laravelToken = document.querySelector('input[name="_token"]').value;

    // Определяем id активной карточки
    let idEditedCard = activeCardsArray[curentNumberActiveCard].id;


    let newCardOrig = document.querySelector('#input-orig').value;
    let newCardOrigComment = document.querySelector('#input-orig-comment').value;
    let newCardTransl = document.querySelector('#input-transl').value;
    let newCardTranslComment = document.querySelector('#input-transl-comment').value;
    let newCardStackNumber = document.querySelector('#select-new-card-stack').value;

    // Checking the token and form fields
    let ready = readinessCheck(newCardOrig, newCardTransl);

    // If something is wrong - interrupt
    if (ready === false) {
        return;
    }

    // Create POST request data
    let postData = new FormData();
    postData.append('id', idEditedCard);
    postData.append('original', newCardOrig);
    postData.append('originalComment', newCardOrigComment);
    postData.append('translation', newCardTransl);
    postData.append('translationComment', newCardTranslComment);
    postData.append('stack', newCardStackNumber);
    postData.append('_token', laravelToken);

    // Create a connection
    let request = new XMLHttpRequest();

    // Request setting
    request.open('POST', url);
    request.responseType = 'json';

    // Sending request
    request.send(postData);

    // If connection error
    request.onerror = function () {
        alert(`Ошибка соединения`);
    };
    // When the server response will be received
    request.onload = function () {

        // Analysis of HTTP response status
        if (request.status != 200) {
            // Print error status and error description
            alert(`Ошибка ${request.status}: ${request.statusText}`);

        } else { // if all OK

            // Writing the result to a variable
            let responseObj = request.response;

            // Обработчик возвращает TRUE при успешной записи карточки в базу
            if (responseObj[0]) {

                let oldStack = activeStackNumber; // из глобальных настроек
                let newStack = newCardStackNumber; // из поля select формы

                console.log('oldStack = ' + oldStack);
                console.log('newStack = ' + newStack);

                // Если номер исходного стека совпадает с номером стека назначения
                if (oldStack == newStack) {

                    /**
                     * Вносим изменения в карточку в активном массиве карточек 
                     * т.к. активный массив карточек содержит ссылки на объекты стека, 
                     * то данные меняются сразу и в объекте стека 
                     **/
                    activeCardsArray[curentNumberActiveCard].original = newCardOrig;
                    activeCardsArray[curentNumberActiveCard].originalComment = newCardOrigComment;
                    activeCardsArray[curentNumberActiveCard].translation = newCardTransl;
                    activeCardsArray[curentNumberActiveCard].translationComment = newCardTranslComment;

                    // скрываем форму и показываем активный стек
                    $(activeStackId).css({ 'display': 'block' });
                    $(addFormId).css({ 'display': 'none' });

                    // Делаем видимыми навигационные кнопки .navigation
                    $('.navigation').css({ 'display': 'flex' });

                    // Отменяем подсветку
                    setDefaultButtonsColour();

                    // Задаем значение маркера активного действия add or edit
                    addOrEdit = 'off';

                    // Выводим данные только что отредактированной карточки
                    updateCardView();

                    // Очищаем форму
                    clearForm();

                    console.log('Стек после', stack);
                    // console.log(stack);
                    console.log('массив после');
                    console.log(activeCardsArray);

                } else {

                    // Удаляем (как элемент массива) ссылки на карточку из активного массива карточек
                    activeCardsArray.splice(curentNumberActiveCard, 1);

                    // Удаляем ссылки на карточку из активного стека
                    delete activeStack[idEditedCard];

                    // Удаляем непосредственно объект карточки из основного стека
                    delete stack[oldStack].idEditedCard;

                    console.log('Стек после');
                    console.log(stack);
                    console.log('массив после');
                    console.log(activeCardsArray);

                    // Добавляем объект в новый стек

                    // Создаем временный объект newCard
                    let newCard = {
                        id: idEditedCard,
                        original: newCardOrig,
                        originalComment: newCardOrigComment || ' ',
                        translation: newCardTransl,
                        translationComment: newCardTranslComment || ' ',
                        stack: newCardStackNumber
                    };

                    // Клонируем newCard в новый стек
                    stack[newStack][idEditedCard] = Object.assign({}, newCard);

                    /**
                     * Когда пользователь выберет новый стек, новая карточка автоматически 
                     * попадет в массив активных карточек согласно механизму в stackSwitch
                     */

                    // скрываем форму и показываем активный стек
                    $(activeStackId).css({ 'display': 'block' });
                    $(addFormId).css({ 'display': 'none' });

                    // Делаем видимыми навигационные кнопки .navigation
                    $('.navigation').css({ 'display': 'flex' });

                    // Отменяем подсветку
                    setDefaultButtonsColour();

                    // Задаем значение маркера активного действия add or edit
                    addOrEdit = 'off';

                    // Очищаем форму
                    clearForm();

                    // Если в стеке остались карточки
                    if (activeCardsArray.length != 0) {

                        // Готовим к показу следующую карточку
                        forwardCard();

                        // Выводим данные карточки, подготовленной на предыдущем шаге
                        updateCardView();
                    } else {
                        // Очищаем данные предыдущей карточки (функция из stackSwitch.js)
                        clearActiveCard();
                    }

                }

                // Обновляем список карточек в SELECT
                fastSelectlistCreate();
            }
        }
    };

}

