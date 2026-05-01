<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    protected $table = 'barangs'; // nama tabel sesuai database
    protected $fillable = ['kode_barang', 'nama_barang', 'harga', 'stok'];
}

