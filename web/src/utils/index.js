/**
 * 生成随机颜色
 * @returns {String} 随机颜色 #333333
 */
export function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

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

/**
 * 日期字符串 - 2002-02-07
 * 
 * @param {String} birthDateString 
 * @returns {String} 年龄
 * 
 * @example
 * const birthDateString = '2002-02-07';
 * const age = calculateAge(birthDateString);
 * console.log(`年龄是: ${age}`);
 */
export function getAge(birthDateString) {
    // 将字符串转换为日期对象
    const birthDate = new Date(birthDateString);
    // 获取当前日期
    const today = new Date();

    // 计算年龄
    let age = today.getFullYear() - birthDate.getFullYear();

    // 检查当前日期是否已经过了生日，如果还没有过，则年龄减一
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

/**
 * 分隔手机号码
 * 
 * @param {String} phone 手机号码
 * @returns {String} 手机号码 xxx xxxx xxxx
 */
export function splitPhone(phone) {
    let phoneArr = phone.split('');
    phoneArr.splice(3, 0, ' ');
    phoneArr.splice(8, 0, ' ');
    return phoneArr.join('');
}