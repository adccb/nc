import { forEach, map } from 'lodash'

import { r } from './r'
import { question } from './question'
import { tagFromFlag, logEntries } from '../lib'

const userAnsweredYes = (response: string): boolean =>
  response === '' || /^y[es]?/i.test(response)

export const confirmAndSubmit = async (options): Promise<boolean> => {
  console.log("here's what we heard.")
  forEach(options, (value, option) =>
    console.log(`\t${tagFromFlag(option)}(${value})`)
  )

  const response = await question('\nshould we log this to nomie? Y/n\n')
  if (userAnsweredYes(response)) {
    const toLog = map(options, (value, option) => ({
      value,
      tag: tagFromFlag(option)
    }))
    logEntries(toLog)
  }

  r.close()
  return true
}
