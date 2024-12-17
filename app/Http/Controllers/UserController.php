<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\SignInRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{

    protected ?UserService $userService = null;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function index()
    {
        $users = $this->userService->getAll();
        return response()->json($users);
    }

    public function listUsers()
    {
        $users = $this->userService->getAll();
        return response()->json($users);
    }
    public function show($id)
    {
        $user = $this->userService->getById($id);
        return response()->json($user);
    }
    public function signIn(Request $request)
    {
        $this->userService->store($request->all());
        return response()->json([
            'success' => true,
            'message' => "User created successfully.",
        ], 201);
    }
}
