<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Eligibility extends Model
{
    use HasFactory;

    protected $table = 'eligibility';
    protected $primaryKey = 'eligibility_id';

    protected $fillable = [
        'eligibility_name',
        'eligibility_description',
        'eligibility_type',
    ];
}
