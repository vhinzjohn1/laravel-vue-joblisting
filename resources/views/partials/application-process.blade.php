<div class="relative mt-8 lg:mt-0">
    <div class="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl transform -rotate-6 scale-95 transition-transform duration-300 hover:rotate-0"></div>
    <div class="relative bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
        <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold">Application Process</h3>
            <div class="flex space-x-2">
                <div class="w-3 h-3 rounded-full bg-red-400"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div class="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
        </div>
        <div class="space-y-3">
            @foreach ([
                ['color' => 'green', 'title' => 'Job Posting', 'desc' => 'HR posts detailed job openings'],
                ['color' => 'blue', 'title' => 'Submit Application', 'desc' => 'Apply through user-friendly interface'],
                ['color' => 'purple', 'title' => 'Application Review', 'desc' => 'HR reviews and shortlists candidates'],
                ['color' => 'orange', 'title' => 'Schedule Interview', 'desc' => 'Selected candidates are contacted'],
                ['color' => 'teal', 'title' => 'Offer & Onboarding', 'desc' => 'Successful candidates receive offers'],
            ] as $index => $step)
                <div class="bg-gray-50 p-3 rounded-lg transition-all hover:bg-gray-100"
                     data-aos="fade-up" data-aos-delay="{{ 100 * ($index + 1) }}" data-aos-mirror="true">
                    <div class="flex items-center space-x-3">
                        <div class="flex-shrink-0 w-6 h-6 bg-{{ $step['color'] }}-100 text-{{ $step['color'] }}-600 rounded-full flex items-center justify-center font-semibold text-sm">
                            {{ $index + 1 }}
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-800">{{ $step['title'] }}</p>
                            <p class="text-xs text-gray-500">{{ $step['desc'] }}</p>
                        </div>
                    </div>
                </div>
            @endforeach

            <div class="mt-6 flex justify-center" data-aos="fade-up" data-aos-delay="100" data-aos-mirror="true">
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
