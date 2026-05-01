import { useRef, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Camera, User, Mail, Briefcase, CheckCircle2 } from 'lucide-react';

export default function UpdateProfileInformation({ className = '' }) {
    const user = usePage().props.auth.user;
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(user.avatar ? `/storage/${user.avatar}` : null);

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        role: user.role || 'Petani Mandiri',
        avatar: null,
        _method: 'patch', // Penting untuk upload file di Laravel Inertia
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'));
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-xl font-black text-gray-900">Informasi Profil</h2>
                <p className="mt-1 text-sm text-gray-500 font-medium">Perbarui foto, nama, peran, dan alamat email Anda.</p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                {/* --- AREA FOTO PROFIL --- */}
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-emerald-100 flex items-center justify-center">
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-3xl font-black text-emerald-600">{user.name.charAt(0)}</span>
                            )}
                        </div>
                        <button 
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="absolute bottom-0 right-0 p-2 bg-gray-900 hover:bg-black text-white rounded-full shadow-md transition-transform transform hover:scale-110"
                        >
                            <Camera size={16} />
                        </button>
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900">Foto Profil</p>
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG, atau GIF maksimal 2MB.</p>
                        {errors.avatar && <p className="text-red-500 text-xs font-bold mt-2">{errors.avatar}</p>}
                    </div>
                </div>

                {/* --- INPUT NAMA --- */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                    <div className="relative">
                        <User size={18} className="absolute left-4 top-3.5 text-gray-400" />
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-gray-900 rounded-xl font-medium"
                        />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs font-bold mt-1.5">{errors.name}</p>}
                </div>

                {/* --- INPUT ROLE (PERAN) --- */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Peran (Role)</label>
                    <div className="relative">
                        <Briefcase size={18} className="absolute left-4 top-3.5 text-gray-400" />
                        <select
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-gray-900 rounded-xl font-medium appearance-none"
                        >
                            <option value="Petani Mandiri">Petani Mandiri</option>
                            <option value="Peternak">Peternak</option>
                            <option value="Pengepul">Pengepul</option>
                            <option value="Pemilik Lahan">Pemilik Lahan</option>
                            <option value="Investor">Investor Agribisnis</option>
                        </select>
                    </div>
                </div>

                {/* --- INPUT EMAIL --- */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                        <Mail size={18} className="absolute left-4 top-3.5 text-gray-400" />
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-gray-900 rounded-xl font-medium"
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs font-bold mt-1.5">{errors.email}</p>}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-md disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>

                    {recentlySuccessful && (
                        <p className="text-sm font-bold text-emerald-600 flex items-center gap-1 animate-fade-in-up">
                            <CheckCircle2 size={16} /> Berhasil disimpan.
                        </p>
                    )}
                </div>
            </form>
        </section>
    );
}