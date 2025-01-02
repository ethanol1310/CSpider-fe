import 'react';
import { Table, Tooltip } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ArticleList = ({ articles, loading }) => {
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <a href={record.url} target="_blank" rel="noopener noreferrer">
                    {text}
                </a>
            ),
        },
        {
            title: 'Comment Likes',
            dataIndex: 'total_comment_likes',
            key: 'total_comment_likes',
            width: 160,
            sorter: (a, b) => a.total_comment_likes - b.total_comment_likes,
            render: (likes) => (
                <span className={likes > 1000 ? 'hot-article-likes' : ''}>
          <LikeOutlined style={{ marginRight: 8 }} />
                    {likes.toLocaleString()}
        </span>
            ),
        },
        {
            title: 'Published',
            dataIndex: 'publish_time',
            key: 'publish_time',
            width: 200,
            sorter: (a, b) => new Date(a.publish_time) - new Date(b.publish_time),
            render: (date) => (
                <Tooltip title={dayjs(date).format('YYYY-MM-DD HH:mm:ss')}>
                    {dayjs(date).fromNow()}
                </Tooltip>
            ),
        },
    ];

    return (
        <Table
            dataSource={articles}
            columns={columns}
            loading={loading}
            rowKey="url"
            pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50'],
            }}
            rowClassName={(record) =>
                record.total_comment_likes > 1000 ? 'hot-article-row' : ''
            }
            scroll={{ x: 800 }}
        />
    );
};

export default ArticleList;
