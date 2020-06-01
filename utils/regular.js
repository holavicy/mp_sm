
const regs = {
  email: /^\w+@[a-z0-9]+\.[a-z]{2,4}$/,
  idCard: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
  tel: /^1\d{10}$/
}

export function test(str, regType){

  const reg = regs[regType];

  if(reg.test(str)){
    return true
  } else {
    return false
  }

}