<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use DateTimeInterface;

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
    protected function serializeDate(DateTimeInterface $date): string
    {
        return Carbon::parse($date)->format('m/d/y h:i A'); // Example: 04/14/25 03:30 PM
    }
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
    public function selectionLineup()
    {
        return $this->hasOne(SelectionLineup::class, 'application_id');
    }
}