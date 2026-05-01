<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

// Controllers
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CycleController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\PopupController; 
use App\Http\Controllers\UserController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\Admin\AdminProfileController;


// Models
use App\Models\User;
use App\Models\Announcement;
use App\Models\Article;
use App\Models\Transaction;
use App\Models\Popup;

// ==========================================
// 1. AREA PUBLIK
// ==========================================
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'announcement' => Popup::where('is_active', true)->latest()->first(),
        'articles' => Article::latest()->take(3)->get(), 
        'popup' => Popup::where('is_active', true)->latest()->first(),
    ]);
});

Route::get('/about', function () { return Inertia::render('About'); })->name('about');
Route::get('/contact', function () { return Inertia::render('Contact'); })->name('contact');

Route::post('/contact', function (Request $request) {
    return back()->with('success', 'Pesan Anda berhasil dikirim!');
})->name('contact.send');

Route::get('/articles/{id}', function ($id) {
    return Inertia::render('Article/Show', [
        'article' => Article::findOrFail($id),
        'recentArticles' => Article::where('id', '!=', $id)->latest()->take(5)->get(),
    ]);
})->name('articles.show');

Route::get('/articles', function () {
    return Inertia::render('Article/Index', [
        'articles' => Article::latest()->get()
    ]);
})->name('articles.index');


// ==========================================
// 2. AREA RAHASIA ADMIN (Guard: admin)
// ==========================================
Route::middleware('guest')->group(function () {
    Route::get('/admin/login', function () { return inertia('Admin/Login'); })->name('admin.login');
    Route::post('/admin/login', [AuthController::class, 'authenticate'])->name('admin.login.post');
});

Route::middleware(['auth:admin'])->prefix('admin')->name('admin.')->group(function () {
    
    Route::get('/dashboard', function () {
        $announcement = Announcement::firstOrCreate(['id' => 1], [
            'title' => 'Selamat Datang', 
            'content' => 'Sistem pencatatan digital', 
            'is_active' => false
        ]);
        return inertia('Admin/Dashboard', [
            'announcement' => $announcement,
            'articles' => Article::latest()->get()
        ]);
    })->name('dashboard');

    Route::resource('articles', ArticleController::class);
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/popups', [PopupController::class, 'index'])->name('popups.index');
    Route::post('/popups', [PopupController::class, 'store'])->name('popups.store');
    Route::post('/popups/{id}', [PopupController::class, 'update'])->name('popups.update');
    Route::delete('/popups/{id}', [PopupController::class, 'destroy'])->name('popups.destroy');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/profile', function () {
        return inertia('Admin/Profile/Edit'); // Kita akan buat file ini
    })->name('profile.edit');
    
    Route::patch('/profile', [AdminProfileController::class, 'update'])->name('profile.update');
});


// ==========================================
// 3. AREA PENGGUNA (USER) (Guard: web)
// ==========================================
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/siklus', [CycleController::class, 'index'])->name('siklus.index');
    Route::get('/siklus/create', [CycleController::class, 'create'])->name('siklus.create');
    Route::post('/siklus', [CycleController::class, 'store'])->name('siklus.store');
    Route::delete('/siklus/{id}', [CycleController::class, 'destroy'])->name('siklus.destroy');

    Route::post('/siklus/{id}/transaksi', [CycleController::class, 'storeTransaction']);
    Route::delete('/transaksi/{id}', function ($id) {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();
        return redirect()->back();
    })->name('transaksi.destroy');

    Route::get('/laporan', function () {
        $userId = auth()->id();
        $transactions = Transaction::whereHas('cycle', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->with('cycle:id,name,type')->orderBy('date', 'desc')->get();

        return Inertia::render('Laporan/Index', [
            'transactions' => $transactions
        ]);
    })->name('laporan.index');
});

require __DIR__ . '/auth.php';