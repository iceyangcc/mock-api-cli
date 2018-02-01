/**
 * Copyright (c) 2018-present, iceyangcc, http://blog.nodejs.tech.
 * 
 * This source code is base on react-dev-utils
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const chalk = require('chalk');
const detect = require('detect-port-alt');
const isRoot = require('is-root');
const inquirer = require('inquirer');
const clearConsole = require('./ref/clearConsole');
const getProcessForPort = require('./process-port')
const isInteractive = process.stdout.isTTY;

function choosePort(host, defaultPort) {
  return detect(defaultPort, host).then(
    port =>
      new Promise(resolve => {
        if (port === defaultPort) {
          return resolve(port);
        }
        console.log('port是: ',typeof port)
        console.log('defaultPort是 : ',typeof defaultPort)
        const message =
          process.platform !== 'win32' && defaultPort < 1024 && !isRoot()
            ? `Admin permissions are required to run a server on a port below 1024.`
            : `Something is already running on port ${defaultPort}.`;
        if (isInteractive) {
          // clearConsole();
          const existingProcess = getProcessForPort(defaultPort);
          console.log('existingProcess是: ', existingProcess)
          
          const question = {
            type: 'confirm',
            name: 'shouldChangePort',
            message:
              chalk.yellow(
                message +
                  `${existingProcess ? ` Probably:\n  ${existingProcess}` : ''}`
              ) + '\n\nWould you like to run the app on another port instead?',
            default: true,
          };
          inquirer.prompt(question).then(answer => {
            if (answer.shouldChangePort) {
              console.log('改变端口', port, typeof port)
              resolve(port);
            } else {
              console.log('不不不改')
              resolve(null);
            }
          });
        } else {
          console.log(chalk.red(message));
          resolve(null);
        }
      }),
    err => {
      throw new Error(
        chalk.red(`Could not find an open port at ${chalk.bold(host)}.`) +
          '\n' +
          ('Network error message: ' + err.message || err) +
          '\n'
      );
    }
  );
}

module.exports = choosePort
