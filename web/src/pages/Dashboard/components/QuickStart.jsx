import { Button, Card } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";

const QuickStart = () => {
    const [qsData, setQsData] = useState([]);

    useEffect(() => {
        setQsData([
            { key: 1, value: '操作一' },
            { key: 2, value: '操作二' },
            { key: 3, value: '操作三' },
            { key: 4, value: '操作四' },
            { key: 5, value: '操作五' },
            { key: 6, value: '操作六' },
        ]);
    }, []);

    return (
        <Card title='快速开始 / 便捷导航' style={{ marginBottom: '1vw' }}>
            <ul className="quick-start">
                {qsData.map((item, index) => (
                    <li key={index}>{item.value}</li>
                ))}

                <div>
                    <Button
                        size="small"
                        type="primary"
                        ghost
                        icon={<PlusOutlined />}
                    >
                        添加
                    </Button>
                </div>
            </ul>
        </Card>
    );
};

export default QuickStart;