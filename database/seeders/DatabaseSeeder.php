<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Cycle;

class DatabaseSeeder extends Seeder
{
    // database/seeders/DatabaseSeeder.php

public function run(): void
{
    // Bagian 1: Bikin User (Ini yang bikin kamu bisa login)
    $admin = \App\Models\User::updateOrCreate(
        ['email' => 'admin@agrifield.id'],
        [
            'name' => 'Admin Luminare',
            'password' => 'admin123', // Tanpa Hash::make karena ada 'hashed' di model
            'role' => 'admin',
        ]
    );

    // Bagian 2: Bikin Cycle (Biar dashboard gak error)
    \App\Models\Cycle::updateOrCreate(
        ['user_id' => $admin->id],
        [
            'name' => 'Siklus Tanam 2026',
            'type' => 'Pertanian',
            'start_date' => now(),
        ]
    );

    // Bagian 3: Panggil seeder lain
    $this->call([
        DashboardSeeder::class,
    ]);
}
}