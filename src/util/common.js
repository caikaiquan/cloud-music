import CryptoJS from 'crypto-js'

// cookie对象转义成字符串
export const toCookieToken = (obj) => {
  return Object.keys(obj).reduce((result, key) => {
    result += result ? `;${key}=${obj[key]}` : `${key}=${obj[key]}`
    return result
  }, '')
}

// 写入cookie
export const setCookieToken = (obj) => {
  for (let key in obj) {
    document.cookie = `${key}=${obj[key]}`
  }
}

// 数量转换显示
export const switchCount = (num, point) => {
  const numStr = num.toString().split('.')[0]
  if (numStr.length < 6) {
    return numStr
  } else if (numStr.length >= 6 && numStr.length <= 8) {
    const decimal = numStr.substr(numStr.length - 4, point)
    return `${parseFloat(parseInt(numStr / 10000))}.${decimal}万`
  } else {
    const decimal = numStr.substr(numStr.length - 8, point)
    return `${parseFloat(parseInt(numStr / 100000000))}.${decimal}亿`
  }
}

// 加密
export const getAES = (password) => {
  const aseKey = 'ABCDEFGHIJKLMN99'
  const encrypt = CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse(aseKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString();
  return encrypt
}

// 解密
export const getDAes = (encrypt) => {
  const aseKey = 'ABCDEFGHIJKLMN99'
  var decrypt = CryptoJS.AES.decrypt(encrypt, CryptoJS.enc.Utf8.parse(aseKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8);
  return decrypt
}