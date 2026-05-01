import { Head, useForm } from '@inertiajs/react';
import {
    MapPin, Phone, Mail, Send, CheckCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

export default function Contact({ auth }) {
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSending, setIsSending] = useState(false); // State loading manual

    const { data, setData, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    // Menghilangkan pesan status otomatis setelah 5 detik
    useEffect(() => {
        if (status.message) {
            const timer = setTimeout(() => setStatus({ type: '', message: '' }), 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const submit = (e) => {
        e.preventDefault();
        
        // 1. Langsung kosongkan kolom input (Reset seketika)
        const currentData = { ...data }; // Simpan data sementara untuk dikirim ke EmailJS
        reset(); 
        
        // 2. Set loading dan mulai proses pengiriman di background
        setIsSending(true);
        
        const SERVICE_ID = 'service_4rn6ab8'; 
        const TEMPLATE_ID = 'template_qolkrz6';
        const PUBLIC_KEY = 'bITrQc_rPzgGF7SE3';

        // Gunakan currentData agar EmailJS tetap mengirim isi pesan yang tadi diisi
        const templateParams = {
            from_name: currentData.name,
            from_email: currentData.email,
            subject: currentData.subject,
            message: currentData.message,
            to_email: 'abujulian26@gmail.com',
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then(() => {
                setStatus({ 
                    type: 'success', 
                    message: 'Pesan berhasil dikirim! Kami akan segera menghubungi Anda.' 
                });
            })
            .catch((err) => {
                setStatus({ 
                    type: 'error', 
                    message: 'Waduh, pengiriman gagal. Silakan coba lagi nanti.' 
                });
                console.error('EmailJS Error:', err);
            })
            .finally(() => {
                setIsSending(false);
            });
    };

    return (
        <>
            <Head title="Kontak Agrifield" />
            <Navbar />

            <style>{`
                @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .glass-card { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.5); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04); }
                .bg-dots { background-image: radial-gradient(rgba(16, 185, 129, 0.15) 1.5px, transparent 1.5px); background-size: 24px 24px; }
            `}</style>

            <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans selection:bg-emerald-500 selection:text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-dots z-0"></div>

                <main className="relative z-10 pt-32 md:pt-40 pb-20 px-6 max-w-6xl mx-auto animate-fade-in-up flex-grow">
                    
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">Hubungi Kami</h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Punya pertanyaan tentang Agrifield atau ingin berkolaborasi? Tim kami siap mendengarkan pesan Anda.
                        </p>
                    </div>

                    {/* Status Alert */}
                    {status.message && (
                        <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 animate-fade-in-up ${
                            status.type === 'success' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-red-100 text-red-700 border border-red-200'
                        }`}>
                            {status.type === 'success' && <CheckCircle size={20} />}
                            <p className="font-medium">{status.message}</p>
                        </div>
                    )}

                    {/* Google Maps Embed */}
                    <div className="glass-card p-4 rounded-[2.5rem] mb-12 shadow-xl overflow-hidden border border-white">
                        <div className="w-full h-80 rounded-[2rem] overflow-hidden border border-gray-100">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.559778731151!2d103.3614001!3d-0.18091029999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e280fb495ddf4d1%3A0x37a8c68aa6973b8d!2sPASAR%20TELUK%20PINANG!5e1!3m2!1sid!2sid!4v1777601947764!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Lokasi Agrifield"
                            ></iframe>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Info Kontak Cards */}
                        <div className="space-y-6">
                            <div className="glass-card p-8 rounded-3xl flex items-center gap-6 group hover:border-emerald-200 transition-all duration-300">
                                <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                    <Mail size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">Email Resmi</h4>
                                    <p className="text-gray-500">abujulian26@gmail.com</p>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-3xl flex items-center gap-6 group hover:border-blue-200 transition-all duration-300">
                                <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Phone size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">WhatsApp</h4>
                                    <p className="text-gray-500">+62 815 8764 271</p>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-3xl flex items-center gap-6 group hover:border-purple-200 transition-all duration-300">
                                <div className="bg-purple-100 p-4 rounded-2xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                                    <MapPin size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">Lokasi Kantor</h4>
                                    <p className="text-gray-500">Bogor, Jawa Barat, Indonesia</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form onSubmit={submit} className="glass-card p-8 md:p-10 rounded-[2.5rem] space-y-6 relative border border-white">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Nama Lengkap</label>
                                    <input 
                                        type="text" 
                                        placeholder="Masukkan nama" 
                                        required 
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" 
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)} 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Alamat Email</label>
                                    <input 
                                        type="email" 
                                        placeholder="email@contoh.com" 
                                        required 
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" 
                                        value={data.email} 
                                        onChange={e => setData('email', e.target.value)} 
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Subjek Pesan</label>
                                <input 
                                    type="text" 
                                    placeholder="Apa yang ingin dibahas?" 
                                    required 
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" 
                                    value={data.subject} 
                                    onChange={e => setData('subject', e.target.value)} 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Pesan Anda</label>
                                <textarea 
                                    placeholder="Tulis pesan lengkap di sini..." 
                                    required 
                                    rows={4} 
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none transition-all" 
                                    value={data.message} 
                                    onChange={e => setData('message', e.target.value)} 
                                />
                            </div>
                            
                            <button 
                                type="submit" 
                                disabled={isSending} 
                                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSending ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Mengirim...
                                    </span>
                                ) : (
                                    <>Kirim Pesan Sekarang <Send size={20} /></>
                                )}
                            </button>
                        </form>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}