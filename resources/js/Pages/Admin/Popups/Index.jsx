import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Megaphone, CheckCircle2, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

export default function Index({ popup }) {
    // Inisialisasi form dengan data dari controller
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        title: popup?.title || '',
        message: popup?.message || '',
        is_active: popup?.is_active ?? false,
        image_url: popup?.image_url || '',
        _method: 'POST', // Gunakan POST untuk update di route ini
    });

    const submit = (e) => {
        e.preventDefault();
        
        // Kita gunakan route update. 
        // Jika popup belum ada (id kosong), pastikan controller menangani fallback-nya
        post(route('admin.popups.update', popup?.id || 1), {
            preserveScroll: true,
            onSuccess: () => {
                // Opsional: Logika setelah berhasil
            }
        });
    };

    return (
        <AdminLayout>
            <Head title="Pengaturan Popup" />

            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                        <Megaphone className="text-emerald-500" /> Pengaturan Popup
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">
                        Kelola pesan pengumuman dan gambar yang akan muncul di halaman depan website.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6 pb-20">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                        
                        {/* Status Switch */}
                        <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
                            <div>
                                <p className="font-bold text-gray-900">Status Popup</p>
                                <p className="text-xs text-gray-500 font-medium font-sans">Aktifkan untuk memunculkan popup ke pengunjung</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Sisi Kiri: Input Data */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Judul Popup</label>
                                    <input 
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className={`w-full p-4 bg-gray-50 border ${errors.title ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none font-medium font-sans`}
                                        placeholder="Contoh: Info Pemeliharaan Sistem"
                                    />
                                    {errors.title && <p className="mt-1 text-xs text-red-500 font-bold">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <LinkIcon size={14} /> URL Gambar
                                    </label>
                                    <input 
                                        type="text"
                                        value={data.image_url}
                                        onChange={(e) => setData('image_url', e.target.value)}
                                        className={`w-full p-4 bg-gray-50 border ${errors.image_url ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none font-medium font-sans`}
                                        placeholder="https://link-gambar.com/foto.jpg"
                                    />
                                    <p className="mt-2 text-[10px] text-gray-400 font-medium italic">*Masukkan link gambar langsung (Direct Link)</p>
                                    {errors.image_url && <p className="mt-1 text-xs text-red-500 font-bold">{errors.image_url}</p>}
                                </div>
                            </div>

                            {/* Sisi Kanan: Preview Gambar */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Preview Gambar</label>
                                <div className="aspect-video w-full bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative">
                                    {data.image_url ? (
                                        <img 
                                            src={data.image_url} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = 'https://placehold.co/600x400?text=Link+Gambar+Salah';
                                            }}
                                        />
                                    ) : (
                                        <div className="text-center p-6 text-gray-400">
                                            <ImageIcon className="mx-auto mb-2 opacity-20" size={48} />
                                            <p className="text-xs font-bold uppercase tracking-wider">Belum ada gambar</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Input Message */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Pesan / Konten Berita</label>
                            <textarea 
                                rows="4"
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className={`w-full p-4 bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none font-medium font-sans`}
                                placeholder="Tuliskan detail pengumuman di sini..."
                            ></textarea>
                            {errors.message && <p className="mt-1 text-xs text-red-500 font-bold">{errors.message}</p>}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="flex items-center gap-3 bg-gray-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-xl shadow-gray-900/10 disabled:opacity-50 group"
                        >
                            <Save size={18} className="group-hover:scale-110 transition-transform" /> 
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>

                        {recentlySuccessful && (
                            <div className="flex items-center gap-2 text-emerald-600 font-bold animate-bounce">
                                <CheckCircle2 size={18} /> Berhasil diperbarui!
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}