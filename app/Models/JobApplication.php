<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    protected $table = 'applications';
    protected $primaryKey = 'application_id';

    protected $fillable = [
        'job_listing_id',
        'user_id',
        'status',
        'applied_date',
        'resume_path',
        'cover_letter_path',
        'additional_documents',
        'admin_notes',
    ];

    protected $casts = [
        'applied_date' => 'datetime',
        'additional_documents' => 'array',
    ];

    /**
     * Get the job listing associated with the application.
     */
    public function jobListing()
    {
        return $this->belongsTo(JobListing::class, 'job_listing_id', 'job_listing_id');
    }

    /**
     * Get the user (applicant) who submitted the application.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the status history for this application.
     */
    public function statusHistory()
    {
        return $this->hasMany(ApplicationStatusHistory::class, 'application_id', 'application_id');
    }

    /**
     * Get the schedule participants for this application.
     */
    public function scheduleParticipants()
    {
        return $this->hasMany(ScheduleParticipant::class, 'application_id', 'application_id');
    }

    /**
     * Get all documents submitted with this application.
     */
    public function documents()
    {
        return $this->hasMany(ApplicantDocument::class, 'application_id', 'application_id');
    }
}
