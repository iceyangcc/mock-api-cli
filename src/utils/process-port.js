/**
 * Copyright (c) 2018-present, iceyangcc, http://blog.nodejs.tech.
 * 
 * This source code is base on react-dev-utils
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var chalk = require('chalk');
var execSync = require('child_process').execSync;
var path = require('path');

var execOptions = {
  encoding: 'utf8',
  stdio: [
    'pipe', // stdin (default)
    'pipe', // stdout (default)
    'ignore', //stderr
  ],
};

function getProcessIdOnPort(port) {
  return execSync('lsof -i:' + port + ' -P -t -sTCP:LISTEN', execOptions)
    .split('\n')[0]
    .trim();
}

function getProcessCommand(processId, processDirectory) {
  var command = execSync(
    'ps -o command -p ' + processId + ' | sed -n 2p',
    execOptions
  );

  return command.replace(/\n$/, '');
}

function getDirectoryOfProcessById(processId) {
  return execSync(
    'lsof -p ' + processId + ' | awk \'$4=="cwd" {print $9}\'',
    execOptions
  ).trim();
}

function getProcessForPort(port) {
  try {
    var processId = getProcessIdOnPort(port);
    var directory = getDirectoryOfProcessById(processId);
    var command = getProcessCommand(processId, directory);
    return (
      chalk.cyan(command) +
      chalk.grey(' (pid ' + processId + ')\n') +
      chalk.blue('  in ') +
      chalk.cyan(directory)
    );
  } catch (e) {
    return null;
  }
}

module.exports = getProcessForPort;

