<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description"
        content="Streamlined HR job posting and application management system. Empower HR teams with efficient tools while making it easier for applicants to find and apply for opportunities.">
    <title>{{ config('app.name') }}</title>

    <!-- Resource Hints for Performance -->
    <link rel="preconnect" href="{{ request()->getSchemeAndHttpHost() }}">
    <link rel="dns-prefetch" href="{{ request()->getSchemeAndHttpHost() }}">

    {{-- Favicon --}}
    <link rel="icon" type="image/x-icon" href="{{ asset('/cmu-favicon.png') }}">

    <!-- Use Tailwind.js on public folder js folder -->
    <script src="{{ asset('js/tailwind.js') }}"></script>

    <!-- Fonts -->
    <link rel="stylesheet" href="{{ asset('css/fontawesome.min.css') }}">

    <!-- CSS Resources -->
    <link rel="stylesheet" href="{{ asset('css/aos.css') }}">

    <style>
        /* Custom styles that extend Tailwind */
        /* These styles can be moved to your app.css file if preferred */
        section {
            scroll-margin-top: 5rem;
            width: 100%;
        }

        /* Optimize SVG rendering */
        svg {
            shape-rendering: geometricPrecision;
        }
    </style>
</head>

<body class="antialiased">
    <div class="relative min-h-screen bg-white overflow-hidden">
        <!-- Navigation -->
        <header class="fixed w-full bg-white shadow-md z-50">
            <nav class="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div class="flex justify-between items-center">
                    <a href="#" class="flex items-center space-x-3">
                        <img src="{{ asset('img/cmulogo.png') }}" alt="CMU Logo"
                            class="w-10 h-10 sm:w-12 sm:h-12 critical-image">
                        <span class="font-semibold text-green-800 text-sm sm:text-base lg:text-xl">
                            Central Mindanao University
                        </span>
                    </a>

                    <!-- Hamburger Menu Button -->
                    <button id="mobile-menu-button" class="lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-800" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path id="hamburger-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                            <path id="close-icon" class="hidden" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    <!-- Desktop Menu -->
                    <div class="hidden lg:flex items-center space-x-8">
                        <a href="#home" class="text-green-800 hover:text-green-600">Home</a>
                        <a href="#how-to-apply" class="text-green-800 hover:text-green-600">How to Apply</a>
                        <a href="#about" class="text-green-800 hover:text-green-600">About</a>
                        <div class="flex space-x-4">
                            @if (Route::has('login'))
                                <a href="{{ route('login') }}"
                                    class="px-6 py-2 border-2 border-green-800 text-green-800 rounded-md hover:bg-green-800 hover:text-white transition-colors">
                                    Log in
                                </a>
                            @endif

                            @if (Route::has('register'))
                                <a href="{{ route('register') }}"
                                    class="px-6 py-2 bg-green-800 text-white border-2 border-green-800 rounded-md hover:text-white hover:bg-green-900 transition-colors">
                                    Register
                                </a>
                            @endif
                        </div>
                    </div>
                </div>

                <!-- Mobile Menu -->
                <div id="mobile-menu"
                    class="lg:hidden mt-4 transition-all duration-300 ease-in-out opacity-0 -translate-y-10 hidden">
                    <div class="flex flex-col space-y-4">
                        <a href="#home" class="text-green-800 hover:text-green-600">Home</a>
                        <a href="#how-to-apply" class="text-green-800 hover:text-green-600">How to Apply</a>
                        <a href="#about" class="text-green-800 hover:text-green-600">About</a>
                        <div class="flex flex-col space-y-2">
                            @if (Route::has('login'))
                                <a href="{{ route('login') }}"
                                    class="px-6 py-2 border-2 border-green-800 text-green-800 rounded-md hover:bg-green-800 hover:text-white transition-colors text-center">
                                    Log in
                                </a>
                            @endif

                            @if (Route::has('register'))
                                <a href="{{ route('register') }}"
                                    class="px-6 py-2 bg-green-800 text-white border-2 border-green-800 rounded-md hover:text-green-800 transition-colors text-center">
                                    Register
                                </a>
                            @endif
                        </div>
                    </div>
                </div>
            </nav>
        </header>

        <!-- Main Content Wrapper -->
        <div class="relative w-full">
            <!-- Hero Section -->
            <section id="home" class="min-h-screen flex items-center pt-16">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-0">
                        <!-- Left Content - Centered on medium and smaller screens -->
                        <div class="space-y-6 text-center mx-auto sm:mx-auto md:mx-auto lg:text-left lg:mx-0">
                            <div data-aos="fade-up" data-aos-duration="800" data-aos-mirror="true">
                                <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold">
                                    HR Job
                                    <span class="text-green-700">Listing</span><br>
                                    System
                                </h1>
                            </div>
                            <p class="text-gray-600 text-base sm:text-lg max-w-md" data-aos="fade-up"
                                data-aos-duration="800" data-aos-delay="200" data-aos-mirror="true">
                                Streamlined job posting and application management system. Empowering HR teams with
                                efficient tools while making it easier for applicants to find and apply for
                                opportunities.
                            </p>
                        </div>

                        <!-- Right Content - Animated Showcase (Only visible on large screens) -->
                        <div id="desktop-showcase" class="relative mt-8 lg:mt-0 hidden lg:block" data-aos="fade-left"
                            data-aos-duration="1000" data-aos-mirror="true" data-aos-delay="600">
                            <div
                                class="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl transform -rotate-6 scale-95 transition-transform duration-300 hover:rotate-0">
                            </div>
                            <div class="relative bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                                <div class="flex items-center justify-between mb-6">
                                    <h3 class="text-lg font-semibold">
                                        Application Process
                                    </h3>
                                    <div class="flex space-x-2">
                                        <div class="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div class="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                </div>
                                <div class="space-y-3">
                                    <!-- Application Process Steps -->
                                    <div class="bg-gray-50 p-3 rounded-lg transition-all hover:bg-gray-100"
                                        data-aos="fade-up" data-aos-delay="100" data-aos-mirror="true">
                                        <div class="flex items-center space-x-3">
                                            <div
                                                class="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold text-sm">
                                                1
                                            </div>
                                            <div>
                                                <p class="text-sm font-medium text-gray-800">
                                                    Job Posting
                                                </p>
                                                <p class="text-xs text-gray-500">
                                                    HR posts detailed job openings
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Additional steps omitted for brevity - continue with all steps -->
                                    <div class="bg-gray-50 p-3 rounded-lg transition-all hover:bg-gray-100"
                                        data-aos="fade-up" data-aos-delay="100" data-aos-mirror="true">
                                        <div class="flex items-center space-x-3">
                                            <div
                                                class="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                                                2
                                            </div>
                                            <div>
                                                <p class="text-sm font-medium text-gray-800">
                                                    Submit Application
                                                </p>
                                                <p class="text-xs text-gray-500">
                                                    Apply through user-friendly interface
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-gray-50 p-3 rounded-lg transition-all hover:bg-gray-100"
                                        data-aos="fade-up" data-aos-delay="100" data-aos-mirror="true">
                                        <div class="flex items-center space-x-3">
                                            <div
                                                class="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">
                                                3
                                            </div>
                                            <div>
                                                <p class="text-sm font-medium text-gray-800">
                                                    Application Review
                                                </p>
                                                <p class="text-xs text-gray-500">
                                                    HR reviews and shortlists candidates
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-gray-50 p-3 rounded-lg transition-all hover:bg-gray-100"
                                        data-aos="fade-up" data-aos-delay="100" data-aos-mirror="true">
                                        <div class="flex items-center space-x-3">
                                            <div
                                                class="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold text-sm">
                                                4
                                            </div>
                                            <div>
                                                <p class="text-sm font-medium text-gray-800">
                                                    Schedule Interview
                                                </p>
                                                <p class="text-xs text-gray-500">
                                                    Selected candidates are contacted
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-gray-50 p-3 rounded-lg transition-all hover:bg-gray-100"
                                        data-aos="fade-up" data-aos-delay="100" data-aos-mirror="true">
                                        <div class="flex items-center space-x-3">
                                            <div
                                                class="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-semibold text-sm">
                                                5
                                            </div>
                                            <div>
                                                <p class="text-sm font-medium text-gray-800">
                                                    Offer & Onboarding
                                                </p>
                                                <p class="text-xs text-gray-500">
                                                    Successful candidates receive offers
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Get Started Button -->
                                    <div class="mt-6 flex justify-center" data-aos="fade-up" data-aos-delay="100"
                                        data-aos-mirror="true">
                                        @if (Route::has('login'))
                                            <a href="{{ route('login') }}"
                                                class="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium">
                                                Get Started
                                            </a>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Application Process Section (Only visible on small screens) -->
            <section id="process" class="min-h-screen bg-gray-50 py-16 lg:py-20 small-screen-only"
                data-aos="fade-up" data-aos-mirror="true">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-10">
                        <span
                            class="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">PROCESS</span>
                        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Application Process
                        </h2>
                        <div class="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
                    </div>

                    <div class="max-w-2xl mx-auto">
                        <div class="relative bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
                            data-aos="fade-up">
                            <div class="flex items-center justify-between mb-6">
                                <h3 class="text-lg font-semibold">
                                    How It Works
                                </h3>
                                <div class="flex space-x-2">
                                    <div class="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div class="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                            </div>
                            <div class="space-y-4">
                                <div class="bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100"
                                    data-aos-mirror="true" data-aos="fade-up" data-aos-delay="100">
                                    <div class="flex items-center space-x-3">
                                        <div
                                            class="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold text-sm">
                                            1
                                        </div>
                                        <div>
                                            <p class="text-base font-medium text-gray-800">
                                                Job Posting
                                            </p>
                                            <p class="text-sm text-gray-500">
                                                HR posts detailed job openings
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100"
                                    data-aos-mirror="true" data-aos="fade-up" data-aos-delay="100">
                                    <div class="flex items-center space-x-3">
                                        <div
                                            class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                                            2
                                        </div>
                                        <div>
                                            <p class="text-base font-medium text-gray-800">
                                                Submit Application
                                            </p>
                                            <p class="text-sm text-gray-500">
                                                Apply through user-friendly interface
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100"
                                    data-aos-mirror="true" data-aos="fade-up" data-aos-delay="100">
                                    <div class="flex items-center space-x-3">
                                        <div
                                            class="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">
                                            3
                                        </div>
                                        <div>
                                            <p class="text-base font-medium text-gray-800">
                                                Application Review
                                            </p>
                                            <p class="text-sm text-gray-500">
                                                HR reviews and shortlists candidates
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100"
                                    data-aos-mirror="true" data-aos="fade-up" data-aos-delay="100">
                                    <div class="flex items-center space-x-3">
                                        <div
                                            class="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold text-sm">
                                            4
                                        </div>
                                        <div>
                                            <p class="text-base font-medium text-gray-800">
                                                Schedule Interview
                                            </p>
                                            <p class="text-sm text-gray-500">
                                                Selected candidates are contacted
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100"
                                    data-aos-mirror="true" data-aos="fade-up" data-aos-delay="100">
                                    <div class="flex items-center space-x-3">
                                        <div
                                            class="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-semibold text-sm">
                                            5
                                        </div>
                                        <div>
                                            <p class="text-base font-medium text-gray-800">
                                                Offer & Onboarding
                                            </p>
                                            <p class="text-sm text-gray-500">
                                                Successful candidates receive offers
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8 flex justify-center" data-aos="fade-up" data-aos-delay="100"
                                data-aos-mirror="true">
                                @if (Route::has('login'))
                                    <a href="{{ route('login') }}"
                                        class="px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium">
                                        Get Started
                                    </a>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- How to Apply Section -->
            <section id="how-to-apply" class="py-16 lg:py-20 bg-white">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16" data-aos="fade-up">
                        <span
                            class="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">FOR
                            APPLICANTS</span>
                        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            How to Apply
                        </h2>
                        <p class="text-gray-600 max-w-2xl mx-auto text-lg">
                            Follow these detailed steps to complete your application process smoothly.
                        </p>
                        <div class="w-24 h-1 bg-green-600 mx-auto rounded-full mt-6"></div>
                    </div>

                    <div class="max-w-6xl mx-auto">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <!-- Step 1: Registration -->
                            <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform"
                                data-aos="fade-up" data-aos-delay="100">
                                <div class="h-2 bg-green-600"></div>
                                <div class="p-6">
                                    <div
                                        class="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                                        1
                                    </div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-3">
                                        Registration
                                    </h3>
                                    <p class="text-gray-600 mb-4">
                                        Create your account to access the job application system.
                                    </p>
                                    <ul class="space-y-2 text-gray-600">
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Enter username
                                        </li>
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Provide valid email
                                        </li>
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Create secure password
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Step 2: Profile Details -->
                            <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform"
                                data-aos="fade-up" data-aos-delay="200">
                                <div class="h-2 bg-blue-600"></div>
                                <div class="p-6">
                                    <div
                                        class="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                                        2
                                    </div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-3">
                                        Complete Profile
                                    </h3>
                                    <p class="text-gray-600 mb-4">
                                        Input comprehensive details about your qualifications.
                                    </p>
                                    <ul class="space-y-2 text-gray-600">
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Educational background
                                        </li>
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Work experience
                                        </li>
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Training certifications
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Step 3: Job Search -->
                            <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform"
                                data-aos="fade-up" data-aos-delay="300">
                                <div class="h-2 bg-purple-600"></div>
                                <div class="p-6">
                                    <div
                                        class="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                                        3
                                    </div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-3">
                                        Find Job Listings
                                    </h3>
                                    <p class="text-gray-600 mb-4">
                                        Browse and search available job opportunities.
                                    </p>
                                    <ul class="space-y-2 text-gray-600">
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Search by position
                                        </li>
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Filter by department
                                        </li>
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Select suitable job listing
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Step 4: Application Submission -->
                            <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform"
                                data-aos="fade-up" data-aos-delay="400">
                                <div class="h-2 bg-orange-600"></div>
                                <div class="p-6">
                                    <div
                                        class="w-12 h-12 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                                        4
                                    </div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-3">
                                        Submit Application
                                    </h3>
                                    <p class="text-gray-600 mb-4">
                                        Select relevant profile details for the position.
                                    </p>
                                    <ul class="space-y-2 text-gray-600">
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Select relevant credentials
                                        </li>
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Customize application details
                                        </li>
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Submit application form
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Step 5: Application Review -->
                            <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform"
                                data-aos="fade-up" data-aos-delay="500">
                                <div class="h-2 bg-teal-600"></div>
                                <div class="p-6">
                                    <div
                                        class="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                                        5
                                    </div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-3">
                                        Application Review
                                    </h3>
                                    <p class="text-gray-600 mb-4">
                                        Wait while HR processes your application.
                                    </p>
                                    <ul class="space-y-2 text-gray-600">
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-teal-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            HR screening process
                                        </li>
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-teal-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Qualification assessment
                                        </li>
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-teal-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Application status updates
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Step 6: Schedule & Next Steps -->
                            <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform"
                                data-aos="fade-up" data-aos-delay="600">
                                <div class="h-2 bg-pink-600"></div>
                                <div class="p-6">
                                    <div
                                        class="w-12 h-12 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                                        6
                                    </div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-3">
                                        Next Steps
                                    </h3>
                                    <p class="text-gray-600 mb-4">
                                        Follow up on your application status.
                                    </p>
                                    <ul class="space-y-2 text-gray-600">
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-pink-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Check application status
                                        </li>
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-pink-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Schedule for interview
                                        </li>
                                        <li class="flex items-start">
                                            <svg class="w-5 h-5 text-pink-500 mr-2 mt-0.5" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Complete competency exams
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- CTA Button -->
                        <div class="mt-12 text-center" data-aos="fade-up" data-aos-delay="700">
                            @if (Route::has('register'))
                                <a href="{{ route('register') }}"
                                    class="px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium inline-flex items-center">
                                    Start Your Application
                                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </a>
                            @endif
                        </div>
                    </div>
                </div>
            </section>

            <!-- About Section -->
            <section id="about" class="py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16" data-aos="fade-up">
                        <span
                            class="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">DEPARTMENT'S</span>
                        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Mission and Vision
                        </h2>
                        <div class="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
                    </div>

                    <!-- Mission Card -->
                    <div class="max-w-6xl mx-auto mb-12 lg:mb-20">
                        <div class="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div class="grid grid-cols-1 lg:grid-cols-2">
                                <div class="relative p-6 sm:p-8 lg:p-12" data-aos="fade-right"
                                    data-aos-duration="1000">
                                    <div
                                        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600">
                                    </div>
                                    <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                                        <span class="text-green-600 mr-3">01.</span>
                                        Our Mission
                                    </h3>
                                    <p class="text-gray-600 leading-relaxed text-base sm:text-lg">
                                        To advance the frontier of knowledge through internationalization of education
                                        and equitable access to quality instruction, research, extension and production
                                        for economic prosperity, moral integrity, social and cultural sensitivity and
                                        environmental consciousness.
                                    </p>
                                </div>
                                <div class="relative h-60 sm:h-72 lg:h-auto" data-aos="fade-left"
                                    data-aos-duration="1000">
                                    <img src="{{ asset('img/cmuadmin.jpg') }}" alt="CMU Admin Building"
                                        class="w-full h-full object-cover" loading="lazy">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Vision Card -->
                    <div class="max-w-6xl mx-auto">
                        <div class="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div class="grid grid-cols-1 lg:grid-cols-2">
                                <div class="relative h-60 sm:h-72 lg:h-auto order-2 lg:order-1" data-aos="fade-right"
                                    data-aos-duration="1000">
                                    <img src="{{ asset('img/main_gate.jpg') }}" alt="CMU Main Gate"
                                        class="w-full h-full object-cover" loading="lazy">
                                </div>
                                <div class="relative p-6 sm:p-8 lg:p-12 order-1 lg:order-2" data-aos="fade-left"
                                    data-aos-duration="1000">
                                    <div
                                        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600">
                                    </div>
                                    <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                                        <span class="text-green-600 mr-3">02.</span>
                                        Our Vision
                                    </h3>
                                    <p class="text-gray-600 leading-relaxed text-base sm:text-lg">
                                        A leading ASEAN university actively committed to the total development of people
                                        for a globally sustainable environment and a humane society.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Footer -->
            <footer class="bg-green-800 text-white py-4 text-center">
                <p>Software Development Department 2025. All Rights Reserved.</p>
            </footer>
        </div>
    </div>


    <script src="{{ asset('js/aos.js') }}"></script>

    <script>
        // Initialize AOS
        AOS.init();

        // Handle mobile menu and implement lazy loading
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburgerIcon = document.getElementById('hamburger-icon');
            const closeIcon = document.getElementById('close-icon');
            let isMobileMenuOpen = false;

            function toggleMobileMenu() {
                isMobileMenuOpen = !isMobileMenuOpen;

                if (isMobileMenuOpen) {
                    mobileMenu.classList.remove('hidden');
                    // Wait for next frame before adding visible classes
                    setTimeout(() => {
                        mobileMenu.classList.remove('opacity-0', '-translate-y-10');
                        mobileMenu.classList.add('opacity-100', 'translate-y-0', 'block');
                        hamburgerIcon.classList.add('hidden');
                        closeIcon.classList.remove('hidden');
                    }, 10);
                } else {
                    mobileMenu.classList.remove('opacity-100', 'translate-y-0');
                    mobileMenu.classList.add('opacity-0', '-translate-y-10');
                    hamburgerIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');

                    // Hide after transition completes
                    setTimeout(() => {
                        if (!isMobileMenuOpen) {
                            mobileMenu.classList.add('hidden');
                        }
                    }, 300);
                }
            }

            mobileMenuButton.addEventListener('click', toggleMobileMenu);

            // Check screen size
            function checkScreenSize() {
                const isSmallScreen = window.innerWidth < 1024; // lg breakpoint
                const smallScreenSections = document.querySelectorAll('.small-screen-only');
                const desktopShowcase = document.getElementById('desktop-showcase');

                if (isSmallScreen) {
                    // Show small screen sections
                    smallScreenSections.forEach(section => {
                        section.style.display = 'block';
                    });

                    // Hide desktop showcase
                    if (desktopShowcase) {
                        desktopShowcase.classList.add('hidden');
                        desktopShowcase.classList.remove('lg:block');
                    }
                } else {
                    // Hide small screen sections
                    smallScreenSections.forEach(section => {
                        section.style.display = 'none';
                    });

                    // Show desktop showcase
                    if (desktopShowcase) {
                        desktopShowcase.classList.remove('hidden');
                        desktopShowcase.classList.add('lg:block');
                    }
                }
            }

            // Check on load and resize
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
        });
    </script>
</body>

</html>
