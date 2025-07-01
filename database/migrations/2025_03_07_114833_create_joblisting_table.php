<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create users table and seed dummy users
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id'); // Change primary key name
            $table->string('username')->nullable()->unique();
            $table->string('password');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('role_name')->nullable();
            $table->boolean('profile_completed')->default(false);
            $table->boolean('tour_completed')->default(false);
            $table->rememberToken();
            $table->timestamps();

            // Adding Index for Performance
            $table->index('email');
            $table->index('username');
            $table->index('role_name');
            $table->index('profile_completed');
            $table->index('tour_completed');
        });

        // Dummy seeder for users with 3 records
        DB::table('users')->insert([
            [
                'username' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('admin123'),
                'role_name' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'hr',
                'email' => 'hr@gmail.com',
                'password' => bcrypt('admin123'),
                'role_name' => 'hr',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'applicant',
                'email' => 'vhinzjohn43@gmail.com',
                'password' => bcrypt('admin123'),
                'role_name' => 'applicant',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Create user_details table
        Schema::create('user_details', function (Blueprint $table) {
            $table->id('detail_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->string('middle_name')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('eligibility')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });

        // Seed applicant details (using the applicant's user id)
        $applicantId = DB::table('users')->where('username', 'applicant')->value('user_id');
        DB::table('user_details')->insert([
            'user_id'        => $applicantId,
            'firstname'      => 'Vhinz John',
            'lastname'       => 'Balinas',
            'middle_name'    => 'Hinoay',
            'phone_number'   => '0912345678',
            'eligibility'    => "None",
            'created_at'     => now(),
            'updated_at'     => now(),
        ]);

        // Create educational_backgrounds table
        Schema::create('educational_backgrounds', function (Blueprint $table) {
            $table->id('education_id');
            $table->unsignedBigInteger('user_id');
            $table->string('level');
            $table->string('school_name');
            $table->string('degree_course');
            $table->year('year_graduated')->nullable();
            $table->string('honors_received')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });

        // Seed applicant educational background
        DB::table('educational_backgrounds')->insert([
            'user_id'         => $applicantId,
            'level'           => "Bachelor's Degree",
            'school_name'     => 'Central Mindanao University',
            'degree_course'   => 'BS in Computer Science',
            'year_graduated'  => '2018',
            'created_at'      => now(),
            'updated_at'      => now(),
        ]);

        // Create trainings table
        Schema::create('trainings', function (Blueprint $table) {
            $table->id('training_id');
            $table->unsignedBigInteger('user_id');
            $table->string('title');
            $table->string('institution');
            $table->integer('duration_hours');
            $table->string('certificate_url')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });

        // Seed applicant training record
        DB::table('trainings')->insert([
            'user_id'         => $applicantId,
            'title'           => 'Advanced PHP & Laravel Training',
            'institution'     => 'Tech Academy PH',
            'duration_hours'  => 40,
            'certificate_url' => 'http://example.com/certificate/applicant',
            'created_at'      => now(),
            'updated_at'      => now(),
        ]);

        // Create work_experiences table
        Schema::create('work_experiences', function (Blueprint $table) {
            $table->id('experience_id');
            $table->unsignedBigInteger('user_id');
            $table->string('position');
            $table->string('company_name');
            $table->string('start_date')->nullable();
            $table->string('end_date')->nullable();
            $table->boolean('is_current_job')->default(false);
            $table->text('responsibilities')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });

        // Seed applicant work experience record
        DB::table('work_experiences')->insert([
            'user_id'          => $applicantId,
            'position'         => 'Junior Developer',
            'company_name'     => 'Innovative Tech Solutions',
            'start_date'       => '2019-06-01',
            'end_date'         => '2021-08-31',
            'is_current_job'   => false,
            'responsibilities' => 'Developing web applications and maintaining legacy systems.',
            'created_at'       => now(),
            'updated_at'       => now(),
        ]);

        // Create salary_grades table and seed data
        Schema::create('salary_grades', function (Blueprint $table) {
            $table->id('salary_grade_id');
            $table->string('salary_grade')->nullable();
            $table->float('amount', 53, 2)->nullable();
            $table->timestamps();
        });

        DB::table('salary_grades')->insert([
            ['salary_grade' => 'SG-7'],
            ['salary_grade' => 'SG-8'],
        ]);

        // Create minimum_requirements table
        Schema::create('minimum_requirements', function (Blueprint $table) {
            $table->id('minimum_requirement_id');
            $table->string('education_level')->nullable();
            $table->integer('training_hours')->nullable();
            $table->string('eligibility')->nullable();
            $table->integer('years_experience')->nullable();
            $table->boolean('is_required')->default(true);
            $table->timestamps();
        });

        // Seed minimum requirements first
        DB::table('minimum_requirements')->insert([
            [
                'education_level' => 'Bachelor\'s degree',
                'training_hours' => 3,
                'eligibility' => 'Career Service (Professional)',
                'years_experience' => 1,
                'is_required' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'education_level' => 'Bachelor\'s degree',
                'training_hours' => 4,
                'eligibility' => 'Career Service (Sub-Professional)',
                'years_experience' => 1,
                'is_required' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'education_level' => 'Bachelor\'s degree',
                'training_hours' => 3,
                'eligibility' => 'RA 1080 (Board/Bar)',
                'years_experience' => 1,
                'is_required' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Create positions table and seed data
        Schema::create('positions', function (Blueprint $table) {
            $table->id('position_id');
            $table->string('position_name')->nullable();
            $table->string('item_number')->nullable();
            $table->string('category')->nullable();
            $table->string('employment_type')->nullable();
            $table->unsignedBigInteger('salary_grade_id')->nullable();
            $table->unsignedBigInteger('minimum_requirement_id')->nullable();
            $table->timestamps();

            $table->foreign('salary_grade_id')->references('salary_grade_id')->on('salary_grades')->onDelete('set null');
            $table->foreign('minimum_requirement_id')->references('minimum_requirement_id')->on('minimum_requirements')->onDelete('set null');
        });

        // Insert positions with proper minimum requirement IDs
        DB::table('positions')->insert([
            [
                'position_name' => 'Mathematics Teacher',
                'item_number' => 'TCH-001',
                'category' => 'Teaching',
                'employment_type' => 'Plantilla',
                'salary_grade_id' => 1,
                'minimum_requirement_id' => 1, // Bachelor's degree with CSP eligibility
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'position_name' => 'Administrative Assistant',
                'item_number' => '',
                'category' => 'Non-Teaching',
                'employment_type' => 'CoS',
                'salary_grade_id' => 1,
                'minimum_requirement_id' => 2, // Associate's or Bachelor's with Sub-Professional eligibility
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'position_name' => 'Science Department Head',
                'item_number' => 'TCH-002',
                'category' => 'Teaching',
                'employment_type' => 'Plantilla',
                'salary_grade_id' => 2,
                'minimum_requirement_id' => 3, // Associate's or Bachelor's with RA 1080 eligibility
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);

        // Create job_batches table
        Schema::create('job_listing_batches', function (Blueprint $table) {
            $table->id('batch_id');
            $table->string('batch_name')->nullable();
            $table->string('batch_code')->nullable();
            $table->string('post_date')->nullable();
            $table->string('deadline')->nullable();
            $table->string('status')->default('Active');
            $table->boolean('is_plantilla')->default(true);
            $table->timestamps();

            // Adding Indexes
            $table->index('status');
            $table->index('post_date');
            $table->index('deadline');
        });

        // Create required documents table
        Schema::create('required_documents', function (Blueprint $table) {
            $table->id('required_document_id');
            $table->string('document_name')->unique();
            $table->string('description')->nullable();
            $table->boolean('is_required')->default(false);
            $table->timestamps();
        });

        // Seed required documents
        DB::table('required_documents')->insert([
            [
                'document_name' => 'Letter of Intent/Application Letter',
                'description' => 'Application Letter should specify the POSITION APPLIED FOR and the PLACE OF ASSIGNMENT. File should be in Portable Document Format (PDF).',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'document_name' => 'Personal Data Sheet (PDS)',
                'description' => 'The CS Form No. 212, Revised 2017 (Personal Data Sheet) shall be duly accomplished. Ensure that all 4 pages of the PDS is filled-out.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'document_name' => 'Work Experience Sheet (WES)',
                'description' => 'The Work Experience Sheet shall be duly accomplished. The Work Experience Sheet shall coincide with the Personal Data Sheet and Service Record.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'document_name' => 'Transcript of Records (TOR) and Diploma',
                'description' => 'Include copies of your educational credentials. Combine all pages into a single PDF file.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'document_name' => 'Authenticated Proof of Eligibility',
                'description' => 'Authenticated Civil Service Commission (CSC) Eligibility or Professional Regulation Commission (PRC) License showing that the LICENSE IS NOT EXPIRED.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'document_name' => 'Latest Performance Rating (DPCR/IPCR)',
                'description' => 'The latest Office/Division/Individual Performance Commitment and Review Form. For external applicants with no Performance Ratings, please upload a document specifying that Performance Rating is Not Applicable.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'document_name' => 'Certificate of Trainings, Special Orders, etc.',
                'description' => 'The Certificate of Trainings Attended must be arranged according to its presentation in the Personal Data Sheet (Page 3: Descending Order). The Special Orders must be arranged in descending order.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'document_name' => 'Certificate of Employment',
                'description' => 'Provide certificates from your current and previous employers.',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);

        // Create job_listings table
        Schema::create('job_listings', function (Blueprint $table) {
            $table->id('job_listing_id');
            $table->unsignedBigInteger('position_id')->nullable();
            $table->unsignedBigInteger('batch_id')->nullable();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('closing_date')->nullable();
            $table->string('status')->nullable();
            $table->string('place_assigned')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();

            $table->foreign('position_id')->references('position_id')->on('positions')->onDelete('cascade');
            $table->foreign('batch_id')->references('batch_id')->on('job_listing_batches')->onDelete('set null');
            $table->foreign('created_by')->references('user_id')->on('users')->onDelete('set null');
            // Adding Index
            $table->index('status');
            $table->index('position_id');
            $table->index('batch_id');
            $table->index('created_at');
        });

        // Create pivot table for job_listings and required_documents
        Schema::create('job_listing_required_documents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_listing_id');
            $table->unsignedBigInteger('required_document_id');
            $table->timestamps();

            $table->foreign('job_listing_id')->references('job_listing_id')->on('job_listings')->onDelete('cascade');
            $table->foreign('required_document_id')->references('required_document_id')->on('required_documents')->onDelete('cascade');
        });

        // Seed a sample job batch
        $batchId = DB::table('job_listing_batches')->insertGetId([
            'batch_name' => 'First Batch',
            'batch_code' => '2025-01-PL',
            'post_date' => '2025-05-22',
            'deadline' => '2025-05-31',
            'status' => 'Active',
            'is_plantilla' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Seed a sample job listing with batch_id
        DB::table('job_listings')->insert([
            [
                'position_id'  => 1, // Mathematics Teacher
                'batch_id'     => $batchId,
                'title'        => 'Mathematics Teacher Position',
                'description'  => 'Join our academic team to teach mathematics subjects for high school students.',
                'closing_date' => '2025-05-31',
                'status'       => 'Active',
                'created_by'   => 2, // hr user
                'place_assigned' => 'Valencia City',
                'created_at'   => now(),
                'updated_at'   => now(),
            ]
        ]);

        // Seed a non-plantilla job batch
        $nonPlantillaBatchId = DB::table('job_listing_batches')->insertGetId([
            'batch_name' => 'Contract of Service Batch',
            'batch_code' => '2025-01-COS',
            'post_date' => '2025-05-22',
            'deadline' => '2025-06-30',
            'status' => 'Active',
            'is_plantilla' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Seed non-plantilla job listings
        DB::table('job_listings')->insert([
            [
                'position_id'  => 2, // Administrative Assistant (CoS)
                'batch_id'     => $nonPlantillaBatchId,
                'title'        => 'Contract of Service - Administrative Assistant',
                'description'  => 'Temporary position for administrative support. Contract duration: 6 months with possible extension.',
                'closing_date' => '2025-06-30',
                'status'       => 'Active',
                'created_by'   => 2, // hr user
                'place_assigned' => 'Malaybalay City',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'position_id'  => 2, // Administrative Assistant (CoS)
                'batch_id'     => $nonPlantillaBatchId,
                'title'        => 'Job Order - Administrative Support',
                'description'  => 'Short-term administrative support position. Duration: 3 months with possible renewal.',
                'closing_date' => '2025-06-30',
                'status'       => 'Active',
                'created_by'   => 2, // hr user
                'place_assigned' => 'CMU',
                'created_at'   => now(),
                'updated_at'   => now(),
            ]
        ]);

        // Get all job listing IDs
        $plantillaJobListingIds = DB::table('job_listings')
            ->where('batch_id', $batchId)
            ->pluck('job_listing_id')
            ->toArray();

        $nonPlantillaJobListingIds = DB::table('job_listings')
            ->where('batch_id', $nonPlantillaBatchId)
            ->pluck('job_listing_id')
            ->toArray();

        // Get required document IDs
        $documentIds = DB::table('required_documents')->pluck('required_document_id')->toArray();

        // Attach all required documents to plantilla job listings
        foreach ($plantillaJobListingIds as $jobListingId) {
            foreach ($documentIds as $documentId) {
                DB::table('job_listing_required_documents')->insert([
                    'job_listing_id' => $jobListingId,
                    'required_document_id' => $documentId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // Attach required documents to non-plantilla job listings (subset of documents)
        $nonPlantillaDocumentIds = [1, 2, 3, 7, 8]; // Letter of Intent, PDS, WES, Certificate of Trainings, Certificate of Employment
        foreach ($nonPlantillaJobListingIds as $jobListingId) {
            foreach ($nonPlantillaDocumentIds as $documentId) {
                DB::table('job_listing_required_documents')->insert([
                    'job_listing_id' => $jobListingId,
                    'required_document_id' => $documentId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        Schema::create('applications', function (Blueprint $table) {
            $table->id('application_id');
            $table->unsignedBigInteger('job_listing_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();

            $table->foreign('job_listing_id')->references('job_listing_id')->on('job_listings')->onDelete('cascade');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });

        Schema::create('selection_lineups', function (Blueprint $table) {
            $table->id('selection_id');
            $table->unsignedBigInteger('application_id')->nullable();
            $table->string('name')->nullable(); // Full name (concatenated from user_details)
            $table->text('education')->nullable(); // Education details
            $table->text('training')->nullable(); // Training details
            $table->text('experience')->nullable(); // Work experience details
            $table->string('eligibility')->nullable(); // Eligibility details
            $table->timestamps();

            // Foreign key to applications table
            $table->foreign('application_id')->references('application_id')->on('applications')->onDelete('cascade');

            // Indexes for performance
            $table->index('application_id');
        });

        Schema::create('applicant_documents', function (Blueprint $table) {
            $table->id('document_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('application_id')->nullable();
            $table->string('document_name')->nullable();
            $table->string('document_type')->nullable();
            $table->string('file_path')->nullable();
            $table->boolean('is_verified')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('application_id')->references('application_id')->on('applications')->onDelete('cascade');
        });

        Schema::create('application_status_history', function (Blueprint $table) {
            $table->id('history_id');
            $table->unsignedBigInteger('application_id')->nullable();
            $table->string('previous_status')->nullable();
            $table->string('new_status')->nullable();
            $table->string('remarks')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();

            $table->foreign('application_id')->references('application_id')->on('applications')->onDelete('cascade');
            $table->foreign('updated_by')->references('user_id')->on('users')->onDelete('set null');
        });

        Schema::create('group_schedules', function (Blueprint $table) {
            $table->id('group_id');
            $table->string('name');
            $table->text('notes')->nullable();
            $table->unsignedBigInteger('job_listing_id');
            $table->unsignedBigInteger('created_by');
            $table->string('status')->default('Active'); // Active, Scheduled, Completed
            $table->timestamps();

            $table->foreign('job_listing_id')->references('job_listing_id')->on('job_listings')->onDelete('cascade');
            $table->foreign('created_by')->references('user_id')->on('users')->onDelete('cascade');
        });

        Schema::create('schedules', function (Blueprint $table) {
            $table->id('schedule_id');
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('schedule_date')->nullable();
            $table->string('location')->nullable();
            $table->string('status')->nullable();
            $table->text('notes')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('group_id')->nullable();
            $table->timestamps();

            $table->foreign('created_by')->references('user_id')->on('users')->onDelete('set null');
            $table->foreign('group_id')->references('group_id')->on('group_schedules')->onDelete('set null');
        });

        Schema::create('schedule_participants', function (Blueprint $table) {
            $table->id('participant_id');
            $table->unsignedBigInteger('schedule_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('application_id')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();

            $table->foreign('schedule_id')->references('schedule_id')->on('schedules')->onDelete('cascade');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('application_id')->references('application_id')->on('applications')->onDelete('cascade');
        });

        Schema::create('notifications', function (Blueprint $table) {
            $table->id('notification_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('type')->nullable();
            $table->string('message')->nullable();
            $table->boolean('is_read')->nullable();
            $table->json('data')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });

        Schema::create('group_schedule_members', function (Blueprint $table) {
            $table->id('member_id');
            $table->unsignedBigInteger('group_id');
            $table->unsignedBigInteger('application_id');
            $table->timestamps();

            $table->foreign('group_id')->references('group_id')->on('group_schedules')->onDelete('cascade');
            $table->foreign('application_id')->references('application_id')->on('applications')->onDelete('cascade');
        });

        //Indexes

        Schema::table('applications', function (Blueprint $table) {
            $table->index('user_id'); // For user's applications
            $table->index('job_listing_id'); // For job's applications
            $table->index('status'); // For status filtering
            $table->index(['job_listing_id', 'status']); // For combined filtering
        });

        Schema::create('temporary_files', function (Blueprint $table) {
            $table->id();
            $table->string('hash')->unique();
            $table->string('filename');
            $table->string('path');
            $table->unsignedBigInteger('size');
            $table->timestamps();
        });

        Schema::create('jobs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('queue')->index();
            $table->longText('payload');
            $table->unsignedTinyInteger('attempts');
            $table->unsignedInteger('reserved_at')->nullable();
            $table->unsignedInteger('available_at');
            $table->unsignedInteger('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('schedule_participants');
        Schema::dropIfExists('schedules');
        Schema::dropIfExists('application_status_history');
        Schema::dropIfExists('applicant_documents');
        Schema::dropIfExists('applications');
        Schema::dropIfExists('job_listings');
        Schema::dropIfExists('job_listing_batches');
        Schema::dropIfExists('positions');
        Schema::dropIfExists('salary_grades');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('user_details');
        Schema::dropIfExists('users');
        Schema::dropIfExists('test');
        Schema::dropIfExists('minimum_requirements');
        Schema::dropIfExists('work_experiences');
        Schema::dropIfExists('trainings');
        Schema::dropIfExists('educational_backgrounds');
        Schema::dropIfExists('group_schedule_members');
        Schema::dropIfExists('group_schedules');
        Schema::dropIfExists('temporary_files');
    }
};
