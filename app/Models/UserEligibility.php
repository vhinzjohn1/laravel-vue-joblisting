<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserEligibility extends Model
{
    use HasFactory;

    protected $table = 'user_eligibility';
    protected $primaryKey = 'user_eligibility_id';

    protected $fillable = [
        'user_id',
        'eligibility_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function eligibility()
    {
        return $this->belongsTo(Eligibility::class, 'eligibility_id');
    }
}
