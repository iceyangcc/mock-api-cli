/**
 * Copyright (c) 2018-present, iceyangcc, http://blog.nodejs.tech.
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const Table = require('cli-table-zh')

/**
 * handle cmd -h or --help
 */
const help = (commandWelcomeTitle) => {
  let table = null
  
  console.log(commandWelcomeTitle || '')
  console.log(' Usage: \n')

  table = new Table({
    head: ['mock-api-cli -p <port> -d <work dir> -s <static dir> -w -o -D <delay msec>']
  })

  table.push(['ps: all params are optional '])
  table.push(['example: mock-api-cli -o '])
  table.push(['it will read all legal js/json files to  publish on a server and open browser'])
  
  console.log(table.toString())
  console.log('\n Command line params : \n')

  table = new Table()
  table.push({ '-p / --port <port>': `The server's port ,default: 3006 ` })
  table.push({ '-d / --dir <dir>': `The work directory path, default: . (current dir)` })
  table.push({ '-s / --static <dir>': `The static file path, default: none` })
  table.push({ '-w / --watch': `If watch json/js files' change to reload, default: no  `})
  table.push({ '-o / --open': `If open the browser to preview the api `})
  table.push({ '-D / --delay <msec>': `The network delay , default: 0, unit: msec`})
  
  console.log(table.toString())
}

module.exports = help
