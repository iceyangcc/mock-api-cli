'use strict'
/**
 * Handle all files that ends with "js" and "json" 
 * 
 * @param { String } dirname 
 * @requires The directory must be single level class
 * @returns { Array } [] return an array after merge
 * @author http://blog.nodejs.tech
 */
module.exports = function (dirname) {
  /* 
   * valid object for api definition
   * check field 'path', 'res'
   */
  const validApiObject = (obj) => {
    return obj && obj.path && obj.res && typeof obj.res === 'object'
  }

  const fs = require('fs')
  const path = require('path')
  const colors = require('colors/safe')
  const mergedApiArray = []

  // default current working directory
  dirname = dirname || process.cwd()

  try {
    const files = fs.readdirSync(dirname)
    files.forEach((fileName) => {
      if (fileName.endsWith('.js') || fileName.endsWith('.json')) {
        try {
          const pathName = path.resolve(dirname, fileName)
          const api = require(pathName)
          
          if (Array.isArray(api)) {
            api.forEach((obj) => {
              validApiObject(obj) && mergedApiArray.push(obj)
            })
          } else if (typeof api === 'object') {
            validApiObject(api) && mergedApiArray.push(api)
          }
        } catch (e2) {
          console.log(`[Error] when reading files `, e2)
        }
      } else {
        console.log(`[warning] ${fileName} will be ignored !`)
      }
    })
    return mergedApiArray
  } catch(e) {
    console.log('[Error] ', e)
  }
  return []
}
