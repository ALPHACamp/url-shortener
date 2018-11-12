## step-by-step tutorial

```
$ mkdir L3-express-url-shortener
$ cd L3-express-url-shortener
$ git init
$ npm init
$ npm install --save express express-handlebars mongoose

# coding ...

$ git add .
$ git commit -m 'first commit: node project init'

# coding ...

$ npm start
$ git add .
$ git commit -m 'first express app connecting mongo init'

$ mkdir models
$ touch models/url.js

# coding ...

$ npm start
$ git add .
$ git commit -m 'attach first model: Url'

$ mkdir views
$ mkdir views/layouts

# coding ...

$ npm start
$ git add .
$ git commit -m 'attach first view to express'

# coding ...

$ npm start
$ git add .
$ git commit -m 'update "post /urls" route to shorten url and "get /:shortened_id" route to redirect short url'

# coding ...

$ npm start
$ git add .
$ git commit -m 'update "get /" route to show all short urls'
```


