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
    Schema::create('harvests', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // Relasi ke petani
        $table->string('commodity'); // Cth: Padi, Jagung, Telur
        $table->decimal('quantity', 8, 2); // Jumlah (kg/ton)
        $table->decimal('estimated_income', 15, 2); // Estimasi pendapatan (Rp)
        $table->date('date'); // Tanggal panen
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('harvests');
    }
};
