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
            $table->string('email');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('role_name')->nullable();
            $table->boolean('profile_completed')->default(false);
            $table->rememberToken();
            $table->timestamps();
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
            $table->string('middle_initial')->nullable();
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
            'middle_initial' => 'H',
            'phone_number'   => '0912345678',
            'eligibility'    => null,
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
            $table->float('amount', 53, 2)->nullable();
            $table->integer('years_experience')->nullable();
            $table->timestamps();
        });

        DB::table('salary_grades')->insert([
            ['amount' => 50000, 'years_experience' => 2],
            ['amount' => 70000, 'years_experience' => 5],
        ]);

        // Create positions table and seed data
        Schema::create('positions', function (Blueprint $table) {
            $table->id('position_id');
            $table->string('position_name')->nullable();
            $table->string('item_number')->nullable();
            $table->unsignedBigInteger('salary_grade_id')->nullable();
            $table->timestamps();

            $table->foreign('salary_grade_id')->references('salary_grade_id')->on('salary_grades')->onDelete('set null');
        });

        DB::table('positions')->insert([
            ['position_name' => 'UI/UX Designer', 'item_number' => 'DES-001', 'salary_grade_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['position_name' => 'Software Engineer', 'item_number' => 'ENG-001', 'salary_grade_id' => 2, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Create categories table and seed data
        Schema::create('categories', function (Blueprint $table) {
            $table->id('category_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();
        });

        DB::table('categories')->insert([
            ['name' => 'Design', 'description' => 'Design related jobs', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Engineering', 'description' => 'Engineering related jobs', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Create job_listings table
        Schema::create('job_listings', function (Blueprint $table) {
            $table->id('job_listing_id');
            $table->unsignedBigInteger('position_id')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->date('closing_date')->nullable();
            $table->string('status')->nullable();
            $table->bigInteger('applicant_limit');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();

            $table->foreign('position_id')->references('position_id')->on('positions')->onDelete('cascade');
            $table->foreign('created_by')->references('user_id')->on('users')->onDelete('set null');
            $table->foreign('category_id')->references('category_id')->on('categories')->onDelete('set null');
        });

        // Seed a sample job listing
        DB::table('job_listings')->insert([
            'position_id'     => 2, // Software Engineer
            'category_id'     => 2, // Engineering
            'title'           => 'Software Engineer Opportunity',
            'description'     => 'Join our dynamic team to build cutting-edge web applications.',
            'closing_date'    => '2025-04-30',
            'status'          => 'Draft',
            'applicant_limit' => 50,
            'created_by'      => 2, // hr user
            'created_at'      => now(),
            'updated_at'      => now(),
        ]);

        Schema::create('minimum_requirements', function (Blueprint $table) {
            $table->id('requirement_id');
            $table->unsignedBigInteger('job_listing_id')->nullable();
            $table->string('requirement_type'); // e.g., 'training', 'experience', 'education', 'certification'
            $table->string('title');
            $table->text('description')->nullable();
            $table->boolean('is_required')->default(true);
            $table->timestamps();

            $table->foreign('job_listing_id')->references('job_listing_id')->on('job_listings')->onDelete('cascade');
        });

        // Add minimum requirements for the job listing
        $jobListingId = DB::table('job_listings')->where('title', 'Software Engineer Opportunity')->value('job_listing_id');
        DB::table('minimum_requirements')->insert([
            [
                'job_listing_id' => $jobListingId,
                'requirement_type' => 'experience',
                'title' => '2+ years of software development experience',
                'description' => 'Candidates should have at least 2 years of experience in software development.',
                'is_required' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
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

        Schema::create('application_groups', function (Blueprint $table) {
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
            $table->foreign('group_id')->references('group_id')->on('application_groups')->onDelete('set null');
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

        Schema::create('application_group_members', function (Blueprint $table) {
            $table->id('member_id');
            $table->unsignedBigInteger('group_id');
            $table->unsignedBigInteger('application_id');
            $table->timestamps();

            $table->foreign('group_id')->references('group_id')->on('application_groups')->onDelete('cascade');
            $table->foreign('application_id')->references('application_id')->on('applications')->onDelete('cascade');
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
        Schema::dropIfExists('categories');
        Schema::dropIfExists('work_experiences');
        Schema::dropIfExists('trainings');
        Schema::dropIfExists('educational_backgrounds');
        Schema::dropIfExists('application_group_members');
        Schema::dropIfExists('application_groups');
    }
};
