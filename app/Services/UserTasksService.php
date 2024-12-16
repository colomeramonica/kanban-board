<?php

namespace App\Services;

use App\Models\UserTask;

class UserTasksService
{
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
