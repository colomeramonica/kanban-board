<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * Relacionamento muitos-para-muitos com Task.
     * A tabela pivô é user_tasks.
     */
    public function tasks(): BelongsToMany
    {
        return $this->belongsToMany(Task::class, 'user_tasks', 'user_id', 'task_id')
            ->withTimestamps();
    }
}
