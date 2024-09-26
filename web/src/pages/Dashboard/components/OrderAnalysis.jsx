import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';

const OrderAnalysis = () => {
    /** @type EChartsOption */
    const option = {
        xAxis: {
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            boundaryGap: false,
            axisTick: {
                show: false
            }
        },
        grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            padding: [5, 10]
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false
            }
        },
        legend: {
            data: ['预期', '实际']
        },
        series: [
            {
                name: '预期',
                lineStyle: {
                    color: '#FF005A',
                    width: 2
                },
                itemStyle: {
                    color: '#FF005A',
                },
                smooth: true,
                type: 'line',
                data: ["600", "1200", "300", "520", "982", "833", "720"],
                animationDuration: 2800,
                animationEasing: 'cubicInOut'
            },
            {
                name: '实际',
                smooth: true,
                type: 'line',
                lineStyle: {
                    color: '#3888fa',
                    width: 2
                },
                areaStyle: {
                    color: '#f3f8ff'
                },
                itemStyle: {
                    color: '#3888fa'
                },
                data: ["1200", "1000", "1600", "2130", "1021", "620", "844"],
                animationDuration: 2800,
                animationEasing: 'quadraticOut'
            }]
    };

    return (
        <Card title='销量分析' style={{ marginBottom: '1vw' }}>
            <ReactECharts
                style={ {height: '23.1vw'}}
                option={option}
                theme="macarons"
                notMerge={true}
                lazyUpdate={true}
            />
        </Card>
    );
};

export default OrderAnalysis;