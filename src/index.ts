import { OptionParser, Interviewer } from './lib'
import { confirmAndSubmit } from './util'

const shouldStartInterviewer = (options): boolean => options.i

OptionParser().then(options =>
  shouldStartInterviewer(options) ? Interviewer() : confirmAndSubmit(options)
)
