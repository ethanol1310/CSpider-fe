import 'react';
import '../styles/StatsCard.css';

const StatsCard = ({ title, value, percentage, isHot }) => {
    return (
        <div className="stats-card">
            <div className="stats-title">{title}</div>
            <div className={`stats-value ${isHot ? 'hot' : ''}`}>
                {value}
                {percentage && <span className="percentage">({percentage}%)</span>}
            </div>
        </div>
    );
};

export default StatsCard;
