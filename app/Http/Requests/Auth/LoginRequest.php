<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Services\CaptchaService;

class LoginRequest extends FormRequest
{
    /**
     * The Captcha service instance.
     */
    protected CaptchaService $captcha;

    /**
     * Create a new request instance.
     */
    public function __construct(CaptchaService $captcha)
    {
        $this->captcha = $captcha;
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'login' => ['required', 'string'],
            'password' => ['required', 'string'],
            'captcha_token' => ['required', 'string'],
            'captcha_code' => ['required', 'string', 'size:6', function ($attribute, $value, $fail) {
                if (!$this->captcha->validate($this->validated('captcha_token'), $this->validated('captcha_code'))) {
                    $fail('The CAPTCHA code is invalid or has expired. Please try again.');
                }
            }],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        // Check if the provided login is an email
        $loginType = filter_var($this->validated('login'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        // First, check if the user exists
        $user = User::where($loginType, $this->validated('login'))->first();

        if (!$user) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'login' => 'No account found with this ' . $loginType . '. Please check your information or register.',
            ]);
        }

        // User exists, now check if the password matches
        if (!Hash::check($this->validated('password'), $user->password)) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'password' => 'The password you entered is incorrect. Please try again.',
            ]);
        }

        // Credentials are valid, attempt to log in
        if (!Auth::login($user, (bool) $this->validated('remember', false))) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'login' => 'Unable to log in. Please try again later.',
            ]);
        }

        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'login' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->validated('login')).'|'.request()->ip());
    }
}
