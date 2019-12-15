import { OptionRange } from '../types'

export function tee<T>(val: T): T {
  console.log(val)
  return val
}

export const isInRange = ({ start, end }: OptionRange, x: number): boolean =>
  x >= start && x <= end

export { r } from './r'
export { question } from './question'
export { confirmAndSubmit } from './confirmAndSubmit'
