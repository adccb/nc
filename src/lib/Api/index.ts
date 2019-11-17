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
    note: `${tag}(${value}),`
  })

export default logEntry(axiosConcrete)
