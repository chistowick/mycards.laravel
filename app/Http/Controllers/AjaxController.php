<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; // для работы с Request
use App\Card; // Использовать пространство имен модели Book

class AjaxController extends Controller {

    /**
     * 
     * @return void;
     * 
     * Printss array of cards - JSON.
     */
    public function getCards() {

        $cards = Card::select
                        (
                        'id', 'original', 'originalComment', 'translation', 'translationComment', 'stack'
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
     * Saves a new card. Prints record success status.
     */
    public function addCard(Request $request) {

        $newCard = Card::create(
                        [
                            'original' => $request->original,
                            'originalComment' => $request->originalComment,
                            'translation' => $request->translation,
                            'translationComment' => $request->translationComment,
                            'stack' => $request->stack,
                        ]
        );

        echo json_encode($newCard->id);

        return;
    }

}
