import React, { useState, useEffect } from 'react';
import { Layout, Typography, message, Space, Card, Statistic } from 'antd';
import DateRangePicker from './components/DateRangePicker';
import SourceSelector from './components/SourceSelector';
import ArticleList from './components/ArticleList';
import StatsCard from './components/StatsCard';
import { fetchArticles, Source } from './services/api';
import dayjs from 'dayjs';
import './styles/App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedSource, setSelectedSource] = useState(Source.VnExpress);
    const [stats, setStats] = useState({ total: 0, hot: 0 });

    // Handler for date range changes
    const handleDateRangeChange = async (fromDate, toDate) => {
        await loadArticles(fromDate, toDate, selectedSource);
    };

    // Handler for source changes
    const handleSourceChange = async (source) => {
        setSelectedSource(source);
        const fromDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
        const toDate = dayjs().format('YYYY-MM-DD');
        await loadArticles(fromDate, toDate, source);
    };

    // Load articles function
    const loadArticles = async (fromDate, toDate, source) => {
        try {
            setLoading(true);
            const data = await fetchArticles(fromDate, toDate, source);
            setArticles(data.articles);

            // Calculate statistics
            const hotArticles = data.articles.filter(article => article.total_comment_likes > 1000);
            setStats({
                total: data.articles.length,
                hot: hotArticles.length
            });
        } catch (error) {
            message.error('Failed to fetch articles');
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        const fromDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
        const toDate = dayjs().format('YYYY-MM-DD');
        loadArticles(fromDate, toDate, selectedSource);
    }, []); // Empty dependency array for initial load only

    return (
        <Layout className="app-container">
            <Header className="app-header">
                <Title level={3}>CSpider</Title>
                <div className="controls-container">
                    <div className="filters">
                        <div className="date-controls">
                            <DateRangePicker onDateRangeChange={handleDateRangeChange} />
                        </div>
                        <div className="source-controls">
                            <SourceSelector value={selectedSource} onChange={handleSourceChange} />
                        </div>
                    </div>
                    <div className="stats">
                        <StatsCard title="Total Articles" value={stats.total} />
                        <StatsCard
                            title="Hot Articles"
                            value={stats.hot}
                            percentage={stats.total > 0 ? ((stats.hot / stats.total) * 100).toFixed(1) : 0}
                            isHot={true}
                        />
                    </div>
                </div>
            </Header>
            <Content className="app-content">
                <ArticleList articles={articles} loading={loading} />
            </Content>
        </Layout>
    );
}

export default App;
