<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodoItemCollection;
use App\Http\Resources\TodoItemResource;
use App\Models\TodoItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TodoController extends Controller
{
    /**
     * Display a listing of todo items.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $todoItems = TodoItem::all();

        return (new TodoItemCollection($todoItems))
            ->response()
            ->setStatusCode(Response::HTTP_OK);
    }

    /**
     * Store a newly created todo item in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $data = $this->validateData($request);
        $todoItem = TodoItem::create($data);
        
        return (new TodoItemResource($todoItem))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * Display the todo item.
     *
     * @param  \App\Models\TodoItem  $todoItem
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(TodoItem $todoItem): JsonResponse
    {
        return (new TodoItemResource($todoItem))
            ->response()
            ->setStatusCode(Response::HTTP_OK);
    }

    /**
     * Update todo item in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TodoItem  $todoItem
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, TodoItem $todoItem): JsonResponse
    {
        $data = $this->validateData($request);
        $todoItem->update($data);

        return (new TodoItemResource($todoItem))
            ->response()
            ->setStatusCode(Response::HTTP_OK);
    }

    /**
     * Remove todo item from storage.
     *
     * @param  \App\Models\TodoItem  $todoItem
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(TodoItem $todoItem): JsonResponse
    {
        $id = $todoItem->id;
        $todoItem->delete();

        return response()->json([
            'message' => "TodoItem $id succesful deleted"
        ])->setStatusCode(Response::HTTP_OK);
    }

    /**
     * Validate data for todo item.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private function validateData(Request $request): array
    {
        return $request->validate([
            'title' => 'required|max:255',
            'description' => '',
            'image' => '',
            'completed' => '',
        ]);
    }
}
