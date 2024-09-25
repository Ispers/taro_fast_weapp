import { Card, Col, Row } from 'antd';
import WelcomeBack from './components/WelcomeBack';
import OrderAnalysis from './components/OrderAnalysis';
import QuickStart from './components/QuickStart';
import './index.less';

const Dashboard = () => {
  return (
    <>
      <WelcomeBack />
      <Row gutter={20} style={{ margin: '1vw 0' }}>
        <Col span={16}>
          {/* 销量分析 */}
          <Card title='销量分析'>
            <OrderAnalysis />
          </Card>

          {/* 进行中的任务 */}
          <Card title='进行中的任务' extra={<a href="#">全部</a>}>

          </Card>

          {/* 动态 */}
          <Card title='动态'>

          </Card>
        </Col>
        <Col span={8}>
          {/* 快速开始 / 便捷导航 */}
          <Card title='快速开始 / 便捷导航'>
            <QuickStart />
          </Card>

          {/* 产品指数 */}
          <Card title='产品指数'>

          </Card>

          {/* 开发人员 */}
          <Card title='开发人员'>

          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
