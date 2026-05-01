import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        img_url: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.articles.store'));
    };

    return (
        <AdminLayout>
            <Head title="Tambah Artikel" />
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-black mb-6">Tambah Artikel Baru</h1>
                
                <form onSubmit={submit} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Judul Artikel</label>
                        <input className="w-full rounded-2xl border-gray-200" value={data.title} onChange={e => setData('title', e.target.value)} />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">URL Gambar</label>
                        <input className="w-full rounded-2xl border-gray-200" placeholder="https://" value={data.img_url} onChange={e => setData('img_url', e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Konten</label>
                        <textarea rows="8" className="w-full rounded-2xl border-gray-200" value={data.content} onChange={e => setData('content', e.target.value)} />
                    </div>

                    <div className="flex gap-3">
                        <Link href={route('admin.articles.index')} className="px-6 py-3 rounded-2xl bg-gray-100 font-bold hover:bg-gray-200">Batal</Link>
                        <button disabled={processing} className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700">Simpan Artikel</button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}