const url = require('url')
const qs = require('querystring')
const MY_NAME = 'matthieu'
const content = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=p, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    
      <a
        href="https://github.com/adaltas/ece-webtech-2021-fall/blob/master/courses/webtech/modules/01.nodejs/lab.md#part-5-create-a-basic-application-with-multiple-routes"
      >Tutorial</a>
       <p> When using the route /hello in the Url , it takes a name query parameter </p>
       <p>Your query should look like this /hello/?name=matthieu </p>
    
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
