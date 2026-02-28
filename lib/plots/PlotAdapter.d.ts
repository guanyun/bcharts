import React from 'react';
type IOptions = Record<string, any>;
type IPlotCfg = {
    plotType: string;
    options: IOptions;
};
interface IAdapterProps {
    /**
     * 可覆盖组件displayName
     */
    chartName?: string;
    /**
     * options 转换器
     * @example
     * // 合并图表类型，或者做配置项转换
     * (opt) => {
     *   const options = {
     *     // 可配置默认数据
     *     data: [...],
     *     ...opt,
     *   }
     *
     *   return {
     *     plotType: opt.stackField ? 'StackColumn' : 'Column',
     *     options,
     *   }
     * }
     */
    adapter?: (IOptions: any) => IPlotCfg;
    [key: string]: any;
}
declare function PlotAdapter(props: IAdapterProps): React.JSX.Element;
declare namespace PlotAdapter {
    var registerPlot: (name: string, Component: any) => void;
}
export default PlotAdapter;
