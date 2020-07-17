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

        // Если активен режим редактирования
        if (addOrEdit === 'edit') {
            // Заполняем поля формы данными из активной карточки
            fillEditForm();
        }

        // Задаем selected нулевому элементу в обоих SELECT чтобы не путать пользователя
        $('.fastSelect').prop('selectedIndex', 0);

    });
});

// Функция, которая формирует выпадающий список элемента FASTSELECT
function fastSelectlistCreate(callback = selectSort) {

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

        // i = номер карточки в массиве активных карточек
        // item = сама карточка как элемент массива
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

        // Сортируем по алфавиту
        callback(fastSelectOriginal);
        callback(fastSelectTranslation);
    }

}

function selectSort(select) {
    
    for (let i = 1; i < select.children.length; i++){
        for (let j = (i+1); j < select.children.length; j++){
            if (select.children[i].text.toLowerCase() > select.children[j].text.toLowerCase()){

                // replacedNode = parentNode.replaceChild(newChild, oldChild);

                let replacedNode = select.replaceChild(select.children[j], select.children[i]); // временно стертый option i (больший элемент)

                // Вставить временно удаленный option сразу после обновленного
                insertAfter(replacedNode, select.children[i]);
                
            }
        }
    }

}

// Вставить newElement сразу перед referenceElement в группе дочерних элементов родителя referenceElement
function insertAfter(newElement, referenceElement) {
    
    // var insertedElement = parentElement.insertBefore(newElement, referenceElement);

    // Вставляем временно стертый пункт сразу перед последующим элементом (т.е. после обновленного)
    return referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
}