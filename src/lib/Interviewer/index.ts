import { question, confirmAndSubmit } from '../../util'
import { isRange } from '../../types'
import { StringDict } from '../../types'
import { sanitizedOptions } from '../Settings'

export const Interviewer = async (): Promise<boolean> => {
  console.log('starting interviewer...\n')

  const agenda = sanitizedOptions.filter(isRange)

  const toSubmit: StringDict = {}
  for (let i = 0; i < agenda.length; i++) {
    const { tag, flag, values } = agenda[i]
    const res = await question(`(${values}) how is your ${tag}? `)
    toSubmit[flag] = res
  }

  console.log()
  return confirmAndSubmit(toSubmit)
}

export default Interviewer
