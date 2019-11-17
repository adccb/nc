/* eslint-disable @typescript-eslint/camelcase */
import axiosConcrete, { AxiosPromise } from 'axios'

import { apiKey } from '../../config.json'
import { ApiResponse } from './types'

export const logEntry = axios => (
  tag: string,
  value: number
): AxiosPromise<ApiResponse> =>
  axios.post('https://nomieapi.com/log', {
    api_key: apiKey,
    note: `${tag}(${value}),`,
    source: 'nc'
  })

export const _logEntries = axios => (data): AxiosPromise<ApiResponse> =>
  axios.post('https://nomieapi.com/log', {
    api_key: apiKey,
    note: data.reduce(
      (str, datum) => `${str}${datum.tag}(${datum.value}), `,
      ''
    )
  })

export const logEntries = _logEntries(axiosConcrete)
export default logEntry(axiosConcrete)
