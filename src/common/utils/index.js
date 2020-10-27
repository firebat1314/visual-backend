

// post类型对象参数转为get类型url参数
import queryParams from './function/queryParams.js'
// 时间格式化
import timeFormat from './function/timeFormat.js'
// 时间戳格式化,返回多久之前
import timeFrom from './function/timeFrom.js'
// 颜色渐变相关,colorGradient-颜色渐变,hexToRgb-十六进制颜色转rgb颜色,rgbToHex-rgb转十六进制
import colorGradient from './function/colorGradient.js'
// 生成全局唯一guid字符串
import guid from './function/guid.js'
// 打乱数组的顺序
import randomArray from './function/randomArray.js'
// 对象和数组的深度克隆
import deepClone from './function/deepClone.js'
// 对象深度拷贝
import deepMerge from './function/deepMerge.js'
// 规则检验
import test from './function/test.js'
// 随机数
import random from './function/random.js'
// 去除空格
import trim from './function/trim.js'
// 获取父组件参数
import getParent from './function/getParent.js'
// 获取整个父组件
import $parent from './function/$parent.js'
// 防抖方法
import debounce from './function/debounce.js'
// 节流方法
import throttle from './function/throttle.js'

export default {
    queryParams,
    timeFormat,
    timeFrom,
    colorGradient,
    guid,
    randomArray,
    deepClone,
    deepMerge,
    test,
    random,
    trim,
    getParent,
    $parent,
    debounce,
    throttle,
}