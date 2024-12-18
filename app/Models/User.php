<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Auth\Authenticatable;

class User extends Model implements AuthenticatableContract
{
    use HasApiTokens, HasFactory, Authenticatable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    public function tasks(): BelongsToMany
    {
        return $this->belongsToMany(Task::class, 'user_tasks', 'user_id', 'task_id')
            ->withTimestamps();
    }
}
