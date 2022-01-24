<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodoItemCollection;
use App\Http\Resources\TodoItemResource;
use App\Models\TodoItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Mockery\Undefined;

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
        // print_r(request()->all());
        // return null;

        $data = $this->validateData($request);

        $image = $this->uploadImage(null, $request->file('image'));

        $data['image'] = !is_null($image) ? $image : '';

        $data['completed'] = boolval($data['completed']);

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

        $image = $this->uploadImage($todoItem->image, $request->file('image'));

        $data['image'] = !is_null($image) ? $image : '';

        $data['completed'] = boolval($data['completed']);

        $todoItem->update($data);

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
    public function complete(Request $request, TodoItem $todoItem): JsonResponse
    {
        $data = $request->validate([
            'completed' => 'required|boolean',
        ]);

        $data['completed'] = boolval($data['completed']);

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

        $folder = '/public/images';

        Storage::delete('/' . $folder . '/' . $todoItem->image);

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
            'image' => 'image|mimes:jpg,jpeg,png,swf,tiff',
            'completed' => 'required|boolean',
        ]);
    }

    /**
     * Validate data for todo item.
     *
     * @param  string $old
     * @param  \Illuminate\Http\Request  $new
     * @return string
     */
    public function uploadImage($old, $new): ?string
    {
        $folder = '/public/images';

        if ($new) {
            if (!empty($old) && $old !== 'empty.jpg') {
                Storage::delete('/' . $folder . '/' . $old);
            }

            $extension = $new->getClientOriginalExtension();
            $fileNameToStore = Str::random(40) . '.' . $extension;
            $width = 1920;
            $height = 1920;
            $image = Image::make($new)->orientate();
            if ($image->height() < $height) {
                $height = $image->height();
            }
            if ($image->width() < $width) {
                $width = $image->width();
            }
            $image->height() > $image->width() ? $width = null : $height = null;
            $resize = $image->resize($width, $height, function ($constraint) {
                $constraint->aspectRatio();
            })->encode($extension);
            Storage::put("public/images/{$fileNameToStore}", $resize->__toString());

            return $fileNameToStore;
        }

        return $old;
    }
}
