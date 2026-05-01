import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Trash2, Edit2, AlertTriangle, Plus } from 'lucide-react';

export default function Index({ articles }) {
    const [confirmDelete, setConfirmDelete] = useState(null);

    const handleDelete = () => {
        if (confirmDelete) {
            router.delete(route('admin.articles.destroy', confirmDelete.id), {
                onFinish: () => setConfirmDelete(null),
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Daftar Artikel" />
            
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-900">Daftar Artikel</h1>
                    <p className="text-gray-500 text-sm">Kelola konten berita dan artikel Anda.</p>
                </div>
                <Link 
                    href={route('admin.articles.create')} 
                    className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
                >
                    <Plus size={20} /> Tambah Artikel
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-5 font-bold text-gray-600 text-sm">Gambar</th>
                            <th className="p-5 font-bold text-gray-600 text-sm">Judul Artikel</th>
                            <th className="p-5 font-bold text-gray-600 text-sm text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {articles.map((article) => (
                            <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4">
                                    <img 
                                        src={article.img_url} 
                                        alt={article.title} 
                                        className="w-16 h-16 object-cover rounded-xl shadow-sm"
                                        onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                                    />
                                </td>
                                <td className="p-4 font-semibold text-gray-800">{article.title}</td>
                                <td className="p-4 flex items-center justify-center gap-2">
                                    <Link 
                                        href={route('admin.articles.edit', article.id)}
                                        className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={18} />
                                    </Link>
                                    <button 
                                        onClick={() => setConfirmDelete(article)}
                                        className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                                        title="Hapus"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Konfirmasi dengan Animasi Fade */}
            {confirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Overlay background dengan fade */}
                    <div 
                        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
                        onClick={() => setConfirmDelete(null)}
                    ></div>

                    {/* Modal Card dengan efek scale dan fade */}
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl z-10 animate-in fade-in zoom-in duration-300 ease-out">
                        <div className="flex justify-center mb-4 text-red-500">
                            <AlertTriangle size={48} />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 text-center mb-2">Hapus Artikel?</h2>
                        <p className="text-gray-500 text-center mb-6 text-sm">
                            Apakah Anda yakin ingin menghapus artikel <b>"{confirmDelete.title}"</b>? Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setConfirmDelete(null)}
                                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
                            >
                                Batal
                            </button>
                            <button 
                                onClick={handleDelete}
                                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}