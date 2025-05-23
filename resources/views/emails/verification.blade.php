<!DOCTYPE html>
<html>
<head>
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #222;
            background: #fafaff;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 32px 24px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(34,197,94,0.08);
        }
        h2 {
            color: #166534;
        }
        .button {
            display: inline-block;
            padding: 14px 32px;
            background-color: #22c55e;
            color: #fff !important;
            text-decoration: none;
            border-radius: 6px;
            font-size: 1.1rem;
            font-weight: 600;
            margin: 24px 0 16px 0;
            transition: background 0.2s;
        }
        .button:hover {
            background: #16a34a;
        }
        .footer {
            margin-top: 32px;
            font-size: 13px;
            color: #666;
        }
        a {
            word-break: break-all;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Verify Your Email Address</h2>
        <p>Hello {{ $data['name'] ?? 'applicant' }},</p>
        <p>Thank you for registering with CMU Job Listings. Please verify your email address by clicking the button below:</p>

        <a href="{{ $data['verification_url'] }}" class="button">Verify Email Address</a>

        <p>If you did not create an account, no further action is required.</p>

        <div class="footer">
            <p>This verification link will expire in 60 minutes.</p>
            <p>If you're having trouble clicking the button, copy and paste this URL into your web browser:</p>
            <a href="{{ $data['verification_url'] }}">{{ $data['verification_url'] }}</a>
        </div>
    </div>
</body>
</html>
