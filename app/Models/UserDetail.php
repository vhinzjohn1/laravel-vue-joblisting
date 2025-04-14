<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    use HasFactory;

    protected $primaryKey = 'detail_id';

    protected $fillable = [
        'user_id',
        'firstname',
        'lastname',
        'middle_name',
        'phone_number',
        'eligibility'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function educationalBackgrounds()
    {
        return $this->hasMany(EducationalBackground::class, 'user_id', 'user_id');
    }

    public function trainings()
    {
        return $this->hasMany(Training::class, 'user_id', 'user_id');
    }

    public function workExperiences()
    {
        return $this->hasMany(WorkExperience::class, 'user_id', 'user_id');
    }
}
