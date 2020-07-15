"use strict";

// На кнопки id="front_side_activation и id="back_side_activation навешиваем обработчик
$(document).ready(function () {
    $('.set_active_side').click(function () {

        // Определяем идентификатор переключателя, по которому был клик
        let id = $(this).attr('id');

        // Устанавливаем значения переменных, определяющих какая сторона
        // карточки считается активной и подсвечиваем индикатор активного режима
        if (id == 'front_side_activation') {

            activeSideId = '#original_side';
            inactiveSideId = '#translation_side';
            activeSelectId = '#fastSelectOriginal';
            inactiveSelectId = '#fastSelectTranslation';

            // Меняем цвет кнопок индикаторов
            $('#front_side_activation').css({'background-color': '#29de29'});
            $('#back_side_activation').css({'background-color': 'lightgray'});
        } else {
            activeSideId = '#translation_side';
            inactiveSideId = '#original_side';
            activeSelectId = '#fastSelectTranslation';
            inactiveSelectId = '#fastSelectOriginal';

            // Меняем цвет кнопок индикаторов
            $('#front_side_activation').css({'background-color': 'lightgray'});
            $('#back_side_activation').css({'background-color': '#29de29'});
        }

        // Скрываем неактивную сторону карточки, показываем активную сторону
        $(inactiveSideId).css({'display': 'none'});
        $(activeSideId).css({'display': 'block'});

        // Скрываем неактивный SELECT, показываем активный
        $(activeSelectId).css({'display': 'block'});
        $(inactiveSelectId).css({'display': 'none'});

    });
});