<?php

namespace App\Services;

use App\Models\Task;

class TaskService
{
    public function list()
    {
        return Task::all();
    }

    public function getById(int $id)
    {
        return Task::with(['users' => function ($query) use ($id) {
            $query->select('users.id', 'users.name')
                ->join('user_tasks', 'users.id', '=', 'user_tasks.user_id')
                ->where('user_tasks.task_id', $id);
        }])->where('id', $id)->first();
    }


    public function store($data): object
    {
        return Task::create($data);
    }
    public function update(int $id, array $data): bool
    {
        $task = Task::find($id);
        if (!$task) {
            return null;
        }

        return $task->update($data);
    }

    public function delete(int $id): void
    {
        $task = Task::find($id);
        if (!$task) {
            return;
        }

        $task->delete();
    }

    public function updateStatus($id, $status): void
    {
        $task = $this->getById($id);
        if (!$task) {
            return;
        }

        $task->update(['stage' => $status]);
    }
}
