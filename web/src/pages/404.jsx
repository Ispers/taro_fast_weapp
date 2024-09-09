import { Button, Result } from 'antd';
import { history } from 'umi';

const Page404 = () => {
    return (
        <Result
            status="404"
            title="页面跑丢啦"
            subTitle="对不起，您访问的页面不存在"
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

export default Page404;