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
    <link rel="icon" type="image/x-icon" href="{{ asset('cmu-favicon.png') }}">

    <!-- Use Tailwind cdn for production-->
    {{-- <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script> --}}

    {{-- Using tailwind.js for development --}}
    <script src="{{ asset('js/tailwind.js') }}"></script>

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
        ::selection {
            background-color: #22c55e !important;
            color: #000000 !important;
        }
    </style>
</head>

<body class="antialiased">
    <div class="relative min-h-screen bg-white overflow-hidden">
        <!-- Navigation -->
        @include('components.header')

        <!-- Main Content Wrapper -->
        <div class="relative w-full">
            <!-- Hero Section -->
            @include('components.hero-section')

            <!-- How to Apply Section -->
            @include('components.how-to-apply')

            <!-- Job Listings Section -->
            @include('components.job-listings-section')

            <!-- About Section -->
            @include('components.about-section')

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
