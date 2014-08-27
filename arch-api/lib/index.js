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
    
    // Load quote fixtures
    var quoteFixtures = require('./fixtures.js');
    async.each(quoteFixtures, function(item, cb) {
        
        // Look for a quote...
        Quotes.findOne(item.id)
        .then(function(quote) {
            
            if (!quote) {
                
                // ... then create it if necessary!
                return Quotes.create(item)
                        .then(function(quote){
                            return null;
                        });
                
            } else {
                
                if (quote.saidBy !== item.saidBy ||
                    quote.quotation !== item.quotation) {
                    
                        // ... then update it if necessary!
                        return Quotes.update(quote.id, item)
                                .then(function(quotes){
                                    return null;
                                });
                                
                } else {
                    return null;
                }
            }
            
        })
        .then(cb);
        
    }, function(err) {
        if (err) throw err;
        next();
    });
    
}

exports.register.attributes = {
    name: 'arch-api',
    version: '0.0.0'
}
