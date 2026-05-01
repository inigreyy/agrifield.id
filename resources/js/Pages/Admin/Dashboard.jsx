import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Newspaper, 
    Plus, 
    Users, 
    Activity, 
    TrendingUp, 
    ArrowUpRight,
    RefreshCw,
    ArrowDownLeft
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminDashboard({ articles = [], stats, recentActivities }) {
    
    const activitiesData = recentActivities?.data || [];
    const paginationLinks = recentActivities?.links || [];

    return (
        <AdminLayout>
            <Head title="Admin Command Center" />
            
            <div className="max-w-6xl mx-auto space-y-8 pb-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard Utama</h1>
                        <p className="text-gray-400 font-bold text-sm uppercase tracking-widest text-[10px]">Pantau aktivitas EduPayment secara real-time.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link 
                            href={route('admin.articles.create')}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                        >
                            <Plus size={18} /> Artikel Baru
                        </Link>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard 
                        title="Total Pengguna" 
                        value={stats?.total_users || 0} 
                        icon={<Users className="text-blue-600" />}
                        trend="Database Terpusat"
                        bgColor="bg-blue-50"
                    />
                    <StatCard 
                        title="Total Pemasukan" 
                        value={stats?.total_income ? `Rp ${Number(stats.total_income).toLocaleString('id-ID')}` : 'Rp 0'} 
                        icon={<Activity className="text-emerald-600" />}
                        trend="Akumulasi Global"
                        bgColor="bg-emerald-50"
                    />
                    <StatCard 
                        title="Total Transaksi" 
                        value={stats?.total_transactions || 0} 
                        icon={<TrendingUp className="text-amber-600" />}
                        trend={stats?.growth ? `${stats.growth}% vs kemarin` : "Update Berkala"}
                        bgColor="bg-amber-50"
                        isGrowth={true}
                        growthValue={stats?.growth}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activities Feed */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <h2 className="font-black text-xl text-gray-900">Kegiatan Terbaru</h2>
                                <RefreshCw size={16} className="text-gray-300" />
                            </div>
                            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-tighter">Live Feed Active</span>
                        </div>
                        
                        <div className="space-y-6 flex-1">
                            {activitiesData.length > 0 ? activitiesData.map((act) => (
                                <div key={act.id} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100">
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors shadow-sm">
                                        <UserIconByActivity type={act.type} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-bold text-gray-900">{act.user_name}</p>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{act.time_ago}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                                            {act.type}: <span className="font-bold text-gray-800">{act.item_name}</span> sebesar <span className="font-black text-gray-900">{act.amount}</span>
                                        </p>
                                    </div>
                                    <button className="text-gray-300 hover:text-indigo-500 transition-colors self-center">
                                        <ArrowUpRight size={18} />
                                    </button>
                                </div>
                            )) : (
                                <div className="text-center py-20">
                                    <Activity className="mx-auto text-gray-200 mb-4" size={48} />
                                    <p className="text-gray-400 italic font-medium text-sm">Belum ada aktivitas tercatat.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {paginationLinks.length > 3 && (
                            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-center gap-2">
                                {paginationLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${
                                            link.active 
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                        } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-8">
                        <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-gray-200">
                            <h3 className="font-black text-lg mb-6">Status Sistem</h3>
                            <div className="space-y-5">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                        Database
                                    </div>
                                    <span className="text-[10px] font-black uppercase">Stable</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                                        Inertia Stack
                                    </div>
                                    <span className="text-[10px] font-black uppercase">Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <h3 className="font-black text-lg mb-6 flex items-center gap-2 text-gray-900">
                                <Newspaper size={20} className="text-emerald-500" />
                                Artikel Populer
                            </h3>
                            <div className="space-y-6">
                                {articles.length > 0 ? articles.slice(0, 5).map((art) => (
                                    <div key={art.id} className="group cursor-pointer flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                                        <div className="max-w-[70%]">
                                            <h4 className="text-sm font-bold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-1">{art.title}</h4>
                                            <p className="text-[10px] text-gray-400 font-black uppercase mt-1 tracking-tighter">{art.views || 0} Pembaca</p>
                                        </div>
                                        <ArrowUpRight size={14} className="text-gray-300 group-hover:text-indigo-500" />
                                    </div>
                                )) : (
                                    <p className="text-xs text-gray-400 italic">Kosong.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function StatCard({ title, value, icon, trend, bgColor, isGrowth = false, growthValue = 0 }) {
    const isNegative = growthValue < 0;
    return (
        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-lg transition-all duration-300">
            <div className={`p-4 rounded-2xl ${bgColor} flex-shrink-0`}>{icon}</div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
                <h3 className="text-xl font-black text-gray-900 my-0.5">{value}</h3>
                <p className={`text-[10px] font-black px-2 py-0.5 rounded-full inline-block uppercase ${
                    isGrowth ? (isNegative ? 'text-red-500 bg-red-50' : 'text-emerald-600 bg-emerald-50') : 'text-gray-400 bg-gray-50'
                }`}>
                    {trend}
                </p>
            </div>
        </div>
    );
}

function UserIconByActivity({ type }) {
    if (type === 'Pemasukan') return <TrendingUp size={20} className="text-emerald-500" />;
    if (type === 'Pengeluaran') return <ArrowDownLeft size={20} className="text-red-500" />;
    return <Users size={20} className="text-blue-500" />;
}