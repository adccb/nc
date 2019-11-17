import { r } from './r'

export const question = (q: string): Promise<string> =>
  new Promise(res => r.question(q, response => res(response)))
