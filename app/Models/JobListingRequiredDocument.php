<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobListingRequiredDocument extends Model
{
    use HasFactory;

    protected $table = 'job_listing_required_documents';

    protected $primaryKey = 'job_listing_required_document_id';

    protected $fillable = [
        'job_listing_id',
        'required_document_id',
    ];

    public function jobListing()
    {
        return $this->belongsTo(JobListing::class, 'job_listing_id');
    }

    public function requiredDocument()
    {
        return $this->belongsTo(RequiredDocument::class, 'required_document_id');
    }
}
