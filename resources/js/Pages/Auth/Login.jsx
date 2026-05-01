import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* --- HEADER FORM --- */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Selamat Datang Kembali</h2>
                <p className="text-gray-500 text-sm font-medium">Masuk untuk melanjutkan ke dashboard Anda.</p>
            </div>

            {status && <div className="mb-4 font-medium text-sm text-emerald-600 text-center">{status}</div>}

            <form onSubmit={submit} className="space-y-5">
                
                {/* --- INPUT EMAIL --- */}
                <div>
                    <InputLabel htmlFor="email" value="Email Akses" className="text-gray-700 font-bold" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl py-2.5"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* --- INPUT PASSWORD --- */}
                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi" className="text-gray-700 font-bold" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl py-2.5"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* --- CHECKBOX INGAT SAYA --- */}
                <div className="flex items-center mt-2">
                    <label className="flex items-center cursor-pointer group">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded bg-gray-50 border-gray-300 text-emerald-500 shadow-sm focus:ring-emerald-500 focus:ring-offset-white w-5 h-5 cursor-pointer"
                        />
                        <span className="ml-3 text-sm text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                            Ingat kredensial saya
                        </span>
                    </label>
                </div>

                {/* --- FOOTER FORM (LINK LUPA SANDI & TOMBOL SUBMIT) --- */}
                <div className="flex items-center justify-between pt-4">
                    <div className="flex flex-col gap-1">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-bold text-gray-500 hover:text-emerald-600 transition-colors"
                            >
                                Lupa Sandi?
                            </Link>
                        )}
                        <Link
                            href={route('register')}
                            className="text-xs font-bold text-emerald-600 hover:text-emerald-500 transition-colors"
                        >
                            Daftar Akun Baru
                        </Link>
                    </div>

                    <button 
                        type="submit" 
                        disabled={processing}
                        className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all hover:shadow-lg disabled:opacity-50"
                    >
                        Masuk Sistem <ArrowRight size={16} />
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}