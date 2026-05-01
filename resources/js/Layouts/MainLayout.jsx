import React from 'react';
import Footer from '@/Components/Footer'; // Import Footer yang baru dibuat

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar biasanya bisa diletakkan di sini juga agar tidak berulang */}
            
            <main className="flex-grow">
                {children}
            </main>
            
            <Footer />
        </div>
    );
}