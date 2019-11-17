export type ApiResult = {
  date: string
  id: string
  note: string
  source: 'api'
}

export type ApiResponse = {
  success: boolean
  results: ApiResult
}
