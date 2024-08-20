import { ConfigProvider, Menu } from 'antd';
import myTheme from '@/theme';
import MyIcon from '@/components/MyIcon';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { history } from "umi";

// 根据路由表生成菜单项
const createMenuItemsByRoutes = (routes) => {
    console.log('routes', routes);
    let menuItems = [];
    for (let i = 0; i < routes.length; i++) {
        // 判断是否为处理路由补充的重定向路径（只读取配置路由表）
        if (routes[i].id && !routes[i].hidden) {
            let item = {};
            item.key = routes[i].path;
            item.icon = <MyIcon type={`icon-${routes[i].icon}`} />;
            item.label = routes[i].title;
            // 判断是否有子路由（子菜单）
            if (routes[i].children) {
                // 递归
                item.children = createMenuItemsByRoutes(routes[i].children)
            }
            menuItems.push(item);
        }
    }
    console.log('menuItems: ', menuItems);
    return menuItems;
}

const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
};

const MenuComponent = () => {
    const { routers, currentRoutePath } = useSelector(state => state.global);
    const [items, setItems] = useState([]);
    const [levelKeys, setLevelKeys] = useState({});
    const [stateOpenKeys, setStateOpenKeys] = useState(['1']);
    const [selectedKeys, setSelectedKeys] = useState([]);

    // 监听路由表变化，渲染菜单
    useEffect(() => {
        let routes = routers.find(item => item.path === '/')?.routes;
        let items = createMenuItemsByRoutes(routes);
        setItems(items);
        setLevelKeys(getLevelKeys(items))
    }, [routers]);

    // 监听当前路由路径，高亮显示激活菜单
    useEffect(() => {
        setSelectedKeys(['' + currentRoutePath])
        // 根据路径设置展开的菜单
        const pathSegments = location.pathname.split('/').filter(Boolean);
        if (pathSegments.length > 0) {
            // 展开所有父级菜单
            const keys = pathSegments.map((_, index) =>
                `/${pathSegments.slice(0, index + 1).join('/')}`
            );
            setStateOpenKeys(keys);
        } else {
            setStateOpenKeys([]);
        }
    }, [currentRoutePath])

    // 只展开当前父级菜单
    const onOpenChange = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };

    // 菜单选中时更改路由
    const menuSelect = (selectItem) => {
        if(selectItem.key.substr(0,1) === '/'){
            // 内部菜单
            history.push(selectItem.key);
        }else {
            // 外链菜单处理
            window.open(selectItem.key, '_blank');
        }
    };

    return (
        <ConfigProvider theme={myTheme}>
            <Menu
                theme='dark'
                selectedKeys={selectedKeys}
                mode="inline"
                openKeys={stateOpenKeys}
                onOpenChange={onOpenChange}
                items={items}
                onSelect={menuSelect}
            />
        </ConfigProvider>
    )
};

export default MenuComponent;