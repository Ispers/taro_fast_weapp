import { Breadcrumb, Button, Layout, Dropdown } from 'antd';
const { Header } = Layout;
import '@/assets/less/layout.less'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import { logout } from '@/api/auth';
import { removeToken } from '@/utils/auth'

const dropdownItems = [
    {
        key: 'personalCenter',
        label: '个人中心',
    },
    {
        type: 'divider',
    },
    {
        key: 'Logout',
        label: '退出登录',
    },
];

// 递归深度查找routes数组中path
const findRoutesByPath = (routes, targetPath) => {
    for (let route of routes) {
        if (route.path === targetPath) {
            return route; // 找到目标path，返回该对象
        }
        // 如果有子菜单，递归查找
        if (route.children) {
            const found = findRoutesByPath(route.children, targetPath);
            if (found) {
                return found; // 如果在子菜单中找到，返回该对象
            }
        }
    }
    return null; // 如果没有找到，返回 null
}

const HeaderComponent = (props) => {
    const { user } = useSelector(state => state.global);
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);
    const { routers, currentRoutePath } = useSelector(state => state.global);

    // 监听window.location.pathname 生成面包屑
    useEffect(() => {
        let items = [];
        let routes = routers.find(item => item.path === '/').routes;
        let paths = window.location.pathname.split('/');
        paths.shift();

        if (paths.length == 1) {
            let path = '/' + paths[0];
            let title = findRoutesByPath(routes, path)?.title;
            items.push({ title });
        } else {
            for (let i = 0; i < paths.length; i++) {
                if (i == 0) {
                    let path = '/' + paths[i];
                    let title = findRoutesByPath(routes, path)?.title;
                    items.push({ title: <a href={path}>{title}</a> });
                } else {
                    let paths1 = paths.slice(0, i + 1);
                    let path = '/' + paths1.join('/');
                    let title = findRoutesByPath(routes, path)?.title;
                    if (i == paths.length - 1) {
                        items.push({ title });
                    } else {
                        items.push({ title: <a href={path}>{title}</a> });
                    }
                }
            }
        }
        setBreadcrumbItems(items);
    }, [currentRoutePath]);

    const dropdownOnclick = ({ key }) => {
        if (key === 'personalCenter') {
            history.push('/PersonalCenter');
        } else if (key === 'Logout') {
            // 退出登录
            logout().then(res => {
                console.log('logout', res);
                removeToken();
                localStorage.removeItem('persist:root');
                // location.reload();
                history.replace('/Login');
            })
        }
    };

    return (
        <Header className='header'>
            <div className='headder-left'>
                <Button
                    type="text"
                    icon={props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => props.setCollapsed(!props.collapsed)}
                    className='headder-left-btn'
                />
                <Breadcrumb items={breadcrumbItems} />
            </div>

            <div className='headder-right'>
                <div>{user.nickname}</div>
                {/* <img src={avatar} /> */}
                <Dropdown
                    menu={{ items: dropdownItems, onClick: dropdownOnclick }}
                    placement="bottomLeft"
                    arrow
                >
                    <img src={user.avatarUrl} />
                </Dropdown>
            </div>
        </Header>
    )
}

export default HeaderComponent;