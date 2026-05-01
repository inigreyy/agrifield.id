<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class suplier extends Model
{
    protected $table = 'supliers';

    protected $fillable = ['kode_suplier','nama_suplier','alamat_suplier','no_telp_suplier'];
}