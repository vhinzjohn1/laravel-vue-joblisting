<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('test', function (Blueprint $table) {
            $table->id('test_id');
            $table->string('name');
            $table->string('status');
            $table->timestamps();
        });

        // Dummy seeder for test with 50 records, alternating between 'active' and 'disabled' status
        for ($i = 1; $i <= 100; $i++) {
            $status = $i % 2 == 0 ? 'disabled' : 'active';
            DB::table('test')->insert([
                'name' => 'Test ' . $i,
                'status' => $status,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Dummy seeder for users with 1 record
        DB::table('users')->insert([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('test');
    }
};
