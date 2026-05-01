import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function Edit({ article }) {
    // Inisialisasi form dengan data artikel dari database
    const { data, setData, put, errors, processing } = useForm({
        title: article.title || '',
        img_url: article.img_url || '',
        content: article.content || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Menggunakan put karena kita hanya mengirim data teks/URL (bukan file binary)
        put(route('admin.articles.update', article.id));
    };

    return (
        <AdminLayout>
            <Head title={`Edit Artikel - ${article.title}`} />

            <div className="max-w-4xl mx-auto">
                {/* Header Navigasi */}
                <div className="mb-8 flex items-center justify-between">
                    <Link 
                        href={route('admin.articles.index')} 
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-all font-medium"
                    >
                        <ArrowLeft size={20} /> Kembali ke Daftar
                    </Link>
                    <div className="text-right">
                        <h1 className="text-2xl font-black text-gray-900">Edit Artikel</h1>
                        <p className="text-sm text-gray-500">Perbarui informasi artikel Anda.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                        <div className="grid grid-cols-1 gap-6">
                            
                            {/* Input Judul */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Judul Artikel</label>
                                <input 
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="Masukkan judul artikel..."
                                    className={`w-full px-5 py-4 rounded-2xl border ${errors.title ? 'border-red-500' : 'border-gray-200'} focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all`}
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-2 ml-1">{errors.title}</p>}
                            </div>

                            {/* Input URL Gambar */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">URL Gambar Artikel</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                                        <ImageIcon size={20} />
                                    </div>
                                    <input 
                                        type="text"
                                        value={data.img_url}
                                        onChange={e => setData('img_url', e.target.value)}
                                        placeholder="https://example.com/gambar.jpg"
                                        className={`w-full pl-12 pr-5 py-4 rounded-2xl border ${errors.img_url ? 'border-red-500' : 'border-gray-200'} focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all`}
                                    />
                                </div>
                                {errors.img_url && <p className="text-red-500 text-xs mt-2 ml-1">{errors.img_url}</p>}
                                
                                {/* Preview Gambar Kecil */}
                                {data.img_url && !errors.img_url && (
                                    <div className="mt-4 flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                        <img src={data.img_url} alt="Preview" className="w-20 h-12 object-cover rounded-lg shadow-sm" onError={(e) => e.target.style.display='none'} />
                                        <span className="text-xs text-gray-500 font-medium">Preview gambar saat ini</span>
                                    </div>
                                )}
                            </div>

                            {/* Input Konten */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Isi Konten</label>
                                <textarea 
                                    rows="12"
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    placeholder="Tuliskan isi artikel lengkap di sini..."
                                    className={`w-full px-5 py-4 rounded-2xl border ${errors.content ? 'border-red-500' : 'border-gray-200'} focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all resize-none`}
                                ></textarea>
                                {errors.content && <p className="text-red-500 text-xs mt-2 ml-1">{errors.content}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Tombol Simpan */}
                    <div className="flex gap-4">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="flex-1 flex items-center justify-center gap-3 bg-gray-900 text-white py-5 rounded-[1.5rem] font-black hover:bg-emerald-600 transition-all shadow-xl shadow-gray-900/10 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <Save size={22} /> {processing ? 'Menyimpan Perubahan...' : 'Simpan Perubahan Artikel'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}