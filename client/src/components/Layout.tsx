import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold text-blue-600">MediConnect</h1>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/" className="block p-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded">Dashboard</Link>
                    <Link to="/patients" className="block p-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded">Patients</Link>
                    <Link to="/appointments" className="block p-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded">Appointments</Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8">
                <Outlet />
            </main>
        </div>
    );
}
