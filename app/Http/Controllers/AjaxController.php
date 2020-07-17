<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; // для работы с Request
use App\Card; // Использовать пространство имен модели Book

class AjaxController extends Controller
{

    /**
     * 
     * @return void;
     * 
     * Printss array of cards - JSON.
     */
    public function getCards()
    {

        $cards = Card::select(
            'id',
            'original',
            'originalComment',
            'translation',
            'translationComment',
            'stack'
        )
            ->where('login', 'chistowick')
            ->get();

        // Converts the array to JSON and returns it to js-client
        echo json_encode($cards);

        return;
    }

    /**
     * 
     * @return void;
     * 
     * Saves a new card. Prints id of new card.
     */
    public function addCard(Request $request)
    {

        $newCard = Card::create(
            [
                'original'              => $request->original,
                'originalComment'       => $request->originalComment,
                'translation'           => $request->translation,
                'translationComment'    => $request->translationComment,
                'stack'                 => $request->stack,
            ]
        );

        echo json_encode($newCard->id);

        return;
    }

    /**
     *
     * Edits the card. Prints status.
     *
     * @return void;
     * 
     **/
    public function editCard(Request $request)
    {
        $editedCardId = $request->id;

        // TODO Нужно добавить проверку логина из сессии, чтобы пользователь мог редактировать только свои карточки

        $editedCard = Card::find($editedCardId); //Получаем модель карточки, которую хотим отредактировать

        // Изменяем карточку
        $editedCard->original           = $request->original;
        $editedCard->originalComment    = $request->originalComment;
        $editedCard->translation        = $request->translation;
        $editedCard->translationComment = $request->translationComment;
        $editedCard->stack              = $request->stack;

        // Сохраняем изменения в базу и возвращаем статус операции клиенту JS
        // TODO Проверить тип данных, в котором TRUE/FALSE придет в JS
        if ($editedCard->save()) {
            echo json_encode([TRUE]);
        } else {
            echo json_encode([FALSE]);
        }

        return;
    }

    /**
     *
     * Deletes the card by id. Prints status.
     *
     * @return void;
     * 
     **/
    public function deleteCard(Request $request)
    {
        $deletedCardId = $request->id;

        // TODO Нужно добавить проверку логина из сессии, чтобы пользователь мог редактировать только свои карточки

        // Удаляем модель по id, переданному от JS клиента и возвращаем статус операции
        if (Card::destroy($deletedCardId)) {
            echo json_encode([TRUE]);
        } else {
            echo json_encode([FALSE]);
        }

        return;
    }

    /**
     *
     * Moves the card by id from old stack to new stack. Prints status.
     *
     * @return void;
     * 
     **/
    public function moveCard(Request $request)
    {
        $movedCardId = $request->id;

        // TODO Нужно добавить проверку логина из сессии, чтобы пользователь мог редактировать только свои карточки

        $movedCard = Card::find($movedCardId); // Получаем модель карточки, которую хотим отредактировать

        // Изменяем стек карточки
        $movedCard->stack = $request->stack;

        // Сохраняем изменения в базу и возвращаем статус операции клиенту JS
        // TODO Проверить тип данных, в котором TRUE/FALSE придет в JS
        if ($movedCard->save()) {
            echo json_encode([TRUE]);
        } else {
            echo json_encode([FALSE]);
        }

        return;
    }
}
