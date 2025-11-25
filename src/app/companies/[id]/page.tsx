'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import apiClient from '@/lib/axios';
import { useAuth } from '@/providers/AuthProvider';
import { Company, Review, ApiResponse } from '@/types';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Star, MapPin, Building2, User } from 'lucide-react';

export default function CompanyDetailPage() {
    const params = useParams();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [showReviewForm, setShowReviewForm] = useState(false);

    const { data: company, isLoading } = useQuery({
        queryKey: ['company', params.id],
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<Company>>(`/companies/${params.id}`);
            return response.data.data;
        },
    });

    const { data: reviews } = useQuery({
        queryKey: ['reviews', params.id],
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<Review[]>>(`/companies/${params.id}/reviews`);
            return response.data.data;
        },
    });

    const addReviewMutation = useMutation({
        mutationFn: async (data: { rating: number; comment: string }) => {
            return apiClient.post(`/companies/${params.id}/reviews`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews', params.id] });
            queryClient.invalidateQueries({ queryKey: ['company', params.id] });
            setComment('');
            setRating(5);
            setShowReviewForm(false);
        },
    });

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        addReviewMutation.mutate({ rating, comment });
    };

    if (isLoading) {
        return <div className="text-center py-12">Loading...</div>;
    }

    if (!company) {
        return <div className="text-center py-12">Company not found</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Company Header */}
            <Card className="mb-8">
                <CardBody className="space-y-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                            <Building2 className="h-12 w-12 text-blue-600" />
                            <div>
                                <h1 className="text-3xl font-bold">{company.name}</h1>
                                <div className="flex items-center space-x-4 mt-2 text-gray-600 dark:text-gray-400">
                                    <span className="flex items-center space-x-1">
                                        <MapPin className="h-4 w-4" />
                                        <span>{company.location}</span>
                                    </span>
                                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded-full text-sm">
                                        {company.industry}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {company.averageRating && (
                            <div className="flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900/20 px-4 py-2 rounded-lg">
                                <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                                <span className="text-2xl font-bold">{company.averageRating.toFixed(1)}</span>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{company.description}</p>
                </CardBody>
            </Card>

            {/* Review Form */}
            {user && (
                <Card className="mb-8">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">Write a Review</h2>
                            {!showReviewForm && (
                                <Button onClick={() => setShowReviewForm(true)}>Add Review</Button>
                            )}
                        </div>
                    </CardHeader>
                    {showReviewForm && (
                        <CardBody>
                            <form onSubmit={handleSubmitReview} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Rating</label>
                                    <div className="flex space-x-2">
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <button
                                                key={value}
                                                type="button"
                                                onClick={() => setRating(value)}
                                                className="focus:outline-none"
                                            >
                                                <Star
                                                    className={`h-8 w-8 ${value <= rating
                                                            ? 'text-yellow-500 fill-yellow-500'
                                                            : 'text-gray-300 dark:text-gray-600'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <Input
                                    label="Comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Share your experience..."
                                    required
                                />
                                <div className="flex space-x-2">
                                    <Button type="submit" disabled={addReviewMutation.isPending}>
                                        {addReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowReviewForm(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardBody>
                    )}
                </Card>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Reviews</h2>
                {reviews && reviews.length > 0 ? (
                    reviews.map((review) => (
                        <Card key={review._id}>
                            <CardBody className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <User className="h-5 w-5 text-gray-400" />
                                        <span className="font-semibold">Anonymous</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < review.rating
                                                        ? 'text-yellow-500 fill-yellow-500'
                                                        : 'text-gray-300 dark:text-gray-600'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </CardBody>
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                        No reviews yet. Be the first to review!
                    </p>
                )}
            </div>
        </div>
    );
}
