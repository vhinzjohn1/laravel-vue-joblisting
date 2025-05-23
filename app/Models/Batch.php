<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Batch extends Model
{
    use HasFactory;

    protected $table = 'job_listing_batches';

    protected $primaryKey = 'batch_id';

    protected $fillable = [
        'post_date',
        'deadline',
        'status',
        'batch_name',
        'is_plantilla',
        'batch_code',
    ];

    public function jobListings()
    {
        return $this->hasMany(JobListing::class, 'batch_id');
    }
}
