import React, { useState, useEffect } from 'react';
import { X, Megaphone, Sparkles } from 'lucide-react';

export default function NewsPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Cek apakah user sudah pernah melihat pop-up
        const hasSeenPopup = localStorage.getItem('agrifield_popup_seen');
        if (!hasSeenPopup) {
            // Beri jeda 1.5 detik agar website loading dulu
            const timer = setTimeout(() => setIsOpen(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const closePopup = () => {
        setIsOpen(false);
        // Tandai bahwa user sudah melihatnya
        localStorage.setItem('agrifield_popup_seen', 'true');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop dengan blur */}
            <div 
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in"
                onClick={closePopup}
            ></div>

            {/* Modal Card */}
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative animate-in zoom-in duration-300">
                <button 
                    onClick={closePopup}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="bg-emerald-100 p-4 rounded-full text-emerald-600 mb-6">
                        <Sparkles size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">Selamat Datang di Agrifield!</h2>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                        Temukan solusi pertanian terbaik dan update teknologi terbaru kami untuk hasil panen yang lebih maksimal.
                    </p>
                    
                    <button 
                        onClick={closePopup}
                        className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition"
                    >
                        Mulai Jelajahi
                    </button>
                </div>
            </div>
        </div>
    );
}