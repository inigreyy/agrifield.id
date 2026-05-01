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
    Schema::table('articles', function (Blueprint $table) {
        // Menambahkan kolom img_url setelah kolom content (atau di mana saja)
        $table->string('img_url')->nullable()->after('content');
    });
}

public function down(): void
{
    Schema::table('articles', function (Blueprint $table) {
        // Menghapus kolom jika migration di-rollback
        $table->dropColumn('img_url');
    });
}
};
