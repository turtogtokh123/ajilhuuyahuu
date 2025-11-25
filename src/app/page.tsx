'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/providers/LanguageProvider';
import { Building2, Star, Users, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t.home.heroTitle}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {t.home.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/companies">
              <Button size="lg" className="w-full sm:w-auto">
                {t.home.exploreCompanies}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {t.home.writeReview}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t.home.whyTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 mb-4">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.home.feature1Title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t.home.feature1Desc}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.home.feature2Title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t.home.feature2Desc}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/20 mb-4">
                <TrendingUp className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.home.feature3Title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t.home.feature3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <Users className="h-16 w-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">{t.home.ctaTitle}</h2>
          <p className="text-lg mb-8 opacity-90">
            {t.home.ctaDesc}
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary">
              {t.home.getStarted}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
