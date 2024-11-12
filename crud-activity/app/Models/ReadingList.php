<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReadingList extends Model
{
    use HasFactory;

    protected $table = 'readinglist';

    protected $fillable = [
        'story_title',
        'author',
        'story_description',
        'status',
        'feedback',
    ];
}
