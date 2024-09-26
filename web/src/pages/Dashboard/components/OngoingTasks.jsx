import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useState, useEffect } from "react";

const OngoingTasks = () => {
    const [tasksData, setTasksData] = useState([]);

    useEffect(() => {
        setTasksData([
            { title: 'Alipay', description: '那是一种内在的东西， 他们到达不了，也无法触及的', by: '科学搬砖组', time: '9' },
            { title: 'Angular', description: '对月饮一杯寂寥', by: '程序员日常', time: '11' },
            { title: 'AntDesign', description: '希望是一个好东西，也许是最好的，好东西是不会消亡的', by: '科学搬砖组', time: '7' },
            { title: 'AntDesignPro', description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆', by: '中二少女团', time: '8' },
            { title: 'Bootstrap', description: '生命就像一盒巧克力，结果往往出人意料', by: '科学搬砖组', time: '5' },
            { title: 'Vue', description: '那时候我只会想自己想要什么，从不想自己拥有什么', by: '中二少女团', time: '8' },
        ]);
    }, []);

    return (
        <Card title="进行中的任务" extra={<a href="#">全部</a>} style={{ marginBottom: '1vw' }}>
            {
                tasksData.map((item, index) => (
                    <Card.Grid style={{ width: '33.33%' }} key={index}>
                        <Meta
                            style={{ height: '5vw' }}
                            title={
                                <div className="meta-title">
                                    <Avatar size={"small"} src={require(`../../../assets/images/${item.title}.png`)} />
                                    <a>{item.title}</a>
                                </div>
                            }
                            description={item.description}
                        />
                        <div className="meta-item">
                            <a>{item.by}</a>
                            <div>{`${item.time}小时前`}</div>
                        </div>
                    </Card.Grid>
                ))
            }
        </Card>
    );
};

export default OngoingTasks;