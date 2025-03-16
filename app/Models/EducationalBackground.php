<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EducationalBackground extends Model
{
    use HasFactory;

    protected $primaryKey = 'education_id';

    protected $fillable = [
        'user_id',
        'level',
        'school_name',
        'degree_course',
        'year_graduated',
        'honors_received'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}