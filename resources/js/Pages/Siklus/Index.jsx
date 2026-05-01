import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Plus, Sprout, Bird, Calendar, Activity, ChevronRight, Wallet, X, ArrowDownCircle, ArrowUpCircle, Tag, Banknote, Trash2, AlertTriangle, CreditCard, Landmark, Smartphone, QrCode, ChevronDown, CheckCircle2, Receipt, Clock, User as UserIcon } from 'lucide-react';

export default function Index({ auth, cycles = [] }) {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCycle, setActiveCycle] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, cycle: null });
    const [showPaymentMenu, setShowPaymentMenu] = useState(false);

    const [receiptData, setReceiptData] = useState(null);

   const { data, setData, processing, errors, reset, clearErrors } = useForm({
        type: 'Pengeluaran',
        item_name: '',
        amount: '',
        payment_method: 'Tunai',
        date: new Date().toISOString().split('T')[0],
    });

    const paymentOptions = [
        { id: 'Tunai', label: 'Tunai / Cash', icon: Banknote },
        { id: 'Transfer Bank', label: 'Transfer Bank', icon: Landmark },
        { id: 'E-Wallet', label: 'E-Wallet (Dana, OVO)', icon: Smartphone },
        { id: 'QRIS', label: 'Scan QRIS', icon: QrCode },
    ];

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const formatRp = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka || 0);
    };

    // Membuat ID Transaksi Acak yang Terlihat Profesional
    const generateTransactionId = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = 'TRX-';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const openModal = (cycle) => {
        setActiveCycle(cycle);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setShowPaymentMenu(false);
        setTimeout(() => {
            setActiveCycle(null);
            reset();
            clearErrors();
        }, 200); 
    };

  const submitTransaction = (e) => {
    e.preventDefault();

    const currentTime = new Date().toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });

    const currentReceiptData = { 
        ...data, 
        cycle: activeCycle,
        transaction_id: generateTransactionId(),
        time: currentTime
    };

   router.post(`/siklus/${activeCycle.id}/transaksi`, {
    ...data,
    cycle_id: activeCycle.id
}, {
    preserveScroll: true,

    onSuccess: () => {
        console.log("SUCCESS KE TRIGGER");

        setReceiptData(currentReceiptData);
        setIsModalOpen(false);
        setShowPaymentMenu(false);

        setTimeout(() => {
            setActiveCycle(null);
            reset();
            clearErrors();
        }, 200);
    },

    onError: (err) => {
        console.log("ERROR VALIDASI:", err);
    }
});
};

    const closeReceipt = () => {
        setReceiptData(null);
    };

    const confirmDelete = (cycle) => {
        setDeleteModal({ isOpen: true, cycle });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ isOpen: false, cycle: null });
    };

    const executeDelete = () => {
        if (deleteModal.cycle) {
            router.delete(`/siklus/${deleteModal.cycle.id}`, {
                preserveScroll: true,
                onSuccess: () => closeDeleteModal(),
            });
        }
    };

    const pertanianCycles = cycles.filter(c => c.type === 'Pertanian');
    const peternakanCycles = cycles.filter(c => c.type === 'Peternakan');

    const renderCycleCard = (cycle) => {
        const totalIncome = cycle.total_income || 0;
        const totalExpense = cycle.total_expense || 0;
        const profit = totalIncome - totalExpense;
        const isProfit = profit >= 0;

        return (
            <div key={cycle.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:border-gray-300 transition-all flex flex-col h-full group relative animate-fade-in-up">
                <div className="flex justify-between items-start mb-6">
                    <div className={`p-3.5 rounded-xl border group-hover:scale-105 transition-transform ${
                        cycle.type === 'Pertanian' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-orange-50 border-orange-100 text-orange-600'
                    }`}>
                        {cycle.type === 'Pertanian' ? <Sprout size={24} /> : <Bird size={24} />}
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => confirmDelete(cycle)} className="p-1.5 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100" title="Hapus Siklus">
                            <Trash2 size={18} />
                        </button>
                        <span className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md border ${
                            cycle.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-500 border-gray-200'
                        }`}>
                            {cycle.status}
                        </span>
                    </div>
                </div>

                <div className="flex-1">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5">{cycle.type}</p>
                    <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight line-clamp-2">{cycle.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 font-medium mb-5">
                        <Calendar size={16} className="mr-2 text-gray-400" /> Mulai: {formatDate(cycle.start_date)}
                    </div>

                    <div className="border-t border-gray-100 pt-4 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Pemasukan</p>
                                <p className="text-sm font-black text-emerald-700">{formatRp(totalIncome)}</p>
                            </div>
                            <div className="bg-red-50/50 p-3 rounded-xl border border-red-100/50">
                                <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider mb-1">Pengeluaran</p>
                                <p className="text-sm font-black text-red-700">{formatRp(totalExpense)}</p>
                            </div>
                        </div>
                        <div className={`flex items-center justify-between p-3 rounded-xl border ${isProfit ? 'bg-blue-50/50 border-blue-100/50' : 'bg-rose-50/50 border-rose-100/50'}`}>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${isProfit ? 'text-blue-600' : 'text-rose-600'}`}>Profit Bersih</span>
                            <span className={`text-sm font-black ${isProfit ? 'text-blue-700' : 'text-rose-700'}`}>{formatRp(profit)}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col gap-3">
                    {cycle.status === 'Aktif' && (
                        <button onClick={() => openModal(cycle)} className="w-full flex justify-center items-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-3 rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow-md">
                            <Wallet size={18} /><span>Input Transaksi</span>
                        </button>
                    )}
                    <Link href={`/siklus/${cycle.id}`} className="flex items-center justify-between w-full text-gray-500 hover:text-gray-900 text-sm font-bold transition-colors px-2 py-1">
                        <span>Lihat Detail Siklus</span><ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        );
    };

    const selectedPaymentOption = paymentOptions.find(opt => opt.id === data.payment_method) || paymentOptions[0];
    const SelectedPaymentIcon = selectedPaymentOption.icon;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Daftar Siklus" />

            <style>{`
                @keyframes modalPop { 0% { opacity: 0; transform: scale(0.9) translateY(15px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
                .animate-modal-pop { animation: modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                @keyframes overlayFade { 0% { opacity: 0; } 100% { opacity: 1; } }
                .animate-overlay-fade { animation: overlayFade 0.3s ease-out forwards; }
            `}</style>

            <div className="max-w-7xl mx-auto space-y-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Daftar Siklus</h2>
                        <p className="text-gray-500 text-sm mt-1 font-medium">Kelola dan pantau seluruh kegiatan operasional Anda.</p>
                    </div>
                    <Link href="/siklus/create" className="inline-flex items-center justify-center space-x-2 bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
                        <Plus size={20} />
                        <span>Siklus Baru</span>
                    </Link>
                </div>

                {cycles.length === 0 ? (
                    <div className="bg-white border border-gray-200 p-12 rounded-2xl text-center shadow-sm">
                        <div className="mx-auto w-16 h-16 bg-gray-50 text-gray-400 rounded-2xl border border-gray-200 flex items-center justify-center mb-5">
                            <Activity size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Siklus Aktif</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-6 font-medium text-sm">Anda belum memiliki data siklus apapun.</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {pertanianCycles.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600 shadow-sm"><Sprout size={24} /></div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Pertanian</h3>
                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-black border border-gray-200 shadow-sm">{pertanianCycles.length}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{pertanianCycles.map(renderCycleCard)}</div>
                            </section>
                        )}
                        {pertanianCycles.length > 0 && peternakanCycles.length > 0 && <div className="border-t border-gray-200/60 w-full rounded-full"></div>}
                        {peternakanCycles.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-orange-50 rounded-xl border border-orange-100 text-orange-600 shadow-sm"><Bird size={24} /></div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Peternakan</h3>
                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-black border border-gray-200 shadow-sm">{peternakanCycles.length}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{peternakanCycles.map(renderCycleCard)}</div>
                            </section>
                        )}
                    </div>
                )}
            </div>

            {/* MODAL INPUT TRANSAKSI */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-0">
                    <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm animate-overlay-fade" onClick={closeModal}></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden animate-modal-pop">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                            <div>
                                <h3 className="text-lg font-black text-gray-900">Input Transaksi Baru</h3>
                                <p className="text-sm text-gray-500 font-medium mt-1 truncate max-w-[300px]">Siklus: <span className="text-gray-700">{activeCycle?.name}</span></p>
                            </div>
                            <button onClick={closeModal} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"><X size={20} /></button>
                        </div>

                        <form onSubmit={submitTransaction} className="p-6 space-y-5 relative">
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${data.type === 'Pemasukan' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                    <input type="radio" name="type" value="Pemasukan" checked={data.type === 'Pemasukan'} onChange={(e) => setData('type', e.target.value)} className="hidden" />
                                    <ArrowDownCircle size={28} className={data.type === 'Pemasukan' ? 'text-emerald-600' : 'text-gray-400'} />
                                    <span className={`mt-2 font-bold text-sm ${data.type === 'Pemasukan' ? 'text-emerald-700' : 'text-gray-600'}`}>Pemasukan</span>
                                </label>
                                <label className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${data.type === 'Pengeluaran' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                    <input type="radio" name="type" value="Pengeluaran" checked={data.type === 'Pengeluaran'} onChange={(e) => setData('type', e.target.value)} className="hidden" />
                                    <ArrowUpCircle size={28} className={data.type === 'Pengeluaran' ? 'text-red-600' : 'text-gray-400'} />
                                    <span className={`mt-2 font-bold text-sm ${data.type === 'Pengeluaran' ? 'text-red-700' : 'text-gray-600'}`}>Pengeluaran</span>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Tag size={16} className="text-gray-400"/> Nama Item / Keterangan</label>
                                <input type="text" value={data.item_name} onChange={(e) => setData('item_name', e.target.value)} placeholder="Contoh: Hasil Panen / Pakan Ternak" className="w-full border-gray-300 focus:border-gray-900 focus:ring-gray-900 rounded-lg shadow-sm py-2.5" required/>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Banknote size={16} className="text-gray-400"/> Nominal</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-gray-500 font-bold">Rp</span></div>
                                        <input type="number" value={data.amount} onChange={(e) => setData('amount', Number(e.target.value))} placeholder="0" className="w-full pl-10 border-gray-300 focus:border-gray-900 focus:ring-gray-900 rounded-lg shadow-sm py-2.5" required/>
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><CreditCard size={16} className="text-gray-400"/> Metode Pembayaran</label>
                                    <button type="button" onClick={() => setShowPaymentMenu(!showPaymentMenu)} className="w-full flex items-center justify-between border border-gray-300 hover:border-gray-400 focus:border-gray-900 bg-white rounded-lg shadow-sm py-2.5 px-3 transition-colors">
                                        <div className="flex items-center gap-2"><SelectedPaymentIcon size={18} className="text-gray-600" /><span className="text-sm font-medium text-gray-900">{selectedPaymentOption.label}</span></div>
                                        <ChevronDown size={16} className="text-gray-400" />
                                    </button>
                                    {showPaymentMenu && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setShowPaymentMenu(false)}></div>
                                            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl py-1 overflow-hidden animate-fade-in-up">
                                                {paymentOptions.map((opt) => {
                                                    const OptionIcon = opt.icon;
                                                    return (
                                                        <button key={opt.id} type="button" onClick={() => { setData('payment_method', opt.id); setShowPaymentMenu(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${data.payment_method === opt.id ? 'bg-gray-50 text-gray-900 font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}>
                                                            <OptionIcon size={18} className={data.payment_method === opt.id ? 'text-emerald-600' : 'text-gray-400'} />{opt.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Calendar size={16} className="text-gray-400"/> Tanggal Transaksi</label>
                                <input type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} className="w-full border-gray-300 focus:border-gray-900 focus:ring-gray-900 rounded-lg shadow-sm py-2.5" required/>
                            </div>

                            <div className="pt-3 flex gap-3 mt-6 relative z-0">
                                <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors">Batal</button>
                                <button type="submit" disabled={processing} className="flex-[2] px-4 py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-lg transition-all shadow-md disabled:opacity-50 flex justify-center items-center gap-2">
                                    <Wallet size={18} />{processing ? 'Menyimpan...' : 'Simpan Transaksi'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- MODAL STRUK DIGITAL (SUPER REALISTIS) --- */}
            {receiptData && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-0">
                    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md animate-overlay-fade" onClick={closeReceipt}></div>
                    
                    <div className="bg-white w-full max-w-[380px] z-10 overflow-hidden animate-modal-pop shadow-2xl relative" style={{ borderRadius: '16px 16px 8px 8px' }}>
                        
                        {/* Header Struk */}
                        <div className="bg-emerald-600 p-6 text-center text-white relative">
                            {/* Efek gerigi bawah ala struk asli */}
                            <div className="absolute -bottom-2 left-0 right-0 h-4 bg-white" style={{ maskImage: 'radial-gradient(circle 6px at center bottom, transparent 0, transparent 100%, white 100%)', maskSize: '16px 10px', maskRepeat: 'repeat-x', WebkitMaskImage: 'radial-gradient(circle 4px at center bottom, transparent 0, transparent 4px, white 5px)', WebkitMaskSize: '16px 10px', WebkitMaskRepeat: 'repeat-x' }}></div>
                            
                            <CheckCircle2 size={48} className="mx-auto mb-2 text-emerald-100" />
                            <h2 className="text-xl font-black tracking-widest uppercase">Berhasil</h2>
                            <p className="text-emerald-100 text-xs font-medium mt-1">Pembayaran Telah Diterima</p>
                        </div>

                        {/* Body Struk */}
                        <div className="p-7 pt-5 space-y-5 bg-white">
                            
                            <div className="text-center">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{receiptData.type}</p>
                                <h1 className={`text-3xl font-black ${receiptData.type === 'Pemasukan' ? 'text-emerald-600' : 'text-gray-900'}`}>
                                    {formatRp(receiptData.amount)}
                                </h1>
                            </div>

                            <div className="border-t-2 border-dashed border-gray-200"></div>

                            {/* Detail Lengkap Struk */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-gray-500 flex items-center gap-1.5"><Receipt size={14}/> ID Transaksi</span>
                                    <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">{receiptData.transaction_id}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-gray-500 flex items-center gap-1.5"><Calendar size={14}/> Tanggal</span>
                                    <span className="font-bold text-gray-900">{formatDate(receiptData.date)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-gray-500 flex items-center gap-1.5"><Clock size={14}/> Waktu</span>
                                    <span className="font-bold text-gray-900">{receiptData.time} WIB</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-gray-500 flex items-center gap-1.5"><UserIcon size={14}/> Penerima</span>
                                    <span className="font-bold text-gray-900">{auth.user.name}</span>
                                </div>
                                
                                <div className="border-t border-gray-100 my-2 pt-2"></div>
                                
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-gray-500">Siklus</span>
                                    <span className="font-bold text-gray-900">{receiptData.cycle?.name}</span>
                                </div>
                                <div className="flex justify-between items-start text-sm">
                                    <span className="font-medium text-gray-500">Keterangan</span>
                                    <span className="font-bold text-gray-900 text-right max-w-[180px]">{receiptData.item_name}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm mt-1">
                                    <span className="font-medium text-gray-500">Sumber Dana</span>
                                    <div className="flex items-center gap-1.5 font-bold text-gray-900">
                                        {(() => {
                                            const PaymentIcon = paymentOptions.find(opt => opt.id === receiptData.payment_method)?.icon || Banknote;
                                            return <PaymentIcon size={14} className="text-emerald-600" />;
                                        })()}
                                        <span>{receiptData.payment_method}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t-2 border-dashed border-gray-200"></div>
                            
                            <div className="text-center pb-2">
                                {/* Visual Barcode Palsu */}
                                <div className="flex justify-center gap-[2px] h-8 mb-3 opacity-30 mx-8">
                                    {[...Array(24)].map((_, i) => (
                                        <div key={i} className="bg-black" style={{ width: `${Math.floor(Math.random() * 4) + 1}px` }}></div>
                                    ))}
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Agrifield Digital Receipt</p>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 border-t border-gray-100">
                            <button onClick={closeReceipt} className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-900 font-bold py-3 rounded-xl transition-all shadow-sm">
                                Tutup Struk
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL HAPUS SIKLUS (Tetap Sama) */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-0">
                    <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm animate-overlay-fade" onClick={closeDeleteModal}></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm z-10 overflow-hidden animate-modal-pop p-6 text-center">
                        <div className="mx-auto w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-5 border-[6px] border-red-50/50"><AlertTriangle size={32} /></div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">Hapus Siklus?</h3>
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">Anda yakin ingin menghapus siklus <span className="font-bold text-gray-900">"{deleteModal.cycle?.name}"</span>?</p>
                        <div className="flex gap-3">
                            <button onClick={closeDeleteModal} className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors">Batal</button>
                            <button onClick={executeDelete} className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2"><Trash2 size={18} /> Ya, Hapus</button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}