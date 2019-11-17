import { question, confirmAndSubmit } from '../../util'
import { StringDict } from '../../types'
import { sanitizedOptions } from '../Settings'

export const Interviewer = async (): Promise<boolean> => {
  console.log('starting interviewer...')

  const toSubmit: StringDict = {}
  console.log()
  for (let i = 0; i < sanitizedOptions.length; i++) {
    const { tag, flag } = sanitizedOptions[i]
    const res = await question(`how is your ${tag}? `)
    toSubmit[flag] = res
  }

  console.log()
  return confirmAndSubmit(toSubmit)
}

export default Interviewer
