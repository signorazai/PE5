<?php

namespace App\Http\Controllers;

use App\Models\ReadingList;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReadingListController extends Controller
{
    // Read
    public function index(Request $request)
    {
        $sortField = $request->get('sortField', 'story_title'); // default field to sort by
        $sortOrder = $request->get('sortOrder', 'asc'); // default sort order

        $readingList = ReadingList::orderBy($sortField, $sortOrder)->get();

        return Inertia::render('ReadingList', [
            'readingList' => $readingList,
            'sortField' => $sortField,
            'sortOrder' => $sortOrder,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    // Create
    public function store(Request $request)
    {
        $validated = $request->validate([
            'story_title' => 'required',
            'author' => 'required',
            'story_description' => 'required',
            'status' => 'required',
            'feedback' => 'required',
        ]);

        ReadingList::create($validated);
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(ReadingList $readingList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ReadingList $readingList)
    {
        //
    }

    // Update
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'story_title' => 'required',
            'author' => 'required',
            'story_description' => 'required',
            'status' => 'required',
            'feedback' => 'required',
        ]);

        $readingItem = ReadingList::findOrFail($id);
        $readingItem->update($validated);
        return redirect()->back();
    }

    // Delete
    public function destroy($id)
    {
        ReadingList::findOrFail($id)->delete();
        return redirect()->back();
    }
}
