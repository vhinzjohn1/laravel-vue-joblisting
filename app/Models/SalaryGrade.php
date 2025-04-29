<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SalaryGrade extends Model
{
    protected $table = 'salary_grades';
    protected $primaryKey = 'salary_grade_id';

    protected $fillable = [
        'amount',
        'salary_grade'
    ];

    /**
     * Get the positions associated with this salary grade
     */
    public function positions(): HasMany
    {
        return $this->hasMany(Position::class, 'salary_grade_id', 'salary_grade_id');
    }
}
