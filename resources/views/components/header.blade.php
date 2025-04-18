<header class="fixed z-50 w-full bg-white shadow-md">
    <nav class="container px-4 py-3 mx-auto sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
            <a href="#" class="flex items-center space-x-3">
                <img src="{{ asset('img/cmulogo.png') }}" alt="CMU Logo"
                    class="w-10 h-10 sm:w-12 sm:h-12 critical-image">
                <span class="text-sm font-semibold text-green-800 sm:text-base lg:text-xl">
                    Central Mindanao University
                </span>
            </a>

            <!-- Hamburger Menu Button -->
            <button id="mobile-menu-button" class="lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-800" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path id="hamburger-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"></path>
                    <path id="close-icon" class="hidden" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>

            <!-- Desktop Menu -->
            <div class="hidden items-center space-x-8 lg:flex">
                <a href="#home" class="text-green-800 hover:text-green-600">Home</a>
                <a href="#how-to-apply" class="text-green-800 hover:text-green-600">Apply</a>
                <a href="#job-listing" class="text-green-800 hover:text-green-600">Job Listings</a>
                <a href="#about" class="text-green-800 hover:text-green-600">About</a>
                <div class="flex space-x-4">
                    @if (Route::has('login'))
                        <a href="{{ route('login') }}"
                            class="px-6 py-2 text-green-800 rounded-md border-2 border-green-800 transition-colors hover:bg-green-800 hover:text-white">
                            Log in
                        </a>
                    @endif

                    @if (Route::has('register'))
                        <a href="{{ route('register') }}"
                            class="px-6 py-2 text-white bg-green-800 rounded-md border-2 border-green-800 transition-colors hover:text-white hover:bg-green-900">
                            Register
                        </a>
                    @endif
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu"
            class="hidden mt-4 opacity-0 transition-all duration-300 ease-in-out -translate-y-10 lg:hidden">
            <div class="flex flex-col space-y-4">
                <a href="#home" class="text-green-800 hover:text-green-600">Home</a>
                <a href="#how-to-apply" class="text-green-800 hover:text-green-600">How to Apply</a>
                <a href="#about" class="text-green-800 hover:text-green-600">About</a>
                <div class="flex flex-col space-y-2">
                    @if (Route::has('login'))
                        <a href="{{ route('login') }}"
                            class="px-6 py-2 text-center text-green-800 rounded-md border-2 border-green-800 transition-colors hover:bg-green-800 hover:text-white">
                            Log in
                        </a>
                    @endif

                    @if (Route::has('register'))
                        <a href="{{ route('register') }}"
                            class="px-6 py-2 text-center text-white bg-green-800 rounded-md border-2 border-green-800 transition-colors hover:text-green-800">
                            Register
                        </a>
                    @endif
                </div>
            </div>
        </div>
    </nav>
</header>