export function thousands(number) {
  number = parseFloat((number || 0))
  let reg = /\B(?=(\d{3})+(?!\d))/g
  const stringNum = number + ''
  if (stringNum.indexOf('.') > -1) {
    reg = /\B(?=(\d{3})+(?=\.))/g
  }
  return stringNum.replace(reg, ',')
}
