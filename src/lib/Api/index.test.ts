import { _logEntries } from '.'

describe('logEntries', () => {
  it('should call the correct api endpoint', () => {
    const axios = { post: jest.fn() }
    const data = [
      { tag: '#mood', value: 2 },
      { tag: '#energy', value: 3 }
    ]
    _logEntries(axios)(data)

    expect(axios.post.mock.calls[0][0]).toBe('https://nomieapi.com/log')
    expect(axios.post.mock.calls[0][1].note).toBe('#mood(2), #energy(3), ')
  })
})
