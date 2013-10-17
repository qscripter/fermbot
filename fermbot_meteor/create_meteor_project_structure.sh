mkdir ./lib/                       # <- any common code for client/server.
touch ./lib/environment.js         # <- general configuration
touch ./lib/methods.js             # <- Meteor.method definitions
touch ./lib/external               # <- common code from someone else
## Note that js files in lib folders are loaded before other js files.

mkdir ./collections/               # <- definitions of collections and methods on them (could be models/)

mkdir ./client

mkdir ./client/lib                 # <- client specific libraries (also loaded first)
touch client/lib/environment.js  # <- configuration of any client side packages
mkdir ./client/lib/helpers         # <- any helpers (handlebars or otherwise) that are used often in view files

touch ./client/application.js      # <- subscriptions, basic Meteor.startup code.
touch ./client/index.html          # <- toplevel html
touch ./client/index.js            # <- and its JS

mkdir ./client/views
touch ./client/views/main.html   # <- the templates specific to a single page
touch ./client/views/main.js     # <- and the JS to hook it up

mkdir ./client/stylesheets/        # <- css / styl / less files

mkdir ./server

touch ./server/publications.js     # <- Meteor.publish definitions

mkdir ./server/lib
touch ./server/lib/environment.js  # <- configuration of server side packages

mkdir ./public/                    # <- static files, such as images, that are served directly.

mkdir ./tests/                     # <- unit test files (won't be loaded on client or server)