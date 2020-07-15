"use strict";

// Настройки активной стороны SELECT по умолчанию
let activeSelectId = '#fastSelectOriginal';
let inactiveSelectId = '#fastSelectTranslation';

$(document).ready(function () {
    $('.fastSelect').change(function () {

        // Определяем идентификатор SELECT, по которому был клик
        let selectId = $(this).attr('id');

        // Определяем отмеченный option и его значение аттрибута value
        let selectElement = $(`#${selectId} option:selected`);
        let selectElementValue = selectElement.attr('value');

        // console.log(`selectElementValue ${selectElementValue}`);

        // Задаем новый номер активной карты согласно выбранному элементу списка
        curentNumberActiveCard = selectElementValue;

        // Устанавливаем активную сторону карточки по умолчанию
        $(activeSideId).css({ 'display': 'block' });
        $(inactiveSideId).css({ 'display': 'none' });

        // Обновляем отображение активной карточки
        updateCardView();

        // Отменяем selected в обоих SELECT чтобы не путать пользователя
        // $(`#selectElementOriginal_${curentNumberActiveCard}`).prop('selected', false);
        // $(`#selectElementTranslation_${curentNumberActiveCard}`).prop('selected', false);

        $('select').prop('selectedIndex', 0);

    });
});

// Функция, которая формирует выпадающий список элемента FASTSELECT
function fastSelectlistCreate() {

    // Если массив с активными карточками уже существует
    if (activeCardsArray) {

        let fastSelectOriginal = document.getElementById("fastSelectOriginal");
        let fastSelectTranslation = document.getElementById("fastSelectTranslation");

        // Удаляем предыдущие списки для обоих сторон
        while (fastSelectOriginal.firstChild) {
            fastSelectOriginal.removeChild(fastSelectOriginal.firstChild);
        }
        while (fastSelectTranslation.firstChild) {
            fastSelectTranslation.removeChild(fastSelectTranslation.firstChild);
        }

        // Добавляем заголовок к SELECT и делаем его недоступным
        let firstOptionTranslation = document.createElement("option");
        firstOptionTranslation.text = "Выбрать";
        fastSelectTranslation.add(firstOptionTranslation, firstOptionTranslation[0]);
        fastSelectTranslation.firstChild.disabled = true;
        // fastSelect.firstChild.style.display = "none";

        let firstOptionOriginal = document.createElement("option");
        firstOptionOriginal.text = "Select";
        fastSelectOriginal.add(firstOptionOriginal, firstOptionOriginal[0]);
        fastSelectOriginal.firstChild.disabled = true;

        activeCardsArray.forEach(function (item, i, arr) {

            let optionOriginal = document.createElement("option");
            let optionTranslation = document.createElement("option");

            optionOriginal.text = item.original;
            optionTranslation.text = item.translation;

            fastSelectOriginal.add(optionOriginal);
            fastSelectTranslation.add(optionTranslation);

            // Добавляем каждому элементу списка идентификатор и класс
            fastSelectOriginal.lastChild.setAttribute('id', `selectElementOriginal_` + i);
            fastSelectOriginal.lastChild.setAttribute('class', 'selectElements');
            fastSelectOriginal.lastChild.setAttribute('value', i);

            fastSelectTranslation.lastChild.setAttribute('id', `selectElementTranslation_` + i);
            fastSelectTranslation.lastChild.setAttribute('class', 'selectElements');
            fastSelectTranslation.lastChild.setAttribute('value', i);
        });

    }

}
