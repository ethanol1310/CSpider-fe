import React from 'react';
import { DatePicker, Space, message } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const defaultFromDate = dayjs().subtract(10, 'day');
const defaultToDate = dayjs();

const DateRangePicker = ({ dates = [defaultFromDate, defaultToDate], onDateRangeChange }) => {
    const handleChange = (newDates) => {
        if (newDates) {
            const [startDate, endDate] = newDates;
            onDateRangeChange(
                startDate,
                endDate,
            );
        }
    };

    const disabledDate = (current) => {
        return current && current > dayjs().endOf('day');
    };

    return (
        <Space direction="vertical" size="small">
            <RangePicker
                value={dates}
                onChange={handleChange}
                allowClear={false}
                format="YYYY-MM-DD"
                style={{ width: '300px' }}
                disabledDate={disabledDate}
            />
        </Space>
    );
};

export default DateRangePicker;