import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Sprout, ArrowRight, Menu, X, Calendar,
    TrendingUp, BarChart3, Smartphone, Target,
    TrendingDown, Leaf, Zap, Info
} from 'lucide-react';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

export default function Welcome({ auth, announcement, articles = [], popup }) {
    const [showPopup, setShowPopup] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Gabungkan data popup agar lebih fleksibel
    const activePopup = popup || announcement;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- LOGIC TIPS PRO: ONE-TIME POPUP WITH EXPIRY ---
    useEffect(() => {
        if (activePopup?.is_active) {
            const STORAGE_KEY = `agrifield_popup_${activePopup.id || 'general'}`;
            const lastShown = localStorage.getItem(STORAGE_KEY);
            const now = new Date().getTime();
            
            // Atur durasi (Contoh: 24 jam dalam milidetik)
            const EXPIRY_TIME = 24 * 60 * 60 * 1000;

            // Jika belum pernah muncul ATAU sudah melewati masa kadaluarsa
            if (!lastShown || (now - parseInt(lastShown) > EXPIRY_TIME)) {
                const timer = setTimeout(() => {
                    setShowPopup(true);
                }, 1200);
                return () => clearTimeout(timer);
            }
        }
    }, [activePopup]);

    const closePopup = () => {
        if (activePopup) {
            const STORAGE_KEY = `agrifield_popup_${activePopup.id || 'general'}`;
            // Simpan timestamp saat ini ke localStorage
            localStorage.setItem(STORAGE_KEY, new Date().getTime().toString());
        }
        setShowPopup(false);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <>
            <Head title="Welcome to Agrifield" />
            <Navbar />
            <style>{`
                @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
                @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
                @keyframes float-reverse { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(15px); } }
                @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
                @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
                
                .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-float-delayed { animation: float-reverse 7s ease-in-out infinite 1s; }
                .animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
                
                .glass-capsule { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.5); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05); }
                .glass-card { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.6); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03); }
                .bg-dots { background-image: radial-gradient(rgba(16, 185, 129, 0.15) 1.5px, transparent 1.5px); background-size: 24px 24px; }
                html { scroll-behavior: smooth; }

                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }
            `}</style>

            <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-emerald-500 selection:text-white overflow-hidden relative flex flex-col">
                {/* --- BACKGROUND DECORATION --- */}
                <div className="absolute inset-0 bg-dots z-0"></div>
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white via-white/80 to-transparent z-0"></div>
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-emerald-400/20 blur-[120px] z-0 animate-float"></div>

                <div className="flex-1">
                    {/* --- HERO SECTION CENTERED COMPACT --- */}
                    <main className="relative z-10 pt-32 pb-16 px-6 lg:pt-44 max-w-7xl mx-auto overflow-hidden">
                        <div className="relative flex flex-col items-center text-center">

                            {/* Kolom Teks - Center Aligned */}
                            <div className="relative z-20 max-w-3xl">
                                {/* Badge Mini */}
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-[10px] mb-8 uppercase tracking-widest shadow-sm">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    Digital Agriculture 2026
                                </div>

                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[1.05] mb-6">
                                    Kuasai Masa Depan <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                                        Agrobisnis
                                    </span> Anda.
                                </h1>

                                <p className="text-base md:text-xl text-gray-500 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                                    Ubah data menjadi profit. Pantau ekosistem pertanian & peternakan secara real-time dengan teknologi presisi.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
                                        href={route('register')}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-base transition-all hover:bg-emerald-600 active:scale-95 shadow-xl shadow-emerald-900/10"
                                    >
                                        Mulai Gratis
                                    </Link>
                                    <a
                                        href="#features"
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-900 px-10 py-4 rounded-2xl font-black text-base border border-gray-200 hover:bg-gray-50 active:scale-95"
                                    >
                                        Fitur <ArrowRight size={18} />
                                    </a>
                                </div>
                            </div>

                            {/* Floating Stats Cards - Kanan & Kiri (Hanya muncul di Desktop) */}
                            <div className="hidden lg:block absolute inset-0 pointer-events-none">

                                {/* Card Statistik Kiri - Profit */}
                                <div className="absolute top-1/4 -left-4 xl:left-0 glass-card p-4 rounded-2xl flex items-center gap-4 animate-float shadow-2xl border-white/50 w-[220px]">
                                    <div className="bg-emerald-500 text-white p-2 rounded-xl">
                                        <TrendingUp size={18} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[8px] font-black text-emerald-600 uppercase tracking-wider">Profit</p>
                                        <p className="font-black text-gray-900 text-sm">+ Rp 12.4M</p>
                                    </div>
                                </div>

                                {/* Card Statistik Kanan - Expense */}
                                <div className="absolute bottom-1/3 -right-4 xl:right-0 glass-card p-4 rounded-2xl flex items-center gap-4 animate-float-delayed shadow-2xl border-white/50 w-[220px]">
                                    <div className="bg-rose-500 text-white p-2 rounded-xl">
                                        <TrendingDown size={18} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[8px] font-black text-rose-600 uppercase tracking-wider">Expense</p>
                                        <p className="font-black text-gray-900 text-sm">- Rp 3.2M</p>
                                    </div>
                                </div>
                            </div>

                            {/* Ambient Decorative Background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-100/20 rounded-full blur-[120px] -z-10"></div>
                        </div>
                    </main>

                    {/* --- FEATURE SECTION (COMPACT & SHARP) --- */}
                    <section id="features" className="py-20 relative z-10 overflow-hidden bg-white">
                        <div className="max-w-7xl mx-auto px-6">

                            {/* Header Section - Dibuat Lebih Rapat */}
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
                                <div className="max-w-2xl">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
                                        <Zap size={14} fill="currentColor" /> Keunggulan Utama
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter leading-tight">
                                        Ekosistem Cerdas untuk <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                                            Pertumbuhan Bisnis Anda.
                                        </span>
                                    </h2>
                                </div>
                                <div className="lg:max-w-xs">
                                    <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed border-l-2 border-emerald-500 pl-5">
                                        Dirancang untuk presisi. Pantau setiap rupiah dan perkembangan komoditas dalam satu dashboard terpadu.
                                    </p>
                                </div>
                            </div>

                            {/* Grid Fitur - Gap dan Padding Dioptimasi */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                                {/* Soft Ambient Glow */}
                                <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-400/5 blur-[100px] rounded-full -z-10"></div>
                                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-400/5 blur-[100px] rounded-full -z-10"></div>

                                {/* Card 1 */}
                                <div className="glass-card group p-8 rounded-[2rem] border-white/60 hover:border-blue-200 transition-all duration-500 hover:shadow-xl relative overflow-hidden">
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                            <BarChart3 className="text-blue-500" size={24} strokeWidth={2.5} />
                                        </div>
                                        <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Analitik Finansial</h3>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                            Visualisasi arus kas otomatis untuk keputusan strategis berdasarkan data profitabilitas real-time.
                                        </p>
                                    </div>
                                </div>

                                {/* Card 2 - Featured Style */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-[2rem] blur opacity-10 group-hover:opacity-25 transition duration-500"></div>
                                    <div className="relative bg-white p-8 rounded-[2rem] border border-emerald-100 shadow-lg shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-500 h-full">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
                                            <Target className="text-white" size={24} strokeWidth={2.5} />
                                        </div>
                                        <h3 className="text-xl font-black text-gray-900 mb-3">Siklus Terstruktur</h3>
                                        <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">
                                            Manajemen batch produksi yang rapi. Pantau performa komoditas tanpa risiko data tumpang tindih.
                                        </p>
                                        <span className="inline-block bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg font-bold text-[9px] uppercase tracking-wider">
                                            Populer 2026
                                        </span>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="glass-card group p-8 rounded-[2rem] border-white/60 hover:border-purple-200 transition-all duration-500 hover:shadow-xl relative overflow-hidden">
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-100 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                                            <Smartphone className="text-purple-500" size={24} strokeWidth={2.5} />
                                        </div>
                                        <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Mobilitas Tinggi</h3>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                            Akses penuh dari mana pun. Sinkronisasi instan antara pekerja lapangan dan pemilik bisnis.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- SECTION ARTIKEL & BERITA (COMPACT PREMIUM) --- */}
                    {articles.length > 0 && (
                        <section id="artikel" className="py-20 bg-white relative z-10 overflow-hidden">
                            {/* Background Decorative Text - Diperkecil agar tidak mengganggu flow */}
                            <div className="absolute top-0 right-0 text-[12rem] font-black text-gray-50 select-none leading-none -translate-y-1/3 translate-x-1/4 z-0">
                                NEWS
                            </div>

                            <div className="max-w-7xl mx-auto px-6 relative z-10">
                                {/* Header Section - Lebih Rapat (mb-12) */}
                                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                                    <div className="max-w-xl">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-black text-[10px] mb-4 uppercase tracking-[0.2em]">
                                            <Leaf size={14} /> Wawasan Agrikultur
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-tight">
                                            Kabar Terbaru & <br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Inovasi Desa</span>
                                        </h2>
                                    </div>

                                    <div className="hidden md:block">
                                        <Link
                                            href={route('articles.index')}
                                            className="group flex items-center gap-3 p-1.5 pr-5 rounded-full border border-gray-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                                                <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-900">Lihat Semua</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Grid - Gap Diperkecil */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {articles.map((art, index) => (
                                        <article
                                            key={art.id}
                                            className="group flex flex-col h-full bg-gray-50/30 rounded-[2rem] border border-gray-100 hover:border-transparent transition-all duration-500 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] relative overflow-hidden"
                                        >
                                            {/* Image Container - Tinggi dikurangi (h-52) & Margin dihilangkan */}
                                            <div className="relative h-52 overflow-hidden rounded-t-[2rem] bg-gray-100">
                                                {art.img_url ? (
                                                    <img
                                                        src={art.img_url}
                                                        alt={art.title}
                                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-200">
                                                        <Sprout size={48} strokeWidth={1.5} />
                                                    </div>
                                                )}

                                                {/* Overlay Sederhana */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-900 shadow-sm">
                                                        {index === 0 ? 'Terhangat' : 'Update'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content - Padding jauh lebih rapat (p-6) */}
                                            <div className="p-6 flex flex-col flex-1">
                                                <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold mb-3 uppercase tracking-wider">
                                                    <span className="flex items-center gap-1 text-emerald-600">
                                                        <Calendar size={12} /> {formatDate(art.created_at)}
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                    <span>5 Menit</span>
                                                </div>

                                                <h3 className="text-xl font-black text-gray-900 mb-3 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2">
                                                    {art.title}
                                                </h3>

                                                <p className="text-gray-500 font-medium leading-relaxed mb-6 line-clamp-2 text-sm">
                                                    {art.content}
                                                </p>

                                                <div className="mt-auto pt-4 border-t border-gray-100">
                                                    <Link
                                                        href={route('articles.show', art.id)}
                                                        className="flex items-center justify-between group/link"
                                                    >
                                                        <span className="font-black text-[11px] text-gray-900 uppercase tracking-widest">Baca Selengkapnya</span>
                                                        <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-400 flex items-center justify-center group-hover/link:bg-emerald-500 group-hover/link:text-white transition-all">
                                                            <ArrowRight size={14} />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                {/* Mobile Button - Lebih Ringkas */}
                                <div className="mt-10 md:hidden">
                                    <Link href={route('articles.index')} className="flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white text-sm font-black rounded-xl active:scale-95 transition-transform">
                                        Semua Berita <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* --- CTA BANNER (COMPACT & BOLD) --- */}
                    <section className="py-16 px-6 relative z-10 overflow-hidden">
                        <div className="max-w-5xl mx-auto relative group">
                            {/* Decorative Background Glow - Opacity dikurangi agar lebih clean */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[2rem] blur opacity-10 group-hover:opacity-25 transition duration-700"></div>

                            <div className="relative bg-gray-900 rounded-[2rem] p-8 md:p-14 overflow-hidden shadow-2xl">
                                {/* Animated Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 via-teal-900/90 to-gray-900 opacity-90"></div>

                                {/* Abstract Decorative Elements - Skala diperkecil */}
                                <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[60px]"></div>
                                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-48 h-48 bg-teal-500/10 rounded-full blur-[40px]"></div>

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Badge Mini */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-emerald-300 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        Waktunya Bertransformasi
                                    </div>

                                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight">
                                        Siap Mengubah Cara <br className="hidden md:block" />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                                            Anda Bertani?
                                        </span>
                                    </h2>

                                    <p className="text-emerald-100/70 font-medium text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                                        Bergabunglah dengan ratusan petani modern yang telah mendigitalkan ekosistem mereka bersama <span className="text-white font-bold">Agrifield</span>.
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        <Link
                                            href={route('register')}
                                            className="w-full sm:w-auto group/btn relative inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-black text-base transition-all hover:bg-emerald-50 active:scale-95 shadow-lg"
                                        >
                                            Mulai Gratis
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>

                                        <Link
                                            href="#features"
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white hover:bg-white/5 transition-all border border-white/10 backdrop-blur-sm text-sm"
                                        >
                                            Pelajari Fitur
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <Footer />
            </div>

            {/* --- ANNOUNCEMENT MODAL (COMPACT VERSION) --- */}
            {showPopup && announcement && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Background Overlay - Sedikit lebih gelap agar fokus ke popup kecil */}
                    <div className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm animate-fade-in" onClick={closePopup}></div>

                    {/* Modal Content - Diubah ke max-w-md (lebih ramping) */}
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md z-10 overflow-hidden animate-scale-in flex flex-col relative border border-white/50">

                        {/* Close Button - Ukuran disesuaikan */}
                        <button onClick={closePopup} className="absolute top-5 right-5 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full z-20 backdrop-blur-md transition-all hover:rotate-90">
                            <X size={18} />
                        </button>

                        {/* Header Image - Tinggi dikurangi dari h-64 ke h-48 */}
                        <div className="h-48 relative shrink-0">
                            {announcement.image_url ? (
                                <img src={announcement.image_url} alt="Announcement" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center">
                                    <Info size={40} className="text-white/40" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/10 to-transparent"></div>

                            <div className="absolute bottom-6 left-7 right-7">
                                <span className="px-2.5 py-1 bg-emerald-500 text-white text-[9px] font-black rounded-lg uppercase tracking-[0.15em] mb-2 inline-block shadow-lg shadow-emerald-500/20">
                                    Update Baru
                                </span>
                                {/* Ukuran Font Judul diturunkan ke text-2xl */}
                                <h2 className="text-2xl font-black text-white leading-tight drop-shadow-md">
                                    {announcement.title}
                                </h2>
                            </div>
                        </div>

                        {/* Body Text - Padding dikurangi dari p-10 ke p-8 */}
                        <div className="p-8">
                            {/* Teks lebih rapi dengan text-sm/base */}
                            <div className="text-gray-600 text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap max-h-[20vh] overflow-y-auto pr-2 custom-scrollbar mb-7 font-medium">
                                {announcement.message || "Pesan tidak ditemukan di database."}
                            </div>

                            {/* Button lebih ringkas */}
                            <button
                                onClick={closePopup}
                                className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-gray-900/10 active:scale-[0.98]"
                            >
                                Mengerti & Lanjutkan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}