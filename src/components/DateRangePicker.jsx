import React from 'react';
import { DatePicker, Radio, Space } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const DateRangePicker = ({ onDateRangeChange }) => {
    const [dates, setDates] = React.useState([
        dayjs().subtract(7, 'day'),
        dayjs()
    ]);

    const handleChange = (newDates) => {
        if (newDates) {
            setDates(newDates);
            onDateRangeChange(
                newDates[0].format('YYYY-MM-DD'),
                newDates[1].format('YYYY-MM-DD')
            );
        }
    };

    const handleQuickSelect = (days) => {
        const newDates = [dayjs().subtract(days - 1, 'day'), dayjs()];
        setDates(newDates);
        onDateRangeChange(
            newDates[0].format('YYYY-MM-DD'),
            newDates[1].format('YYYY-MM-DD')
        );
    };

    return (
        <Space direction="vertical" size="small">
            <Radio.Group
                defaultValue={7}
                onChange={(e) => handleQuickSelect(e.target.value)}
                optionType="button"
                buttonStyle="solid"
                size="middle"
            >
                <Radio.Button value={7}>7 days</Radio.Button>
                <Radio.Button value={14}>14 days</Radio.Button>
                <Radio.Button value={30}>30 days</Radio.Button>
            </Radio.Group>
            <RangePicker
                value={dates}
                onChange={handleChange}
                allowClear={false}
                format="YYYY-MM-DD"
                style={{ width: '300px' }}
            />
        </Space>
    );
};

export default DateRangePicker;
