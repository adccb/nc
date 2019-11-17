import { isRange, getRange, choicesFor } from '.'
import { OptionRange } from './types'

describe('isRange', () => {
  it("correctly determines which strings do and don't represent ranges", () => {
    expect(isRange('1..5')).toBe(true)
    expect(isRange('asdkjfasdfas')).toBe(false)
  })
})

describe('getRange', () => {
  const range = '1..4'
  expect(getRange(range)).toEqual({ type: 'range', start: 1, end: 4 })
})

describe('choicesFor', () => {
  it('returns an array of all numbers in a range', () => {
    const range: OptionRange = { type: 'range', start: 1, end: 100 }
    const options = choicesFor(range)
    expect(options.length).toBe(100)
    expect(options[0]).toBe(1)
  })
})
