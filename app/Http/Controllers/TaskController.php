<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\CreateTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    protected ?TaskService $taskService = null;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    public function list(Request $request)
    {
        $userId = $request->user()->id;
        $tasks = $this->taskService->list($userId);

        return response()->json($tasks);
    }

    public function store(CreateTaskRequest $request): JsonResponse
    {
        $this->taskService->store($request->all());

        return response()->json([
            'success' => true,
            'message' => "Task created successfully.",
        ], 201);
    }

    public function update(UpdateTaskRequest $request, int $id): JsonResponse
    {
        $this->taskService->update($id, $request->all());

        return response()->json([
            'success' => true,
            'message' => "Task updated successfully.",
        ], 201);
    }
}
