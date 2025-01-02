import 'react';
import { Radio } from 'antd';
import { Source } from '../services/api';

const SourceSelector = ({ value, onChange }) => {
    return (
        <Radio.Group
            value={value}
            onChange={e => onChange(e.target.value)}
            optionType="button"
            buttonStyle="solid"
        >
            <Radio.Button value={Source.VnExpress}>VnExpress</Radio.Button>
            <Radio.Button value={Source.TuoiTre}>TuoiTre</Radio.Button>
        </Radio.Group>
    );
};

export default SourceSelector;
