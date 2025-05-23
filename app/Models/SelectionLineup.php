<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SelectionLineup extends Model
{
    use HasFactory;

    protected $table = 'selection_lineups';

    protected $primaryKey = 'selection_id';

    protected $fillable = [
        'application_id',
        'name',
        'education',
        'training',
        'experience',
        'eligibility',
    ];

    public function application()
    {
        return $this->belongsTo(Application::class, 'application_id');
    }
}
