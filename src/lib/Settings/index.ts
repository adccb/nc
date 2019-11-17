import { options as optionsConcrete } from '../../config.json'
import { RawNCOption, NCOption, PossiblyInvalid } from '../../types'

export const _sanitizedOptions = (
  options: PossiblyInvalid<RawNCOption[]>
): NCOption[] =>
  options.map(option => {
    const [flag, tag, values] = option
    return { flag, tag, values }
  })

export const sanitizedOptions = _sanitizedOptions(
  optionsConcrete as RawNCOption[]
)
