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

    public function list(): JsonResponse
    {
        try {
            $tasks = $this->taskService->list();
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }

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

    public function update(int $id, Request $request): JsonResponse
    {
        try {
            $data = $request->all();
            $data['responsible'] = isset($data['users']) ? $data['users'] : [];
            unset($data['users']);
            $this->taskService->update($id, $request->all());
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }

        return response()->json([
            'success' => true,
            'message' => "Task updated successfully.",
        ], 201);
    }

    public function delete(int $id): JsonResponse
    {
        $task = $this->taskService->getById($id);
        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => "Task not found.",
            ], 404);
        }

        try {
            $this->taskService->delete($id);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }

        return response()->json([
            'success' => true,
            'message' => "Task deleted successfully.",
        ], 201);
    }

    public function get(int $id): JsonResponse
    {
        try {
            $task = $this->taskService->getById($id);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }

        return response()->json($task);
    }
}
