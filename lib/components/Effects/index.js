import React from 'react';
import useChart from '../../hooks/useChartInstance';
import warn from 'warning';
export default function Effects(props) {
    var chart = useChart();
    if (typeof props.children === 'function') {
        var res = props.children(chart);
        return React.isValidElement(res) ? res : null;
    }
    warn(false, 'Effects 的子组件应当是一个函数 (chart) => {}');
    return null;
}
