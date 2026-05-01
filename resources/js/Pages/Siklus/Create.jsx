import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Sprout, Bird, Calendar, FileText } from 'lucide-react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'Pertanian',
        start_date: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/siklus', {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Siklus" />

            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
                
                {/* Bagian Judul & Tombol Kembali */}
                <div className="flex items-center space-x-4 mb-8">
                    <Link href="/siklus" className="p-2.5 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Tambah Siklus Baru</h2>
                        <p className="text-gray-500 text-sm font-medium mt-1">Buat siklus penanaman atau peternakan baru untuk dipantau.</p>
                    </div>
                </div>

                {/* Card Form */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                    <form onSubmit={submit} className="space-y-6">
                        
                        {/* Input Nama Siklus */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                <FileText size={16} className="text-gray-400"/> Nama Siklus
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Contoh: Padi Musim Hujan 2026 / Ayam Broiler Batch 1"
                                className="w-full border-gray-300 focus:border-gray-900 focus:ring-gray-900 rounded-xl shadow-sm py-2.5 transition-colors"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                        </div>

                        {/* Input Jenis Siklus */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Kegiatan</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${data.type === 'Pertanian' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                    <input 
                                        type="radio" 
                                        name="type" 
                                        value="Pertanian" 
                                        checked={data.type === 'Pertanian'} 
                                        onChange={(e) => setData('type', e.target.value)} 
                                        className="hidden" 
                                    />
                                    <div className={`p-2 rounded-lg ${data.type === 'Pertanian' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                                        <Sprout size={24} />
                                    </div>
                                    <div className={`ml-3 font-bold ${data.type === 'Pertanian' ? 'text-emerald-700' : 'text-gray-600'}`}>Pertanian</div>
                                </label>

                                <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${data.type === 'Peternakan' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                    <input 
                                        type="radio" 
                                        name="type" 
                                        value="Peternakan" 
                                        checked={data.type === 'Peternakan'} 
                                        onChange={(e) => setData('type', e.target.value)} 
                                        className="hidden" 
                                    />
                                    <div className={`p-2 rounded-lg ${data.type === 'Peternakan' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
                                        <Bird size={24} />
                                    </div>
                                    <div className={`ml-3 font-bold ${data.type === 'Peternakan' ? 'text-orange-700' : 'text-gray-600'}`}>Peternakan</div>
                                </label>
                            </div>
                        </div>

                        {/* Input Tanggal Mulai */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                <Calendar size={16} className="text-gray-400"/> Tanggal Mulai
                            </label>
                            <input
                                type="date"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                className="w-full border-gray-300 focus:border-gray-900 focus:ring-gray-900 rounded-xl shadow-sm py-2.5 transition-colors"
                            />
                            {errors.start_date && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.start_date}</p>}
                        </div>

                        {/* Tombol Simpan */}
                        <div className="pt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center space-x-2 bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                            >
                                <Save size={20} />
                                <span>{processing ? 'Menyimpan...' : 'Simpan Siklus Baru'}</span>
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}