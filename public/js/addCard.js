"use strict";

// Добавляем обработчик клика на кнопку добавления новой карточки:
$(document).ready(function () {
    $('#addCard').click(function () {
        changeFormVisibility();
    });
});

// Добавляем обработчик клика на кнопку сохранения новой карточки:
$(document).ready(function () {
    $('#add-form-button').click(function () {
        submitNewCard();
    });
});

// Инвертируем видимость активного стека и блока формы создания карточки
function changeFormVisibility() {

    // Задаём идентификаторы активного стека и блока формы добавления новой карточки
    let activeStackId = '#active_stack';
    let addFormId = '#form_add_card';

    let activeStackDisplayStatus = $(activeStackId).css('display');
    let addFormDisplayStatus = $(addFormId).css('display');

    // Инвертируем видимость активного стека и блока с формой
    if ((addFormDisplayStatus == 'none')
            && (activeStackDisplayStatus == 'block')) {

        $(addFormId).css({'display': 'block'});
        $(activeStackId).css({'display': 'none'});

        // Подсвечиваем кнопку Add
        $('#addCard').css({'background-color': "#e4ff00"});

        // Скрываем навигационные кнопки .navigation
        $('.navigation').css({'display': 'none'});
    }

    // Инвертируем видимость активного стека и блока с формой
    if ((activeStackDisplayStatus == 'none')
            && (addFormDisplayStatus == 'block')) {

        $(activeStackId).css({'display': 'block'});
        $(addFormId).css({'display': 'none'});

        // Убираем подсветку кнопки Add
        $('#addCard').css({'background-color': "lightgreen"});

        // Делаем видимыми навигационные кнопки .navigation
        $('.navigation').css({'display': 'flex'});
    }

}

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

//                console.log(activeCardsArray);
//                console.log(stack);

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