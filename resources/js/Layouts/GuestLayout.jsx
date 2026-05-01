import { Link } from '@inertiajs/react';
import { Sprout } from 'lucide-react';

export default function Guest({ children }) {
    return (
        // Menggunakan bg-gradient agar jelas perbedaannya dari putih polos
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-teal-100 font-sans text-gray-900 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 relative overflow-hidden selection:bg-emerald-500 selection:text-white">
            
            {/* --- DEKORASI BACKGROUND --- */}
            <style>{`
                .bg-dots { 
                    background-image: radial-gradient(rgba(16, 185, 129, 0.2) 1.5px, transparent 1.5px); 
                    background-size: 24px 24px; 
                }
                @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
                .animate-float { animation: float 6s ease-in-out infinite; }
            `}</style>
            
            <div className="absolute inset-0 bg-dots z-0"></div>
            
            {/* Cahaya Pendar (Glow) yang lebih terlihat */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-400/30 blur-[100px] z-0 animate-float"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-400/20 blur-[100px] z-0 animate-float" style={{ animationDelay: '2s' }}></div>

            {/* --- LOGO AGRIFIELD --- */}
            <div className="relative z-10 mb-8 mt-10 sm:mt-0 flex flex-col items-center">
                <Link href="/" className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform duration-300">
                    <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-3.5 rounded-2xl shadow-xl shadow-emerald-500/30">
                        <Sprout size={32} className="text-white" />
                    </div>
                    <span className="text-4xl font-black tracking-tight text-gray-900">
                        Agrifield<span className="text-emerald-500">.</span>
                    </span>
                </Link>
            </div>

            {/* --- KOTAK FORM LOGIN / REGISTER --- */}
            <div className="w-full sm:max-w-md px-8 py-10 bg-white/70 backdrop-blur-xl shadow-2xl shadow-emerald-900/10 border border-white overflow-hidden sm:rounded-[2.5rem] relative z-10">
                {children}
            </div>
            
            {/* --- FOOTER KECIL --- */}
            <div className="relative z-10 mt-10 mb-10 text-center text-sm font-bold text-emerald-700/50 uppercase tracking-widest">
                Secure & Encrypted System &copy; 2026
            </div>
            
        </div>
    );
}