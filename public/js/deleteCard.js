"use strict";

// Навешиваем обработчик клика на кнопке DELETE:
$(document).ready(function () {
    $('#deleteCard').click(function () {

        // Если активен режим ADD or EDIT или в текущем стеке нет карточек или стек не выбран
        // то просто не реагируем на клик
        if ((addOrEdit != 'off') || (activeCardsArray.length == 0)) {

            return;
        }

        // Спрашиваем у пользователя подтверждение на удаление карточки
        let resolution = confirm("Удалить карточку?");

        // Если подтверждено - удаляем карточку
        if (resolution) {
            deleteCard();
            return;
        }

        // Если нет - просто завершаем функцию
        return;

    });
});

function deleteCard() {

    let url = 'http://mycards.laravel/ajax/delete-card';

    // Получаем защитный токен Laravel из скрытого input
    let laravelToken = document.querySelector('input[name="_token"]').value;

    // Определяем id активной карточки
    let idDeletedCard = activeCardsArray[curentNumberActiveCard].id;

    // Create POST request data
    let postData = new FormData();
    postData.append('id', idDeletedCard);
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

            console.log(responseObj[0]);

            if (responseObj[0]) {

                // Удаляем (как элемент массива) ссылки на карточку из активного массива карточек
                activeCardsArray.splice(curentNumberActiveCard, 1);

                // Удаляем ссылки на карточку из активного стека
                delete activeStack[idDeletedCard];

                // Удаляем непосредственно объект карточки из основного стека
                delete stack[activeStackNumber].idDeletedCard;

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
                // Обновляем список карточек в SELECT
                fastSelectlistCreate();
            }
        }
    };
}