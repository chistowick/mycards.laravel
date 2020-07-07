<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{

    /**
     * Атрибуты, для которых разрешено массовое назначение.
     *
     * @var array
     */
    protected $fillable = [
        'original',
        'originalComment',
        'translation',
        'translationComment',
        'stack',
    ];
}
