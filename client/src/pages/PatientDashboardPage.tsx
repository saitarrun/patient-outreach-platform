import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Appointment {
    id: string;
    date: string;
    type: string;
    status: string;
}

const PatientDashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [patient, setPatient] = useState<any>(null);
    const [appointments] = useState<Appointment[]>([{ id: 'uuid-1', date: '2025-02-12T10:00:00Z', type: 'Checkup', status: 'SCHEDULED' }]); // Mock data for demo

    useEffect(() => {
        const p = localStorage.getItem('patient');
        const t = localStorage.getItem('patientTenantId');
        if (!p || !t) {
            navigate('/portal/login');
            return;
        }
        setPatient(JSON.parse(p));

        // Fetch Appointments (Mock for now, normally filtered by Patient ID in backend)
        // In real app: GET /api/patients/me/appointments
        // For MVP: We just show a placeholder or fetch all if filtered by tenant
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">My Health</h1>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 hidden sm:inline">Hello, {patient?.firstName}</span>
                    <div className="h-8 w-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                        {patient?.firstName?.[0]}
                    </div>
                </div>
            </header>

            <main className="p-4 max-w-2xl mx-auto space-y-6">

                {/* Hero Card */}
                <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-6 text-white shadow-lg">
                    <h2 className="text-2xl font-bold mb-1">Next Appointment</h2>
                    <p className="text-teal-100 mb-6">You have an upcoming visit.</p>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-lg">Dr. Smith</h3>
                                <p className="text-teal-100 text-sm">General Checkup</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-xl">Feb 12</p>
                                <p className="text-teal-100 text-sm">10:00 AM</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={async () => {
                                // Hardcoded ID for MVP demo or from appointment list
                                // In real app, we iterate appointments
                                const apptId = appointments[0]?.id || 'uuid-here';
                                await fetch(`http://localhost:3000/api/appointments/${apptId}/confirm`, { method: 'POST' });
                                alert('Appointment Confirmed!');
                                window.location.reload();
                            }}
                            className="flex-1 bg-white text-teal-700 font-bold py-3 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                        >
                            Confirm
                        </button>
                        <button
                            onClick={() => {
                                const apptId = appointments[0]?.id || 'uuid-here';
                                const newDate = prompt("Enter new date (YYYY-MM-DD):");
                                if (newDate) {
                                    fetch(`http://localhost:3000/api/appointments/${apptId}/reschedule`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ date: newDate })
                                    }).then(() => {
                                        alert('Rescheduled!');
                                        window.location.reload();
                                    });
                                }
                            }}
                            className="flex-1 bg-teal-600/50 border border-white/30 text-white font-semibold py-3 rounded-lg hover:bg-teal-600/70 transition-colors"
                        >
                            Reschedule
                        </button>
                    </div>
                </div>

                {/* Info Section */}
                <div>
                    <h3 className="font-bold text-gray-700 mb-3 px-1">Past Visits</h3>
                    <div className="bg-white rounded-xl shadow-sm p-4 text-center text-gray-500 py-8">
                        No past visits found.
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={() => {
                            localStorage.clear();
                            navigate('/portal/login');
                        }}
                        className="text-red-500 text-sm font-medium hover:underline"
                    >
                        Sign Out
                    </button>
                </div>
            </main>
        </div>
    );
};

export default PatientDashboardPage;
