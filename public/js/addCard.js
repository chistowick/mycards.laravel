"use strict";

// Задаем маркер активного действия add or edit
let addOrEdit = 'off';

// Задаём идентификаторы активного стека и блока формы добавления новой карточки
let activeStackId = '#active_stack';
let addFormId = '#form_add_card';

// Задаем цвета кнопок по умолчанию
let addIndicDefColour = 'lightgreen';
let editIndicDefColour = 'gray';

// Задаем цвет активного индикатора
let activeIndicatorColour = '#e4ff00';

// Добавляем обработчик клика на кнопку сохранения новой карточки:
$(document).ready(function () {
    $('body').delegate('#add-form-button', 'click', function () {
        submitNewCard();
    });
});

// Добавляем обработчик клика на кнопку добавления новой карточки:
$(document).ready(function () {
    $('#addCard').click(function () {

        // Переводим кнопку формы в режим ADD
        $('.add-or-edit').attr('id', 'add-form-button');

        // Если переключение в режим ADD происходит при активном режиме EDIT
        // то просто очищаем форму, меняем активный индикатор и завершаем функцию
        if (addOrEdit === 'edit') {

            clearForm();

            setDefaultButtonsColour();

            $('#addCard').css({ 'background-color': activeIndicatorColour });

            addOrEdit = 'add';

            return;

        }

        // Если происходит второе подряд нажатие на ADD
        // отменяем подсветку, скрываем форму и показываем активный стек
        if (addOrEdit === 'add') {

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

        // Если происходит 'правильный' переход в режим ADD,
        // подсвечиваем индикатор, скрываем активный стек, показываем форму
        if (addOrEdit === 'off') {

            // Очищаем форму
            clearForm();

            // Подсвечиваем индикатор, по которому был клик
            $('#addCard').css({ 'background-color': activeIndicatorColour });

            // скрываем активный стек и показываем форму
            $(activeStackId).css({ 'display': 'none' });
            $(addFormId).css({ 'display': 'block' });

            // Скрываем навигационные кнопки .navigation
            $('.navigation').css({ 'display': 'none' });

            addOrEdit = 'add';

            return;

        }

        console.log('Не удалось определить предыдущий активный режим');
        return;
    });
});

// Submit a new card form to the server
function submitNewCard() {

    let url = 'http://mycards.laravel/ajax/add-card';

    // Получаем защитный токен Laravel из скрытого input
    let laravelToken = document.querySelector('input[name="_token"]').value;

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

            if (responseObj) {

                let newCardId = responseObj;
                let newCard = {
                    id: newCardId,
                    original: newCardOrig,
                    originalComment: newCardOrigComment || ' ',
                    translation: newCardTransl,
                    translationComment: newCardTranslComment || ' ',
                    stack: newCardStackNumber
                };

                stack[newCardStackNumber][newCardId] = Object.assign({}, newCard);

                if (stack[newCardStackNumber] == activeStack) {

                    activeCardsArray.push(stack[newCardStackNumber][newCardId]);
                }

                clearForm();

                // Обновляем список карточек в SELECT
                fastSelectlistCreate();

            }
        }
    };

}

// Checking the form fields
function readinessCheck(original, translate) {

    if (original && translate) {
        return true;
    } else {
        alert('Please fill in all required fields');
        return false;
    }

    return false;
}

// Очищаем поля формы после добавления новой карточки
function clearForm() {

    // Очищаем поля формы
    document.querySelector('#input-orig').value = '';
    document.querySelector('#input-orig-comment').value = '';
    document.querySelector('#input-transl').value = '';
    document.querySelector('#input-transl-comment').value = '';
    document.querySelector('#select-new-card-stack').value = 1;

    return;
}

function setDefaultButtonsColour() {

    $('#addCard').css({ 'background-color': addIndicDefColour });
    $('#editCard').css({ 'background-color': editIndicDefColour });
}