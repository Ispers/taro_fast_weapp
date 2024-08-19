import { Layout } from 'antd';
import '@/assets/less/layout.less'

const { Footer } = Layout;
const FooterComponent = (props) => {
    return (
        <Footer className='footer'>
            {props.footerText}
        </Footer>
    )
}

export default FooterComponent;