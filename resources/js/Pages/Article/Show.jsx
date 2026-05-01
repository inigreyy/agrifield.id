import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Calendar, Newspaper, ChevronRight, Sprout, Menu, X,
    ArrowRight, Clock, Share2, User, CheckCircle2, Bookmark,
    MessageCircle
} from 'lucide-react';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

export default function Show({ article, recentArticles = [] }) {
    const { auth } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isShared, setIsShared] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Navbar scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const readingTime = (content) => {
        if (!content) return "0 menit baca";
        const wordsPerMinute = 200;
        const noOfWords = content.split(/\s/g).length;
        const minutes = Math.ceil(noOfWords / wordsPerMinute);
        return `${minutes} menit baca`;
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setIsShared(true);
            setTimeout(() => setIsShared(false), 2000);
        } catch (err) {
            console.error('Gagal menyalin tautan: ', err);
        }
    };

    return (
        
        <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-emerald-500 selection:text-white">
            <Head title={article?.title || 'Artikel'} />

            <Navbar />
            
            {/* --- MAIN CONTENT --- */}
            <main className="max-w-6xl mx-auto px-6 pt-40 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    <div className="lg:col-span-8">
                        <article className="bg-white rounded-[2.5rem] article-shadow border border-gray-100 overflow-hidden animate-fade-in-up">
                            <div className="relative aspect-video bg-gray-100 group">
                                {article.img_url ? (
                                    <img src={article.img_url} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-200">
                                        <Sprout size={80} strokeWidth={1} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                                <button
                                    onClick={handleShare}
                                    className={`absolute top-6 right-6 p-4 rounded-full transition-all border backdrop-blur-md flex items-center gap-2 font-bold text-xs ${isShared ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-white/20 border-white/30 text-white hover:bg-white hover:text-gray-900'}`}
                                >
                                    {isShared ? <CheckCircle2 size={16} /> : <Share2 size={16} />}
                                    {isShared ? 'Tersalin' : 'Bagikan'}
                                </button>
                            </div>

                            <div className="p-8 md:p-14">
                                <header className="mb-10">
                                    <div className="flex flex-wrap items-center gap-3 mb-6">
                                        <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-tighter border border-emerald-100 flex items-center gap-2">
                                            <Calendar size={12} /> {formatDate(article.created_at)}
                                        </span>
                                        <span className="px-4 py-1.5 bg-gray-50 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-tighter border border-gray-100 flex items-center gap-2">
                                            <Clock size={12} /> {readingTime(article.content)}
                                        </span>
                                    </div>

                                    {/* Judul sekarang menggunakan teks tegak (menghapus italic) */}
                                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-8 tracking-tight">
                                        {article.title}
                                    </h1>

                                    <div className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg overflow-hidden font-bold">
                                                {auth.user?.name?.charAt(0) || 'A'}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1.5 text-sm font-black text-gray-900">
                                                    {auth.user?.name || 'Tim Redaksi'}
                                                    <CheckCircle2 size={14} className="text-blue-500" fill="currentColor" />
                                                </div>
                                                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Penulis Agrifield</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
                                                <Bookmark size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </header>

                                <div className="prose prose-lg prose-emerald max-w-none">
                                    <div className="whitespace-pre-wrap text-gray-600 leading-relaxed font-medium text-base md:text-lg">
                                        {article.content}
                                    </div>
                                </div>

                                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Bagikan:</span>
                                        <div className="flex gap-2">
                                            <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all">
                                                <MessageCircle size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <Link href={route('articles.index')} className="flex items-center gap-2 text-xs font-black text-emerald-600 hover:gap-4 transition-all">
                                        KEMBALI KE BERITA <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    </div>

                    <aside className="lg:col-span-4 space-y-8">
                        <div className="sticky top-32 space-y-8">
                            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                                <h3 className="font-black text-lg text-gray-900 mb-6 flex items-center gap-2">
                                    <Newspaper className="text-emerald-500" size={20} /> Terpopuler
                                </h3>
                                <div className="space-y-6">
                                    {recentArticles.slice(0, 4).map((item) => (
                                        <Link key={item.id} href={`/articles/${item.id}`} className="group flex gap-4 items-start">
                                            <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                                <img src={item.img_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-800 text-xs leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2 uppercase tracking-tight">
                                                    {item.title}
                                                </h4>
                                                <span className="text-[9px] font-bold text-gray-400 mt-2 block">{formatDate(item.created_at)}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-emerald-600 p-8 rounded-[2rem] text-white relative overflow-hidden group shadow-xl shadow-emerald-900/10">
                                <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700">
                                    <Sprout size={160} />
                                </div>
                                <h4 className="text-xl font-black mb-4 relative z-10 leading-tight">
                                    Tingkatkan Hasil <br />Panen Anda!
                                </h4>
                                <p className="text-emerald-100 text-xs mb-8 relative z-10 font-medium leading-relaxed opacity-80">
                                    Bergabunglah dengan komunitas petani digital untuk akses data dan fitur premium.
                                </p>
                                <Link
                                    href={auth.user ? route('dashboard') : route('register')}
                                    className="block text-center w-full bg-white text-emerald-700 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-50 transition-all relative z-10"
                                >
                                    {auth.user ? "Lihat Dashboard" : "Daftar Sekarang"}
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}