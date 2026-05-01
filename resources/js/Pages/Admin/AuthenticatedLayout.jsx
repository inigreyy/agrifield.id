import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ShieldCheck, LogOut, LayoutDashboard, Newspaper, Menu, X, PlusCircle } from 'lucide-react';

export default function AuthenticatedLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Definisikan navigasi
    const navLinks = [
        { 
            name: 'Dashboard', 
            href: route('admin.dashboard'), 
            icon: LayoutDashboard, 
            active: route().current('admin.dashboard') 
        },
        { 
            name: 'Artikel', 
            href: route('admin.articles.index'), 
            icon: Newspaper, 
            active: route().current('admin.articles.index') 
        },
        { 
            name: 'Tambah Artikel', 
            href: route('admin.articles.create'), 
            icon: PlusCircle, 
            active: route().current('admin.articles.create') 
        },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
            {/* Sidebar Desktop */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 p-6 flex flex-col justify-between transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div>
                    <div className="flex items-center gap-3 mb-10 px-2">
                        <div className="bg-emerald-600 p-2 rounded-xl">
                            <ShieldCheck size={20} className="text-white" />
                        </div>
                        <span className="font-black text-gray-900 tracking-tight">Admin<span className="text-emerald-500">.</span></span>
                    </div>
                    
                    <nav className="space-y-2">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href} 
                                className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-colors ${link.active ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                            >
                                <link.icon size={18} /> {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <Link 
                    href={route('admin.logout')} 
                    method="post" 
                    as="button" 
                    className="flex w-full items-center gap-3 text-red-500 font-bold p-3 hover:bg-red-50 rounded-xl transition-colors"
                >
                    <LogOut size={18} /> Keluar
                </Link>
            </aside>

            {/* Konten Utama */}
            <main className="flex-1 lg:ml-64 p-6 md:p-12">
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center justify-between mb-8">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    <span className="font-black text-gray-900">Admin Panel</span>
                </div>

                {children}
            </main>
        </div>
    );
}