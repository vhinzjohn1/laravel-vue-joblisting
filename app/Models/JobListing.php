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
        'category_id',
        'title',
        'description',
        'closing_date',
        'status',
        'applicant_limit',
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

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
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
}
