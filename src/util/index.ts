export { r } from './r'
export { question } from './question'
export { confirmAndSubmit } from './confirmAndSubmit'

export function tee<T>(val: T): T {
  console.log(val)
  return val
}
