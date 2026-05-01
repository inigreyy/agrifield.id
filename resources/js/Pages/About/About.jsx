import { Head, Link } from '@inertiajs/react';
import { 
    Sprout, 
    Users, 
    ShieldCheck, 
    Globe, 
    ArrowLeft,
    Leaf,
    Target,
    Zap
} from 'lucide-react';

export default function About() {
    return (
        <>
            <Head title="Tentang Kami - Agrifield" />
            
            {/* Animasi Internal */}
            <style>{`
                @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .glass-card { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.5); }
                .bg-dots { background-image: radial-gradient(rgba(16, 185, 129, 0.1) 1.5px, transparent 1.5px); background-size: 30px 30px; }
            `}</style>

            <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-dots z-0"></div>
                
                {/* --- NAVIGATION --- */}
                <nav className="relative z-50 p-6 max-w-7xl mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 font-bold text-gray-500 hover:text-emerald-600 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                            <ArrowLeft size={18} />
                        </div>
                        Kembali ke Beranda
                    </Link>
                </nav>

                <main className="relative z-10 pt-12 pb-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        
                        {/* --- HERO SECTION --- */}
                        <div className="text-center max-w-3xl mx-auto mb-24 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-8">
                                <Leaf size={14} /> Mengenal Lebih Dekat
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-8">
                                Kami Membawa Masa Depan ke <span className="text-emerald-500">Lahan Anda.</span>
                            </h1>
                            <p className="text-xl text-gray-500 font-medium leading-relaxed">
                                Agrifield lahir dari visi untuk menjembatani kesenjangan antara teknologi digital mutakhir dengan kearifan lokal dunia pertanian dan peternakan.
                            </p>
                        </div>

                        {/* --- VISION & MISSION GRID --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                            <div className="glass-card p-12 rounded-[3rem] border-white shadow-xl shadow-emerald-900/5 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                                <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-200">
                                    <Target size={32} />
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 mb-6">Misi Kami</h3>
                                <p className="text-gray-500 font-medium leading-relaxed text-lg">
                                    Memberdayakan produsen pangan dengan alat analisis data yang mudah digunakan, guna meningkatkan efisiensi operasional dan profitabilitas secara berkelanjutan di seluruh penjuru Indonesia.
                                </p>
                            </div>

                            <div className="glass-card p-12 rounded-[3rem] border-white shadow-xl shadow-blue-900/5 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                                <div className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-200">
                                    <Globe size={32} />
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 mb-6">Visi 2030</h3>
                                <p className="text-gray-500 font-medium leading-relaxed text-lg">
                                    Menjadi ekosistem agrikultur digital nomor satu yang menghubungkan teknologi, data, dan komunitas untuk menciptakan ketahanan pangan yang cerdas dan mandiri.
                                </p>
                            </div>
                        </div>

                        {/* --- CORE VALUES --- */}
                        <div className="mb-32">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-black text-gray-900">Nilai-Nilai Utama</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                <div className="text-center group">
                                    <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:-translate-y-2 transition-transform duration-500">
                                        <ShieldCheck size={36} className="text-emerald-500" />
                                    </div>
                                    <h4 className="text-xl font-black text-gray-900 mb-4">Integritas Data</h4>
                                    <p className="text-gray-500 font-medium leading-relaxed">
                                        Keamanan dan akurasi data Anda adalah prioritas tertinggi dalam sistem kami.
                                    </p>
                                </div>

                                <div className="text-center group">
                                    <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:-translate-y-2 transition-transform duration-500">
                                        <Zap size={36} className="text-orange-500" />
                                    </div>
                                    <h4 className="text-xl font-black text-gray-900 mb-4">Inovasi Konstan</h4>
                                    <p className="text-gray-500 font-medium leading-relaxed">
                                        Kami terus memperbarui fitur berdasarkan kebutuhan nyata para pelaku di lapangan.
                                    </p>
                                </div>

                                <div className="text-center group">
                                    <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:-translate-y-2 transition-transform duration-500">
                                        <Users size={36} className="text-blue-500" />
                                    </div>
                                    <h4 className="text-xl font-black text-gray-900 mb-4">Kolaborasi Tim</h4>
                                    <p className="text-gray-500 font-medium leading-relaxed">
                                        Kami percaya bahwa teknologi terbaik adalah teknologi yang mendekatkan manusia.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* --- CTA SECTION --- */}
                        <div className="relative rounded-[4rem] overflow-hidden bg-gray-900 p-12 md:p-24 text-center">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 blur-[100px] rounded-full"></div>
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full"></div>
                            
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Siap Bergabung dengan Komunitas Kami?</h2>
                                <p className="text-gray-400 text-lg font-medium mb-12">
                                    Daftar sekarang dan rasakan kemudahan mengelola aset agrikultur Anda dalam genggaman.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/register" className="bg-emerald-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20">
                                        Mulai Perjalanan Anda
                                    </Link>
                                    <Link href="/" className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all border border-white/10">
                                        Pelajari Fitur
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>

                <footer className="py-12 text-center text-gray-400 font-medium text-sm">
                    © 2026 Agrifield System. Bagian dari Masa Depan Pangan Dunia.
                </footer>
            </div>
        </>
    );
}