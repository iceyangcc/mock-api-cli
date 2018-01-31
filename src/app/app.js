#!/usr/bin/env node --harmony

'use strict'

const Koa = require('koa')
const Cors = require('koa-cors')
const Serve = require('koa-static')
const Router = require('koa-router')
const KoaBody = require('koa-body')
const colors = require('colors')

const app = new Koa()
const router = new Router()

const arrayToRoutes = require('./array-to-router')

const args = {}

console.log('app 参数:', process.argv)
process.argv.filter(param => param.indexOf('--') > -1).forEach(item => {
  const arr = /^\-\-(\w+)\s(.*)$/.exec(item)
  arr ? args[arr[1]] = arr[2] : ''
})
console.log('对象是:', args)

const port = args.port
const dirname = args.dir

try {
  app.use(Cors())
  app.use(KoaBody({ multipart: true }))
  app.use(router.routes()).use(router.allowedMethods())
  app.use(Serve('.'))
  arrayToRoutes(dirname, router)
  app.listen(port)
  console.log(colors.rainbow(`served on http://127.0.0.1:${port} `))
} catch (error) {
  console.log(error)
  process.exit(0)
}

module.exports = app

