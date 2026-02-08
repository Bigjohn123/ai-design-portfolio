
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const DashboardPage = () => {
    const { user, signOut } = useAuth();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p>Welcome, {user?.email}</p>
            <button
                onClick={signOut}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Sign Out
            </button>
        </div>
    );
};
