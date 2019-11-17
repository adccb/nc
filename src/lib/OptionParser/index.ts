import * as yargs from 'yargs'
import { omit } from 'lodash'

import { Dict, StringDict, isRange, isOneTap, RANGE_REGEX } from '../../types'
import { sanitizedOptions } from '../Settings'

type OptionDict = Dict<yargs.Options>

export type OptionRange = {
  type: 'range'
  start: number
  end: number
}

const reservedOptions: OptionDict = {
  i: {
    type: 'boolean',
    description: 'Start the interviewer'
  }
}

const lookup = sanitizedOptions.reduce((dict, opt): StringDict => {
  const { flag, tag } = opt
  return {
    ...dict,
    [flag]: tag,
    [tag]: flag
  }
}, {})

export const getRange = (str: string): OptionRange => {
  const [_, start, end] = str.match(RANGE_REGEX).map(Number)
  return { type: 'range', start, end }
}

export const tagFromFlag = (flag: string): string => lookup[flag]
export const choicesFor = ({ start, end }: OptionRange): number[] =>
  Array.from({ length: end - start + 1 }, (_, idx) => idx + start)

const OptionParser = (): Promise<StringDict> =>
  new Promise((resolve, reject) => {
    try {
      const argOptions = sanitizedOptions.reduce((opts, opt): OptionDict => {
        const { flag, tag } = opt
        if (flag === 'i') return opts

        if (isRange(opt)) {
          const range = getRange(opt.values)
          return {
            ...opts,
            [flag]: {
              type: 'number',
              choices: choicesFor(range),
              description: `Create a new ${tag} entry`
            }
          }
        }

        if (isOneTap(opt)) {
          return {
            ...opts,
            [flag]: {
              type: 'boolean',
              default: true,
              description: `Create a new one-tap ${tag} entry`
            }
          }
        }

        return opts
      }, reservedOptions)

      const { argv } = yargs.options(argOptions)
      resolve(omit(argv, '_', '$0'))
    } catch (e) {
      reject(e)
    }
  })

export default OptionParser
