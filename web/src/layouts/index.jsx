import { Layout } from 'antd';
import Sider from './components/Sider';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import '@/assets/less/layout.less'
import { useState } from 'react';

const LayoutPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className='layout'>
      <Sider title={APP_TITLE} collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content />
        <Footer footerText={FOOTER_TEXT} />
      </Layout>
    </Layout>
  );
}

export default LayoutPage;