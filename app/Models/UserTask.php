<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserTask extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'task_id'];

    public function tasks(): BelongsToMany
    {
        return $this->belongsToMany(Task::class);
    }

    public function users(): HasMany
    {
        return $this->HasMany(User::class, 'user_id');
    }
}
