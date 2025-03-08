<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Position extends Model
{
    use HasFactory;

    protected $primaryKey = 'position_id';

    protected $fillable = [
        'position_name',
        'item_number',
        'salary_grade_id',
        'minimum_requirements',
    ];

    /**
     * Get the job listings for this position
     */
    public function jobListings(): HasMany
    {
        return $this->hasMany(JobListing::class, 'position_id');
    }

    /**
     * Get the salary grade for this position
     */
    public function salaryGrade(): BelongsTo
    {
        return $this->belongsTo(SalaryGrade::class, 'salary_grade_id');
    }
}
