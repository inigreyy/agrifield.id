import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    Users, ShieldCheck, LogOut, LayoutDashboard, 
    Newspaper, Menu, X, PlusCircle, Mail, Megaphone, Settings 
} from 'lucide-react';

export default function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { auth } = usePage().props;

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
        { 
            name: 'Manajemen User', 
            href: route('admin.users.index'), 
            icon: Users, 
            active: route().current('admin.users.index') 
        },
        { 
            name: 'Pengaturan Popup', 
            href: route('admin.popups.index'), 
            icon: Megaphone, 
            active: route().current('admin.popups.*') 
        },
        { 
            name: 'Pengaturan Profil', 
            href: route('admin.profile.edit'), 
            icon: Settings, 
            active: route().current('admin.profile.edit') 
        },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
            {/* Sidebar Desktop & Mobile */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 p-6 flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                
                <div className="flex-1">
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
                                className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-colors ${
                                    link.active 
                                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-200' 
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <link.icon size={18} /> {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Bagian Bawah - Profile Section */}
                <div className="mt-auto space-y-4">
                    <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                        {/* Avatar Image Logic */}
                        <div className="shrink-0">
                            {auth.user.avatar ? (
                                <img 
                                    src={`/storage/${auth.user.avatar}`} 
                                    alt={auth.user.name} 
                                    className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm"
                                />
                            ) : (
                                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 border-2 border-white shadow-sm">
                                    <Users size={20} />
                                </div>
                            )}
                        </div>

                        {/* Info Teks */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-gray-900 truncate tracking-tight">
                                {auth.user.name}
                            </p>
                            <p className="text-[10px] font-bold text-gray-400 truncate flex items-center gap-1 uppercase tracking-widest">
                                <Mail size={10} className="shrink-0" /> {auth.user.email}
                            </p>
                        </div>
                    </div>

                    <Link 
                        href={route('admin.logout')} 
                        method="post" 
                        as="button" 
                        className="flex w-full items-center justify-center gap-3 text-red-500 font-black p-4 bg-red-50/50 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
                    >
                        <LogOut size={18} /> KELUAR
                    </Link>
                </div>
            </aside>

            {/* Konten Utama */}
            <main className="flex-1 lg:ml-64 p-6 md:p-12">
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