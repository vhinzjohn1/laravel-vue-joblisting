<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobListing extends Model
{
    use HasFactory;

    protected $primaryKey = 'job_listing_id';

    protected $fillable = [
        'position_id',
        'category',
        'title',
        'description',
        'batch_id',
        'closing_date',
        'status',
        'created_by',
    ];

    protected $casts = [
        'closing_date' => 'date',
    ];

    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class, 'position_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function minimumRequirements()
    {
        return $this->hasMany(MinimumRequirement::class, 'job_listing_id');
    }

    public function applications()
    {
        return $this->hasMany(Application::class, 'job_listing_id');
    }

    public function salaryGrade(): BelongsTo
    {
        return $this->belongsTo(SalaryGrade::class, 'salary_grade_id');
    }

    public function batch(): BelongsTo
    {
        return $this->belongsTo(Batch::class, 'batch_id');
    }

    public function requiredDocuments()
    {
        return $this->belongsToMany(RequiredDocument::class, 'job_listing_required_documents', 'job_listing_id', 'required_document_id')
            ->withTimestamps();
    }
}
