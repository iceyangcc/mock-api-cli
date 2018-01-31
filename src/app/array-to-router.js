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

  // with no api
  if (!apis.length) {
    router.get('/', async (ctx, next) => {
      ctx.response.body = JSON.stringify({
        status: 200,
        data: {
          key: 'welcome to use mock-api-cli !!!',
          value: 'webcome to my blog http://blog.nodejs.tech '
        }
      })
    })
  }

  return true
}