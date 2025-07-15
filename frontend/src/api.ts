import axios from 'axios';
import { PageVisit, SearchQuery, SearchResult, PageResult } from './types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const storePageVisit = async (pageVisit: PageVisit): Promise<{ status: string }> => {
    const response = await api.post('/page_visit', pageVisit);
    return response.data;
};

export const semanticSearch = async (searchQuery: SearchQuery): Promise<{ results: SearchResult[] }> => {
    const response = await api.post('/semantic_search', searchQuery);
    return response.data;
};

export const showResults = async (urls: string[]): Promise<{ results: PageResult[] }> => {
    const response = await api.post('/show_results', urls);
    return response.data;
}; 