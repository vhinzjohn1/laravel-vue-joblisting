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

        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id'); // Change primary key name
            $table->string('username')->nullable();
            $table->string('password');
            $table->string('email');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('role_name')->nullable();
            $table->rememberToken(); // Keep this for "remember me" functionality
            $table->timestamps();
        });

        // Dummy seeder for users with 1 record
        DB::table('users')->insert([
            'username' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123'),
            'role_name' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Schema::create('user_details', function (Blueprint $table) {
            $table->id('detail_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->string('middle_initial')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('education_attainment')->nullable();
            $table->string('eligibility')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });

        Schema::create('salary_grades', function (Blueprint $table) {
            $table->id('salary_grade_id');
            $table->float('amount', 53, 2)->nullable();
            $table->integer('years_experience')->nullable();
            $table->timestamp('updated_at')->nullable();
        });

        // Seed data for salary_grades
        DB::table('salary_grades')->insert([
            ['amount' => 50000, 'years_experience' => 2, 'updated_at' => now()],
            ['amount' => 70000, 'years_experience' => 5, 'updated_at' => now()],
        ]);

        Schema::create('positions', function (Blueprint $table) {
            $table->id('position_id');
            $table->string('position_name')->nullable();
            $table->string('item_number')->nullable();
            $table->unsignedBigInteger('salary_grade_id')->nullable();
            $table->timestamps();

            $table->foreign('salary_grade_id')->references('salary_grade_id')->on('salary_grades')->onDelete('set null');
        });

        // Seed data for positions
        DB::table('positions')->insert([
            ['position_name' => 'UI/UX Designer', 'item_number' => 'DES-001', 'salary_grade_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['position_name' => 'Software Engineer', 'item_number' => 'ENG-001', 'salary_grade_id' => 2, 'created_at' => now(), 'updated_at' => now()],
        ]);

        Schema::create('categories', function (Blueprint $table) {
            $table->id('category_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();
        });

        // Seed data for categories
        DB::table('categories')->insert([
            ['name' => 'Design', 'description' => 'Design related jobs', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Engineering', 'description' => 'Engineering related jobs', 'created_at' => now(), 'updated_at' => now()],
        ]);

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
            $table->timestamp('uploaded_at')->nullable();

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
            $table->timestamp('updated_at')->nullable();

            $table->foreign('application_id')->references('application_id')->on('applications')->onDelete('cascade');
            $table->foreign('updated_by')->references('user_id')->on('users')->onDelete('set null');
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
            $table->timestamps();

            $table->foreign('created_by')->references('user_id')->on('users')->onDelete('set null');
        });

        Schema::create('schedule_participants', function (Blueprint $table) {
            $table->id('participant_id');
            $table->unsignedBigInteger('schedule_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('application_id')->nullable();
            $table->string('status')->nullable();
            $table->timestamp('created_at')->nullable();

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
            $table->timestamp('created_at')->nullable();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
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
    }
};
