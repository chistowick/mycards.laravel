"use strict";

// На кнопу FORWARD навешиваем обработчик
window.onload = setButtonsAction('#forward', 'click', showForwardCard);

// На кнопу BACK навешиваем обработчик
window.onload = setButtonsAction('#back', 'click', showBackCard);

// На активную карточку навешиваем обработчик
window.onload = setButtonsAction('#active_stack', 'click', upendCard);

function showForwardCard() {

    // Устанавливаем активную сторону карточки по умолчанию
    $(activeSideId).css({'display': 'block'});
    $(inactiveSideId).css({'display': 'none'});

    if (activeCardsArray.length == 0) {
        return;
    }

    forwardCard();
    updateCardView();
}

function showBackCard() {

    // Устанавливаем активную сторону карточки по умолчанию
    $(activeSideId).css({'display': 'block'});
    $(inactiveSideId).css({'display': 'none'});
    
    if (activeCardsArray.length == 0){
        return;
    }

    backCard();
    updateCardView();
}

function upendCard() {

    // Если стек еще не выбран
    if (activeCardsArray.length == 0){
        return;
    }

    // Если порядковый номер карточки меньше нуля, т.е. только что произошла 
    // смена стека, то пререходим к последнему элементу массива - т.е. к верхней
    // карточке, показываем её и ждем дальнейших действий пользователя
    if (curentNumberActiveCard < 0)
    {
        showBackCard();
        return;
    }

    let originalSide = $('#original_side').css('display');
    let translationSide = $('#translation_side').css('display');

    // Переворачиваем карточку
    if (originalSide == 'none') {
        $('#original_side').css({'display': 'block'});
        $('#translation_side').css({'display': 'none'});
    } else {
        $('#original_side').css({'display': 'none'});
        $('#translation_side').css({'display': 'block'});
    }
}

function forwardCard() {
    // Добавляем к существующему номеру текущего элемента массива активных 
    // карточек единицу, таким образом определяем номер новой карточки
    curentNumberActiveCard = +curentNumberActiveCard + 1;

    // Если номер достиг величины массива, пререходим к началу массива - 
    // т.е. к нижней карточке
    if (curentNumberActiveCard >= activeCardsArray.length)
    {
        curentNumberActiveCard = 0;
    }
}

function backCard() {
    // Вычитаем из существующего номера текущего элемента массива активных 
    // карточек единицу, таким образом определяем номер новой карточки
    curentNumberActiveCard = curentNumberActiveCard - 1;

    // Если порядковый номер стал меньше нуля, пререходим к последнему элементу массива - 
    // т.е. к верхней карточке
    if (curentNumberActiveCard < 0)
    {
        curentNumberActiveCard = (activeCardsArray.length - 1);
    }
}

function updateCardView() {

    let k = curentNumberActiveCard;

    // Задаем переменные, ссылающиеся на соответствующие данные в объектах-карточках
    let original = activeCardsArray[k].original;
    let originalComment = activeCardsArray[k].originalComment;
    let translation = activeCardsArray[k].translation;
    let translationComment = activeCardsArray[k].translationComment;

    // Очищаем данные предыдущей карточки (функция из stackSwitch.js)
    clearActiveCard();

    // Выводим данные новой карточки в соответствующие поля
    document.querySelector('#original').insertAdjacentHTML("afterBegin", original);
    document.querySelector('#original_comment').insertAdjacentHTML("afterBegin", originalComment || ' ');
    document.querySelector('#translation').insertAdjacentHTML("afterBegin", translation);
    document.querySelector('#translation_comment').insertAdjacentHTML("afterBegin", translationComment || ' ');
}

// Set an event listener for each element. (selector, event, action)
function setButtonsAction(selector, event, action) {

    let elements = document.querySelectorAll(selector);
    let oneElement;

    // Iterating through elements
    for (let j = 0; j < elements.length; j++) {

        oneElement = elements[j];

        // Setting actions
        oneElement.addEventListener(event, action);

    }
}