// 转换今日时间戳，0:0:0 和 0:0:0
export function formatTime(start, end) {
  if (start && end) {
    return {
      startTime: new Date(new Date(start).getTime()).setHours(0, 0, 0, 0),
      endTime: new Date(new Date(end).getTime()).setHours(0, 0, 0, 0)
    }
  } else {
    return {
      startTime: '',
      endTime: ''
    }
  }
}
// 转换今日时间戳，0:0:0 和23:59:59
export function formatTimeTo(start, end) {
  if (start && end) {
    return {
      startTime: new Date(new Date(start).getTime()).setHours(0, 0, 0, 0),
      endTime: new Date(new Date(end).getTime()).setHours(23, 59, 59, 999)
    }
  } else {
    return {
      startTime: '',
      endTime: ''
    }
  }
}
