import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Users, Mail, Clock } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id'; // Import bahasa Indonesia

// Inisialisasi dayjs
dayjs.extend(relativeTime);
dayjs.locale('id');

export default function Index({ users }) {
    return (
        <AdminLayout>
            <Head title="Daftar Pengguna" />
            
            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900">Daftar Pengguna</h1>
                <p className="text-gray-500 text-sm">Total ada {users.length} pengguna yang terdaftar.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-5 font-bold text-gray-600 text-sm">Nama</th>
                            <th className="p-5 font-bold text-gray-600 text-sm">Email</th>
                            <th className="p-5 font-bold text-gray-600 text-sm">Waktu Bergabung</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-semibold text-gray-800">{user.name}</td>
                                <td className="p-4 text-gray-600 flex items-center gap-2">
                                    <Mail size={16} /> {user.email}
                                </td>
                                <td className="p-4 text-gray-500 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} />
                                        {/* Menampilkan format: 5 menit yang lalu */}
                                        <span title={dayjs(user.created_at).format('DD MMMM YYYY HH:mm')}>
                                            {dayjs(user.created_at).fromNow()}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}