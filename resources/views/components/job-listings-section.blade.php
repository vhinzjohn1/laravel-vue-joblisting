<section id="job-listing" class="py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
            <span
                class="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">For Applicants</span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Latest Job Listings
            </h2>
            <div class="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach ($jobListings as $jobListing)
            <div
                data-aos="fade-up"
                data-aos-delay="{{ $loop->iteration * 100 }}"
                class="bg-white rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md group">
                <div class="p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                        {{ $jobListing->title }}
                    </h3>
                    <p class="text-gray-600 mb-4 line-clamp-2">
                        {{ $jobListing->description }}
                    </p>
                    <div class="flex items-center text-sm text-gray-500 mb-3">
                        <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        {{ $jobListing->position->position_name ?? 'N/A' }}
                    </div>
                    <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <span class="text-sm text-gray-500">
                            Closing: {{ \Carbon\Carbon::parse($jobListing->closing_date)->format('M j, Y') }}
                        </span>
                        <a href="{{ route('login') }}" class="text-green-600 hover:text-green-700 font-medium text-sm inline-flex items-center">
                            Details
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            @endforeach
            @if(count($jobListings) === 0)
            <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-1">No Opportunities Found</h3>
                <p class="text-gray-500">We couldn't find any job listings matching your criteria.</p>
            </div>
            @endif
        </div>
    </div>
</section>
