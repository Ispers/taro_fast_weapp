import { Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';
const QuickStart = () => {
    return (
        <ul className="quick-start">
            <li>操作一</li>
            <li>操作二</li>
            <li>操作三</li>
            <li>操作四</li>
            <li>操作五</li>
            <li>操作六</li>
            <li>
                <Button
                    size="small"
                    type="primary"
                    ghost
                    icon={<PlusOutlined />}
                >
                    添加
                </Button>
            </li>
        </ul>
    );
};

export default QuickStart;