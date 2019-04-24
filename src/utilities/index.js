export function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve))
}

export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export function getDaysAgo(dayOld, dayNew) {
  const millisecondsInADay = 86400000 // 1000 * 60 * 60 * 24
  return Math.floor((dayNew.getTime() - dayOld.getTime()) / millisecondsInADay)
}

export function getHoursAgo(dayOld, dayNew) {
  const millisecondsInAnHour = 3600000 // 1000 * 60 * 60
  return Math.floor((dayNew.getTime() - dayOld.getTime()) / millisecondsInAnHour)
}

export function getUpdateString(dateStr) {
  const previousDate = new Date(dateStr)
  const today = new Date()

  let dayOrHours = 'day'
  let ago = getDaysAgo(previousDate, today)
  if (ago <= 0) {
    dayOrHours = 'hour'
    ago = getHoursAgo(previousDate, today)
  }

  if (ago !== 1) {
    dayOrHours = `${dayOrHours}s`
  }

  return `${ago} ${dayOrHours} ago`
}

export const has = Object.prototype.hasOwnProperty
