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
        tr.hover\:bg-green-50:hover {
            background-color: #f0fdf4;
        }
        tr.cursor-pointer {
            cursor: pointer;
        }
        dialog#job-modal::backdrop {
            background: rgba(0, 0, 0, 0.65);
            backdrop-filter: blur(3px);
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

            <!-- Job Listings Table Section -->
            <section class="w-full py-12 bg-gray-50" id="job-listings">
                <div class="max-w-7xl mx-auto px-4">
                    <!-- Plantilla Positions Table -->
                    <div class="mb-12">
                        <h2 class="text-2xl font-bold text-green-800 mb-4 text-center">Plantilla Positions</h2>
                        <div class="mb-4 flex justify-end">
                            <input type="text" id="plantilla-search" placeholder="Search positions..." class="w-full max-w-xs px-3 py-2 border rounded focus:ring-green-500 focus:border-green-500" oninput="filterTable('plantilla-table', this.value)">
                        </div>
                        <div class="overflow-x-auto bg-white rounded-lg shadow">
                            <table class="min-w-full border-collapse" id="plantilla-table">
                                <thead>
                                    <tr>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">No.</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Title</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Item Number</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Salary Grade</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Category</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Education</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Training</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Experience</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Eligibility</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Date Posted</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Closing Date</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Place of Assignment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @php $row = 1; @endphp
                                    @foreach($batches as $batch)
                                        @if($batch->is_plantilla == 1)
                                            @foreach($batch->jobListings as $job)
                                                <tr class="hover:bg-green-50 cursor-pointer transition" onclick='showJobModal(@json($job))'>
                                                    <td class="border px-3 py-2 text-sm">{{ $row++ }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->title }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->position->item_number === '' ? 'CoS/Job Order' : ($job->position->item_number ?? '-') }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->position->salaryGrade->salary_grade ?? '-' }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->position->category ?? '-' }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->position->minimumRequirement->education_level ?? '-' }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->position->minimumRequirement->training_hours ? $job->position->minimumRequirement->training_hours . ' hours' : '-' }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->position->minimumRequirement->years_experience ? $job->position->minimumRequirement->years_experience . ' year(s)' : '-' }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->position->minimumRequirement->eligibility ?? '-' }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->created_at ? \Carbon\Carbon::parse($job->created_at)->format('M d, Y') : '-' }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->closing_date ? \Carbon\Carbon::parse($job->closing_date)->format('M d, Y') : '-' }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->place_assigned ?? '-' }}</td>
                                                </tr>
                                            @endforeach
                                        @endif
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Non-Plantilla Positions Table -->
                    <div>
                        <h2 class="text-2xl font-bold text-green-800 mb-4 text-center">Contract of Service & Job Order Positions</h2>
                        <div class="mb-4 flex justify-end">
                            <input type="text" id="non-plantilla-search" placeholder="Search positions..." class="w-full max-w-xs px-3 py-2 border rounded focus:ring-green-500 focus:border-green-500" oninput="filterTable('non-plantilla-table', this.value)">
                        </div>
                        <div class="overflow-x-auto bg-white rounded-lg shadow">
                            <table class="min-w-full border-collapse" id="non-plantilla-table">
                                <thead>
                                    <tr>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">No.</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Title</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Item Number</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Salary Grade</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Category</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Education</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Training</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Experience</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Eligibility</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Date Posted</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Closing Date</th>
                                        <th class="border px-3 py-2 bg-gray-100 font-medium text-sm">Place of Assignment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @php $row = 1; @endphp
                                    @foreach($batches as $batch)
                                        @if($batch->is_plantilla == 0)
                                            @foreach($batch->jobListings as $job)
                                                <tr class="hover:bg-green-50 cursor-pointer transition" onclick='showJobModal(@json($job))'>
                                                    <td class="border px-3 py-2 text-sm">{{ $row++ }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->title }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->position->item_number === '' ? 'CoS/Job Order' : ($job->position->item_number ?? '-') }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->position->salaryGrade->salary_grade ?? '-' }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->position->category ?? '-' }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->position->minimumRequirement->education_level ?? '-' }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->position->minimumRequirement->training_hours ? $job->position->minimumRequirement->training_hours . ' hours' : '-' }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->position->minimumRequirement->years_experience ? $job->position->minimumRequirement->years_experience . ' year(s)' : '-' }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->position->minimumRequirement->eligibility ?? '-' }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->created_at ? \Carbon\Carbon::parse($job->created_at)->format('M d, Y') : '-' }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->closing_date ? \Carbon\Carbon::parse($job->closing_date)->format('M d, Y') : '-' }}</td>
                                                    <td class="border px-3 py-2 text-sm">{{ $job->place_assigned ?? '-' }}</td>
                                                </tr>
                                            @endforeach
                                        @endif
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <script>
            // Simple client-side table filter for search
            function filterTable(tableId, query) {
                const table = document.getElementById(tableId);
                const rows = table.getElementsByTagName('tr');
                query = query.toLowerCase();
                for (let i = 1; i < rows.length; i++) { // skip header
                    let show = false;
                    const cells = rows[i].getElementsByTagName('td');
                    for (let j = 0; j < cells.length; j++) {
                        if (cells[j].innerText.toLowerCase().includes(query)) {
                            show = true;
                            break;
                        }
                    }
                    rows[i].style.display = show ? '' : 'none';
                }
            }
            </script>

            <!-- How to Apply Section -->
            @include('components.how-to-apply')

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

        const batches = @json($batches);
        console.log(batches);

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

    <!-- Modal for Job Details -->
    <dialog id="job-modal" class="z-50 rounded-lg max-w-2xl w-full p-0 bg-transparent">
        <form method="dialog" class="w-full">
            <div class="bg-white rounded-lg shadow-lg w-full p-8 relative">
                <button type="button" onclick="closeJobModal()" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
                <h2 class="text-2xl font-bold mb-4" id="modal-title"></h2>
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-3">Basic Information</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div><p class="text-sm text-gray-600">Position</p><p class="font-medium" id="modal-position"></p></div>
                        <div><p class="text-sm text-gray-600">Category</p><p class="font-medium" id="modal-category"></p></div>
                        <div><p class="text-sm text-gray-600">Item Number</p><p class="font-medium" id="modal-item-number"></p></div>
                        <div><p class="text-sm text-gray-600">Salary Grade</p><p class="font-medium" id="modal-salary-grade"></p></div>
                        <div><p class="text-sm text-gray-600">Date Posted</p><p class="font-medium" id="modal-date-posted"></p></div>
                        <div><p class="text-sm text-gray-600">Closing Date</p><p class="font-medium" id="modal-closing-date"></p></div>
                        <div><p class="text-sm text-gray-600">Status</p><p class="font-medium" id="modal-status"></p></div>
                        <div><p class="text-sm text-gray-600">Place of Assignment</p><p class="font-medium" id="modal-place-assigned"></p></div>
                    </div>
                </div>
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-3">Job Description</h3>
                    <p class="text-gray-700 whitespace-pre-line" id="modal-description"></p>
                </div>
                <div class="mb-6" id="modal-min-req-section">
                    <h3 class="text-lg font-semibold mb-3">Minimum Requirements</h3>
                    <ul class="list-disc list-inside space-y-2" id="modal-min-req-list"></ul>
                </div>
                <div class="mb-6" id="modal-docs-section">
                    <h3 class="text-lg font-semibold mb-3">Required Documents</h3>
                    <ul class="list-disc list-inside space-y-2" id="modal-docs-list"></ul>
                </div>
                <div class="flex justify-end gap-4 mt-6">
                    <button type="button" onclick="closeJobModal()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200">Close</button>
                    <button type="button" onclick="applyNow()" class="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors duration-200">Apply Now</button>
                </div>
            </div>
        </form>
    </dialog>
    <script>
    // Modal logic for job details using <dialog>
    let currentJobId = null;
    function showJobModal(job) {
        currentJobId = job.job_listing_id;
        function get(obj, path, fallback = '-') {
            return path.split('.').reduce((o, k) => (o && o[k] !== undefined && o[k] !== null ? o[k] : undefined), obj) ?? fallback;
        }
        document.getElementById('modal-title').textContent = job.title || '-';
        document.getElementById('modal-position').textContent = get(job, 'position.position_name');
        document.getElementById('modal-category').textContent = get(job, 'position.category');
        let itemNumber = get(job, 'position.item_number', '');
        document.getElementById('modal-item-number').textContent = (itemNumber === '' ? 'CoS/Job Order' : itemNumber || '-');
        document.getElementById('modal-salary-grade').textContent = get(job, 'position.salary_grade.salary_grade');
        document.getElementById('modal-date-posted').textContent = job.created_at
            ? new Date(job.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
            : '-';
        document.getElementById('modal-closing-date').textContent = job.closing_date
            ? new Date(job.closing_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
            : '-';
        document.getElementById('modal-status').textContent = job.status || '-';
        document.getElementById('modal-place-assigned').textContent = job.place_assigned || '-';
        document.getElementById('modal-description').textContent = job.description || '';
        // Minimum Requirements
        const minReq = job.position?.minimum_requirement || job.position?.minimumRequirement;
        const minReqList = document.getElementById('modal-min-req-list');
        minReqList.innerHTML = '';
        if (minReq) {
            if (minReq.education_level) minReqList.innerHTML += `<li><b>Education:</b> ${minReq.education_level}</li>`;
            if (minReq.eligibility) minReqList.innerHTML += `<li><b>Eligibility:</b> ${minReq.eligibility}</li>`;
            if (minReq.training_hours) minReqList.innerHTML += `<li><b>Training Required:</b> ${minReq.training_hours} hours</li>`;
            if (minReq.years_experience) minReqList.innerHTML += `<li><b>Experience Required:</b> ${minReq.years_experience} year(s)</li>`;
            document.getElementById('modal-min-req-section').style.display = '';
        } else {
            document.getElementById('modal-min-req-section').style.display = 'none';
        }
        // Required Documents
        const docs = job.required_documents || job.requiredDocuments;
        const docsList = document.getElementById('modal-docs-list');
        docsList.innerHTML = '';
        if (docs && docs.length > 0) {
            docs.forEach(doc => {
                docsList.innerHTML += `<li>${doc.document_name}</li>`;
            });
            document.getElementById('modal-docs-section').style.display = '';
        } else {
            document.getElementById('modal-docs-section').style.display = 'none';
        }
        const dialog = document.getElementById('job-modal');
        if (dialog) {
            dialog.showModal();
        }
    }
    function closeJobModal() {
        const dialog = document.getElementById('job-modal');
        if (dialog && dialog.open) {
            dialog.close();
        }
        currentJobId = null;
    }
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        const dialog = document.getElementById('job-modal');
        if (dialog && dialog.open && event.target === dialog) {
            dialog.close();
            currentJobId = null;
        }
    });
    function applyNow() {
        if (currentJobId) {
            // Get the current job's position name
            const position = document.getElementById('modal-position').textContent || '';
            // Retrieve existing array from localStorage or initialize
            let jobs = [];
            try {
                jobs = JSON.parse(localStorage.getItem('job_listing_id')) || [];
            } catch (e) {
                jobs = [];
            }
            // Check for duplicates
            if (!jobs.some(j => j.job_listing_id == currentJobId)) {
                jobs.push({ position: position, job_listing_id: currentJobId });
                localStorage.setItem('job_listing_id', JSON.stringify(jobs));
            }
            closeJobModal();
            // Redirect to register page after closing modal
            window.location.href = "{{ route('register') }}";
        }
    }
    </script>
</body>
</html>
