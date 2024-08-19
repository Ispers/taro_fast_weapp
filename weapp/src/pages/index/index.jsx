import { View, Text } from '@tarojs/components'
import Taro, { useDidHide, useDidShow, useLoad, useReady } from '@tarojs/taro'
import { useEffect, useState } from 'react';
// 类似 jQuery 的系列 API https://taro-docs.jd.com/docs/jquery-like
import { $ } from '@tarojs/extend'
import { Button } from '@nutui/nutui-react-taro';
import { info, test, test2 } from '../../service/auth';

const Index = () => {
  const [num, setNum] = useState(0);

  // 1.页面加载完成(早于useEffect)
  useLoad(() => {
    console.log('Page Load.')
    const res = Taro.getSystemInfoSync()
    console.log('Taro.getSystemInfoSync()',res);
  });

  // 2
  useEffect(() => {
    console.log('Page useEffect.');
  }, []);

  // 3.页面展示时的回调
  useDidShow(() => {
    console.log('Page Did Show.')
  });

  // 4.可以和视图层进行交互
  useReady(() => {
    console.log('Page Ready.')
    $('#ul').append('<li>new list item</li>');
  });

  // 页面隐藏时的回调
  useDidHide(() => {
    console.log('Page Did Hide.')
  });

  const btnc1 = () => {
    info().then((res) => {
      console.log('info-res', res);
    }).catch((err) => {
      console.log('info-err', err);
    });
  };

  const btnc2 = () => {
    test().then((res) => {
      console.log('test1-res', res);
    }).catch((err) => {
      console.log('test1-err', err);
    });
  };

  const btnc3 = () => {
    test2().then(res => {
      console.log('test2', res);
    });
  };


  return (
    <>
      <View>
        <ul id='ul'></ul>
        <div style={{ color: "green" }}>i am div <span style={{ color: 'blue' }}>span</span></div>
        <div><a href="javascript:void(0);">aaaa</a></div>
        <Text style={{ color: 'red' }}>数字：{num}</Text>
        <div>
          <Button type="primary" onClick={btnc1}>Primary</Button>
          <Button type="info" onClick={btnc2}>
            Info
          </Button>
          <Button type="danger" onClick={btnc3}>
            Danger
          </Button>
          <Button type="warning" >
            Warning
          </Button>
          <Button type="success" >
            Success
          </Button>
        </div>
      </View>
    </>
  )
}

export default Index;