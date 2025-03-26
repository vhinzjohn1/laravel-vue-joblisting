<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $primaryKey = 'application_id';

    protected $fillable = [
        'job_listing_id',
        'user_id',
        'status',
    ];

    protected $casts = [
        'applied_at' => 'datetime',
    ];

    public function jobListing()
    {
        return $this->belongsTo(JobListing::class, 'job_listing_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function documents()
    {
        return $this->hasMany(ApplicantDocument::class, 'application_id');
    }

    public function statusHistory()
    {
        return $this->hasMany(ApplicationStatusHistory::class, 'application_id');
    }
}
