import React, { useEffect, useState, useCallback } from 'react';
import { Layout, Typography, Button, message } from 'antd';
import DateRangePicker from './components/DateRangePicker';
import OptionSelector from './components/OptionSelector.jsx';
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
    const [selectedLimit, setSelectedLimit] = useState(10);
    const [stats, setStats] = useState({ total: 0 });
    const [dates, setDates] = useState([
        dayjs().subtract(7, 'day'),
        dayjs()
    ]);

    const handleDateRangeChange = (fromDate, toDate) => {
        setDates([fromDate, toDate]);
    };

    const handleLimitChange = (newCount) => {
        setSelectedLimit(newCount);
    };

    const handleSourceChange = (source) => {
        setSelectedSource(source);
    };

    const loadArticles = useCallback(async () => {
        try {
            setLoading(true);
            const [fromDate, toDate] = dates;
     
            const response = await fetchArticles(fromDate.format('YYYY-MM-DD'), toDate.format('YYYY-MM-DD'), selectedLimit, selectedSource);
            if (response.error_code === 'success' && response.data) {
                setArticles(response?.data?.articles || []);
                setStats({
                    total: response?.data?.total || 0,
                });
            } else {
                throw new Error(response.message || 'Failed to fetch articles');
            }
        } catch (error) {
            message.error('Failed to fetch articles.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [dates, selectedLimit, selectedSource]);

    useEffect(() => {
        loadArticles();
    }, [])

    return (
        <Layout className="app-container">
            <Header className="app-header">
                <Title level={3}>CSpider</Title>
                <div className="controls-container">
                    <div>
                        <div className="filters">
                            <div className="date-controls">
                                <DateRangePicker dates={dates} onDateRangeChange={handleDateRangeChange}/>
                            </div>
                            <div className="limit-controls">
                                <OptionSelector
                                    options={[
                                        {val: 10, label: '10'},
                                        {val: 30, label: '30'},
                                        {val: 50, label: '50'},
                                    ]}
                                    value={selectedLimit}
                                    onChange={handleLimitChange}
                                />
                            </div>
                            <div className="source-controls">
                                <OptionSelector
                                    options={[
                                        { val: Source.VnExpress, label: 'VnExpress' },
                                        { val: Source.TuoiTre, label: 'TuoiTre' }
                                    ]}
                                    value={selectedSource}
                                    onChange={handleSourceChange}/>
                            </div>
                            <div>
                                <Button className="search-button" color="danger" variant="solid" onClick={loadArticles}
                                        disabled={loading}>
                                    Run
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="stats">
                        <StatsCard title="Total Articles" value={stats.total}/>
                    </div>
                </div>
            </Header>
            <Content className="app-content">
                <ArticleList articles={articles} loading={loading}/>
            </Content>
        </Layout>
    );
}

export default App;
