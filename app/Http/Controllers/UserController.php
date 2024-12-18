<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\SignInRequest;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $this->userService->generateToken($user);

            return response()->json([
                'success' => true,
                'token' => $token,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials',
        ], 401);
    }
}
