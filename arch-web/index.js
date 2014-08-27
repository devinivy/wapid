var Req = require('request');

exports.register = function(plugin, options, next) {
    
    var config = plugin.app.config;
    
    // We're using swig
    plugin.views(config.server.web.views);
    
    // We can use this to make API calls
    var apiURI = config.server.api.uri;
    
    // Displays a Ren and Stimpy quotation
    plugin.route({
        method: ['GET', 'POST'],
        path: '/',
        handler: function (request, reply) {
            
            Req({uri: apiURI + '/random', json: true}, function(err, response, quote) {
                if (err) throw err;
                
                reply.view('index.html', quote);
            });
            
        }
    });
    
    next();
}

exports.register.attributes = {
    name: 'arch-web',
    version: '0.0.0'
}
