var async = require('async');

exports.register = function(plugin, options, next) {
    
    // Gotta have that dogwater
    plugin.dependency('dogwater');
    
    // Test API route
    plugin.route({
        method: 'GET',
        path: '/random',
        handler: function (request, reply) {
            
            // Thanks for the quotations, dogwater!
            var Quotes = request.model.quotes;
            
            Quotes.find()
            .then(function(quotes){
                
                var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                
                reply(randomQuote);
            })
            
        }
    });
    
    next();
    
}

exports.register.attributes = {
    name: 'arch-api',
    version: '0.0.0'
}
