import { Layout } from 'antd';
import '@/assets/less/layout.less'
import { Link, Outlet, useAppData, useLocation } from 'umi';

const { Content } = Layout;
const ContentComponent = () => {
    return (
        <Content className='content-box'>
            <div className='content'>
                <Outlet />
            </div>
        </Content>
    );
};

export default ContentComponent;