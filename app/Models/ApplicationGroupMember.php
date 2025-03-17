<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApplicationGroupMember extends Model
{
    protected $primaryKey = 'member_id';
    
    protected $fillable = [
        'group_id',
        'application_id'
    ];

    public function group()
    {
        return $this->belongsTo(ApplicationGroup::class, 'group_id');
    }

    public function application()
    {
        return $this->belongsTo(Application::class, 'application_id');
    }
}