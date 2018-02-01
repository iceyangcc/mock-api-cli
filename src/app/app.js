#!/usr/bin/env node --harmony

'use strict';

const Koa = require('koa')
const Cors = require('koa-cors')
const Serve = require('koa-static')
const Router = require('koa-router')
const KoaBody = require('koa-body')

const opn = require('opn')
const path = require('path')
const colors = require('colors')

const app = new Koa()
const router = new Router()

const args = {}
const arrayToRoutes = require('./array-to-router')

process.argv.filter(param => param.indexOf('--') > -1).forEach(item => {
  const arr = /^\-\-(\w+)\s(.*)$/.exec(item)
  arr ? args[arr[1]] = arr[2] : ''
})

const port = args.port
const dirname = path.isAbsolute(args.dir) ? args.dir : path.resolve(process.cwd(), args.dir)
const open = args.open
const staticDir = path.isAbsolute(args.static) ? args.static : path.resolve(process.cwd(), args.static)

try {
  app.use(Cors())
  app.use(KoaBody({
    multipart: true
  }))
  app.use(router.routes()).use(router.allowedMethods())
  app.use(Serve(staticDir))
  arrayToRoutes(dirname, router)
  app.listen(port)

  console.log(colors.rainbow(`\n The js/json/static files in '${dirname}' will be served on http://127.0.0.1:${port} \n`))
  if (open === 'true') {
    setTimeout(() => {
      opn(`http://127.0.0.1:${port}`).then(() => {

      })
    }, 1000)
  }
} catch (error) {
  console.log(error)
  process.exit(0)
}

module.exports = app
