/* global expect describe it */
import { makeBadge } from './badges'

describe('makeBadge function', () => {
  const text = ['left text', 'right text']

  it('should output an svg string', () => {
    const badge = makeBadge({ text })
    expect(typeof badge).toEqual('string')
    expect(badge.substr(0, 4)).toEqual('<svg')
  })

  it('should use flat as the default template if none provided', () => {
    const badgeExplicitFlat = makeBadge({ text, template: 'flat' })
    const badgeImplicit = makeBadge({ text })
    expect(badgeExplicitFlat).toEqual(badgeImplicit)
  })

  it('should have 4 distinct badge templates', () => {
    const badgeFlat = makeBadge({ text, template: 'flat' })
    const badgeFlatSquare = makeBadge({ text, template: 'flat-square' })
    const badgeSocial = makeBadge({ text, template: 'social' })
    const badgeForTheBadge = makeBadge({ text, template: 'for-the-badge' })

    expect(badgeFlat).not.toEqual(badgeFlatSquare)
    expect(badgeFlat).not.toEqual(badgeSocial)
    expect(badgeFlat).not.toEqual(badgeForTheBadge)

    expect(badgeSocial).not.toEqual(badgeFlatSquare)
    expect(badgeSocial).not.toEqual(badgeForTheBadge)

    expect(badgeFlatSquare).not.toEqual(badgeForTheBadge)
  })

  it('should be able to specify colorA and colorB', () => {
    const badge = makeBadge({ text, colorA: '#afa', colorB: '#d1d' })
    expect(badge).toMatch('#afa')
    expect(badge).toMatch('#d1d')
  })

  it('should render text[0] on the left and text[1] on the right', () => {
    const badge = makeBadge({ text })
    const leftText = text[0]
    const rightText = text[1]
    const indexOfLeftText = badge.indexOf(leftText)
    const indexOfRightText = badge.indexOf(rightText)
    expect(indexOfLeftText).toBeLessThan(indexOfRightText)
  })
})
