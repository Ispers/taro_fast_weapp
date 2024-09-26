import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';

const ProductIndex = () => {
    /** @type EChartsOption */
    const option = {
        legend: {
            bottom: '0',
            data: ['个人', '团队', '部门']
        },
        radar: {
            indicator: [
                { name: '引用', max: 50 },
                { name: '热度', max: 80 },
                { name: '贡献', max: 60 },
                { name: '产量', max: 80 },
                { name: '口碑', max: 100 }
            ]
        },
        // tooltip: {
        //     // 'item' 为数据项触发显示tooltip，当设置成 'axis' 时，坐标轴触发
        //     trigger: 'item'
        // },
        tooltip: {
            trigger: 'item',
        },
        series: [
            {
                name: '产品指数',
                type: 'radar',
                data: [
                    {
                        value: [20, 60, 15, 20, 99],
                        name: '个人'
                    },
                    {
                        value: [25, 40, 42, 45, 95],
                        name: '团队'
                    },
                    {
                        value: [30, 40, 58, 60, 92],
                        name: '部门'
                    }
                ],
                animationDuration: 2800,
                animationEasing: 'quadraticOut'
            }
        ]
    };

    return (
        <Card title='产品指数' style={{ marginBottom: '1vw' }}>
            <ReactECharts
                option={option}
                theme="macarons"
                notMerge={true}
                lazyUpdate={true}
            />
        </Card>
    );
};

export default ProductIndex;