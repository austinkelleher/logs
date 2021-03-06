let logs = require('.')
let validate = require('./src/validate')

let known = 'logs -v --verbose verbose -n --nuke nuke -p --production production prod'.split(' ')
let verboseFlags = '-v --verbose verbose'.split(' ')
let nukeFlags = '-n --nuke nuke'.split(' ')
let productionFlags = '-p --production production prod'.split(' ')

/**
 * arc logs src/http/get-index ................... gets staging logs
 * arc logs production src/http/get-index ........ gets production logs
 * arc logs nuke src/http/get-index .............. clear staging logs
 * arc logs nuke production src/http/get-index ... clear staging logs
 */
module.exports = function cli(opts) {
  // Validate for expected env and check for potential creds issues
  validate()

  let pathToCode = opts.find(opt=> !known.includes(opt))
  let verbose = opts.some(opt=> verboseFlags.includes(opt))
  let nuke = opts.some(opt=> nukeFlags.includes(opt))
  let production = opts.some(opt=> productionFlags.includes(opt))

  return logs({ pathToCode, verbose, nuke, production })
}
