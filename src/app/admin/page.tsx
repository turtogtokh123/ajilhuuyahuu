'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import apiClient from '@/lib/axios';
import { Company, ApiResponse } from '@/types';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Trash2, Edit, Plus } from 'lucide-react';

export default function AdminPage() {
    const router = useRouter();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        industry: 'Technology',
        location: '',
    });

    // Redirect if not admin
    if (user && user.role !== 'admin') {
        router.push('/');
        return null;
    }

    const { data: companies } = useQuery({
        queryKey: ['admin-companies'],
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<Company[]>>('/companies');
            return response.data.data;
        },
    });

    const addCompanyMutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            return apiClient.post('/companies', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-companies'] });
            setShowAddForm(false);
            setFormData({ name: '', description: '', industry: 'Technology', location: '' });
        },
    });

    const deleteCompanyMutation = useMutation({
        mutationFn: async (id: string) => {
            return apiClient.delete(`/companies/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-companies'] });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addCompanyMutation.mutate(formData);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this company?')) {
            deleteCompanyMutation.mutate(id);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                {!showAddForm && (
                    <Button onClick={() => setShowAddForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Company
                    </Button>
                )}
            </div>

            {/* Add Company Form */}
            {showAddForm && (
                <Card className="mb-8">
                    <CardHeader>
                        <h2 className="text-xl font-bold">Add New Company</h2>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Company Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter company name"
                                required
                            />
                            <Input
                                label="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Enter company description"
                                required
                            />
                            <Select
                                label="Industry"
                                options={[
                                    { value: 'Technology', label: 'Technology' },
                                    { value: 'Finance', label: 'Finance' },
                                    { value: 'Healthcare', label: 'Healthcare' },
                                    { value: 'Education', label: 'Education' },
                                    { value: 'Retail', label: 'Retail' },
                                    { value: 'Other', label: 'Other' },
                                ]}
                                value={formData.industry}
                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            />
                            <Input
                                label="Location"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="Enter location"
                                required
                            />
                            <div className="flex space-x-2">
                                <Button type="submit" disabled={addCompanyMutation.isPending}>
                                    {addCompanyMutation.isPending ? 'Adding...' : 'Add Company'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            )}

            {/* Companies Table */}
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold">Manage Companies</h2>
                </CardHeader>
                <CardBody>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="text-left py-3 px-4">Name</th>
                                    <th className="text-left py-3 px-4">Industry</th>
                                    <th className="text-left py-3 px-4">Location</th>
                                    <th className="text-left py-3 px-4">Rating</th>
                                    <th className="text-right py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies && companies.map((company) => (
                                    <tr key={company._id} className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="py-3 px-4 font-semibold">{company.name}</td>
                                        <td className="py-3 px-4">{company.industry}</td>
                                        <td className="py-3 px-4">{company.location}</td>
                                        <td className="py-3 px-4">
                                            {company.averageRating ? company.averageRating.toFixed(1) : 'N/A'}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(company._id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
