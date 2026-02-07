import { useEffect, useState } from 'react';
import type { Patient } from '@app/shared';
import EmptyState from '../components/EmptyState';
import AddPatientModal from '../components/AddPatientModal';

export default function PatientsPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // DEMO: We explicitly ask for the 'demo' tenant
        fetch('/api/patients', {
            headers: {
                'x-tenant-id': 'demo'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setPatients(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handlePatientCreated = (newPatient: Patient) => {
        setPatients([...patients, newPatient]);
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading patients...</div>;

    if (patients.length === 0) {
        return (
            <div className="max-w-4xl mx-auto mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 px-4">Patients</h2>
                <EmptyState
                    title="No patients yet"
                    description="Get started by adding your first patient to the system. You'll be able to schedule appointments and send reminders."
                    actionLabel="Add Patient"
                    onAction={() => setIsModalOpen(true)}
                    icon={
                        <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    }
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
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Patients</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors shadow-sm"
                >
                    + Add Patient
                </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {patients.map((patient) => (
                            <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{patient.firstName} {patient.lastName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{patient.email}</div>
                                    <div className="text-sm text-gray-500">{patient.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{patient.dob ? new Date(patient.dob).toLocaleDateString() : 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button className="text-teal-600 hover:text-teal-900 font-medium">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AddPatientModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handlePatientCreated}
            />
        </div>
    );
}
