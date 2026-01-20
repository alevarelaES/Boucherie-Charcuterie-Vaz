import { useEffect, useState } from 'react';
import { client } from '../lib/sanity/client';

export function useSanityData<T>(query: string, params: Record<string, any> = {}) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                console.log('Fetching from Sanity with query:', query);
                const result = await client.fetch<T>(query, params);
                console.log('Sanity result:', result);
                setData(result);
            } catch (err) {
                console.error('Sanity error:', err);
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query, JSON.stringify(params)]);

    return { data, loading, error };
}
