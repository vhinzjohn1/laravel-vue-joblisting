<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MinimumRequirement extends Model
{
    use HasFactory;

    protected $primaryKey = 'requirement_id';

    protected $fillable = [
        'job_listing_id',
        'requirement_type',
        'title',
        'description',
        'is_required',
    ];

    public function jobListing()
    {
        return $this->belongsTo(JobListing::class, 'job_listing_id');
    }
}
