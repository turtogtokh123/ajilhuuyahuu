export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    createdAt: string;
}

export interface Company {
    _id: string;
    name: string;
    description: string;
    industry: 'Technology' | 'Finance' | 'Healthcare' | 'Education' | 'Retail' | 'Other';
    location: string;
    averageRating?: number;
    createdAt: string;
}

export interface Review {
    _id: string;
    rating: number;
    comment: string;
    createdAt: string;
    companyId: string | Company;
    authorId: string | User;
}

export interface AuthResponse {
    success: boolean;
    token: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    count?: number;
    pagination?: {
        next?: { page: number; limit: number };
        prev?: { page: number; limit: number };
    };
}
