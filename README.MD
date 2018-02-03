

> Mock json api ? This is a great command line tool for building 'CORS' api, it will create a node server to provide api service by scanning  api js/json files in your working directory. 

> 

### Features
* support cross domain request
* support js files that use CommonJS
* support json file, object or array
* support changing port, dynamic detecting
* support static files service
* support livereload when some api file is modyfied 
* support open api in browser

Looks like this:

![](https://raw.githubusercontent.com/iceyangcc/mock-api-cli/master/images/cli-h.png)

### Installation

```text
npm install -g mock-api-cli

or yarn global add mock-api-cli (recommand)
```

### Usage

```text
cd your-work-directory
mock-api-cli -h 
```
> 

#### try it in teminal 
```text
mock-api-cli --port 3008 --watch -o
```


you should create js/json files that defines the api request path, request method  and response data, then we will serve those files via api 

### Api Fields Illustrate

* path: the request path
* res: the response data, it is an object or an array
* type: request method, like 'get', 'post', 'put', 'delete', 'options'

#### exmple: 
dirname/user.js (use CommonJS)

```text
module.exports = {
  path: '/user',
  res: {
    code: Math.random() > .5 ? 200 : 400,
    data: {
      username: 'iceyangcc',
      npm: 'https://www.npmjs.com/package/mock-api-cli'
    }
  }
}
you can custom you logic , you can export an array including many apis
```

#### another 
list.json (also include "path", "res", "type"...)

```text
[
  {
    path: '/detail/:id',
    type: 'post',
    res: {

    }
  },
  {
    path: '/login',
    type: 'post',
    res: {

    }
  }
]

The invalid object will be ignored
```

for more detail , visit https://github.com/iceyangcc/mock-api-cli

### Techs
* koa / middleware
* shell

### Know more
[my blog: http://blog.nodejs.tech](http://blog.nodejs.tech)
#####  
[github](https://github.com/iceyangcc)


### Contact me
iceyangcc@sina.com




