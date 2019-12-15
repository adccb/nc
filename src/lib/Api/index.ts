/* eslint-disable @typescript-eslint/camelcase */
import axiosConcrete, { AxiosPromise } from 'axios'

import { apiKey } from '../../config.json'
import { ApiResponse } from './types'

const sanitizeValue = (value: string | boolean): string =>
  typeof value === 'boolean' ? '1' : value

export const _logEntries = axios => (data): AxiosPromise<ApiResponse> =>
  axios.post('https://nomieapi.com/log', {
    api_key: apiKey,
    note: data.reduce(
      (str, datum) => `${str}${datum.tag}(${sanitizeValue(datum.value)}), `,
      ''
    )
  })

export const logEntries = _logEntries(axiosConcrete)
export default _logEntries(axiosConcrete)
