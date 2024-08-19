// 对jsencrypt/bin/jsencrypt.js文件进行修改，适配app，取消web相关调用
import JSEncrypt from './jsencrypt'

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(PUBLIC_KEY) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}