import { Layout } from 'antd';
import '@/assets/less/layout.less'
import Menu from './Menu';
import Logo from '@/assets/images/logo.png';

const { Sider } = Layout;

const SiderComponent = (props) => {
    return (
        <Sider
            width={230}
            className='sider'
            trigger={null}
            collapsible
            collapsed={props.collapsed}
        >
            <div className="menu-top">
                <img src={Logo} alt="umi-admin" />
                {!props.collapsed && <div className='title'>{props.title}</div>}
            </div>
            <Menu />
        </Sider>
    );
}

export default SiderComponent;