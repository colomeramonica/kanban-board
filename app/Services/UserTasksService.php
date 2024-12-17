<?php

namespace App\Services;

use App\Models\UserTask;
use App\Models\Task;
use App\Models\User;

class UserTasksService
{
    public function getAll()
    {
        return Task::with(['users' => function ($query) {
            $query->select('users.id', 'users.name');
        }])->get();
    }
    public function store($data)
    {
        UserTask::create($data);
    }

    public function updateByTask($id, $data)
    {
        $userTask = UserTask::where('task_id', $id)->first();
        if (!$userTask) {
            return;
        }
        $userTask->update($data);
    }

    public function getTasksByUser($id)
    {
        $userTasks = UserTask::where('user_id', $id)->get();

        return $userTasks;
    }
}
