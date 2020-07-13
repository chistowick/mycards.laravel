"use strict";

// Массив ссылок на карточки в активном стеке
let activeCardsArray = [];

// Настройки активной стороны карточки по умолчанию
let activeSideId = '#original_side';
let inactiveSideId = '#translation_side';

// По клику на определенный стек (одну из стопок карт):
$(document).ready(function () {
    $('.stack_switch').click(function () {

        if(addOrEdit != 'off') {
            alert(`Вы находитесь в режиме редактирования. \n
                    Чтобы сменить стопку карт, пожалуйста, 
                    выйдите из режима редактирования.`);
            return;
        }

        // Устанавливаем активную сторону карточки по умолчанию
        $(activeSideId).css({'display': 'block'});
        $(inactiveSideId).css({'display': 'none'});

        // Определяем идентификатор стека, по которому был клик
        let id = $(this).attr('id');

        // Выбираем какой стек считать активным и соответственно меняем цвета карточек
        if (id === 'stack_1') {

            activeStackNumber = 1;
            activeStack = stack[1];
            $('#active_stack').css({'background-color': "red"});
            $('#stack_1').css({'background-color': "lightgray"});
            $('#stack_2').css({'background-color': "yellow"});
            $('#stack_3').css({'background-color': "darkgreen"});

        } else if (id === 'stack_2') {

            activeStackNumber = 2;
            activeStack = stack[2];
            $('#active_stack').css({'background-color': "yellow"});
            $('#stack_1').css({'background-color': "red"});
            $('#stack_2').css({'background-color': "lightgray"});
            $('#stack_3').css({'background-color': "darkgreen"});

        } else {

            activeStackNumber = 3;
            activeStack = stack[3];
            $('#active_stack').css({'background-color': "darkgreen"});
            $('#stack_1').css({'background-color': "red"});
            $('#stack_2').css({'background-color': "yellow"});
            $('#stack_3').css({'background-color': "lightgray"});

        }
//        console.log(activeStack);

        // Итерируем активный стек и наполняем массив активных карточек для 
        // более удобного манипулирования карточками
        let j = 0;
        activeCardsArray = []; // Очищаем массив перед заполнением
        for (let numCardInStack in activeStack) {
            activeCardsArray[j] = activeStack[numCardInStack];

            j++;
        }

        // Номер текущего элемента массива активных карточек
        // -1 чтобы в showCard увеличивая его на 1 открывать нулевой элемент массива
        curentNumberActiveCard = -1;
//        console.log(activeCardsArray);

        // Очищаем данные предыдущей карточки
        clearActiveCard();

        // Заполняем список в FASTSELECT
        fastSelectlistCreate();

    });
});

// Очищаем поля активной карточки (также используется в showCard.js)
function clearActiveCard(){
    
        // Очищаем данные предыдущей карточки
        document.querySelector('#original').innerHTML = ``;
        document.querySelector('#original_comment').innerHTML = ``;
        document.querySelector('#translation').innerHTML = ``;
        document.querySelector('#translation_comment').innerHTML = ``;
}