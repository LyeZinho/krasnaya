// src/lib/services/api.service.ts
export class ApiService {
    private static readonly API_BASE_URL = '/api/v1';

    static async get<T>(endpoint: string, headers: Record<string, string> = {}): Promise<T> {
        const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });
        return this.handleResponse<T>(response);
    }

    static async post<T>(endpoint: string, data: any, headers: Record<string, string> = {}): Promise<T> {
        const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });
        return this.handleResponse<T>(response);
    }

    static async patch<T>(endpoint: string, data: any, headers: Record<string, string> = {}): Promise<T> {
        const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });
        return this.handleResponse<T>(response);
    }

    static async delete<T>(endpoint: string, headers: Record<string, string> = {}): Promise<T> {
        const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });
        return this.handleResponse<T>(response);
    }

    private static async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            let errorMessage = 'Falha na comunicação com o servidor.';
            try {
                const errorData = await response.json();
                if (errorData.message) errorMessage = errorData.message;
            } catch (e) {
                // Ignore json parse error if the response text is not json
            }
            throw new Error(errorMessage);
        }
        return response.json();
    }
}

// Generic request function for convenience
export async function request<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
): Promise<T> {
    switch (method) {
        case 'GET':
            return ApiService.get<T>(endpoint, headers);
        case 'POST':
            return ApiService.post<T>(endpoint, data, headers);
        case 'PATCH':
            return ApiService.patch<T>(endpoint, data, headers);
        case 'DELETE':
            return ApiService.delete<T>(endpoint, headers);
    }
}
