<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tasks';

    protected $fillable = [
        'title',
        'description',
        'responsible',
        'date',
        'stage'
    ];

    /**
     * Relacionamento muitos-para-muitos com User.
     * A tabela pivô é user_tasks.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_tasks', 'task_id', 'user_id')
            ->withTimestamps();
    }
}
