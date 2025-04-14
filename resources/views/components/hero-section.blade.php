<section id="home" class="min-h-screen flex items-center pt-16">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-0">
            <!-- Left Content -->
            <div class="space-y-6 text-center lg:text-left mx-auto lg:mx-0">
                <div data-aos="fade-up" data-aos-duration="800" data-aos-mirror="true">
                    <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold">
                        HR Job <span class="text-green-700">Listing</span><br> System
                    </h1>
                </div>
                <p class="text-gray-600 text-base sm:text-lg max-w-md mx-auto lg:mx-0"
                   data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" data-aos-mirror="true">
                    Streamlined job posting and application management system. Empowering HR teams with
                    efficient tools while making it easier for applicants to find and apply for
                    opportunities.
                </p>

                <!-- Application Process (visible below on mobile, on right for desktop) -->
                <div class="lg:hidden" data-aos="fade-up" data-aos-delay="400" data-aos-mirror="true">
                    @include('partials.application-process') {{-- Extracted for reuse --}}
                </div>
            </div>

            <!-- Right Content (only on lg and above) -->
            <div class="hidden lg:block" data-aos="fade-left" data-aos-duration="1000" data-aos-mirror="true" data-aos-delay="600">
                @include('partials.application-process')
            </div>
        </div>
    </div>
</section>
