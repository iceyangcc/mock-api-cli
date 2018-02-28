/**
 * Copyright (c) 2018-present, iceyangcc, http://blog.nodejs.tech.
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const resolvePathToArray = require('../utils/json-utils')
const chalk = require('chalk');

/**
 * convert array to routes for koa-router
 * 
 * @param { String } dirname 
 * @param { KoaRouter } router 
 */
module.exports = function (dirname, router) {

  if (!dirname || !router) {
    console.log(chalk.red('The dirname or router is null'))
    return false;
  }

  const apis = resolvePathToArray(dirname)
  const allowMethods = ['get', 'post', 'put', 'delete', 'options', 'head']

  apis.forEach((api) => {
    const method = (api.type || 'get').toLowerCase()

    if (allowMethods.indexOf(method) > -1) {
      try {
        router[method](api.path, async (ctx, next) => {
          // the next version will support custom response headers...
          ctx.response.body = JSON.stringify(api.res)
        })
      } catch (error) {

      }
    } else {
      console.log(`The request type "${api.type}" in the obj is not supported: `)
    }
  })

  // api sample
  if (!apis.length) {
    router.get('/', async (ctx, next) => {
      ctx.response.body = JSON.stringify({
        path: '/welcome',
        res: {
          code: 'Math.random() > .5 ? 200 : 400',
          data: {
            hello: 'welcome to use mock-api-cli',
            desc: 'This is a sample of json/js file',
            npmis: 'https://www.npmjs.com/package/mock-api-cli',
            installation: 'npm i -g mock-api-cli',
            usage: 'cd working-dir && mac -p 3009',
            blog: 'webcome to my blog http://blog.nodejs.tech ',
            username: 'iceyang'
          }
        }
      })
    })
  }

  return true
}