"use strict";

// Добавляем обработчик клика на кнопку перемещения карточки вверх:
$(document).ready(function () {
    $('#move-card-up').click(function () {

        // Прерываем всплытие события
        event.stopPropagation();

        // Если активный стек уже равен 1, игнорим клик
        if (activeStackNumber == 1) {
            return;
        }

        // Если стек вообще еще не определен, игнорим клик
        if (activeStackNumber == undefined) {
            return;
        }

        let oldStack = activeStackNumber; // из глобальных настроек
        let newStack = activeStackNumber - 1; //

        // Перемещаем карточку в другой стек
        moveCard(oldStack, newStack);

    });
});

// Добавляем обработчик клика на кнопку перемещения карточки вниз:
$(document).ready(function () {
    $('#move-card-down').click(function () {

        // Прерываем всплытие события
        event.stopPropagation();

        // Если активный стек уже равен 3, игнорим клик
        if (activeStackNumber == 3) {
            return;
        }

        // Если стек вообще еще не определен, игнорим клик
        if (activeStackNumber == undefined) {
            return;
        }

        let oldStack = activeStackNumber; // из глобальных настроек
        let newStack = activeStackNumber + 1; //

        // Перемещаем карточку в другой стек
        moveCard(oldStack, newStack);

    });
});

function moveCard(oldStack, newStack) {

    // Если стек еще не выбран или пуст
    if (activeCardsArray.length == 0){
        return;
    }

    let url = 'http://mycards.laravel/ajax/move-card';

    // Получаем защитный токен Laravel из скрытого input
    let laravelToken = document.querySelector('input[name="_token"]').value;

    // Определяем id активной карточки, которую нужно перенести в другой стек
    let idMovedCard = activeCardsArray[curentNumberActiveCard].id;

    // Create POST request data
    let postData = new FormData();
    postData.append('id', idMovedCard);
    postData.append('stack', newStack);
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

                // Клонируем movedCard из старого стека в новый
                stack[newStack][idMovedCard] = Object.assign({}, stack[oldStack][idMovedCard]);

                // Удаляем (как элемент массива) ссылки на карточку из активного массива карточек
                activeCardsArray.splice(curentNumberActiveCard, 1);

                // Удаляем ссылки на карточку из активного стека
                delete activeStack[idMovedCard];

                // Удаляем непосредственно объект карточки из основного стека
                delete stack[oldStack].idMovedCard;

                /**
                 * Когда пользователь выберет новый стек, новая карточка автоматически 
                 * попадет в массив активных карточек согласно механизму в stackSwitch
                 */

                // Если в стеке остались карточки
                if (activeCardsArray.length != 0) {

                    // Показываем следующую карточку
                    showForwardCard(); // из showCard.js
                } else {
                    // Очищаем данные предыдущей карточки (функция из stackSwitch.js)
                    clearActiveCard();
                }

                // Обновляем список карточек в SELECT
                fastSelectlistCreate();
            }
        }
    };

}