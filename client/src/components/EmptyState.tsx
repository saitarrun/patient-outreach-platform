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
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-lg border border-gray-100 shadow-sm min-h-[400px]">
            <div className="bg-teal-50 p-4 rounded-full mb-6">
                {icon || (
                    <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 max-w-sm mb-8">{description}</p>

            {actionLabel && (actionTo || onAction) && (
                actionTo ? (
                    <Link
                        to={actionTo}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                    >
                        {actionLabel}
                    </Link>
                ) : (
                    <button
                        onClick={onAction}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                    >
                        {actionLabel}
                    </button>
                )
            )}
        </div>
    );
}
