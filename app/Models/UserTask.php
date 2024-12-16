<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class UserTask extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'task_id'];

    public function tasks(): BelongsToMany
    {
        return $this->belongsToMany(Task::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
