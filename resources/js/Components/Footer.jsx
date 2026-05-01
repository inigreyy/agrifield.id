import React from 'react';
import { Sprout, MessageCircle, Globe, Users, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 relative z-10">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Section */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-emerald-100 p-2 rounded-xl">
                                <Sprout size={24} className="text-emerald-600" />
                            </div>
                            <span className="font-black text-gray-900 text-2xl tracking-tight">
                                Agrifield<span className="text-emerald-500">.</span>
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            Platform manajemen modern yang meredefinisi cara peternak dan petani mencatat keuangan, melacak siklus, dan memantau bisnis agrikultur mereka di era digital.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                                <MessageCircle size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                                <Globe size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                                <Users size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Product Section */}
                    <div>
                        <h3 className="font-black text-gray-900 mb-6 uppercase tracking-wider text-sm">Produk</h3>
                        <ul className="space-y-4 text-sm font-medium text-gray-500">
                            <li><a href="#features" className="hover:text-emerald-600 transition-colors">Fitur Utama</a></li>
                            <li><a href="#about" className="hover:text-emerald-600 transition-colors">Tentang Kami</a></li>
                            <li><a href="#" className="hover:text-emerald-600 transition-colors">Manajemen Siklus</a></li>
                            <li><a href="#" className="hover:text-emerald-600 transition-colors">Laporan Keuangan</a></li>
                        </ul>
                    </div>

                    {/* Resources Section */}
                    <div>
                        <h3 className="font-black text-gray-900 mb-6 uppercase tracking-wider text-sm">Sumber Daya</h3>
                        <ul className="space-y-4 text-sm font-medium text-gray-500">
                            <li><a href="#artikel" className="hover:text-emerald-600 transition-colors">Blog Peternakan</a></li>
                            <li><a href="#" className="hover:text-emerald-600 transition-colors">Panduan Pengguna</a></li>
                            <li><a href="#" className="hover:text-emerald-600 transition-colors">Kisah Sukses</a></li>
                            <li><a href="#" className="hover:text-emerald-600 transition-colors">Pusat Bantuan</a></li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h3 className="font-black text-gray-900 mb-6 uppercase tracking-wider text-sm">Dukungan</h3>
                        <ul className="space-y-4 text-sm font-medium text-gray-500">
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="text-emerald-500" />
                                <a href="mailto:support@agrifield.id" className="hover:text-emerald-600 transition-colors">support@agrifield.id</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <ShieldCheck size={16} className="text-emerald-500" />
                                <a href="#" className="hover:text-emerald-600 transition-colors">Privasi & Keamanan</a>
                            </li>
                            <li><a href="#contact" className="hover:text-emerald-600 transition-colors">Hubungi Kami</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-100 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 font-medium text-sm text-center md:text-left">© 2026 Agrifield System. Seluruh Hak Cipta Dilindungi.</p>
                </div>
            </div>
        </footer>
    );
}