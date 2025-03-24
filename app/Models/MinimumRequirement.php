<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MinimumRequirement extends Model
{
    use HasFactory;

    protected $primaryKey = 'minimum_requirement_id';

    protected $fillable = [
        'education_level',
        'training_hours',
        'eligibility',
        'years_experience',
        'is_required',
    ];

    public function positions()
    {
        return $this->hasMany(Position::class, 'minimum_requirement_id');
    }
}
