<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkExperience extends Model
{
    use HasFactory;

    protected $primaryKey = 'experience_id';

    protected $fillable = [
        'user_id',
        'position',
        'company_name',
        'start_date',
        'end_date',
        'is_current_job',
        'responsibilities'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_current_job' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}