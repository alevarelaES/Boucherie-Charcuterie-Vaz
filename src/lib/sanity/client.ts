import { createClient } from '@sanity/client';

export const client = createClient({
    projectId: 'czmblby4',
    dataset: 'production',
    apiVersion: '2024-01-20',
    useCdn: false,
});
