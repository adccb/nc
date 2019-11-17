import * as yargs from 'yargs'
import { omit } from 'lodash'

import { options } from '../../config.json'
import { Dict, StringDict } from '../../types'
import { OptionRange } from './types'

const RANGE_REGEX = /([0-9]+)\.\.([0-9]+)/

type OptionDict = Dict<yargs.Options>

const reservedOptions: OptionDict = {
  i: {
    type: 'boolean',
    description: 'Start the interviewer'
  }
}

const lookup = options.reduce((dict, opt): StringDict => {
  const [flag, tag] = opt
  return {
    ...dict,
    [flag]: tag,
    [tag]: flag
  }
}, {})

export const tagFromFlag = (flag: string): string => lookup[flag]
export const isRange = (str: string): boolean => RANGE_REGEX.test(str)
export const choicesFor = ({ start, end }: OptionRange): number[] =>
  Array.from({ length: end - start + 1 }, (_, idx) => idx + start)

export const getRange = (str: string): OptionRange => {
  const [_, start, end] = str.match(RANGE_REGEX).map(Number)
  return { type: 'range', start, end }
}

const OptionParser = (): Promise<StringDict> =>
  new Promise((resolve, reject) => {
    try {
      const argOptions = options.reduce((opts, opt): OptionDict => {
        const [flag, tag, values] = opt
        const range = getRange(values)

        return {
          ...opts,
          [flag]: {
            type: 'number',
            choices: choicesFor(range),
            description: `Create a new ${tag} entry`
          }
        }
      }, reservedOptions)

      const { argv } = yargs.options(argOptions)
      resolve(omit(argv, '_', '$0'))
    } catch (e) {
      reject(e)
    }
  })

export default OptionParser
