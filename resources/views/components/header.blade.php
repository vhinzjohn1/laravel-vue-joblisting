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
                <a href="#job-listing" class="text-green-800 hover:text-green-600">Job Listings</a>
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