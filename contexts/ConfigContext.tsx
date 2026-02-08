
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { AppConfig } from '../types';
import { SITE_CONFIG as DEFAULT_CONFIG } from '../config';

interface ConfigContextType {
    config: AppConfig;
    loading: boolean;
    refreshConfig: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
    const [loading, setLoading] = useState(true);

    const fetchConfig = async () => {
        try {
            const { data, error } = await supabase
                .from('site_config')
                .select('config')
                .eq('id', 1)
                .single();

            if (error && error.code !== 'PGRST116') throw error;

            if (data) {
                setConfig({ ...DEFAULT_CONFIG, ...data.config });
            }
        } catch (error) {
            console.error('Error fetching config:', error);
            // Fallback to default config is already set
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    return (
        <ConfigContext.Provider value={{ config, loading, refreshConfig: fetchConfig }}>
            {children}
        </ConfigContext.Provider>
    );
}

export function useConfig() {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
}
