export function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve))
}

export function objectOnlyHas(obj, properties) {
  const propertiesObjectHas = Object.keys(obj)

  if (typeof properties === 'string') {
    if (propertiesObjectHas.length === 1 && propertiesObjectHas[0] === properties) {
      return true
    }
    return false
  }
  // otherwise, it is assumed properties is an array of properties

  if (propertiesObjectHas.length > properties.length) {
    // if the object length is longer than the array of properties
    // we know that the object contains more properties than we are looking for
    return false
  }

  let matchedProperties = 0
  for (let i = 0; i < propertiesObjectHas.length; i += 1) {
    if (properties.indexOf(propertiesObjectHas[i]) !== -1) {
      matchedProperties += 1
    }
  }

  if (matchedProperties === propertiesObjectHas.length) {
    return true
  }

  return false
}

export function handleErrors(response) {
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response
}

export function capitalize(str, char = 0) {
  if (str.length - 1 < char) {
    throw new Error(`Cannot capitalize character at index: ${char}. String is only ${str.length} characters long`)
  }

  const beforeCapChar = str.slice(0, char)
  const capitalizedChar = str.charAt(char).toUpperCase()
  const afterCapChar = str.slice(char + 1)
  return `${beforeCapChar}${capitalizedChar}${afterCapChar}`
}

export function getDaysAgo(dayOld, dayNew) {
  const millisecondsInADay = 86400000 // 1000 * 60 * 60 * 24
  return Math.floor((dayNew.getTime() - dayOld.getTime()) / millisecondsInADay)
}

export function getHoursAgo(dayOld, dayNew) {
  const millisecondsInAnHour = 3600000 // 1000 * 60 * 60
  return Math.floor((dayNew.getTime() - dayOld.getTime()) / millisecondsInAnHour)
}

export function getDurationString({
  duration, // in milliseconds
  unitsToShow = 1, // ie: 1010 becomes 1 sec, not 1 sec 10ms
}) {
  const millisecond = 1
  const msInSecond = 1000
  const msInMinute = msInSecond * 60
  const msInHour = msInMinute * 60
  const msInDay = msInHour * 24

  let durationString = ''
  let durationMS = duration
  let unitsLeft = unitsToShow

  const unitDurations = [
    msInDay,
    msInHour,
    msInMinute,
    msInSecond,
    millisecond,
  ]

  unitDurations.forEach((dur) => {
    const number = Math.floor(durationMS / dur)
    console.log(`dur: ${dur}, durationMS: ${durationMS}`)
    if (number > 0 && unitsLeft > 0) {
      const plurality = number > 1 ? 's' : ''
      durationString = `${durationString}${number} day${plurality}, `
      durationMS -= number * dur
      unitsLeft -= 1
    }
  })

  return durationString
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
