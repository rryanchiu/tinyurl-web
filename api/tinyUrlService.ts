export interface ShortenResponse {
    code: number;
    message: string;
    data: {
        shortUrl: string;
        expireSeconds: number;
        code?: string;
    };
}

export interface ShortenRequest {
    longUrl: string;
    expireSeconds: number;
    code?: string;

}


export async function getShortUrl(request: ShortenRequest): Promise<ShortenResponse | null> {
    const apiUrl = 'https://s.rryan.me/api/tinyurl/shorten';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data: ShortenResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to shorten the URL:', error);
        return null;
    }
}

