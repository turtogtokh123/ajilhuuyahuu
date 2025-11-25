'use client';

import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { Button } from '@/components/ui/Button';
import { Building2, LogOut, User, LayoutDashboard, Languages } from 'lucide-react';

export function Navbar() {
    const { user, logout } = useAuth();
    const { language, setLanguage, t } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'mn' : 'en');
    };

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <Building2 className="h-8 w-8 text-blue-600" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ReviewHub
                        </span>
                    </Link>

                    <div className="flex items-center space-x-6">
                        <Link
                            href="/companies"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {t.navbar.companies}
                        </Link>

                        <button
                            onClick={toggleLanguage}
                            className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            title={language === 'en' ? 'Switch to Mongolian' : 'Switch to English'}
                        >
                            <Languages className="h-4 w-4" />
                            <span className="text-sm">{language === 'en' ? 'MN' : 'EN'}</span>
                        </button>

                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link
                                        href="/admin"
                                        className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        <span>{t.navbar.admin}</span>
                                    </Link>
                                )}
                                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                    <User className="h-4 w-4" />
                                    <span className="text-sm">{user.role}</span>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={logout}
                                    className="flex items-center space-x-1"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>{t.navbar.logout}</span>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login">
                                    <Button variant="outline" size="sm">
                                        {t.navbar.login}
                                    </Button>
                                </Link>
                                <Link href="/auth/register">
                                    <Button size="sm">{t.navbar.signUp}</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
