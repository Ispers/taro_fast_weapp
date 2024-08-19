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
            pagePath: 'index/index',
            text: '首页',
            icon: <Home size={18} />
        },
        {
            pagePath: 'product/index',
            text: '商品',
            icon: <Apps size={18} />
        },
        {
            pagePath: 'docs/index',
            text: '文档',
            icon: <Receipt size={18} />
        },
        {
            pagePath: 'me/index',
            text: '我的',
            icon: <User size={18} />
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
                        icon={item.icon} />
                })
            }
        </Tabbar>
    )
}

CustomTabBar.options = {
    addGlobalClass: true,
}

export default CustomTabBar;
