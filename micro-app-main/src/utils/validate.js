/**
 * Created by PanJiaChen on 16/11/18.
 */
export function checkPassword(val) {
    //精准校验：必须含有数字、字母、特殊字符，三个缺一不可
	let exp = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/;
    //-->数字+字母；字母+特殊字符，特殊字符+数字
	// let exp = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
	return exp.test(val)
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
export const checkPhone = phone => {
  if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
    return false
  }
  return true
}
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
export const getCheckCode = vin => {
  if (vin.length > 0 && vin.length != 17) {
    return false
  } else {
    var vinVal = vin.toUpperCase()
    // document.getElementById("vin_"+k).value = vinVal;
    var charToNum = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      F: 6,
      G: 7,
      H: 8,
      J: 1,
      K: 2,
      L: 3,
      M: 4,
      N: 5,
      P: 7,
      R: 9,
      S: 2,
      T: 3,
      U: 4,
      V: 5,
      W: 6,
      X: 7,
      Y: 8,
      Z: 9
    }
    var obj = 0
    var arr = new Array()
    for (var i = 0; i < vinVal.length; i++) {
      var temp = vinVal.charAt(i)

      if (charToNum[temp]) {
        arr[i] = charToNum[temp]
      } else {
        arr[i] = Number(temp)
      }
      if (i == 8) {
        arr[i] = vinVal.charAt(i)
      }
    }
    var a1 = 8
    for (var i = 0; i < 7; i++) {
      obj += Number(arr[i]) * a1
      a1--
    }

    obj += Number(arr[7]) * 10

    var a2 = 9
    for (var i = 9; i < 17; i++) {
      obj += Number(arr[i]) * a2
      a2--
    }

    var result = Number(obj) % 11
    if (parseInt(result) === 10) {
      result = 'X'
    }
    if (result == arr[8]) {
      // 成功
      return true
    } else {
      // 失败
      return false
    }
  }
}
export const spArray = (N, Q) => {
  var R = []
  var F
  for (F = 0; F < Q.length; ) {
    R.push(Q.slice(F, (F += N)))
  }
  return R
}
export const checkTel = tel => {
  var phone = /^0\d{2,3}-?\d{7,8}$/
  // /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
  return checkPhone(tel) || phone.test(tel)
}
//座机
export const checkTelPhone = tel => {
  var phone = /^0\d{2,3}-?\d{7,8}$/
  return phone.test(tel)
}
// 手机号校验
export const checkTelephone = tel => {
  var pattern = /^((13[0-9])|(14[5-9])|(15([0-3]|[0-9]))|(16[0-6])|(17([0-3]|[0-9]))|(18([0-3]|[0-9]))|(19[8|9]))\d{8}$/
  if (pattern.test(tel)) {
    return true
  } else {
    return false
  }
}
// 只能输入正整数
export const isNumber = value => {
  return /^([1-9]\d*|[0]{1,1})$/.test(value)
}
export const isIdCardNo = num => {
  num = num.toUpperCase() // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)) {
    // alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
    // alert('身份证号长度不正确或不符合规定！');
    return false
  }
  // 验证前2位，城市符合
  var aCity = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  }
  if (aCity[parseInt(num.substr(0, 2))] == null) {
    // alert('身份证号不正确或不符合规定！');
    return false
  }
  // alert('城市:'+aCity[parseInt(num.substr(0,2))]);

  // 下面分别分析出生日期和校验位
  var len, re
  len = num.length
  if (len == 15) {
    re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
    var arrSplit = num.match(re) // 检查生日日期是否正确
    var dtmBirth = new Date(
      '19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]
    )
    var bGoodDay
    bGoodDay =
      dtmBirth.getYear() == Number(arrSplit[2]) &&
      dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
      dtmBirth.getDate() == Number(arrSplit[4])
    if (!bGoodDay) {
      // alert('身份证号的出生日期不对！');
      return false
    } else {
      // 将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      var arrInt = new Array(
        7,
        9,
        10,
        5,
        8,
        4,
        2,
        1,
        6,
        3,
        7,
        9,
        10,
        5,
        8,
        4,
        2
      )
      var arrCh = new Array(
        '1',
        '0',
        'X',
        '9',
        '8',
        '7',
        '6',
        '5',
        '4',
        '3',
        '2'
      )
      var nTemp = 0
      var i
      num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6)
      for (i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i]
      }
      num += arrCh[nTemp % 11]
      return true
    }
  }
  if (len == 18) {
    re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
    var arrSplit = num.match(re) // 检查生日日期是否正确
    var dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
    var bGoodDay
    bGoodDay =
      dtmBirth.getFullYear() == Number(arrSplit[2]) &&
      dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
      dtmBirth.getDate() == Number(arrSplit[4])
    if (!bGoodDay) {
      // alert(dtmBirth.getYear());
      // alert(arrSplit[2]);
      // alert('身份证号的出生日期不对！');
      return false
    } else {
      // 检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      var valnum
      var arrInt = new Array(
        7,
        9,
        10,
        5,
        8,
        4,
        2,
        1,
        6,
        3,
        7,
        9,
        10,
        5,
        8,
        4,
        2
      )
      var arrCh = new Array(
        '1',
        '0',
        'X',
        '9',
        '8',
        '7',
        '6',
        '5',
        '4',
        '3',
        '2'
      )
      var nTemp = 0
      var i
      for (i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i]
      }
      valnum = arrCh[nTemp % 11]
      if (valnum != num.substr(17, 1)) {
        // alert('18位身份证的校验码不正确！应该为：' + valnum);
        // alert('18位身份证号的校验码不正确！');
        return false
      }
      return true
    }
  }
  return false
}
// 社会统一信用代码
export const checkInsuredIdno = num => {
  const reg = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/
  return reg.test(num)
}
//echars截取横坐标文字
export const echarsSubstrValue = value => {
  let ret = '' //拼接加\n返回的类目项
  let maxLength = 2 //每项显示文字个数
  let valLength = value.length //X轴类目项的文字个数
  let rowN = Math.ceil(valLength / maxLength) //类目项需要换行的行数
  if (rowN > 1 && valLength > 5) {
    //如果类目项的文字大于3,
    for (var i = 0; i < rowN; i++) {
      var temp = '' //每次截取的字符串
      var start = i * maxLength
      var end = start + maxLength
      temp = value.substring(start, end) + '\n'
      ret += temp //凭借最终的字符串
    }
    return ret
  } else {
    return value.split('').join('\n')
  }
}
export const checkPlateNO = num => {
  // 燃油车校验规则：7个字符，属地+字母+（字母和数字），备注最后一位可能是挂、学、警港、澳、使、领；。
  // 新能源车校验规则：8个字符，属地+字母+（字母和数字）；
  // 新车校验规则：只校验属地 剩余不校验；
  let plateNo = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z0-9]{6,7}))$/
  // let plateNo = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
  if (plateNo.test(num)) {
    return true
  } else {
    return false
  }
}
//税号，英文和数字
export const checkTaxCode = num => {
  let taxCode = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/
  if (taxCode.test(num)) {
    return true
  } else {
    return false
  }
}
export const checkEmail = value => {
  let email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  // let email = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
  if (email.test(value)) {
    return true
  } else {
    return false
  }
}
// 修理厂名称 支持中英文和-
export const checkTitle = value => {
  let contact = /^[\u4e00-\u9fa5-\a-zA-Z]+$/
  // let email = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
  if (contact.test(value)) {
    return true
  } else {
    return false
  }
}
// 支持中英文和·
export const checkContact = value => {
  let contact = /^[\u4e00-\u9fa5·a-zA-Z]+$/
  // let email = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
  if (contact.test(value)) {
    return true
  } else {
    return false
  }
}
export const checkNumberAndPoint = value => {
  // 正整数或精确到小数点后两位
  let number = /(^[0-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/
  if (number.test(value)) {
    return true
  } else {
    return false
  }
}

export const checkNetUrl = str_url => {
  var strRegex =
    '^((https|http|ftp|rtsp|mms)?://)' +
    "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@
    '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
    '|' + // 允许IP和DOMAIN（域名）
    "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
    '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
    '[a-z]{2,6})' + // first level domain- .com or .museum
    '(:[0-9]{1,4})?' + // 端口- :80
    '((/?)|' + // a slash isn't required if there is no file name
    "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"
  var re = new RegExp(strRegex)
  //re.test()
  if (re.test(str_url)) {
    return true
  } else {
    return false
  }
}

// 首字母非零正整数校验
// export const validatorWorkExperience = (rule, value, callback) => {
//   if (value === '') {
//     callback(new Error('请填写工作年限'));
//   } else {
//     console.log(typeof value)
//     if (typeof value != 'number') {
//       value = String(value)
//       this.addEditForm.workExperience = value.substring(0, value.length - 1)
//     } else {
//       value = String(value)
//       if (value.startsWith(0)) {
//         if (value.startsWith(0) && value.length == 1) this.addEditForm.workExperience
//         this.addEditForm.workExperience = value.substring(1, value.length - 1)
//       } else if (value.length > 3) {
//         value = Number(value.substring(0, 3))
//         this.addEditForm.workExperience = value
//         callback(new Error('长度不能超过3个字符'));
//         // debugger
//       } else {
//         callback();
//       }
//     }
//   }
// }
//普通车牌号
export const checkCommonPlateNo = num => {
  let plateNo = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
  if (plateNo.test(num)) {
    return true
  } else {
    return false
  }
}
//新能源车牌号
export const checkEnergyPlateNo = num => {
  let plateNo = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
  if (plateNo.test(num)) {
    return true
  } else {
    return false
  }
}
export const getFileType=(file)=>{
  let fileName=file.name.lastIndexOf(".");
  let nameLength=file.name.length;
  let type=file.name.substring(fileName,nameLength);
  return type;
}

export const checkNumberAndFourPoint = value => {
  // 正整数或精确到小数点后四位
  let number = /(^[0-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,4}$)/
  return  number.test(value)
}
