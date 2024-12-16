<?php

namespace App\Services;

use App\Models\Task;

class TaskService
{
    public function list($userId)
    {
        return Task::with('user')->where('user_id', $userId)
            ->orderBy('order')->get();
    }

    public function getById(int $id)
    {
        return Task::find($id);
    }

    public function store($data): object
    {
        return Task::create($data);
    }
    public function update(int $id, array $data): object
    {
        $task = $this->getById($id);
        if (!$task) {
            return null;
        }

        return $task->update($data);
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
