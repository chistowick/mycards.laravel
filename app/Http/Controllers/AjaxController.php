<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; // для работы с Request
use App\Card; // Использовать пространство имен модели Book

class AjaxController extends Controller {

    /**
     * 
     * @return type $cards - array;
     * 
     * Returns array of cards.
     */
    public function getCards() {

        $cards = Card::select
                (
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
    }

}
