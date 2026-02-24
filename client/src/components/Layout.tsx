import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
    const { user, logout } = useAuth();
    const location = useLocation();

    const navigation = [
        {
            name: 'Dashboard', href: '/dashboard', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            )
        },
        {
            name: 'Patients', href: '/patients', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            )
        },
        {
            name: 'Appointments', href: '/appointments', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            )
        },
        {
            name: 'Settings', href: '/settings', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            )
        },
    ];

    return (
        <div className="min-h-screen bg-slate-900 font-sans text-slate-100 overflow-hidden relative selection:bg-cyan-500/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-cyan-500/20 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <div className="relative z-10 flex h-screen p-4 gap-4">
                {/* Glass Sidebar */}
                <div className="w-20 lg:w-72 flex-shrink-0 flex flex-col rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                    {/* Logo Area */}
                    <div className="h-24 flex items-center justify-center lg:justify-start lg:px-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <span className="hidden lg:block ml-4 text-xl font-bold text-white tracking-wide">
                            Heart Blooms
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`
                                        flex items-center px-4 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden
                                        ${isActive
                                            ? 'bg-blue-500/20 text-white shadow-lg shadow-blue-500/10 after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:bg-cyan-400'
                                            : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                                    `}
                                >
                                    <div className={`
                                        relative z-10 p-1 rounded-lg transition-transform duration-300 group-hover:scale-110 
                                        ${isActive ? 'text-cyan-300' : 'text-current'}
                                    `}>
                                        {item.icon}
                                    </div>
                                    <span className="hidden lg:block ml-3 font-medium tracking-wide relative z-10">
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 mt-auto">
                        <div className="flex items-center p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
                                {user?.email?.[0].toUpperCase() || 'A'}
                            </div>
                            <div className="hidden lg:block ml-3 overflow-hidden">
                                <p className="text-sm font-medium text-white truncate group-hover:text-cyan-200 transition-colors">
                                    {user?.email || 'Admin User'}
                                </p>
                                <p className="text-xs text-slate-400 truncate">Administrator</p>
                            </div>
                            <button
                                onClick={logout}
                                className="hidden lg:block ml-auto text-slate-400 hover:text-red-400 p-2 hover:bg-white/5 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden relative">
                    {/* Inner Gradient Overlay for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                    {/* Glass Header */}
                    <header className="h-20 flex-shrink-0 flex items-center justify-between px-8 relative z-20">
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">
                                {navigation.find(n => n.href === location.pathname)?.name || 'Dashboard'}
                            </h1>
                            <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse"></span>
                                Live System Status
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="relative p-3 text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-all">
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></span>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                        </div>
                    </header>

                    {/* Scrollable Page Content */}
                    <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative z-20 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}
