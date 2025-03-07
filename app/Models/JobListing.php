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
        'title',
        'description',
        'posting_date',
        'closing_date',
        'status',
        'applicant_limit',
        'created_by'
    ];

    protected $casts = [
        'posting_date' => 'date',
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
}
