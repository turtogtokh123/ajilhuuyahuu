'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import apiClient from '@/lib/axios';
import { User, AuthResponse } from '@/types';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if token exists and fetch user data
        const token = Cookies.get('token');
        if (token) {
            // Decode JWT to get user info (simple approach)
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                // In a real app, you'd fetch user details from the API
                setUser({ _id: payload.id, role: payload.role } as User);
            } catch (error) {
                console.error('Failed to decode token', error);
                Cookies.remove('token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
        const { token } = response.data;
        Cookies.set('token', token, { expires: 30 });

        // Decode token to get user info
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ _id: payload.id, role: payload.role, email, name: '' } as User);
    };

    const register = async (name: string, email: string, password: string) => {
        const response = await apiClient.post<AuthResponse>('/auth/register', { name, email, password });
        const { token } = response.data;
        Cookies.set('token', token, { expires: 30 });

        // Decode token to get user info
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ _id: payload.id, role: payload.role, email, name } as User);
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
