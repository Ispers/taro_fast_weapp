import { FloatButton, Layout } from 'antd';
import '@/assets/less/layout.less'
import { Outlet, useLocation } from 'umi';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { ToTopOutlined } from '@ant-design/icons';

const { Content } = Layout;

const ContentComponent = () => {
    const location = useLocation();
    const [margin, setMargin] = useState(true);
    const [btnShow, setBtnShow] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        const currentElement = scrollRef.current;
        if (currentElement) {
            currentElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (currentElement) {
                currentElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        if (location.pathname === '/dashboard') {
            setMargin(false);
        } else {
            setMargin(true);
        }
    }, [location.pathname]);

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollTop = scrollRef.current.scrollTop;
            // console.log('Scroll Top:', scrollTop);

            if (scrollTop >= 250) {
                setBtnShow(true);
            } else {
                setBtnShow(false);
            }
        }
    };

    const btnClick = () => {
        console.log('btnClick');
        if (scrollRef.current) {
            scrollToTop(scrollRef);
        }
    };

    return (
        // 这里首页不保留外边距 可适当调整
        <Content className={margin ? 'content-box' : ''}>
            <div
                ref={scrollRef}
                className='content'
                style={margin ? { marginTop: '15px' } : { marginTop: '0px' }}
            >
                <Outlet />
                {btnShow && <FloatButton
                    style={{ insetInlineEnd: 20 }}
                    icon={<ToTopOutlined />}
                    onClick={btnClick}
                />}
            </div>
        </Content>
    );
};

// 平滑滚动到顶部
const scrollToTop = (scrollRef) => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) return;

    const scrollTo = 0;
    const startScrollTop = scrollElement.scrollTop;
    const distance = startScrollTop - scrollTo;
    const duration = 500; // 滚动动画时长，单位毫秒
    let startTime;

    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;

        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        const ease = percentage * (2 - percentage);

        scrollElement.scrollTop = startScrollTop - distance * ease;

        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
};

export default ContentComponent;