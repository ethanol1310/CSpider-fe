import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5047';

export const Source = {
    VnExpress: 0,
    TuoiTre: 1
};

export const fetchArticles = async (fromDate, toDate, source) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/articles`, {
            params: {
                from_date: fromDate,
                to_date: toDate,
                source: source
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
};
