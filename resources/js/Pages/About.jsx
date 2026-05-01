import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Sprout, ArrowRight, Target, Users, ShieldCheck, TrendingUp, CheckCircle2 } from 'lucide-react';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

export default function About({ auth }) {
    // 1. KONFIGURASI GAMBAR - Cukup ubah di sini
    const IMAGES = {
        hero: "https://cdn-uploads.gameblog.fr/img/news/701058_68ad639c46812.jpg",
        farmer: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=600&auto=format&fit=crop",
        team: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
        bgSection: "https://images.unsplash.com/photo-1536890999497-b03657738f72?q=80&w=1200&auto=format&fit=crop"
    };

    // 2. KONTEN NILAI INTI - Tambah atau hapus item di sini
    const CORE_VALUES = [
        { 
            icon: ShieldCheck, 
            title: "Keamanan Data", 
            desc: "Data Anda adalah aset paling berharga, kami melindunginya dengan standar tertinggi.",
            color: "text-emerald-500"
        },
        { 
            icon: TrendingUp, 
            title: "Pertumbuhan Maksimal", 
            desc: "Fokus kami adalah peningkatan efisiensi untuk hasil yang nyata dan terukur.",
            color: "text-blue-500"
        },
        { 
            icon: CheckCircle2, 
            title: "Kemudahan Akses", 
            desc: "Teknologi canggih namun dirancang agar mudah digunakan oleh siapa saja.",
            color: "text-orange-500"
        }
    ];

    return (
        <>
            <Head title="Tentang Agrifield" />
            <Navbar />

            {/* Global Styles */}
            <style>{`
                .animate-fade-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                .glass-card { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.5); }
            `}</style>

            <div className="min-h-screen bg-[#F8FAFC] selection:bg-emerald-500 selection:text-white relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(16,185,129,0.1)_1.5px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none"></div>

                <main className="relative z-10 pt-32 md:pt-40 pb-20 px-6 max-w-7xl mx-auto">
                    
                    {/* Hero Section */}
                    <section className="grid md:grid-cols-2 gap-12 items-center mb-24 animate-fade-up">
                        <div className="space-y-6">
                            <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm block">Tentang Agrifield</span>
                            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1]">
                                Inovasi Digital <br /> 
                                <span className="text-emerald-600 relative">
                                    Masa Depan
                                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-200/60" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" /></svg>
                                </span> Pertanian.
                            </h1>
                            <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
                                Menjembatani kesenjangan antara teknologi modern dan kebutuhan mendasar para petani Indonesia.
                            </p>
                        </div>
                        <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
                            <img src={IMAGES.hero} alt="Hero" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    </section>

                    {/* Story Section */}
                    <section className="glass-card p-8 md:p-16 rounded-[3rem] mb-24 grid md:grid-cols-5 gap-12 items-center">
                        <div className="md:col-span-3 space-y-6">
                            <h2 className="text-4xl font-black text-gray-900">Siapa Kami?</h2>
                            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                                <p>Agrifield lahir dari kesadaran bahwa sektor agrikultur memerlukan transformasi digital yang inklusif.</p>
                                <p>Kami menyediakan data, alat manajemen, dan konektivitas bagi komunitas petani di seluruh penjuru negeri.</p>
                            </div>
                        </div>
                        <div className="md:col-span-2 grid grid-cols-2 gap-4">
                            <img src={IMAGES.farmer} className="rounded-2xl shadow-lg aspect-square object-cover" alt="Petani" />
                            <img src={IMAGES.team} className="rounded-2xl shadow-lg aspect-square object-cover mt-8" alt="Team" />
                        </div>
                    </section>

                    {/* Vision Mission */}
                    <section className="relative rounded-[3rem] overflow-hidden mb-24 bg-emerald-900">
                        <img src={IMAGES.bgSection} className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Sawah" />
                        <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-16 bg-gradient-to-br from-emerald-950/80 to-transparent">
                            <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 space-y-4">
                                <Target className="text-emerald-400" size={40} />
                                <h3 className="text-2xl font-bold text-white">Visi Kami</h3>
                                <p className="text-emerald-50/80 leading-relaxed">Ekosistem digital agrikultur nomor satu di Indonesia yang meningkatkan ketahanan pangan.</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 space-y-4">
                                <Users className="text-blue-400" size={40} />
                                <h3 className="text-2xl font-bold text-white">Misi Kami</h3>
                                <p className="text-emerald-50/80 leading-relaxed">Memberikan akses data transparan dan solusi manajemen pertanian yang efisien.</p>
                            </div>
                        </div>
                    </section>

                    {/* Values Grid */}
                    <section>
                        <h2 className="text-3xl font-black text-gray-900 text-center mb-16">Nilai Inti Kami</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {CORE_VALUES.map((item, index) => (
                                <div key={index} className="glass-card p-10 rounded-[2.5rem] text-center hover:-translate-y-2 transition-all duration-300 group">
                                    <div className="w-20 h-20 bg-white shadow-inner rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:rotate-6 transition-transform">
                                        <item.icon size={36} className={item.color} />
                                    </div>
                                    <h4 className="font-bold text-xl mb-4">{item.title}</h4>
                                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </main>
                <Footer />
            </div>
        </>
    );
}