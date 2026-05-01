<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\models\suplier;

class SuplierController extends Controller
{
    public function index()
    {
        $supliers = suplier::all();
        return view ('supliers/index',compact('supliers')); 
    }
    public function create()
    {
        return view('supliers.create');
    }

    public function store(Request $request)
    {
        $suplier = new Suplier();
        $suplier -> kode_suplier = request('kode_suplier');
        $suplier -> nama_suplier = request('nama_suplier');
        $suplier -> alamat_suplier = request('alamat_suplier');
        $suplier -> no_telp_suplier = request('no_telp_suplier');
        
        $suplier -> save();
        return redirect('supliers');
    }

    public function edit($id)
    {
        $suplier = Suplier::findOrFail($id);
        return view('supliers.edit', compact('suplier'));
    }
    public function destroy($id)
    {
        $suplier = Suplier::findOrFail($id);
        $suplier->delete();

        return redirect()->route('supliers.index')->with('success', 'Data berhasil dihapus');
    }
    public function update(Request $request, $id)
    {
        $request->validate([
           'kode_suplier' => 'required',
           'nama_suplier' => 'required',
           'alamat_suplier' => 'required',
           'no_telp_suplier' => 'required',
    ]);

         $suplier = Suplier::findOrFail($id);
         $suplier->update($request->all());

    return redirect()->route('supliers.index')->with('success', 'Data berhasil diperbarui');
}



}