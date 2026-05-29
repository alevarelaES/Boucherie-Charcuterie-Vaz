import { useEffect, useState } from 'react';
import { client } from '../lib/sanity/client';

export function useSanityData<T>(query: string, params: Record<string, any> = {}) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let cancelled = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await client.fetch<T>(query, params);
                if (!cancelled) {
                    setData(result);
                    setLoading(false);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error('Sanity error:', err);
                    setError(err instanceof Error ? err : new Error('Unknown error'));
                    setLoading(false);
                }
            }
        };

        fetchData();
        return () => { cancelled = true; };
    // params est toujours un objet statique dans ce projet — query suffit comme dep
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    return { data, loading, error };
}
