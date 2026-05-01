import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, ShieldCheck, UserCheck, Bot } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // --- STATE UNTUK POP-UP VERIFIKASI ---
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    // 1. Tahan submit asli, munculkan pop-up
    const handlePreSubmit = (e) => {
        e.preventDefault();
        
        // Jika sudah pernah verifikasi, langsung submit saja
        if (isVerified) {
            submitForm();
        } else {
            setSliderValue(0);
            setShowCaptcha(true);
        }
    };

    // 2. Fungsi submit asli ke server
    const submitForm = () => {
        post(route('register'));
    };

    // 3. Logika Slider Bergeser
    const handleSliderChange = (e) => {
        const val = parseInt(e.target.value);
        setSliderValue(val);
        
        // Jika sudah mentok ke kanan (100)
        if (val >= 100) {
            setIsVerified(true);
            setTimeout(() => {
                setShowCaptcha(false);
                submitForm(); // Langsung proses register setelah sukses
            }, 500); // Beri jeda 0.5 detik agar user bisa melihat status "Terverifikasi!"
        }
    };

    // 4. Efek Membal (Snap back) jika dilepas sebelum 100%
    const handleSliderRelease = () => {
        if (sliderValue < 100) {
            setSliderValue(0);
        }
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Buat Akun Baru</h2>
                <p className="text-gray-500 text-sm font-medium">Mulai kelola agrikultur Anda secara digital.</p>
            </div>

            <form onSubmit={handlePreSubmit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="text-gray-700 font-bold" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl py-2.5"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-gray-700 font-bold" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl py-2.5"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-bold" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl py-2.5"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" className="text-gray-700 font-bold" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl py-2.5"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-between pt-4">
                    <Link
                        href={route('login')}
                        className="text-sm font-bold text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                        Sudah punya akun?
                    </Link>

                    <button 
                        type="submit" 
                        disabled={processing}
                        className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all hover:shadow-lg disabled:opacity-50"
                    >
                        Daftar Sekarang <ArrowRight size={16} />
                    </button>
                </div>
            </form>

            {/* --- MODAL POP-UP VERIFIKASI ROBOT --- */}
            {showCaptcha && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
                    {/* Background Gelap Blurry */}
                    <div 
                        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
                        onClick={() => setShowCaptcha(false)}
                    ></div>
                    
                    {/* Kotak Modal */}
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm z-10 overflow-hidden flex flex-col relative border border-gray-100 p-8 text-center animate-scale-in">
                        
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            {isVerified ? (
                                <UserCheck size={36} className="text-emerald-500" />
                            ) : (
                                <Bot size={36} className="text-gray-400" />
                            )}
                        </div>

                        <h3 className="text-2xl font-black text-gray-900 mb-2">
                            {isVerified ? "Terverifikasi!" : "Verifikasi Keamanan"}
                        </h3>
                        <p className="text-gray-500 text-sm font-medium mb-8">
                            {isVerified ? "Memproses pendaftaran Anda..." : "Buktikan Anda bukan robot dengan menggeser tombol di bawah ini."}
                        </p>

                        {/* WIDGET SLIDER VERIFIKASI */}
                        <div className="relative w-full h-14 bg-gray-100 rounded-full overflow-hidden flex items-center shadow-inner border border-gray-200">
                            
                            {/* Background Hijau yang mengisi saat digeser */}
                            <div 
                                className={`absolute top-0 left-0 h-full ${sliderValue >= 100 ? 'bg-emerald-500' : 'bg-emerald-400'} transition-all duration-75`} 
                                style={{ width: `${sliderValue}%` }}
                            ></div>
                            
                            {/* Teks Instruksi di tengah */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className={`text-sm font-bold transition-colors duration-200 ${sliderValue > 50 ? 'text-white' : 'text-gray-400'}`}>
                                    {sliderValue >= 100 ? 'Selesai!' : 'Geser ke kanan  →'}
                                </span>
                            </div>

                            {/* Input Range Transparan (Yang sebenarnya dikontrol User) */}
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={sliderValue} 
                                onChange={handleSliderChange}
                                onMouseUp={handleSliderRelease}
                                onTouchEnd={handleSliderRelease}
                                disabled={isVerified}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing z-20"
                            />
                            
                            {/* Tombol Bulat yang ikut bergeser */}
                            <div 
                                className="absolute h-12 w-12 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-75 pointer-events-none z-10 border border-gray-100"
                                style={{ 
                                    left: `${sliderValue}%`, 
                                    transform: `translateX(-${sliderValue}%)`,
                                    marginLeft: sliderValue === 0 ? '4px' : sliderValue === 100 ? '-4px' : '0px'
                                }}
                            >
                                {sliderValue >= 100 ? (
                                    <ShieldCheck className="text-emerald-500" size={20} />
                                ) : (
                                    <ArrowRight className="text-gray-400" size={20} />
                                )}
                            </div>
                        </div>

                        <button 
                            onClick={() => setShowCaptcha(false)}
                            className="mt-6 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            )}
        </GuestLayout>
    );
}