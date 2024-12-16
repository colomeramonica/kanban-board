<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\CreateTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Models\Task;
use App\Services\TaskService;
use App\Services\UserTasksService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserTaskController extends Controller
{

    protected ?UserTasksService $userTasksService = null;

    public function __construct(UserTasksService $userTasksService)
    {
        $this->userTasksService = $userTasksService;
    }

    public function store($userId, $taskId): JsonResponse
    {
        $this->userTasksService->store(['user_id' => $userId, 'task_id' => $taskId]);

        return response()->json(201);
    }

    public function getTasksByUser($userId)
    {
        $tasks = $this->userTasksService->getTasksByUser($userId);

        $taskDetails = [];
        foreach ($tasks as $task) {
            $taskDetails[] = Task::find($task->task_id);
        }

        return response()->json($taskDetails);
    }
}
