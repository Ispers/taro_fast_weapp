import Taro from '@tarojs/taro';

/**
 * 给定日期如：'2024-08-01' 距离今天天数
 * @param {String} date 给定日期 如：'2023-08-01'
 * @returns {Number} 距离今天天数
 */
export function daysDistanceToToday(date) {
    var date1 = Date.parse(date);
    var date2 = Date.parse(today());
    var ms = Math.abs(date2 - date1);
    var days = Math.floor(ms / (24 * 3600 * 1000));
    if (days == 0) {
        return days + 1;
    }
    return days;
}

/**
 * 生成 [ min, max ] 范围内的随机整数
 * @param {Number} max 最大值边界（包含）
 * @param {Number} min 最小值边界（包含）
 * @returns {Number} 范围内的随机整数（大于等于min，小于等于max）
 */
export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 获取当前日期
 * @returns {String} 当前日期字符串 格式：'2024-08-01'
 */
export function getToday() {
    var today = new Date();
    var str = "";
    str += today.getFullYear() + "-";
    var month = today.getMonth() + 1; //返回值是 0（一月） 到 11（十二月） 之间的一个整数。
    if (month < 10) {
        str += "0";
    }
    str += month + "-";
    var day = today.getDate(); //返回值是 1 ~ 31 之间的一个整数
    if (day < 10) {
        str += "0";
    }
    str += day;
    return str;
}

/**
 * 检查一个值是否存在于给定的数组中
 * @param {any} value 
 * @param {Array} array 
 * @returns {Boolean} 存在 true，不存在 false
 */
export function valueIsInArray(value, array) {
    let flag = false;
    for (let i in array) {
        if (array[i] == value) {
            flag = true;
            break;
        }
    }
    return flag;
}

/**
 * 检查给定的变量是否是特定的数据类型,
 * 比使用 typeof 运算符更准确，因为 typeof 只能区分基本类型，而不能区分对象类型（例如，typeof null 会返回 "object"）。
 * 
 * @param {any} data - 要检查的变量
 * @param {String} type - 预期的数据类型，如 'String'、'Number'、'Array' 等
 * @returns {Boolean} 如果变量是特定类型，则返回 true，否则返回 false
 * 
 * @example
 * // 返回 true，因为 data 是一个字符串
 * isDataType('Hello World', 'String');
 * 
 * // 返回 false，因为 data 不是一个数组
 * isDataType({}, 'Array');
 */
export function dataIsType(data, type) {
    return Object.prototype.toString.call(data) === '[object ' + type + ']';
}

/**
 * 移除字符串左侧的指定字符
 * 
 * @param {String} str - 要处理的原始字符串
 * @param {String} char - 要移除的字符
 * @returns {String} 移除指定字符后的字符串
 * 
 * @example
 * // 返回 "hello"，移除了左侧的空格
 * ltrim(" hello", " ");
 * 
 * // 返回 "world"，移除了左侧的 "world"
 * ltrim("world", "world");
 */
export function ltrim(str, char) {
    let pos = str.indexOf(char);
    let sonstr = str.substr(pos + 1);
    return sonstr;
}

/**
 * 移除字符串右侧的指定字符
 * 
 * @param {String} str - 要处理的原始字符串
 * @param {String} char - 要移除的字符
 * @returns {String} 移除指定字符后的字符串
 * 
 * @example
 * // 返回 "hello"，移除了右侧的空格
 * rtrim("hello ", " ");
 * 
 * // 返回 "world"，移除了右侧的 "world"
 * rtrim("world world", "world");
 */
export function rtrim(str, char) {
    let pos = str.lastIndexOf(char);
    let sonstr = str.substr(0, pos);
    return sonstr;
}


// -----------------------------------------------
// -----------以下为二次封装Taro的方法---------------
// -----------------------------------------------

/**
 * 显示消息提示框
 * @param {String} type 弹框类型 可选值（"success" or "error" or "loading" or "none"）默认 none
 * @param {String} content 消息文本内容
 * @param {Number} time 展示时长（ms）
 * @param {Function} successFunc 调用成功的回调函数
 * @example
 * taroShowToast('success', '测试111')
 */
export function taroShowToast(type = 'none', content, time = 2000, successFunc) {
    Taro.showToast({
        title: content,
        duration: time,
        icon: type,
        success: successFunc
    });
}

/**
 * 显示 loading 提示框, 需主动调用 Taro.hideLoading 才能关闭提示框
 * @param {String} [content="加载数据中..."] 提示的内容
 * @param {Boolean} [mask=true] 是否显示透明蒙层，防止触摸穿透 默认 是
 */
export function taroShowLoading(content = "加载中...", mask = true) {
    Taro.showLoading({
        title: content,
        mask: mask
    });
}

/**
 * 关闭 loading 提示框
 * @param {Number} [timer=0] 延时时间 默认 0ms
 */
export function taroHideLoading(timer = 0) {
    if (timer > 0) {
        var t = setTimeout(function () {
            Taro.hideLoading();
            clearTimeout(t);
        }, timer);
    } else {
        Taro.hideLoading();
    }
}

/**
 * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面，
 * 使用 Taro.navigateBack 可以返回到原页面。小程序中页面栈最多十层
 * @param {String} url 要跳转的页面url
 * @param {Object} params 携带的参数对象
 * @example
 * taroNavigateTo('home', {id:1,type: 'add');
 */
export function taroNavigateTo(url, params) {
    Taro.navigateTo({
        url: taroParseUrl(url, params)
    })
}

/**
 * 关闭当前页面，跳转到应用内的某个页面（重定向，不允许跳转到 tabbar 页面）
 * @param {String} url 要跳转的页面url
 * @param {Object} params 携带的参数对象
 * @example
 * taroRedirectTo('home', {id:1,type: 'add');
 */
export function taroRedirectTo(url, params) {
    Taro.redirectTo({
        url: taroParseUrl(url, params)
    });
}

/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param {String} url 要跳转的页面url
 * @param {Object} params 携带的参数对象
 * @example
 * taroReLaunch('home', {id:1,type: 'add');
 */
export function taroReLaunch(url, params) {
    Taro.reLaunch({
        url: taroParseUrl(url, params)
    });
}

/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 * @param {String} url 要跳转的页面url
 * @param {Object} params 携带的参数对象
 * @example
 * taroSwitchTab('home');
 */
export function taroSwitchTab(url) {
    Taro.switchTab({
        url: taroParseUrl(url, {})
    });
}

/**
 * 关闭当前页面，返回上一页面或多级页面，
 * 可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层,
 * (若入参 delta 大于现有页面数时，返回应用打开的第一个页面（如果想要返回首页请使用 taroReLaunch 方法）)
 * @param {Number} delta 返回层数 默认 1
 */
export function taroNavigateBack(delta = 1) {
    Taro.navigateBack({
        delta: delta
    });
}

/**
 * 跳转预加载（当调用 Taro.navigateTo 等跳转类 API 后，新页面的 onLoad 事件会有一定的延时。
 * 因此，为了提高用户体验，可以将一些操作（如网络请求）提前到调用跳转 API 之前执行。）
 * @param {Function} fetchFunc 网络请求
 */
export function taroPreload(fetchFunc) {
	Taro.preload(fetchFunc);
}

/**
 * 获取窗口的宽高
 * @returns {Object} 窗口的宽高 {width: 375, height: 724}
 */
export function taroGetWindowWidthAndHeight() {
    const info = Taro.getSystemInfoSync();
    return {
        width: info.windowWidth,
        height: info.windowHeight
    };
}

/**
 * rpx转px
 * @param {Int|Float} num 要转换的rpx数值
 * @returns {Int|Float} 转换过后的px数值
 */
export function taroRpx2px(num) {
    const info = Taro.getSystemInfoSync();
    let scale = 750 / info.windowWidth;
    return (Number.isNaN(parseFloat(num)) ? 0 : parseFloat(num)) / scale;
}

/**
 * px转rpx
 * @param {Int|Float} num 要转换的px数值
 * @returns {Int|Float} 转换过后的rpx数值
 */
export function taroPx2rpx(num) {
    const info = Taro.getSystemInfoSync();
    let scale = 750 / info.windowWidth;
    return (Number.isNaN(parseFloat(num)) ? 0 : parseFloat(num)) * scale;
}

/**
 * 路由解析并且拼接
 * @param {String} url 路径
 * @param {Object} params 参数对象
 * @returns 拼接后的路径
 * @example
 * //使用
 * taroParseUrl('home', {id:1,type: 'add'})
 * //得到
 * '/pages/home?id=1&type=add'
 */
function taroParseUrl(url, params) {
    let arr = [];
    let string = '';
    for (let i in params) {
        arr.push(i + "=" + params[i]);
    }

    string = "/pages/" + url;
    if (arr.length > 0) {
        string += "?" + arr.join("&");
    }

    return string;
}
