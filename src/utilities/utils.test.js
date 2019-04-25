/* global expect describe it beforeEach jest */
import {
  getDaysAgo,
  getHoursAgo,
  getUpdateString,
  handleErrors,
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
})
