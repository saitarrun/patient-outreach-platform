import EmptyState from '../components/EmptyState';

export default function AppointmentsPage() {
    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 px-4">Appointments</h2>
            <EmptyState
                title="Scheduling Coming Soon"
                description="We are currently building the advanced scheduling engine. Soon you'll be able to manage all patient visits here."
                icon={
                    <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                }
            />
        </div>
    );
}
