import readline from 'readline'
import { forEach } from 'lodash'

import { tagFromFlag, logEntry } from '../lib'

export const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

export const question = (q: string): Promise<string> =>
  new Promise(res => r.question(q, response => res(response)))

export function tee<T>(val: T): T {
  console.log(val)
  return val
}

const userAnsweredYes = (response: string): boolean =>
  response === '' || /^y[es]?/i.test(response)

export const confirmAndSubmit = async (options): Promise<boolean> => {
  console.log("here's what we heard.")
  forEach(options, (value, option) =>
    console.log(`\t${tagFromFlag(option)}\t${value}`)
  )

  const response = await question('\nshould we log this to nomie? Y/n\n')
  if (userAnsweredYes(response)) {
    forEach(options, (value, option) => logEntry(tagFromFlag(option), value))
  }

  r.close()
  return true
}
