<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($this->user()->user_id, 'user_id')],
            'firstname' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'middle_initial' => ['nullable', 'string', 'max:1'],
            'phone_number' => ['nullable', 'string', 'max:20'],
            'education_attainment' => ['nullable', 'string', 'max:255'],
            'eligibility' => ['nullable', 'string', 'max:255'],
        ];
    }
}
