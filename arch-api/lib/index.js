var async = require('async');

exports.register = function(plugin, options, next) {
    
    // Gotta have that dogwater
    plugin.dependency('dogwater');
    
    // Thanks for the quotations, dogwater!
    var Quotes = plugin.plugins['dogwater'].quotes;
    
    // Test API route
    plugin.route({
        method: 'GET',
        path: '/random',
        handler: function (request, reply) {
            
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
