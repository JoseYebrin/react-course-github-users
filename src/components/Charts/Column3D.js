import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Chart from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.zune';

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({ data }) => {
    const chartConfigs = {
        type: 'column2d',
        width: '100%',
        height: '400',
        dataFormat: 'json',
        dataSource: {
            chart: {
                caption: 'Most Popular',
                yAxisName: 'Stars',
                xAxisName: 'Repositories',
                yAxisNameFontSize: '16px',
                xAxisNameFontSize: '16px',
                theme: 'zune',
            },
            data,
        },
    };

    return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
