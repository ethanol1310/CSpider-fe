import 'react';
import { Checkbox, Popover, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const ColumnSelector = ({ columns, selectedColumns, onColumnChange }) => {
    const options = columns.map(col => ({
        label: col.title,
        value: col.key,
        disabled: col.required
    }));

    const content = (
        <Checkbox.Group
            options={options}
            value={selectedColumns}
            onChange={onColumnChange}
            className="flex flex-col gap-2"
        />
    );

    return (
        <Popover
            content={content}
            title="Show/Hide Columns"
            trigger="click"
            placement="bottomRight"
        >
            <Button icon={<SettingOutlined />} />
        </Popover>
    );
};

export default ColumnSelector;
