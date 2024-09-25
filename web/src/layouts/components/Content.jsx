import { Layout } from 'antd';
import '@/assets/less/layout.less'
import { Outlet, useLocation } from 'umi';
import { useEffect } from 'react';
import { useState } from 'react';

const { Content } = Layout;

const ContentComponent = () => {
    const location = useLocation();
    const [margin, setMargin] = useState(true);

    useEffect(() => {
        if (location.pathname === '/dashboard') {
            setMargin(false);
        } else {
            setMargin(true);
        }
    }, [location.pathname]);

    return (
        // 这里首页不保留外边距 可适当调整
        <Content className={margin ? 'content-box' : ''}>
            <div className='content' style={margin ? {marginTop: '15px'} : {marginTop: '0px'}}>
                <Outlet />
            </div>
        </Content>
    );
};

export default ContentComponent;