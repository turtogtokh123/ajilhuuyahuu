'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import apiClient from '@/lib/axios';
import { Company, ApiResponse } from '@/types';
import { Card, CardBody } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Star, MapPin, Building2 } from 'lucide-react';

export default function CompaniesPage() {
    const [industry, setIndustry] = useState('');
    const [location, setLocation] = useState('');

    const { data, isLoading } = useQuery({
        queryKey: ['companies', industry, location],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (industry) params.append('industry', industry);
            if (location) params.append('location', location);

            const response = await apiClient.get<ApiResponse<Company[]>>(`/companies?${params}`);
            return response.data.data;
        },
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold mb-8">Explore Companies</h1>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Select
                    label="Industry"
                    options={[
                        { value: '', label: 'All Industries' },
                        { value: 'Technology', label: 'Technology' },
                        { value: 'Finance', label: 'Finance' },
                        { value: 'Healthcare', label: 'Healthcare' },
                        { value: 'Education', label: 'Education' },
                        { value: 'Retail', label: 'Retail' },
                        { value: 'Other', label: 'Other' },
                    ]}
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                />
                <Select
                    label="Location"
                    options={[
                        { value: '', label: 'All Locations' },
                        { value: 'New York', label: 'New York' },
                        { value: 'San Francisco', label: 'San Francisco' },
                        { value: 'London', label: 'London' },
                        { value: 'Remote', label: 'Remote' },
                    ]}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            {/* Companies Grid */}
            {isLoading ? (
                <div className="text-center py-12">Loading...</div>
            ) : data && data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((company) => (
                        <Link key={company._id} href={`/companies/${company._id}`}>
                            <Card hover className="h-full">
                                <CardBody className="space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Building2 className="h-6 w-6 text-blue-600" />
                                            <h3 className="font-bold text-lg">{company.name}</h3>
                                        </div>
                                        {company.averageRating && (
                                            <div className="flex items-center space-x-1 bg-yellow-100 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
                                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                <span className="text-sm font-semibold">{company.averageRating.toFixed(1)}</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                                        {company.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                                            {company.industry}
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>{company.location}</span>
                                        </span>
                                    </div>
                                </CardBody>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    No companies found
                </div>
            )}
        </div>
    );
}
