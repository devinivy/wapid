wapid
=====

Example of the web-api-db pattern built on [Hapi](https://github.com/hapijs/hapi) and the [dogwater](https://github.com/devinivy/dogwater) plugin.  Serves Ren and Stimpy quotes.


This is heavily inspired by the internal structure of [Postmile](https://github.com/hueniverse/postmile), which also uses Hapi.
The meat of the application lives in three Hapi plugins:
* `dogwater` integrates Hapi with Waterline ORM.  Data is manipulated solely through this plugin, available on npm.
* `arch-api` uses `dogwater` as an abstraction layer to manipulate data.  `arch-api` is only aware of the global schema of the application, and isn't concerned with where particular pieces of data live.
* `arch-web` is responsible for the front-end interface.  `arch-web` can only use `arch-api` to manipulate data, by calling out to it as a separate server.
