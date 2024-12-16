<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Matheus Gomes',
                'email' => 'matheus.gomes@teste.com',
                'password' => 'teste023',
            ],
            [
                'name' => 'Pedro Paulo',
                'email' => 'pedro.paulo@teste.com',
                'password' => 'teste023',
            ],
            [
                'name' => 'Paulo',
                'email' => 'paulo@teste.com',
                'password' => 'teste023',
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
