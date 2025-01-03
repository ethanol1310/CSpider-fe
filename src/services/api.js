import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const Source = {
    VnExpress: 0,
    TuoiTre: 1
};

export const fetchArticles = async (fromDate, toDate, limit, source) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/articles`, {
            params: {
                from_date: fromDate,
                to_date: toDate,
                source: source,
                limit: limit
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
};
