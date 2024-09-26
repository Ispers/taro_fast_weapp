import { Card } from 'antd';
import avatar1 from '../../../assets/images/1.png';
import avatar2 from '../../../assets/images/2.png';
import avatar3 from '../../../assets/images/3.png';
import avatar4 from '../../../assets/images/4.png';
import avatar5 from '../../../assets/images/5.png';

const Team = () => {
    return (

        <Card title='开发团队'>
            <ul className='team'>
                <li>
                    <img src={avatar1} />
                    <h3>科学搬砖组</h3>
                </li>
                <li>
                    <img src={avatar2} />
                    <h3>程序员日常</h3>
                </li>
                <li>
                    <img src={avatar3} />
                    <h3>设计天团</h3>
                </li>
                <li>
                    <img src={avatar4} />
                    <h3>中二少女团</h3>
                </li>
                <li>
                    <img src={avatar5} />
                    <h3>骗你学计算机</h3>
                </li>
            </ul>
        </Card>
    );
};

export default Team;