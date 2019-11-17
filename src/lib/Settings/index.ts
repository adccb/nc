import { options } from '../../config.json'

export const sanitizedOptions = options.map(option => {
  const [flag, tag, values] = option
  return { flag, tag, values }
})
