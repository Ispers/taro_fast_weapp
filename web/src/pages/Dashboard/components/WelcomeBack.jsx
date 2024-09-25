import { useSelector } from "react-redux";
import CountUp from "react-countup";

const WelcomeBack = () => {
    const { user } = useSelector(state => state.global);

    return (
        <>
            <div className="welcome-back">
                <div className="wb-left">
                    <img className="avatar" src={user.avatarUrl} />
                    <div>
                        <h1>下午好！{user.nickname}，我猜你可能累了</h1>
                        <h3>前端工程师 | xxx科技 - 某某某事业群 - React平台</h3>
                    </div>
                </div>
                <div className="wb-right">
                    <div className="wr-item">
                        <h1>小程序用户数</h1>
                        <h3><CountUp start={0} end={5611} duration={3} /></h3>
                    </div>
                    <div className="wr-line"></div>
                    <div className="wr-item">
                        <h1>日活用户数</h1>
                        <h3><CountUp start={0} end={712} duration={3.3} /></h3>
                    </div>
                    <div className="wr-line"></div>
                    <div className="wr-item">
                        <h1>接口访问量</h1>
                        <h3><CountUp start={0} end={5.33} decimals={2} duration={3.6} /> w</h3>
                    </div>
                    <div className="wr-line"></div>
                    <div className="wr-item">
                        <h1>金额流水</h1>
                        <h3><CountUp start={0} end={53202} duration={3.9} /></h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WelcomeBack;