'use client';

import { Building2, Github, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <Building2 className="h-8 w-8 text-blue-500" />
                            <span className="text-2xl font-bold text-white">ReviewHub</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            {t.footer.tagline}
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-500 transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-blue-500 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-blue-500 transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">{t.footer.company}</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-500 transition-colors">{t.footer.about}</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">{t.footer.careers}</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">{t.footer.blog}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">{t.footer.support}</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-500 transition-colors">{t.footer.helpCenter}</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">{t.footer.privacy}</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">{t.footer.terms}</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} ReviewHub. {t.footer.rights}.</p>
                </div>
            </div>
        </footer>
    );
}
