#!/usr/bin/env node --harmony

/**
 * Copyright (c) 2018-present, iceyangcc, http://blog.nodejs.tech.
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const fs = require('fs')
const path = require('path')
const colors = require('colors/safe')
const Table = require('cli-table-zh')
const exec = require('shelljs').exec
const program = require('commander')
const nodemon = require('nodemon');

const yargs = require('yargs')
const packageInfo = require('../package')
const commandWelcomeTitle = colors.rainbow(`\n -------- Welcome to use mock-api-cli [${packageInfo.version}] -------- \n`)
const cwdPath = process.cwd()
const cliParams = {}
const help = require('./cmd/help')

const choosePort = require('./utils/port-choose')

/**
 * command line params config
 */
const args = yargs.option('v', {
  alias: 'version'
})
.option('p', {
  alias: 'port',
  default: '3006',
  describe: 'port number '
})
.option('d', {
  alias: 'dir',
  default: '.',
  describe: 'working directory'
})
.option('s', {
  alias: 'static',
  default: '.',
  describe: 'static files directory'
})
.option('w', {
  alias: 'watch',
  default: false,
  describe: `if watch the files' change`
})
.option('o', {
  alias: 'open',
  default: false,
  describe: `if open the browser to preview the api `
})
.option('D', {
  alias: 'delay',
  default: 0,
  describe: `the network delay (unit: msec) `
})
.argv;

const transerParamsToArray = params => {
  const keys = Object.keys(params || {}).filter(key => key.length > 1 && key !== '$0')
  const arr = keys.map(key => `--${key} ${params[key]}`)
  console.log('转换 对象后: ', arr)
  return arr
}

choosePort('127.0.0.1', args.port).then(port => {
  if (!port) process.exit(0);
  console.log('端口号市: ')
  nodemon({
    script: path.resolve(__dirname, 'app/app.js'),
    args: transerParamsToArray(args),
    nodeArgs: ['--harmony'],
    watch: path.resolve(cwdPath, args.dir),
    ext: 'json,js'
  })
  .on('restart', (files) => {
    console.log('files updating ', files)
  })
})
.catch(e => {
  console.log(e)
})

