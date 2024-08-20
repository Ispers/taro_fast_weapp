import { Tabbar } from '@nutui/nutui-react-taro'
import { Home, User, Apps, Receipt } from '@nutui/icons-react-taro'
import { taroSwitchTab } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { setTabbarCheckedIndex } from '../store/slices/globalSlice'

const tab = {
    inactiveColor: '#7d7e80',
    activeColor: '#3768fa',
    list: [
        {
            pagePath: 'index/index', // tabBar 路由
            text: '首页', // tabBar 文字
            icon: <Home size={18} />, // tabBar 图标
            rdValue: 0, // 徽标中显示的内容，支持数字、字符和自定义内容
            isDot: false // 徽标是否为小点
        },
        {
            pagePath: 'product/index',
            text: '商品',
            icon: <Apps size={18} />,
            rdValue: 0,
            isDot: true
        },
        {
            pagePath: 'docs/index',
            text: '文档',
            icon: <Receipt size={18} />,
            rdValue: 0,
            isDot: false
        },
        {
            pagePath: 'me/index',
            text: '我的',
            icon: <User size={18} />,
            rdValue: 2,
            isDot: false
        },
    ]
}

// 自定义 tabBar 
const CustomTabBar = () => {
    const { tabbarCheckedIndex } = useSelector(state => state.global);
    const dispatch = useDispatch();

    const tabbarSwitch = (value) => {
        dispatch(setTabbarCheckedIndex(value));
        taroSwitchTab(tab.list[value].pagePath);
    };

    return (
        <Tabbar
            fixed
            value={tabbarCheckedIndex}
            activeColor={tab.activeColor}
            inactiveColor={tab.inactiveColor}
            onSwitch={tabbarSwitch}>
            {
                tab.list.map((item, index) => {
                    return <Tabbar.Item
                        key={index}
                        title={item.text}
                        icon={item.icon}
                        value={item.rdValue} 
                        dot={item.isDot} />
                })
            }
        </Tabbar>
    )
}

CustomTabBar.options = {
    addGlobalClass: true,
}

export default CustomTabBar;
