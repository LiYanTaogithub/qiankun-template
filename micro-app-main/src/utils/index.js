/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')
    .replace(/\+/g, ' ') +
    '"}'
  )
}
/**
 * by chenxiaosi
 * @description [判断是否是原生DOM元素]
 */
export const isDOM_Element =
  typeof HTMLElement === 'object' ?
  function (obj) {
    return obj instanceof HTMLElement
  } :
  function (obj) {
    return (
      obj &&
      typeof obj === 'object' &&
      obj.nodeType === 1 &&
      typeof obj.nodeName === 'string'
    )
  }

/**
 * by chenxiaosi
 * @description [获取指定元素的顶部到窗口底部的距离, 默认返回窗口显示区域高度]
 * @param [参数名]     {[type]}    [description] -- （参数说明格式）
 * @param [ref]        {[VNode, DOM]}   [被指定的元素]
 * @param [minHeight]  {[number]}  [最小高度]
 */
export function getToBottom_H(ref, minHeight) {
  let toBottom_H = document.documentElement.clientHeight
  let thisDom = ref
  if (!ref) {
    return toBottom_H
  } else {
    if (!isDOM_Element(ref)) thisDom = ref.$el
    toBottom_H =
      document.documentElement.clientHeight -
      thisDom.getBoundingClientRect().top
  }
  if (minHeight) {
    return toBottom_H < minHeight ? minHeight : toBottom_H
  } else {
    return toBottom_H
  }
}
/**
 *  深拷贝
 * @param {Object} source 源对象
 */
export const DEEPCOPY = source => {
  let sourceCopy = source instanceof Array ? [] : {}
  for (let item in source) {
    sourceCopy[item] =
      typeof source[item] === 'object' ? DEEPCOPY(source[item]) : source[item]
  }
  return sourceCopy
}

export function getDictDataFun(searchData, callBack, addAll) {
  searchData.optionData = [{
    key: '',
    val: '全部'
  }]
  if (addAll == false) searchData.optionData = []
  callBack().then(resp => {
    if (+resp.data.code === 1) {
      const obj = resp.data.obj && resp.data.obj.map(item => {
        return {
          key: item.code,
          val: item.name
        }
      })
      searchData.optionData.push(...obj)
    }
  }).catch(err => {
    console.error('getDictDataFun error', err)
  })
}

export function getImgWH(file) {
  return new Promise((resolve, reject) => {
  var reader = new FileReader();
    let imgW = '', imgH = ''
    reader.onload = function (event) {
      var txt = event.target.result;
      var img = document.createElement("img");
      img.src = txt;
      img.onload = function () {
        imgW = img.width
        imgH = img.height
        resolve({imgW,imgH})
      }
    };
  reader.readAsDataURL(file);
   })
}

/**
 * @description: 根据身份证号获取年龄和性别
 * @param {string} IDCord
 * @return {Object} sexAndAge
 */
export function analyzeIDCard(IDCord) {
  var sexAndAge = {};
  //获取用户身份证号码
  var userCard = IDCord;
  //如果用户身份证号码为undefined则返回空
  if(!userCard){
    return sexAndAge;
  }
  // 获取性别
  if(parseInt(userCard.substr(16,1)) % 2 == 1){
    sexAndAge.sex = '1 男'
  }else{
    sexAndAge.sex = '0 女'
  }
  // 获取出生日期
  // userCard.substring(6,10) + "-" + userCard.substring(10,12) + "-" + userCard.substring(12,14)
  var yearBirth = userCard.substring(6,10)
  var monthBirth = userCard.substring(10,12);
  var dayBirth = userCard.substring(12,14);
  // 获取当前年月日并计算年龄
  var myDate = new Date();
  var monthNow = myDate.getMonth() + 1;
  var dayNow = myDate.getDate();
  var age = myDate.getFullYear() - yearBirth;
  if(monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)){
    age --;
  }
  // 得到年龄
  sexAndAge.age = age;
  // 返回 性别和年龄
  return sexAndAge;
}
/*
 * param 将要转为URL参数字符串的对象
 * return URL参数字符串
 */
export function urlEncode(url, param) {
  if (param == null) return ''
  let paramStr = ''
  for (const key in param) {
    const str = encodeURIComponent(param[key])
    paramStr += `&${key}=${str}`
  }
  const urlStr = url.indexOf('?') > -1 ? `${url}${paramStr}` : `${url}?${paramStr.substring(1, paramStr.length)}`
  return urlStr
}

// 时间设置默认值 当年-01-01 至今
export function timeUnit() {
  const d = new Date()
  const day = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate()
  const m = d.getMonth() + 1
  const month = m >= 10 ? m : '0' + m
  const currentDay = d.getFullYear() + '-' + month + '-' + day
  const firstDay = d.getFullYear() + '-01-01'
  const timeList = { currentDay, firstDay }
  return timeList
}

// 时间设置默认值 一个月
export function timeMonthUnit() {
  const d = new Date()
  const day = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate()
  const m = d.getMonth() + 1
  const month = m >= 10 ? m : '0' + m
  const currentDay = d.getFullYear() + '-' + month + '-' + day

  const start = d.getTime() - 3600 * 1000 * 24 * 30
  const date = start && new Date(start)
  const getYear = date.getFullYear()
  let getMon = date.getMonth() + 1
  getMon = getMon >= 10 ? getMon : '0' + getMon
  let getDay = date.getDate()
  getDay = getDay >= 10 ? getDay : '0' + getDay

  const firstDay = getYear + '-' + getMon + '-' + getDay
  const timeList = { currentDay, firstDay }
  return timeList
}
export function timeMonthUnitBackward(timeStamp) {
  const d = new Date(+timeStamp)
  const day = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate()
  const m = d.getMonth() + 1
  const month = m >= 10 ? m : '0' + m
  const currentDay = d.getFullYear() + '-' + month + '-' + day

  const end = d.getTime() + 3600 * 1000 * 24 * 30
  const date = end && new Date(end)
  const getYear = date.getFullYear()
  let getMon = date.getMonth() + 1
  getMon = getMon >= 10 ? getMon : '0' + getMon
  let getDay = date.getDate()
  getDay = getDay >= 10 ? getDay : '0' + getDay

  const backwardDay = getYear + '-' + getMon + '-' + getDay
  const timeList = { currentDay, backwardDay }
  return timeList
}
// 时间设置默认值 当月01-至今
export function currentMonth() {
  const d = new Date()
  const day = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate()
  const m = d.getMonth() + 1
  const month = m >= 10 ? m : '0' + m
  const currentDay = d.getFullYear() + '-' + month + '-' + day
  const firstDay = d.getFullYear() + '-' + month + '-01'
  const timeList = { currentDay, firstDay }
  return timeList
}

let IDX = 36
let HEX = ''
while (IDX--) HEX += IDX.toString(36)

export const uid = len => {
  let str = ''
  let num = len || 11
  while (num--) str += HEX[(Math.random() * 36) | 0]
  return str
}
