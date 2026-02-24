import { useEffect, useState, useMemo } from 'react';
import type { Patient } from '@app/shared';
// @ts-ignore
import { useAuth } from '../contexts/AuthContext';
import EmptyState from '../components/EmptyState';
import AddPatientModal from '../components/AddPatientModal';

export default function PatientsPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const { user } = useAuth();

    useEffect(() => {
        // DEMO: Explicitly ask for 'demo' tenant and include user ID
        const headers: HeadersInit = {
            'x-tenant-id': 'demo'
        };

        if (user?.id) {
            headers['x-user-id'] = user.id;
        }

        fetch('/api/patients', { headers })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 403) throw new Error('Access Denied');
                    throw new Error('Failed to fetch patients');
                }
                return res.json();
            })
            .then((data) => {
                setPatients(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setPatients([]); // Ensure array on error
                setLoading(false);
            });
    }, [user]);

    const handlePatientCreated = (newPatient: Patient) => {
        setPatients([...patients, newPatient]);
    };

    // Stats calculation
    const stats = useMemo(() => {
        const total = patients.length;
        // Mocking active count for Visuals
        const active = patients.length;

        // Mock new patients count
        const newThisMonth = Math.floor(total * 0.2) + 1;

        return [
            { label: 'Total Patients', value: total, icon: 'Users', change: '+12%', color: 'from-blue-400 to-cyan-300' },
            { label: 'Active Cases', value: active, icon: 'Activity', change: '+5%', color: 'from-emerald-400 to-teal-300' },
            { label: 'New (Month)', value: newThisMonth, icon: 'UserPlus', change: '+18%', color: 'from-purple-400 to-pink-300' },
        ];
    }, [patients]);

    const filteredPatients = patients.filter(patient =>
        patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (patient.email && patient.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin"></div>
                </div>
            </div>
        );
    }

    // Determine if we show empty state (no patients at all, no search)
    if (patients.length === 0 && !searchQuery) {
        return (
            <div className="max-w-4xl mx-auto mt-10">
                <EmptyState
                    title="No Patients Found"
                    description="Get started by adding your first patient to the system."
                    actionLabel="Add Patient"
                    onAction={() => setIsModalOpen(true)}
                />
                <AddPatientModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handlePatientCreated}
                />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Page Title Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
                        Patient Management
                    </h2>
                    <p className="text-blue-100/70 mt-1 font-light">
                        Overview of all registered patients
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Patient
                    </span>
                    <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 origin-left" />
                </button>
            </div>

            {/* Glass Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 p-6 shadow-xl group hover:bg-white/10 transition-colors"
                    >
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg shadow-blue-900/20`}>
                                    {stat.icon === 'Users' && (
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    )}
                                    {stat.icon === 'Activity' && (
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    )}
                                    {stat.icon === 'UserPlus' && (
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                                    )}
                                </div>
                                <span className="flex items-center text-emerald-400 text-sm font-medium bg-emerald-400/10 px-2 py-1 rounded-lg border border-emerald-400/20">
                                    {stat.change}
                                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                                </span>
                            </div>
                            <h3 className="text-blue-100/60 text-sm font-medium uppercase tracking-wider">{stat.label}</h3>
                            <p className="text-4xl font-bold text-white mt-1 drop-shadow-sm">{stat.value}</p>
                        </div>

                        {/* Decor: Wavy Line */}
                        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30 pointer-events-none">
                            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                                <path d="M0 20 Q 25 40 50 20 T 100 20" stroke="url(#gradient-path)" strokeWidth="2" fill="none" />
                                <defs>
                                    <linearGradient id="gradient-path" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                                        <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
                                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search & Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-blue-200/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search patients by name or ID..."
                        className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-blue-200/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all backdrop-blur-sm shadow-inner"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex rounded-2xl bg-white/5 p-1 border border-white/10 backdrop-blur-sm">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white/10 text-cyan-300 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    </button>
                    <button
                        onClick={() => setViewMode('table')}
                        className={`p-3 rounded-xl transition-all ${viewMode === 'table' ? 'bg-white/10 text-cyan-300 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {filteredPatients.length === 0 ? (
                <div className="rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 p-12 text-center shadow-xl">
                    <svg className="w-16 h-16 text-blue-200/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-white mb-2">No patients found</h3>
                    <p className="text-blue-200/70">Try adjusting your search terms or add a new patient.</p>
                </div>
            ) : (
                <>
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPatients.map((patient: Patient & { active?: boolean }) => (
                                <div
                                    key={patient.id}
                                    className="group relative rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 p-6 shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="absolute top-4 right-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${true ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${true ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]' : 'bg-gray-400'}`}></span>
                                            Active
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-400 via-cyan-400 to-indigo-500 p-[2px] shadow-lg shadow-blue-500/20">
                                            <div className="h-full w-full rounded-[14px] bg-slate-900/50 flex items-center justify-center backdrop-blur-sm">
                                                <span className="text-xl font-bold text-white">
                                                    {patient.firstName[0]}{patient.lastName[0]}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white tracking-wide">{patient.firstName} {patient.lastName}</h3>
                                            <p className="text-sm text-blue-200/70">ID: {patient.id.slice(0, 8)}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {patient.email && (
                                            <div className="flex items-center text-sm text-slate-300 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                                <svg className="flex-shrink-0 mr-3 h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                <span className="truncate">{patient.email}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center text-sm text-slate-300 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                            <svg className="flex-shrink-0 mr-3 h-5 w-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                            {patient.phone}
                                        </div>
                                        {patient.dob && (
                                            <div className="flex items-center text-sm text-slate-300 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                                <svg className="flex-shrink-0 mr-3 h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                <span>{new Date(patient.dob).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-6">
                                        <button className="w-full py-2.5 rounded-xl border border-white/20 text-sm font-medium text-white hover:bg-white/10 hover:border-white/30 transition-all flex items-center justify-center group-hover:border-cyan-400/30 group-hover:text-cyan-100">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden shadow-xl">
                            <table className="min-w-full divide-y divide-white/10">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Name</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Contact</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Date of Birth</th>
                                        <th scope="col" className="relative px-6 py-4">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredPatients.map((patient: Patient & { active?: boolean }) => (
                                        <tr key={patient.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-md">
                                                            {patient.firstName[0]}
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-white">{patient.firstName} {patient.lastName}</div>
                                                        <div className="text-xs text-blue-200/50">ID: {patient.id.slice(0, 6)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-slate-300">{patient.email || 'N/A'}</div>
                                                <div className="text-sm text-slate-400">{patient.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${true ? 'bg-emerald-500/10 text-emerald-300' : 'bg-gray-500/10 text-gray-400'}`}>
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                                {patient.dob ? new Date(patient.dob).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Edit</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}

            <AddPatientModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handlePatientCreated}
            />
        </div>
    );
}
