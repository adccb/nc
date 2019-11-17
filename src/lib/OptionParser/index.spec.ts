import { getRange, choicesFor, OptionRange } from '.'

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
