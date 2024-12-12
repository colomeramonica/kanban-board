<?php

namespace App\Services;

use App\Models\Task;

class TaskService
{
    /**
     * Retrieves a list of tasks for a given user.
     *
     * @param int $userId The ID of the user whose tasks are to be retrieved.
     *
     * @return \Illuminate\Database\Eloquent\Collection A collection of tasks associated with the given user.
     * Each task is represented as an instance of the Task model, and includes the associated user.
     * The tasks are ordered by their 'order' column.
     */
    public function list($userId)
    {
        return Task::with('user')->where('user_id', $userId)
            ->orderBy('order')->get();
    }

    public function getById(int $id)
    {
        return Task::find($id);
    }

    public function store($data): void
    {
        Task::create($data);
    }
    public function update(int $id, array $data): void
    {
        $task = $this->getById($id);
        if (!$task) {
            return;
        }

        $task->update($data);
    }
}
