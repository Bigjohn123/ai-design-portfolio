
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { SITE_CONFIG } from '../../config';

export const SettingsPage = () => {
    const [config, setConfig] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const { data, error } = await supabase
                .from('site_config')
                .select('config')
                .eq('id', 1)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 is "Relation not found" or "No rows found"
                throw error;
            }

            if (data) {
                setConfig(JSON.stringify(data.config, null, 2));
            } else {
                // Fallback to local config if no DB config found
                setConfig(JSON.stringify(SITE_CONFIG, null, 2));
            }
        } catch (error) {
            console.error('Error fetching config:', error);
            setMessage({ type: 'error', text: 'Failed to fetch config' });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const parsedConfig = JSON.parse(config);

            const { error } = await supabase
                .from('site_config')
                .upsert({ id: 1, config: parsedConfig });

            if (error) throw error;
            setMessage({ type: 'success', text: 'Configuration saved successfully!' });
        } catch (error) {
            console.error('Error saving config:', error);
            if (error instanceof SyntaxError) {
                setMessage({ type: 'error', text: 'Invalid JSON format' });
            } else {
                setMessage({ type: 'error', text: 'Failed to save config' });
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Site Configuration</h1>

            {message && (
                <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="bg-white shadow sm:rounded-lg border border-gray-200">
                <div className="px-4 py-5 sm:p-6 bg-white">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Global JSON Configuration
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>
                            Directly edit the site configuration JSON. Be careful to maintain valid JSON syntax.
                        </p>
                    </div>
                    <div className="mt-5">
                        <textarea
                            rows={20}
                            className="font-mono text-sm"
                            value={config}
                            onChange={(e) => setConfig(e.target.value)}
                        />
                    </div>
                    <div className="mt-5">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="admin-btn admin-btn-primary"
                        >
                            Save Configuration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
