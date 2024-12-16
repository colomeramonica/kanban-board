<?php

namespace Database\Seeders;

use App\Models\UserTask;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userTasks = [
            [
                'user_id' => 1,
                'task_id' => 1,
            ],
            [
                'user_id' => 2,
                'task_id' => 1,
            ],
            [
                'user_id' => 3,
                'task_id' => 1,
            ],
            [
                'user_id' => 2,
                'task_id' => 2,
            ],
            [
                'user_id' => 1,
                'task_id' => 2,
            ],
            [
                'user_id' => 3,
                'task_id' => 3,
            ],
        ];

        foreach ($userTasks as $userTask) {
            UserTask::create($userTask);
        }
    }
}
