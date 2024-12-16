<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\CreateTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Models\Task;
use App\Services\TaskService;
use App\Services\UserTasksService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    protected ?TaskService $taskService = null;
    protected ?UserTasksService $userTasksService = null;

    public function __construct(TaskService $taskService, UserTasksService $userTasksService)
    {
        $this->taskService = $taskService;
        $this->userTasksService = $userTasksService;
    }

    public function list(Request $request)
    {
        $userId = $request->user()->id;
        $tasks = $this->taskService->list($userId);

        return response()->json($tasks);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->all();
        $userId = $data['responsible'];
        unset($data['responsible']);

        try {
            $task = $this->taskService->store($data);
            $this->userTasksService->store(['user_id' => $userId, 'task_id' => $task->id]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }

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

    public function get(int $id): JsonResponse
    {
        $task = $this->taskService->getById($id);

        return response()->json($task);
    }
}
