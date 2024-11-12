<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReadingListsTable extends Migration
{
    public function up()
    {
        Schema::create('reading_lists', function (Blueprint $table) {
            $table->id();
            $table->string('story_title');
            $table->string('author');
            $table->text('story_description');
            $table->enum('status', ['Not Started', 'On-going', 'Done Reading']);
            $table->enum('feedback', ['Not Recommendable', 'Recommendable', 'Highly Recommended']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reading_lists');
    }
}
