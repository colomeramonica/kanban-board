<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function getAll()
    {
        return User::all();
    }
    public function getById($id)
    {
        return User::find($id);
    }
    public function store($data)
    {
        User::create($data);
    }
    public function update($id, $data)
    {
        $user = $this->getById($id);
        if (!$user) {
            return;
        }
        $user->update($data);
    }

    public function generateToken($user)
    {
        return $user->createToken('API Token')->plainTextToken;
    }
}
