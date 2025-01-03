import 'react';
import { Radio } from 'antd';

const OptionSelector = ({ value, onChange, options = [] }) => {
    return (
        <Radio.Group
            value={value}
            onChange={e => onChange(e.target.value)}
            optionType="button"
            buttonStyle="solid"
        >
            {options.map(({ val, label }) => (
                <Radio.Button key={val} value={val}>{label}</Radio.Button>
            ))}
        </Radio.Group>
    );
};

export default OptionSelector;
