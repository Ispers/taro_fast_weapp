import './index.less';
import { Col, Row } from 'antd';
import WelcomeBack from './components/WelcomeBack';
import OrderAnalysis from './components/OrderAnalysis';
import QuickStart from './components/QuickStart';
import ProductIndex from './components/ProductIndex';
import Team from './components/Team';
import OngoingTasks from './components/OngoingTasks';
import Trends from './components/Trends';

const Dashboard = () => {
  return (
    <div>
      {/* 欢迎回来 */}
      <WelcomeBack />

      <Row gutter={20} style={{ margin: '1vw 0' }}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          {/* 销量分析 */}
          <OrderAnalysis />

          {/* 进行中的任务 */}
          <OngoingTasks />
        </Col>

        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          {/* 快速开始 / 便捷导航 */}
          <QuickStart />

          {/* 产品指数 */}
          <ProductIndex />

          {/* 开发团队 */}
          <Team />
        </Col>
      </Row>

      {/* 动态 */}
      <Trends />
    </div>
  );
};

export default Dashboard;
