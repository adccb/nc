export type Dict<T> = Record<string, T>
export type StringDict = Dict<string>
export type PossiblyInvalid<T> = T | Partial<T>

export type RawNCOption = [string, string, string] | [string, string, boolean]

export type NCOneTap = { tag: string; flag: string; values: boolean }
export type NCNumeric = { tag: string; flag: string; values: string }

export type NCOption = NCOneTap | NCNumeric
export const RANGE_REGEX = /([0-9]+)\.\.([0-9]+)/
export const isRange = (option: NCOption): option is NCNumeric =>
  typeof option.values === 'string' && RANGE_REGEX.test(option.values)
export const isOneTap = (opt: NCOption): opt is NCOneTap =>
  typeof opt === 'boolean' && opt === true

export type OptionRange = {
  type: 'range'
  start: number
  end: number
}

export type NCConfig = {
  apiKey: string
  options: NCOption[]
}
