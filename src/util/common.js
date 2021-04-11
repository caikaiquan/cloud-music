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

// 图片压缩
export const dealImage = (base64str, w) => {
  return new Promise((resolve, reject) => {
    let newImage = new Image()
    let quality = 0.9 // 压缩系数 0 - 1之间
    newImage.src = base64str
    let imgWidth = 0;
    let imgHeight = 0;
    newImage.onload = () => {
      imgWidth = newImage.width;
      imgHeight = newImage.height;
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext("2d")
      if (Math.max(imgWidth, imgHeight) > w) {
        if (imgWidth > imgHeight) {
          canvas.width = w
          canvas.height = w * imgHeight / imgWidth
        } else {
          canvas.height = w
          canvas.width = w * imgWidth / imgHeight
        }
      } else {
        canvas.width = imgWidth
        canvas.height = imgHeight
        quality = 0.9
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
      let base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
      console.log(base64.length / 1024, '图片尺寸')
      // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
      // while (base64.length / 1024 > 150) {
      //   quality -= 0.01;
      //   base64 = canvas.toDataURL("image/jpeg", quality);
      // }
      // // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
      // while (base64.length / 1024 < 50) {
      //   quality += 0.001;
      //   base64 = canvas.toDataURL("image/jpeg", quality);
      // }
      resolve(base64)
    }
  })
}

export const formatTime = (date = new Date(), format = "yyyy-MM-dd HH:mm:ss") => {
  const reg = {
    "y{4}": date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for(let regKey in reg){
    if(new RegExp(`(${regKey})`).test(format)){
      const value = reg[regKey].toString().length === 1 ? `0${reg[regKey]}` : reg[regKey]
      format = format.replace(RegExp.$1, value)
    }
  }

  return format
}