import { useState, useEffect } from 'react';

// Mock data interfaces
interface StatData {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
}

interface ActivityItem {
    id: string;
    user: string;
    action: string;
    time: string;
    status: 'success' | 'warning' | 'info';
}

export default function AdminDashboardPage() {
    const [isLoading, setIsLoading] = useState(true);

    const stats: StatData[] = [
        { label: 'Total Patients', value: '1,248', change: '+12%', trend: 'up' },
        { label: 'Upcoming Appointments', value: '42', change: '+5%', trend: 'up' },
        { label: 'Active Campaigns', value: '3', change: '0%', trend: 'neutral' },
        { label: 'Failed Reminders', value: '1', change: '-2', trend: 'down' }
    ];

    const recentActivity: ActivityItem[] = [
        { id: '1', user: 'System', action: 'Sent 45 appointment reminders', time: '10 mins ago', status: 'success' },
        { id: '2', user: 'Dr. Smith', action: 'Added new patient record (ID: 8fa2)', time: '1 hour ago', status: 'info' },
        { id: '3', user: 'Twilio Gateway', action: 'Message delivery failed for +15550192', time: '2 hours ago', status: 'warning' },
        { id: '4', user: 'System', action: 'Daily database backup completed', time: '5 hours ago', status: 'success' },
    ];

    useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <svg className="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-sm font-medium text-slate-400">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-10">
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Overview</h2>
                <p className="text-sm text-slate-400 mt-1">Activity and system metrics for Heart Blooms</p>
            </div>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-[#111827] border border-white/5 rounded-xl p-5 shadow-sm relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
                            <div className="p-1.5 rounded-md bg-white/5 text-slate-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                                {i === 0 && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                                {i === 1 && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                                {i === 2 && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>}
                                {i === 3 && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            </div>
                        </div>
                        <div className="flex items-end gap-3">
                            <h3 className="text-3xl font-bold text-slate-100 tracking-tight">{stat.value}</h3>
                            <span className={`flex items-center text-xs font-semibold px-1.5 py-0.5 rounded border mb-1 
                                ${stat.trend === 'up' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' :
                                    stat.trend === 'down' ? 'text-rose-400 bg-rose-400/10 border-rose-400/20' :
                                        'text-slate-400 bg-slate-500/10 border-slate-500/20'}`}>
                                {stat.change}
                                {stat.trend === 'up' && <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>}
                                {stat.trend === 'down' && <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Area - e.g. Chart area placeholder */}
                <div className="lg:col-span-2 bg-[#111827] border border-white/5 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-semibold text-slate-200">Outreach Engagement</h3>
                        <select className="bg-[#0B0F19] border border-white/10 text-slate-300 text-xs rounded-lg px-2 py-1 outline-none focus:ring-1 focus:ring-indigo-500">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>This Year</option>
                        </select>
                    </div>

                    <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-lg bg-[#0B0F19]/50">
                        <div className="text-center">
                            <svg className="w-8 h-8 text-slate-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <p className="text-xs text-slate-500 font-medium">Chart visualization loading...</p>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="text-center p-3 rounded-lg bg-white/5 border border-white/5">
                            <div className="text-xs text-slate-400 mb-1">Delivered</div>
                            <div className="text-lg font-bold text-slate-200">892</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-white/5 border border-white/5">
                            <div className="text-xs text-slate-400 mb-1">Opened</div>
                            <div className="text-lg font-bold text-emerald-400">415</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-white/5 border border-white/5">
                            <div className="text-xs text-slate-400 mb-1">Confirmed</div>
                            <div className="text-lg font-bold text-indigo-400">302</div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Recent Activity */}
                <div className="bg-[#111827] border border-white/5 rounded-xl shadow-sm flex flex-col">
                    <div className="p-5 border-b border-white/5 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-200">Recent Activity</h3>
                        <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">View All</button>
                    </div>

                    <div className="p-5 flex-1 overflow-y-auto">
                        <div className="space-y-6">
                            {recentActivity.map((item, index) => (
                                <div key={item.id} className="relative flex gap-4">
                                    {/* Timeline connector */}
                                    {index !== recentActivity.length - 1 && (
                                        <div className="absolute top-8 bottom-[-24px] left-3 w-px bg-white/10" />
                                    )}

                                    <div className="relative z-10 flex-shrink-0">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#111827] 
                                            ${item.status === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                                                item.status === 'warning' ? 'bg-rose-500/20 text-rose-400' :
                                                    'bg-indigo-500/20 text-indigo-400'}`}>
                                            {item.status === 'success' && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                            {item.status === 'warning' && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>}
                                            {item.status === 'info' && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0 pt-0.5">
                                        <p className="text-xs text-slate-200 leading-relaxed">
                                            <span className="font-semibold">{item.user}</span> {item.action}
                                        </p>
                                        <span className="text-[10px] text-slate-500 mt-1 block font-medium">{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
