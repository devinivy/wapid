var Path = require('path'),
rootPath = Path.normalize(__dirname);

module.exports = {
    
    product: {
        name: 'wapid'
    },
    
    server: {
        web: {
            host: 'localhost',
            port: process.env.PORT || 3000,
            views: {
                path: rootPath + '/arch-web/views',
                engines: {
                    html: require('swig')
                }
            }
        },
        api: {
            host: 'localhost',
            port: 3001
        }
    },
    
    database: {
        connections: {
            diskDb: {
                adapter: 'disk'
            }
        },
        adapters: {
            disk: require('sails-disk')
        },
        models: [
            {
                identity: 'quotes',
                connection: 'diskDb',
                
                attributes: {
                    quotation: 'text',
                    saidBy: 'string'
                }
                
            }
        ],
        data: {
            dir: Path.normalize(__dirname + '/arch-api/lib'),
            pattern: 'fixtures.js'
        }
    }
    
}
