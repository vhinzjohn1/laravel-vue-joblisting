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
            $table->string('username')->nullable();
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
                'email' => 'applicant@gmail.com',
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
            $table->date('start_date');
            $table->date('end_date')->nullable();
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
                'eligibility' => 'RA 1080 (Board/Bar/Court)',
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

        // Create job_listings table
        Schema::create('job_listings', function (Blueprint $table) {
            $table->id('job_listing_id');
            $table->unsignedBigInteger('position_id')->nullable();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->date('closing_date')->nullable();
            $table->string('status')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();

            $table->foreign('position_id')->references('position_id')->on('positions')->onDelete('cascade');
            $table->foreign('created_by')->references('user_id')->on('users')->onDelete('set null');

            // Adding Index
            $table->index('status');
            $table->index('position_id');
            $table->index('created_at');
        });

        // Seed a sample job listing
        DB::table('job_listings')->insert([
            [
                'position_id'  => 1, // Mathematics Teacher
                'title'        => 'Mathematics Teacher Position',
                'description'  => 'Join our academic team to teach mathematics subjects for high school students.',
                'closing_date' => '2025-04-30',
                'status'       => 'Active',
                'created_by'   => 2, // hr user
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'position_id'  => 2, // Administrative Assistant
                'title'        => 'Administrative Assistant Position',
                'description'  => 'Support administrative operations with document handling, correspondence and scheduling.',
                'closing_date' => '2025-05-15',
                'status'       => 'Active',
                'created_by'   => 2, // hr user
                'created_at'   => now(),
                'updated_at'   => now(),
            ]
        ]);


        Schema::create('applications', function (Blueprint $table) {
            $table->id('application_id');
            $table->unsignedBigInteger('job_listing_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();

            $table->foreign('job_listing_id')->references('job_listing_id')->on('job_listings')->onDelete('cascade');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
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
            $table->timestamp('schedule_date')->nullable();
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
    }
};
