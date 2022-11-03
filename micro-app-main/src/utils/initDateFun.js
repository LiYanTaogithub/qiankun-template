export function initDate(){
  const startY = (new Date(Date.now())).getFullYear()
  const monthStr = (new Date(Date.now())).getMonth()
  const startM = monthStr < 10 ? '0' + monthStr : monthStr
  const yearMonth = `${startY}-${startM}`
  return yearMonth
}
