<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('nip')->nullable()->after('email');
            $table->string('nik')->nullable()->after('nip');
            $table->text('alamat')->nullable()->after('nik');
            $table->string('no_hp')->nullable()->after('alamat');
            $table->string('divisi')->nullable()->after('no_hp');
            $table->enum('role', ['superadmin', 'admin', 'user'])->default('user')->after('divisi');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['nip', 'nik', 'alamat', 'no_hp', 'divisi', 'role']);
        });
    }
};