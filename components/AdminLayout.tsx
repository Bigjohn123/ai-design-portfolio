
import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const AdminLayout = () => {
    const { signOut, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const navigation = [
        { name: 'Dashboard', href: '/admin' },
        { name: 'Projects', href: '/admin/projects' },
        { name: 'Articles', href: '/admin/articles' },
        { name: 'Settings', href: '/admin/settings' },
    ];

    const handleSignOut = async () => {
        await signOut();
        navigate('/admin/login');
    };

    return (
        <div className="admin-root min-h-screen flex">
            {/* Sidebar */}
            <div className="admin-sidebar w-64 flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold">Portfolio Admin</h1>
                    <p className="text-sm text-muted truncatemt-1">{user?.email}</p>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`admin-nav-link ${isActive ? 'active' : ''}`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="admin-content flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};
