import { createFromIconfontCN } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const MyIcon = ({ type }) => {
    const { scriptUrl } = useSelector(state => state.global);

    // 使用获取到的scriptUrl创建图标
    const Icon = createFromIconfontCN({
        scriptUrl
    });

    return (
        <>
            {Icon && <Icon type={type} />}
        </>
    );
}

export default MyIcon;