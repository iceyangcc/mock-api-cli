This is a great command line tool for building 'CORS' api, it will create a node server to provide api service by scanning  api js/json files in your working directory. 

> 

### Features
* support cross domain request
* support .js that use CommonJS
* support .json 
* support changing port, dynamic detecting
* support static files service
* support livereload when some file is modyfied 
* support open api in browser

Looks like this:
![](/images/cli-h.png)

### Installation

```text
sudo npm install -g

or sudo yarn global add mock-api-cli
```

### Usage

```text
cd your-work-directory
mock-api-cli -h 
```
> 

create js/json files that defines the api request path, request method  and response data

exmple: 
user.js (use CommonJS)

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

another
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

mock-api-cli --port 3008 --watch -o

for more detail , visit https://github.com/iceyangcc

### Techs
* koa / middleware
* shell

### Contact me
iceyangcc@sina.com
