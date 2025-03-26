<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApplicationGroup extends Model
{
    protected $primaryKey = 'group_id';

    protected $fillable = [
        'name',
        'notes',
        'job_listing_id',
        'created_by',
        'status'
    ];

    public function jobListing()
    {
        return $this->belongsTo(JobListing::class, 'job_listing_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function members()
    {
        return $this->hasMany(ApplicationGroupMember::class, 'group_id');
    }

    public function applications()
    {
        return $this->hasManyThrough(
            Application::class,
            ApplicationGroupMember::class,
            'group_id',
            'application_id',
            'group_id',
            'application_id'
        );
    }

    public function schedule()
    {
        return $this->hasOne(Schedule::class, 'group_id');
    }
}
