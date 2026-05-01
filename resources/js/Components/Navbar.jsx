import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Sprout, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
    const { auth } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Deteksi scroll untuk efek transisi navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <style>{`
                @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
                @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
                
                .animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-float { animation: float 6s ease-in-out infinite; }
                
                .glass-capsule { 
                    background: rgba(255, 255, 255, 0.85); 
                    backdrop-filter: blur(16px); 
                    border: 1px solid rgba(255, 255, 255, 0.5); 
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05); 
                }
                .bg-dots { 
                    background-image: radial-gradient(rgba(16, 185, 129, 0.15) 1.5px, transparent 1.5px); 
                    background-size: 24px 24px; 
                }
            `}</style>

            {/* --- DEKORASI BACKGROUND --- */}
            <div className="absolute inset-0 bg-dots z-0 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white via-white/80 to-transparent z-0 pointer-events-none"></div>

            {/* --- NAVBAR KAPSUL --- */}
            {/* px-7 memastikan kapsul tidak mepet ke pinggir layar di Mobile */}
            <nav className={`fixed left-0 right-0 z-50 px-7 transition-all duration-500 ${scrolled ? 'top-4' : 'top-6'}`}>
                
                {/* max-w-4xl membuat navbar desktop lebih ramping & elegan */}
                <div className={`max-w-4xl mx-auto glass-capsule rounded-full px-6 flex items-center justify-between relative z-50 transition-all duration-500 ${scrolled ? 'h-14' : 'h-16'}`}>
                    
                    {/* Logo */}
                    <Link 
                        href="/" 
                        className="flex items-center gap-2 group cursor-pointer"
                    >
                        <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-2 rounded-full shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                            <Sprout size={scrolled ? 18 : 20} className="text-white transition-all" />
                        </div>
                        <span className="text-lg font-black tracking-tight text-gray-900 whitespace-nowrap">
                            Agrifield<span className="text-emerald-500">.</span>
                        </span>
                    </Link>

                    {/* Menu Desktop */}
                    <div className="hidden lg:flex items-center gap-8 font-bold text-sm text-gray-500">
                        <a href="/#features" className="hover:text-emerald-600 transition-colors">Fitur</a>
                        <Link href={route('about')} className={`${route().current('about') ? 'text-emerald-600' : 'hover:text-emerald-600'} transition-colors`}>Tentang</Link>
                        <Link href={route('contact')} className={`${route().current('contact') ? 'text-emerald-600' : 'hover:text-emerald-600'} transition-colors`}>Kontak</Link>
                        <Link href={route('articles.index')} className={`${route().current('articles.*') ? 'text-emerald-600' : 'hover:text-emerald-600'} transition-colors`}>Berita</Link>
                    </div>

                    {/* Auth & Hamburger */}
                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex items-center gap-4">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="group flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full font-bold text-xs hover:bg-emerald-600 transition-all shadow-lg shadow-gray-200">
                                    Dashboard <ArrowRight size={14} />
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-gray-600 font-bold text-xs hover:text-emerald-600 transition-colors px-3">Log in</Link>
                                    <Link href={route('register')} className="bg-gray-900 text-white px-5 py-2.5 rounded-full font-bold text-xs hover:bg-emerald-500 transition-all shadow-lg shadow-gray-200">Mulai Gratis</Link>
                                </>
                            )}
                        </div>
                        
                        {/* Mobile Toggle */}
                        <button 
                            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100/50 rounded-full transition-colors" 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-3 mx-auto max-w-[calc(100vw-3.5rem)] glass-capsule rounded-3xl p-5 flex flex-col gap-2 shadow-2xl animate-fade-in-up border border-white/60">
                        <a href="/#features" className="font-bold text-gray-600 p-3 text-sm hover:bg-emerald-50 rounded-2xl transition-colors" onClick={() => setIsMenuOpen(false)}>Fitur</a>
                        <Link href={route('about')} className="font-bold text-gray-600 p-3 text-sm hover:bg-emerald-50 rounded-2xl transition-colors">Tentang</Link>
                        <Link href={route('contact')} className="font-bold text-gray-600 p-3 text-sm hover:bg-emerald-50 rounded-2xl transition-colors">Kontak</Link>
                        <Link href={route('articles.index')} className="font-bold text-gray-600 p-3 text-sm hover:bg-emerald-50 rounded-2xl transition-colors">Berita</Link>
                        
                        <div className="border-t border-gray-100 mt-2 pt-4 flex flex-col gap-3">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="w-full text-center bg-gray-900 text-white py-3.5 rounded-2xl font-bold text-xs">Dashboard</Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="w-full text-center text-gray-600 py-3.5 font-bold text-xs border border-gray-100 rounded-2xl">Log in</Link>
                                    <Link href={route('register')} className="w-full text-center bg-emerald-600 text-white py-3.5 rounded-2xl font-bold text-xs shadow-lg shadow-emerald-200">Mulai Gratis</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}