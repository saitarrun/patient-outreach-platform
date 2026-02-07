import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientLoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Hardcoded "Demo Clinic" ID from earlier steps or env
            // ideally we fetch this or use subdomain
            const currentTenantId = 'demo';

            const res = await fetch('http://localhost:3000/api/auth/patient-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-tenant-id': currentTenantId
                },
                body: JSON.stringify({ phone, dob })
            });

            if (!res.ok) throw new Error('Invalid Credentials');

            const data = await res.json();
            localStorage.setItem('patient', JSON.stringify(data.patient));
            localStorage.setItem('patientTenantId', currentTenantId);

            navigate('/portal/dashboard');
        } catch (err) {
            setError('Login failed. Please check your details.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-teal-600 p-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-teal-100">Access your health portal</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                                placeholder="(555) 123-4567"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            <input
                                type="date"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                                value={dob}
                                onChange={e => setDob(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-teal-600/30"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 text-center text-xs text-gray-400">
                        Secure Patient Portal • Encryption Enabled
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientLoginPage;
