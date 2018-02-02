/**
 * Koa test
 */
const Koa = require('koa')
const Cors = require('koa-cors')
const Serve = require('koa-static')
const Router = require('koa-router')
const KoaBody = require('koa-body')
const path = require('path')
const currentPath = path.resolve(__dirname, '.')
const getProcessForPort = require('../src/utils/getport')
const address = require('address');
const fs = require('fs');
const url = require('url');
const chalk = require('chalk');
const detect = require('detect-port-alt');
const isRoot = require('is-root');
const inquirer = require('inquirer');
const clearConsole = require('../src/utils/ref/clearConsole');
const formatWebpackMessages = require('../src/utils/ref/formatWebpackMessages');

const isInteractive = process.stdout.isTTY;

function choosePort(host, defaultPort) {
  return detect(defaultPort, host).then(
    port =>
      new Promise(resolve => {
        if (port === defaultPort) {
          return resolve(port);
        }
        const message =
          process.platform !== 'win32' && defaultPort < 1024 && !isRoot()
            ? `Admin permissions are required to run a server on a port below 1024.`
            : `Something is already running on port ${defaultPort}.`;
        if (isInteractive) {
          clearConsole();
          const existingProcess = getProcessForPort(defaultPort);
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
              resolve(port);
            } else {
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


choosePort('127.0.0.1', '3005')
  .then(port => {
    console.log('选择的端口是: ', port)
  }).catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });



// setTimeout(() => {
//   console.log('端口号情况: ', getProcessForPort(3010))
// }, 2000)

const app = new Koa()
const router = new Router()

app.use(Cors())
app.use(KoaBody({
  multipart: true
}))

app.use(Serve('.'))

router.get('/', async (ctx, next) => {
  ctx.response.body = '{ "name": 12}'
})

router.get('/user', async (ctx, next) => {
  ctx.response.body = '{ "username": \"咔咔\"}'
})

router['get']('/test', async (ctx, next) => {
  ctx.response.body = '啦啦啦1'
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3010)