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
        <div className="flex h-screen bg-[#0B0F19] font-sans text-slate-200 overflow-hidden relative selection:bg-indigo-500/30">
            {/* Subtle Top Ambient Light */}
            <div className="absolute top-[-20%] left-[20%] w-[60%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            {/* Sidebar (Slimmer, Solid/Glass mix) */}
            <aside className="relative flex w-64 flex-col bg-[#111827]/80 backdrop-blur-3xl border-r border-white/5 z-20 transition-all duration-300">
                {/* Logo Area */}
                <div className="flex h-16 items-center px-6 border-b border-white/5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 shadow-sm shadow-indigo-500/20">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <span className="ml-3 text-sm font-semibold tracking-wide text-slate-100">
                        Heart Blooms
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 custom-scrollbar">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`
                                    group flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                    ${isActive
                                        ? 'bg-indigo-500/10 text-indigo-300'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}
                                `}
                            >
                                <div className={`mr-3 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                                    {item.icon}
                                </div>
                                {item.name}
                                {isActive && (
                                    <span className="ml-auto w-1 h-4 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Footer Profile */}
                <div className="border-t border-white/5 p-4 bg-[#111827]/40">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 border border-white/10 text-xs font-semibold text-slate-300">
                            {user?.email?.[0].toUpperCase() || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium text-slate-200">{user?.email || 'admin@demo.com'}</p>
                            <p className="truncate text-xs text-slate-500">Administrator</p>
                        </div>
                        <button
                            onClick={logout}
                            className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-white/5 rounded-md transition-colors"
                            title="Log Out"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Pane */}
            <main className="flex-1 flex flex-col min-w-0 relative z-10 bg-transparent">
                {/* Sticky Header */}
                <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-xl px-8 z-30">
                    <div>
                        <h1 className="text-lg font-semibold text-slate-100">
                            {navigation.find(n => n.href === location.pathname)?.name || 'Dashboard'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-slate-200 transition-colors">
                            <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-rose-500 ring-4 ring-[#0B0F19]"></span>
                            <span className="sr-only">View notifications</span>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Page Content Viewport */}
                <div className="flex-1 overflow-auto p-8 custom-scrollbar relative z-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
