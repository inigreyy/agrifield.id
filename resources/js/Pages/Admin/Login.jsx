import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { ShieldAlert, Key, Mail } from 'lucide-react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 selection:bg-emerald-500">
            <Head title="Secure Admin Portal" />
            
            <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl shadow-2xl p-8 animate-fade-in-up">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-neutral-800 rounded-2xl border border-neutral-700 flex items-center justify-center mb-4">
                        <ShieldAlert size={32} className="text-emerald-500" />
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-widest uppercase">Admin Portal</h1>
                    <p className="text-neutral-500 text-sm font-medium mt-1">Sistem Keamanan Tingkat Tinggi</p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    {errors.email && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm font-bold text-center animate-pulse">
                            {errors.email}
                        </div>
                    )}

                    <div>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-3.5 text-neutral-500" />
                            <input 
                                type="email" 
                                placeholder="Admin Email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-neutral-950 border border-neutral-800 text-white rounded-xl focus:border-emerald-500 focus:ring-emerald-500 placeholder-neutral-600 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="relative">
                            <Key size={18} className="absolute left-4 top-3.5 text-neutral-500" />
                            <input 
                                type="password" 
                                placeholder="Master Password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-neutral-950 border border-neutral-800 text-white rounded-xl focus:border-emerald-500 focus:ring-emerald-500 placeholder-neutral-600 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50"
                    >
                        {processing ? 'AUTHENTICATING...' : 'SECURE LOGIN'}
                    </button>
                </form>
                
                <p className="text-center text-[10px] text-neutral-600 font-mono mt-8">IP LOGGED & TRACKED</p>
            </div>
        </div>
    );
}