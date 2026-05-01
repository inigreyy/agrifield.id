import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { FileText, Activity, ArrowDownCircle, ArrowUpCircle, Calendar, Tag, Sprout, Bird, Trash2, AlertTriangle, Banknote, Landmark, Smartphone, QrCode } from 'lucide-react';

export default function Index({ auth, transactions = [] }) {
    
    // --- STATE MODAL KONFIRMASI HAPUS TRANSAKSI ---
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, transactionId: null });

    // Format Tanggal
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // Format Rupiah
    const formatRp = (angka) => {
        return new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR', 
            maximumFractionDigits: 0 
        }).format(angka || 0);
    };

    // Helper untuk menampilkan Ikon Metode Pembayaran yang sesuai
    const renderPaymentMethod = (method) => {
        switch (method) {
            case 'Transfer Bank':
                return <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs font-bold border border-blue-100"><Landmark size={14} /> Transfer</span>;
            case 'E-Wallet':
                return <span className="flex items-center gap-1.5 text-purple-600 bg-purple-50 px-2 py-1 rounded text-xs font-bold border border-purple-100"><Smartphone size={14} /> E-Wallet</span>;
            case 'QRIS':
                return <span className="flex items-center gap-1.5 text-pink-600 bg-pink-50 px-2 py-1 rounded text-xs font-bold border border-pink-100"><QrCode size={14} /> QRIS</span>;
            case 'Tunai':
            default:
                return <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-bold border border-emerald-100"><Banknote size={14} /> Tunai</span>;
        }
    };

    // --- FUNGSI MODAL HAPUS TRANSAKSI ---
    const confirmDelete = (id) => {
        setDeleteModal({ isOpen: true, transactionId: id });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ isOpen: false, transactionId: null });
    };

    const executeDelete = () => {
        if (deleteModal.transactionId) {
            router.delete(`/transaksi/${deleteModal.transactionId}`, {
                preserveScroll: true,
                onSuccess: () => closeDeleteModal(),
            });
        }
    };

    // Menghitung Total Cepat untuk Summary
    const totalPemasukan = transactions.filter(t => t.type === 'Pemasukan').reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const totalPengeluaran = transactions.filter(t => t.type === 'Pengeluaran').reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Laporan Transaksi" />

            {/* --- CUSTOM ANIMASI CSS (POP-IN ELASTIS) --- */}
            <style>{`
                @keyframes modalPop {
                    0% { opacity: 0; transform: scale(0.9) translateY(15px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-modal-pop {
                    animation: modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
                @keyframes overlayFade {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                .animate-overlay-fade {
                    animation: overlayFade 0.3s ease-out forwards;
                }
            `}</style>

            <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            <FileText size={28} className="text-gray-400" />
                            Laporan Keuangan
                        </h2>
                        <p className="text-gray-500 text-sm mt-2 font-medium">Riwayat log seluruh input transaksi dari semua siklus Anda.</p>
                    </div>
                    
                    {/* Ringkasan Singkat (Summary) */}
                    <div className="flex gap-4 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                        <div className="px-4 py-1 border-r border-gray-100">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Masuk</p>
                            <p className="text-sm font-black text-emerald-600">{formatRp(totalPemasukan)}</p>
                        </div>
                        <div className="px-4 py-1">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Keluar</p>
                            <p className="text-sm font-black text-red-600">{formatRp(totalPengeluaran)}</p>
                        </div>
                    </div>
                </div>

                {/* --- TABEL TRANSAKSI --- */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    
                    {transactions.length === 0 ? (
                        
                        // STATE KOSONG
                        <div className="p-16 text-center">
                            <div className="mx-auto w-16 h-16 bg-gray-50 text-gray-400 rounded-2xl border border-gray-200 flex items-center justify-center mb-5">
                                <Activity size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Transaksi</h3>
                            <p className="text-gray-500 max-w-sm mx-auto font-medium text-sm">
                                Data laporan akan muncul otomatis setelah Anda melakukan input transaksi di menu Daftar Siklus.
                            </p>
                        </div>

                    ) : (
                        
                        // ISI TABEL
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/80 border-b border-gray-200">
                                        <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Tanggal</th>
                                        <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Jenis</th>
                                        <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider min-w-[200px]">Keterangan Item</th>
                                        <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Siklus Terkait</th>
                                        {/* KOLOM BARU: PEMBAYARAN */}
                                        <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Pembayaran</th>
                                        <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right whitespace-nowrap">Nominal (Rp)</th>
                                        <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center whitespace-nowrap">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {transactions.map((trx) => (
                                        <tr key={trx.id} className="hover:bg-gray-50/50 transition-colors group">
                                            
                                            {/* Tanggal */}
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <div className="flex items-center text-sm font-semibold text-gray-700">
                                                    <Calendar size={14} className="mr-2 text-gray-400" />
                                                    {formatDate(trx.date)}
                                                </div>
                                            </td>

                                            {/* Jenis (Pemasukan/Pengeluaran) */}
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${
                                                    trx.type === 'Pemasukan' 
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                                    : 'bg-red-50 text-red-700 border-red-200'
                                                }`}>
                                                    {trx.type === 'Pemasukan' ? <ArrowDownCircle size={12} className="mr-1.5"/> : <ArrowUpCircle size={12} className="mr-1.5"/>}
                                                    {trx.type}
                                                </span>
                                            </td>

                                            {/* Keterangan Item */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-start text-sm font-bold text-gray-900">
                                                    <Tag size={14} className="mr-2 mt-0.5 text-gray-400 shrink-0" />
                                                    <span className="line-clamp-2">{trx.item_name}</span>
                                                </div>
                                            </td>

                                            {/* Siklus Terkait */}
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <div className="flex items-center text-sm font-semibold text-gray-600">
                                                    {trx.cycle?.type === 'Pertanian' ? (
                                                        <Sprout size={14} className="mr-2 text-emerald-500" />
                                                    ) : (
                                                        <Bird size={14} className="mr-2 text-orange-500" />
                                                    )}
                                                    <span className="truncate max-w-[150px] block" title={trx.cycle?.name}>
                                                        {trx.cycle?.name || 'Siklus Dihapus'}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Metode Pembayaran (Render Helper) */}
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                {renderPaymentMethod(trx.payment_method)}
                                            </td>

                                            {/* Nominal */}
                                            <td className="py-4 px-6 text-right whitespace-nowrap">
                                                <span className={`text-sm font-black ${
                                                    trx.type === 'Pemasukan' ? 'text-emerald-600' : 'text-gray-900'
                                                }`}>
                                                    {trx.type === 'Pemasukan' ? '+' : '-'}{formatRp(trx.amount)}
                                                </span>
                                            </td>

                                            {/* Tombol Hapus */}
                                            <td className="py-4 px-6 text-center whitespace-nowrap">
                                                <button
                                                    onClick={() => confirmDelete(trx.id)}
                                                    title="Hapus Transaksi"
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>

            {/* --- UI MODAL KONFIRMASI HAPUS TRANSAKSI --- */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-0">
                    
                    {/* Background Gelap (Fade in) */}
                    <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm animate-overlay-fade" onClick={closeDeleteModal}></div>
                    
                    {/* Kotak Putih Modal (Pop in Elastis) */}
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm z-10 overflow-hidden animate-modal-pop p-6 text-center">
                        
                        <div className="mx-auto w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-5 border-[6px] border-red-50/50">
                            <AlertTriangle size={32} />
                        </div>
                        
                        <h3 className="text-xl font-black text-gray-900 mb-2">Hapus Transaksi?</h3>
                        
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                            Apakah Anda yakin ingin menghapus riwayat transaksi ini? Saldo akan otomatis disesuaikan dan data tidak dapat dikembalikan.
                        </p>
                        
                        <div className="flex gap-3">
                            <button 
                                onClick={closeDeleteModal} 
                                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
                            >
                                Batal
                            </button>
                            <button 
                                onClick={executeDelete} 
                                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2"
                            >
                                <Trash2 size={18} /> Ya, Hapus
                            </button>
                        </div>
                        
                    </div>
                </div>
            )}

        </AuthenticatedLayout>
    );
}