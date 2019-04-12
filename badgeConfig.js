const { buildStatus, cloverCoverage } = require('nikitas-badges')

module.exports = {
  badges: [
    buildStatus,
    cloverCoverage,
  ],
  defaults: {
    folder: 'badges',
  },
}
