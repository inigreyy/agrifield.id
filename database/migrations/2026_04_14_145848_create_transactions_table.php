<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cycle_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['Pemasukan', 'Pengeluaran']);
            $table->string('item_name');
            $table->decimal('amount', 15, 2);
            $table->date('date');
            // --- TAMBAHAN KOLOM METODE PEMBAYARAN KITA ---
            $table->string('payment_method')->default('Tunai'); 
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};