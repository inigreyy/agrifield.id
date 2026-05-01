import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Sprout, ArrowRight, Calendar, ChevronRight, Menu, X } from 'lucide-react';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

export default function Index({ auth, articles }) {
    // State untuk navbar mobile
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    return (
        <>
            <Head title="Berita & Artikel" />
              <Navbar />
            <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-emerald-500 selection:text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-dots z-0"></div>

                

                {/* --- KONTEN HALAMAN --- */}
                <main className="relative z-10 pt-40 pb-20 px-6 max-w-6xl mx-auto animate-fade-in-up">
                    <div className="text-center mb-16">
                        <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm">Update Terbaru</span>
                        <h1 className="text-5xl font-black text-gray-900 mt-4 mb-6">Berita & Artikel</h1>
                        <p className="text-gray-500 text-lg">Informasi terkini seputar dunia pertanian modern.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles && articles.length > 0 ? (
                            articles.map((article) => (
                                <div key={article.id} className="glass-card p-6 rounded-[2rem] flex flex-col hover:border-emerald-200 transition-all duration-300">
                                    <div className="w-full aspect-video rounded-[1.5rem] overflow-hidden mb-6 bg-gray-100">
                                        <img src={article.img_url} alt={article.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 mb-3 uppercase tracking-wider">
                                            <Calendar size={12} /> {formatDate(article.created_at)}
                                        </div>
                                        <h2 className="text-xl font-black text-gray-900 mb-3 leading-tight line-clamp-2">
                                            {article.title}
                                        </h2>
                                        <p className="text-gray-500 text-sm line-clamp-3 mb-6">
                                            {article.content}
                                        </p>
                                    </div>
                                    <Link
                                        href={route('articles.show', article.id)}
                                        className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all"
                                    >
                                        Baca Selengkapnya <ChevronRight size={14} />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-400">
                                Belum ada artikel tersedia.
                            </div>
                        )}
                    </div>
                </main>

                < Footer />
            </div>
        </>
    );
}