/* global expect describe it */
import {
  getDaysAgo,
  getHoursAgo,
  getUpdateString,
  handleErrors,
  capitalize,
  getDurationString,
} from './index'

describe('utility functions', () => {
  describe('handle errors function', () => {
    it('should return the first argument as long as it contains a truthy "ok" property', () => {
      expect(handleErrors({ ok: true })).toEqual({ ok: true })
    })

    it('should throw an error if the ok property is not truthy', () => {
      const func = () => { handleErrors({ ok: 0 }) }
      expect(func).toThrow()
    })
  })

  describe('capitalize function', () => {
    const inputStr = 'hello world'
    it('should capitalize the first letter by default', () => {
      expect(capitalize(inputStr)).toBe('Hello world')
    })

    it('should not modify the input string', () => {
      // eslint-disable-next-line
      let input = 'will this change?'
      capitalize(input)
      expect(input).toBe('will this change?')
    })

    it('should capitalize a letter other than first if specified', () => {
      expect(capitalize(inputStr, 3)).toBe('helLo world')
    })

    it('should be able to capitalize the last character', () => {
      expect(capitalize(inputStr, 10)).toBe('hello worlD')
    })

    it('should throw an error if the optional index is beyond the length of the string', () => {
      const func = () => { capitalize(inputStr, 11) }
      expect(func).toThrow()
    })
  })

  describe('get hours ago function', () => {
    const today = new Date()
    it('should return a number', () => {
      expect(typeof getHoursAgo(today, today)).toEqual('number')
    })

    it('should return 0 if the dates are the same', () => {
      expect(getHoursAgo(today, today)).toEqual(0)
    })

    it('should return 1 if the second date is an hour ahead of the first', () => {
      const oneHourAgo = new Date(today.getTime() - 3600000)
      expect(getHoursAgo(oneHourAgo, today)).toEqual(1)
    })

    it('should round down to the nearest whole number', () => {
      const oneHourAnd55MinutesAgo = new Date(today.getTime() - 6900000)
      expect(getHoursAgo(oneHourAnd55MinutesAgo, today)).toEqual(1)
    })

    it('should return 25 if the second date is an hour and a day ahead of the first', () => {
      const oneHourAndOneDayAgo = new Date(today.getTime() - 90000000)
      expect(getHoursAgo(oneHourAndOneDayAgo, today)).toEqual(25)
    })
  })

  describe('get days ago function', () => {
    const today = new Date()
    it('should return a number', () => {
      expect(typeof getDaysAgo(today, today)).toEqual('number')
    })

    it('should return 0 if the dates are the same', () => {
      expect(getDaysAgo(today, today)).toEqual(0)
    })

    it('should return 1 if the second date is a day ahead of the first', () => {
      const oneDayAgo = new Date(today.getTime() - 86400000)
      expect(getDaysAgo(oneDayAgo, today)).toEqual(1)
    })

    it('should round down to the nearest whole number', () => {
      const oneDayAnd1MinuteAgo = new Date(today.getTime() - 86460000)
      expect(getDaysAgo(oneDayAnd1MinuteAgo, today)).toEqual(1)
    })

    it('should return 366 if the second date is a year and a day ahead of the first', () => {
      const oneYearAndOneDayAgo = new Date(today.getTime() - 31622400000)
      expect(getDaysAgo(oneYearAndOneDayAgo, today)).toEqual(366)
    })
  })

  describe('get update string function', () => {
    const today = new Date()
    const year = today.getUTCFullYear()
    const month = today.getUTCMonth() + 1
    const paddedMonth = month.toString().length === 1 ? `0${month}` : month
    const day = today.getUTCDate()
    const paddedDay = day.toString().length === 1 ? `0${day}` : day
    const hour = today.getUTCHours()
    const paddedHour = hour.toString().length === 1 ? `0${hour}` : hour
    const minutes = today.getUTCMinutes()
    const paddedMinutes = minutes.toString().length === 1 ? `0${minutes}` : minutes
    const seconds = today.getUTCSeconds()
    const paddedSeconds = seconds.toString().length === 1 ? `0${seconds}` : seconds

    const dateStr = `${year}-${paddedMonth}-${paddedDay}T${paddedHour}:${paddedMinutes}:${paddedSeconds}Z`
    it('should return a string if given a valid date string', () => {
      expect(typeof getUpdateString(dateStr)).toEqual('string')
    })

    it('should return "0 hours ago" if the date string is close to the current time', () => {
      expect(getUpdateString(dateStr)).toEqual('0 hours ago')
    })
  })

  describe('get duration string function', () => {
    it('should return a string', () => {
      const durationString = getDurationString({ duration: 1000 })
      expect(typeof durationString).toEqual('string')
    })

    it('should output 2 units when unitsToShow = 2', () => {
      const durationString = getDurationString({ duration: 1010, unitsToShow: 2 })
      expect(durationString).toEqual('1 sec, 10 ms')
    })

    it('should only output the highest possible time unit by default', () => {
      const durationString = getDurationString({ duration: 87400000 })
      const durationString2 = getDurationString({ duration: 190000 }) // 180000 is 3 mins
      expect(durationString).toEqual('1 day')
      expect(durationString2).toEqual('3 min')
    })

    it('should only show plurality for hours and days', () => {
      const days = getDurationString({ duration: 3007400000 })
      expect(days).toMatch('days')

      const hours = getDurationString({ duration: 19000000 })
      expect(hours).toMatch('hours')

      const min = getDurationString({ duration: 190000 })
      expect(min).not.toMatch('mins')

      const sec = getDurationString({ duration: 5000 })
      expect(sec).not.toMatch('secs')

      const ms = getDurationString({ duration: 50 })
      expect(ms).not.toMatch('mss')
    })
  })
})
