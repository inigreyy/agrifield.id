<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Transaction;
use App\Models\Article;
use Illuminate\Support\Str;

class DashboardSeeder extends Seeder
{
    // database/seeders/DashboardSeeder.php

// database/seeders/DashboardSeeder.php

public function run()
{
    // Ambil Cycle pertama yang baru saja dibuat di DatabaseSeeder
    $cycle = \App\Models\Cycle::first();

    if (!$cycle) {
        return; // Jangan lanjut jika cycle tidak ada
    }

    for ($i = 1; $i <= 10; $i++) {
        \App\Models\Transaction::create([
            'cycle_id' => $cycle->id,
            'type' => collect(['Pemasukan', 'Pengeluaran'])->random(),
            'item_name' => collect(['Pupuk', 'Bibit', 'Hasil Panen'])->random(),
            'amount' => rand(100000, 2000000),
            'date' => now(),
            'payment_method' => 'Transfer',
        ]);
    }

        // 3. Buat Data Artikel
        Article::create([
            'title' => 'Cara Meningkatkan Hasil Panen di Lahan SMK',
            'content' => 'Isi artikel tentang pertanian modern...',
            'views' => 150,
            'created_at' => now(),
        ]);

        Article::create([
            'title' => 'Implementasi EduPayment untuk SPP Online',
            'content' => 'Tutorial menggunakan sistem pembayaran sekolah...',
            'views' => 85,
            'created_at' => now()->subDay(),
        ]);
    }
}