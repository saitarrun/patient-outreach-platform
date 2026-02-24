import React from 'react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    actionTo?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
}

export default function EmptyState({
    title,
    description,
    actionLabel,
    actionTo,
    onAction,
    icon
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 shadow-xl min-h-[400px] relative overflow-hidden group">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-700" />

            <div className="relative z-10 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 p-6 rounded-3xl mb-6 shadow-iner border border-white/5">
                {icon || (
                    <svg className="w-12 h-12 text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                )}
            </div>

            <h3 className="relative z-10 text-2xl font-bold text-white mb-2 tracking-wide">{title}</h3>
            <p className="relative z-10 text-blue-100/70 max-w-sm mb-8 leading-relaxed font-light">{description}</p>

            {actionLabel && (actionTo || onAction) && (
                <div className="relative z-10">
                    {actionTo ? (
                        <Link
                            to={actionTo}
                            className="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-full shadow-lg shadow-cyan-500/30 text-white bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 hover:shadow-cyan-500/50 transition-all duration-300"
                        >
                            {actionLabel}
                        </Link>
                    ) : (
                        <button
                            onClick={onAction}
                            className="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-full shadow-lg shadow-cyan-500/30 text-white bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 hover:shadow-cyan-500/50 transition-all duration-300"
                        >
                            {actionLabel}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
