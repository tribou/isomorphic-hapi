var http = require('http'),
    browserify = require('browserify'),
    literalify = require('literalify'),
    React = require('react'),
    Hapi = require('hapi'),
    url = require('url'),
    path = require("path");

    MyApp = React.createFactory(require('./build/bundle'))

var server = new Hapi.Server();
server.connection({ port: 1337 });


server.route({
    method: 'GET',
    path: '/api/{id*}',
    handler: function(request, reply) {
        reply({'message': 'This is a test' + request.params.id});
    }
});

server.route({
  method: 'GET',
  path: '/{p*}',
  handler: function(request, reply) {
      if (request.url.path == '/') {

          var props = {data: ['any','data','you','want','to','send','in']}

          var myAppHtml = React.renderToString(MyApp(props))


          reply (
            '<div id=content>' + myAppHtml + '</div>' +
            '<script src=/vendor.js></script>' +
            '<script src=/bundle.js></script>' +
            '<script>' +
              'var MyApp = React.createFactory(require("myApp"));' +
              'React.render(MyApp(' + safeStringify(props) + '), '+
              'document.getElementById("content"))' +
            '</script>'
          ).type('Content-Type', 'text/html')


      } else if (request.url.path == '/vendor.js') {
          reply.file(__dirname+'/public/'+request.url.path)
      } else if (request.url.path == '/bundle.js') {
          reply.file(__dirname+'/public/'+request.url.path)

      } else {
        reply('Uh oh... the page was not found').code(404);
      } 
   }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

function safeStringify(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}