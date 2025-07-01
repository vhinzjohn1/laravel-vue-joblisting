<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequiredDocument extends Model
{
    use HasFactory;

    protected $table = 'required_documents';

    protected $primaryKey = 'required_document_id';

    protected $fillable = [
        'document_name',
        'description',
        'is_required',
    ];

    public function jobListings()
    {
        return $this->belongsToMany(JobListing::class, 'job_listing_required_documents', 'required_document_id', 'job_listing_id')
            ->withTimestamps();
    }
}
