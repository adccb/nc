import { question, confirmAndSubmit, isInRange } from '../../util'
import { isRange, StringDict } from '../../types'
import { sanitizedOptions } from '../Settings'
import { getRange } from '../OptionParser'

export const Interviewer = async (): Promise<boolean> => {
  console.log('starting interviewer...\n')

  const agenda = sanitizedOptions.filter(isRange)

  const toSubmit: StringDict = {}
  for (let i = 0; i < agenda.length; i++) {
    const { tag, flag, values } = agenda[i]
    const range = getRange(values)

    let res = await question(`(${values}) how is your ${tag}? `)
    while (!isInRange(range, Number(res))) {
      res = await question(`(${values}) how is your ${tag}? `)
    }

    toSubmit[flag] = res
  }

  console.log()
  return confirmAndSubmit(toSubmit)
}

export default Interviewer
