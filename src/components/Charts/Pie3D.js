import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Chart from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.zune';

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({ data }) => {
    const chartConfigs = {
        type: 'pie2d',
        width: '100%',
        height: '400',
        dataFormat: 'json',
        dataSource: {
            chart: {
                caption: 'Languages',
                decimals: 0,
                pieRadius: '45%',
                theme: 'zune',
            },
            data,
        },
    };

    return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
