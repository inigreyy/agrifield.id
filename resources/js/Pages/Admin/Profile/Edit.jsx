import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, usePage, router } from '@inertiajs/react'; // Tambah router
import { Save, Lock, User as UserIcon, Camera } from 'lucide-react';
import { useState } from 'react';

export default function Edit() {
    const { auth } = usePage().props;
    const [preview, setPreview] = useState(auth.user.avatar ? `/storage/${auth.user.avatar}` : null);

    const { data, setData, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        avatar: null, // Field baru untuk file
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            setPreview(URL.createObjectURL(file)); // Buat preview sementara
        }
    };

    const submit = (e) => {
        e.preventDefault();
        
        // Gunakan router.post dengan _method patch agar bisa kirim file
        router.post(route('admin.profile.update'), {
            _method: 'patch',
            ...data
        }, {
            preserveScroll: true,
            onSuccess: () => {
                // Reset password fields saja, avatar tidak perlu direset
                setData((prevData) => ({
                    ...prevData,
                    current_password: '',
                    password: '',
                    password_confirmation: '',
                }));
            },
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900">Pengaturan Profil</h1>
                    <p className="text-gray-500 font-medium">Kelola informasi akun, foto profil, dan keamanan password Admin.</p>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <form onSubmit={submit} className="divide-y divide-gray-50">
                        
                        {/* Bagian Foto Profil */}
                        <div className="p-8 space-y-6">
                            <div className="flex items-center gap-2 text-emerald-600 mb-2">
                                <Camera size={20} />
                                <span className="font-bold uppercase tracking-wider text-xs">Foto Profil</span>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-3xl bg-gray-100 overflow-hidden border-4 border-white shadow-md ring-1 ring-gray-100">
                                        {preview ? (
                                            <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <UserIcon size={40} />
                                            </div>
                                        )}
                                    </div>
                                    <label className="absolute -bottom-2 -right-2 bg-emerald-600 p-2 rounded-xl text-white cursor-pointer shadow-lg hover:bg-gray-900 transition-colors">
                                        <Camera size={18} />
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            accept="image/*"
                                            onChange={handleImageChange} 
                                        />
                                    </label>
                                </div>
                                <div className="space-y-1 text-center md:text-left">
                                    <p className="text-sm font-bold text-gray-900">Unggah Foto Baru</p>
                                    <p className="text-xs text-gray-500 font-medium max-w-[250px]">
                                        Format JPG, PNG atau GIF. Maksimal ukuran file 2MB.
                                    </p>
                                    {errors.avatar && <p className="text-red-500 text-xs font-bold mt-1">{errors.avatar}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Bagian Informasi Umum */}
                        <div className="p-8 space-y-6 bg-white">
                            <div className="flex items-center gap-2 text-emerald-600 mb-2">
                                <UserIcon size={20} />
                                <span className="font-bold uppercase tracking-wider text-xs">Informasi Umum</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Nama Lengkap</label>
                                    <input 
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none font-medium"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Alamat Email</label>
                                    <input 
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none font-medium"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.email}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Bagian Keamanan */}
                        <div className="p-8 space-y-6 bg-gray-50/30">
                            <div className="flex items-center gap-2 text-emerald-600 mb-2">
                                <Lock size={20} />
                                <span className="font-bold uppercase tracking-wider text-xs">Keamanan Password</span>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Password Saat Ini</label>
                                <input 
                                    type="password"
                                    value={data.current_password}
                                    onChange={(e) => setData('current_password', e.target.value)}
                                    placeholder="Wajib diisi jika ingin mengubah data"
                                    className="w-full p-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none font-medium shadow-sm"
                                />
                                {errors.current_password && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.current_password}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Password Baru</label>
                                    <input 
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full p-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none font-medium shadow-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Konfirmasi Password Baru</label>
                                    <input 
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="w-full p-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none font-medium shadow-sm"
                                    />
                                </div>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.password}</p>}
                        </div>

                        {/* Footer Action */}
                        <div className="p-8 bg-white flex items-center justify-between">
                            <p className="text-xs text-gray-400 font-bold max-w-[200px]">Simpan perubahan untuk memperbarui identitas Admin Anda.</p>
                            <div className="flex items-center gap-4">
                                {recentlySuccessful && (
                                    <span className="text-emerald-600 font-black text-sm animate-pulse uppercase">Berhasil Diperbarui!</span>
                                )}
                                <button 
                                    disabled={processing}
                                    className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-lg shadow-gray-200 disabled:opacity-50"
                                >
                                    <Save size={18} /> Simpan Perubahan
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}