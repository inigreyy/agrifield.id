import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, PlusCircle, List, FileText, Menu, X, LogOut, User, Sprout, ChevronLeft, Globe, Quote } from 'lucide-react';
import Dropdown from '@/Components/Dropdown';

export default function AuthenticatedLayout({ user, header, children }) {
    const { url, props } = usePage();
    const authUser = user || props.auth.user;

    const [showingMobileMenu, setShowingMobileMenu] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const quotes = [
        "Pertanian adalah profesi paling mulia, karena ia memberi makan dunia.",
        "Kesabaran adalah pupuk terbaik untuk menumbuhkan kesuksesan.",
        "Siapa yang menabur kerja keras, akan menuai hasil yang berlimpah.",
        "Setiap benih yang ditanam hari ini adalah harapan untuk masa depan.",
        "Keringat hari ini adalah kepingan emas di musim panen nanti."
    ];
    
    const [motivation, setMotivation] = useState("");

    useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setMotivation(randomQuote);
    }, []);

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} strokeWidth={2} />, href: '/dashboard', active: url === '/dashboard' },
        { name: 'Daftar Siklus', icon: <List size={20} strokeWidth={2} />, href: '/siklus', active: url === '/siklus' },
        { name: 'Tambah Siklus', icon: <PlusCircle size={20} strokeWidth={2} />, href: '/siklus/create', active: url.startsWith('/siklus/create') },
        { name: 'Laporan', icon: <FileText size={20} strokeWidth={2} />, href: '/laporan', active: url.startsWith('/laporan') },
        { name: 'Halaman Utama', icon: <Globe size={20} strokeWidth={2} />, href: '/', active: url === '/' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans selection:bg-emerald-500 selection:text-white">
            
            {/* --- SIDEBAR DESKTOP --- */}
            <aside 
                className={`hidden md:flex flex-col bg-neutral-950 text-neutral-300 shadow-2xl z-50 border-r border-neutral-900 transition-all duration-300 relative ${
                    isSidebarCollapsed ? 'w-20' : 'w-64'
                }`}
            >
                <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="absolute -right-3.5 top-8 bg-neutral-800 border border-neutral-600 text-neutral-300 hover:text-white hover:bg-neutral-700 rounded-full p-1 z-50 transition-all shadow-md"
                >
                    <ChevronLeft size={16} className={`transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
                </button>

                <div className="flex items-center justify-center h-20 border-b border-neutral-800 px-4 overflow-hidden">
                    <Link href="/dashboard" className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3 w-full'} group`}>
                        <div className="bg-neutral-800 p-2 rounded-lg border border-neutral-700 group-hover:border-emerald-500 transition-colors shrink-0">
                            <Sprout size={24} className="text-emerald-400" />
                        </div>
                        {!isSidebarCollapsed && (
                            <h1 className="text-xl font-bold tracking-wide text-white truncate animate-fade-in-up">
                                Agrifield<span className="text-emerald-500">.</span>
                            </h1>
                        )}
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col">
                    {!isSidebarCollapsed && (
                        <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-4 px-3 animate-fade-in-up">Menu Utama</div>
                    )}
                    <nav className="space-y-1.5 mt-2 relative z-50">
                        {menuItems.map((item, index) => (
                            <div key={item.name} className="relative">
                                {index === 4 && !isSidebarCollapsed && (
                                    <div className="my-4 border-t border-neutral-800 pt-4">
                                        <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-3 px-3">Eksternal</div>
                                    </div>
                                )}
                                <Link
                                    href={item.href}
                                    title={isSidebarCollapsed ? item.name : ""}
                                    className={`flex items-center w-full ${isSidebarCollapsed ? 'justify-center py-3' : 'space-x-3 px-3 py-3'} rounded-lg transition-all duration-200 group ${
                                        item.active 
                                        ? 'bg-neutral-800 text-white border-l-2 border-emerald-500' 
                                        : 'hover:bg-neutral-900 hover:text-white'
                                    }`}
                                >
                                    <span className={`shrink-0 ${item.active ? 'text-emerald-400' : 'text-neutral-400 group-hover:text-neutral-300'}`}>
                                        {item.icon}
                                    </span>
                                    {!isSidebarCollapsed && (
                                        <span className="font-medium text-sm truncate">{item.name}</span>
                                    )}
                                </Link>
                            </div>
                        ))}
                    </nav>

                    {!isSidebarCollapsed && motivation && (
                        <div className="mt-auto pt-8 pb-2 px-2">
                            <div className="bg-neutral-900/80 rounded-xl p-4 border border-neutral-800 relative overflow-hidden">
                                <p className="text-xs text-neutral-400 font-medium italic leading-relaxed text-center">
                                    "{motivation}"
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="p-4 border-t border-neutral-800 overflow-hidden shrink-0">
                    <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center p-2' : 'space-x-3 p-3'} bg-neutral-900 rounded-xl border border-neutral-800 transition-all`}>
                        {authUser.avatar ? (
                            <img src={`/storage/${authUser.avatar}`} alt="Avatar" className="h-9 w-9 rounded-full object-cover shrink-0 border-2 border-neutral-700 shadow-sm" />
                        ) : (
                            <div className="h-9 w-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm shrink-0 border-2 border-neutral-700 shadow-sm">
                                {authUser.name.charAt(0)}
                            </div>
                        )}
                        {!isSidebarCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">{authUser.name}</p>
                                <p className="text-[10px] text-neutral-400 uppercase tracking-wider truncate">
                                    {authUser.role || 'Petani Mandiri'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* --- AREA KONTEN UTAMA --- */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300">
                <header className="bg-white/80 backdrop-blur-md sticky top-0 border-b border-gray-200 h-20 flex items-center justify-between px-6 z-10 shadow-sm">
                    <button
                        onClick={() => setShowingMobileMenu(true)}
                        className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="hidden md:block">{header}</div>
                    
                    <div className="ml-auto flex items-center space-x-4">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors bg-white border border-gray-200 p-2 rounded-lg hover:shadow-sm">
                                    <User size={18} className="text-gray-500"/>
                                    <span className="hidden sm:inline-block font-bold">Pengaturan Akun</span>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="right" width="48">
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>

            {/* --- MOBILE MENU --- */}
            {showingMobileMenu && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setShowingMobileMenu(false)}></div>
                    <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-72 bg-neutral-950 text-neutral-300 p-6 shadow-2xl">
                        <button onClick={() => setShowingMobileMenu(false)} className="self-end mb-4 p-2 text-neutral-400">
                            <X size={24} />
                        </button>
                        {menuItems.map((item) => (
                            <Link key={item.name} href={item.href} onClick={() => setShowingMobileMenu(false)} className="py-4 border-b border-neutral-800 text-lg font-bold">
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
}