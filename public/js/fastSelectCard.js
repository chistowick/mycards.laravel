"use strict";

$(document).ready(function () {
    $('#fastSelect').change(function () {

        // Определяем значение аттрибута value элемента, по которому был клик
        let selectElementValue = $('#fastSelect option:selected').attr('value');

        // console.log(`selectElementValue ${selectElementValue}`);

        // Задаем новый номер активной карты согласно выбранному элементу списка
        curentNumberActiveCard = selectElementValue;

        // Устанавливаем активную сторону карточки по умолчанию
        $(activeSideId).css({ 'display': 'block' });
        $(inactiveSideId).css({ 'display': 'none' });

        // Обновляем отображение активной карточки
        updateCardView();
    });
});

// Функция, которая формирует выпадающий список элемента FASTSELECT
function fastSelectlistCreate() {

    // Если массив с активными карточками уже существует
    if (activeCardsArray) {

        let fastSelect = document.getElementById("fastSelect");

        // Удаляем предыдущий список
        while (fastSelect.firstChild) {
            fastSelect.removeChild(fastSelect.firstChild);
        }

        // Добавляем заголовок к SELECT и делаем его недоступным
        let firstOption = document.createElement("option");
        firstOption.text = "Select";
        fastSelect.add(firstOption, firstOption[0]);
        fastSelect.firstChild.disabled = true;
        fastSelect.firstChild.style.display = "none";

        activeCardsArray.forEach(function (item, i, arr) {

            let option = document.createElement("option");

            option.text = item.original;

            fastSelect.add(option);

            // Добавляем каждому элементу списка идентификатор #selectElement_(номер элемента)
            //// Всем элементам добавляем класс .selectElements
            fastSelect.lastChild.setAttribute('id', `selectElement_` + i);
            fastSelect.lastChild.setAttribute('class', 'selectElements');
            fastSelect.lastChild.setAttribute('value', i);
        });

    }

}
