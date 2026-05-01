import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Plus, ArrowDownCircle, ArrowUpCircle, Wallet, Activity, Calendar, Sun, Cloud, CloudFog, CloudRain, Snowflake, CloudLightning, CloudOff, MapPinOff, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ 
    auth, 
    totalIncome = 0, 
    totalExpense = 0, 
    recentHarvests = [], // Beri default array kosong []
    chartData = []       // Beri default array kosong []
}) {
    
    // --- STATE CUACA REAL-TIME ---
    const [weather, setWeather] = useState({ 
        temp: null, 
        description: 'Memuat cuaca...', 
        icon: Sun,
        color: 'text-amber-500'
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
                        const data = await res.json();

                        const code = data.current_weather.weathercode;
                        const temp = data.current_weather.temperature;

                        let desc = 'Cerah';
                        let Icon = Sun;
                        let color = 'text-amber-500';

                        if (code === 0) { desc = 'Cerah'; Icon = Sun; color = 'text-amber-500'; }
                        else if (code >= 1 && code <= 3) { desc = 'Berawan'; Icon = Cloud; color = 'text-gray-400'; }
                        else if (code >= 45 && code <= 48) { desc = 'Berkabut'; Icon = CloudFog; color = 'text-gray-400'; }
                        else if (code >= 51 && code <= 67) { desc = 'Hujan'; Icon = CloudRain; color = 'text-blue-500'; }
                        else if (code >= 71 && code <= 77) { desc = 'Salju'; Icon = Snowflake; color = 'text-cyan-300'; }
                        else if (code >= 80 && code <= 99) { desc = 'Badai'; Icon = CloudLightning; color = 'text-purple-600'; }

                        setWeather({ temp, description: desc, icon: Icon, color });
                    } catch (error) {
                        setWeather({ temp: null, description: 'Gagal memuat', icon: CloudOff, color: 'text-red-400' });
                    }
                },
                (err) => {
                    setWeather({ temp: null, description: 'Akses lokasi ditolak', icon: MapPinOff, color: 'text-gray-400' });
                }
            );
        } else {
            setWeather({ temp: null, description: 'GPS tidak didukung', icon: MapPinOff, color: 'text-gray-400' });
        }
    }, []);

    // --- PERHITUNGAN KEUANGAN ---
    const netProfit = totalIncome - totalExpense;
    const isProfit = netProfit >= 0;

    const formatRp = (angka) => {
        return new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(Number(angka));
    };

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
                
                {/* --- HEADER & GREETING SECTION --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        {/* Menampilkan Nama Lengkap dengan Ikon Profesional */}
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            <span>Halo, {auth.user.name}</span>
                            <Sparkles size={28} className="text-emerald-500" />
                        </h2>
                        <p className="text-gray-500 text-sm mt-1 font-medium">
                            Pantau ringkasan arus kas dan kegiatan operasional Anda hari ini.
                        </p>
                    </div>

                    {/* Area Kanan Header (Widget Cuaca + Tombol Siklus Baru) */}
                    <div className="flex flex-wrap items-center gap-3">
                        
                        {/* WIDGET CUACA REAL-TIME */}
                        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-lg border border-gray-200 shadow-sm">
                            <weather.icon size={22} className={`${weather.color} drop-shadow-sm`} />
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-gray-900 leading-none">
                                    {weather.temp !== null ? `${weather.temp}°C` : '-'}
                                </span>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">
                                    {weather.description}
                                </span>
                            </div>
                        </div>

                        <Link 
                            href="/siklus/create" 
                            className="inline-flex items-center justify-center space-x-2 bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-md hover:shadow-lg"
                        >
                            <Plus size={20} />
                            <span className="hidden sm:inline">Siklus Baru</span>
                        </Link>
                    </div>
                </div>

                {/* --- KARTU RINGKASAN (INFO CARDS) --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-gray-300 transition-all flex flex-col relative overflow-hidden group">
                        <div className="flex items-center space-x-4 relative z-10">
                            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600 group-hover:scale-105 transition-transform">
                                <ArrowDownCircle size={28} strokeWidth={2} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Pendapatan</p>
                                <h3 className="text-2xl font-black text-gray-900">{formatRp(totalIncome)}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-gray-300 transition-all flex flex-col relative overflow-hidden group">
                        <div className="flex items-center space-x-4 relative z-10">
                            <div className="p-3.5 bg-red-50 rounded-xl border border-red-100 text-red-600 group-hover:scale-105 transition-transform">
                                <ArrowUpCircle size={28} strokeWidth={2} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Pengeluaran</p>
                                <h3 className="text-2xl font-black text-gray-900">{formatRp(totalExpense)}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-gray-300 transition-all flex flex-col relative overflow-hidden group">
                        <div className="flex items-center space-x-4 relative z-10">
                            <div className={`p-3.5 rounded-xl border group-hover:scale-105 transition-transform ${isProfit ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
                                <Wallet size={28} strokeWidth={2} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Keuntungan Bersih</p>
                                <h3 className={`text-2xl font-black ${isProfit ? 'text-blue-700' : 'text-rose-700'}`}>
                                    {formatRp(netProfit)}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- AREA BAWAH (GRAFIK & TRANSAKSI TERAKHIR) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* BAGIAN GRAFIK */}
                    <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-black text-gray-900">Statistik Arus Kas (6 Bulan Terakhir)</h3>
                                <p className="text-sm font-medium text-gray-500 mt-1">Perbandingan pendapatan dan pengeluaran tiap bulan.</p>
                            </div>
                        </div>
                        
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorPendapatan" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorPengeluaran" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }} dy={10} />
                                    
                                    <Tooltip 
                                        formatter={(value) => formatRp(value)}
                                        contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                                    />
                                    
                                    <Area type="monotone" dataKey="Pendapatan" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPendapatan)" />
                                    <Area type="monotone" dataKey="Pengeluaran" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorPengeluaran)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* BAGIAN TRANSAKSI TERAKHIR */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-lg font-black text-gray-900">Pemasukan Terakhir</h3>
                            <p className="text-xs font-medium text-gray-500 mt-1">5 transaksi pemasukan terbaru Anda.</p>
                        </div>

                        <div className="flex-1 p-2">
                            {recentHarvests.length === 0 ? (
                                <div className="h-full flex flex-col justify-center items-center text-center p-6">
                                    <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-xl border border-gray-200 flex items-center justify-center mb-3">
                                        <Activity size={24} />
                                    </div>
                                    <p className="text-sm font-bold text-gray-900">Belum Ada Transaksi</p>
                                    <p className="text-xs text-gray-500 mt-1 mb-4">Catat pendapatan pertama Anda di menu Siklus.</p>
                                    <Link href="/siklus" className="text-xs font-bold text-gray-900 hover:text-emerald-600 transition-colors">
                                        Lihat Daftar Siklus &rarr;
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {recentHarvests.map((trx) => (
                                        <div key={trx.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                                                    <ArrowDownCircle size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900 line-clamp-1">{trx.item_name}</p>
                                                    <p className="text-[10px] font-semibold text-gray-500 flex items-center gap-1 mt-0.5">
                                                        <Calendar size={10} /> {formatDate(trx.date)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-black text-emerald-600">+{formatRp(trx.amount)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        {recentHarvests.length > 0 && (
                            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                                <Link href="/laporan" className="block w-full text-center text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors">
                                    Lihat Semua Laporan &rarr;
                                </Link>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}