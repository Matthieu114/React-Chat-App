const url = require('url')
const qs = require('querystring')
const MY_NAME = 'matthieu'
const content = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
  </body>
</html>`

module.exports = {
  serverHandle: function (req, res) {
    const route = url.parse(req.url)
    const path = route.pathname
    const params = qs.parse(route.query)

    console.log(route)
    console.log(path)
    console.log(params.name)

    res.writeHead(200, { 'Content-Type': 'text/html' })

    if (path === '/') {
      res.write(content)
    } else if (path === '/hello/' && params.name == MY_NAME) {
      res.write(
        'Hello my name is ' +
          params['name'] +
          ' and i am a 22 years old french male'
      )
    } else if (path === '/hello/' && 'name' in params) {
      res.write('hello ' + params['name'])
    } else {
      res.write('404: Server address could not be found')
    }
  }
}
