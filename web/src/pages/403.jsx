import { Button, Result } from 'antd';
import { history } from 'umi';

const Page403 = () => {
    return (
        <Result
            status="403"
            title="管理员说你不能进"
            subTitle="抱歉，您无权访问此页面"
            extra={
                <Button
                    type="primary"
                    onClick={() => { history.replace('/') }}>
                    返回首页
                </Button>
            }
        />
    )
}

export default Page403;