
const regs = {
  email: /^\w+@[a-z0-9]+\.[a-z]{2,4}$/
}

export function test(str, regType){
  const reg = regs[regType];

  if(str.test(reg)){
    return true
  } else {
    return false
  }

}