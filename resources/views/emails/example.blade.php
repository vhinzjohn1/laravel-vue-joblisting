<!DOCTYPE html>
<html>

<head>
    <title>CMU Job Listings - Notification</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #eaeaea;
        }

        .logo {
            max-width: 150px;
            height: auto;
            margin-bottom: 10px;
        }

        .content {
            padding: 20px 0;
        }

        .footer {
            text-align: center;
            padding: 20px 0;
            font-size: 12px;
            color: #777;
            border-top: 1px solid #eaeaea;
        }

        h1 {
            color: #012f12;
            font-size: 24px;
            margin-bottom: 15px;
        }

        p {
            margin-bottom: 15px;
        }

        .message {
            padding: 15px;
            background-color: #f5f8f5;
            border-left: 4px solid #012f12;
            margin-bottom: 20px;
        }

        .cta-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #012f12;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            margin-top: 10px;
        }

        .cta-button:hover {
            background-color: #034b1c;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>CMU Job Listings</h1>
        </div>
        <div class="content">
            <h2>Hello, {{ $data['name'] }}</h2>

            <div class="message">
                {{ $data['message'] }}
            </div>

            @if (isset($data['action_url']))
                <div style="text-align: center;">
                    <a href="{{ $data['action_url'] }}" class="cta-button">View Details</a>
                </div>
            @endif

            <p>Thank you for using CMU Job Listings. If you have any questions, please contact our support team.</p>
        </div>
        <div class="footer">
            <p>© {{ date('Y') }} CMU Job Listings. All rights reserved.</p>
            <p>This is an automated email, please do not reply.</p>
        </div>
    </div>
</body>

</html>
