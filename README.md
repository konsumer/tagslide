# Tagslide

Basic event slideshow using AngularJS, easy to theme. Displays images and videos from Instagram & Twitter.

## Deploy

This is designed to be deployed on heroku, so configuration is in `.env`.

Add a mongolab resource to your app, and you should be all set.

To get settings from remote:

	heroku config:pull --overwrite --interactive

To set settings:

	heroku config:push --overwrite --interactive

If you are not using heroku, just edit your `.env` file to look like this:

```
INSTAGRAM_ID=<YOURS>
INSTAGRAM_SECRET=<YOURS>
BASE_URI=<FULL WEB-ACCESSABLE URL>
MONGOLAB_URI=<YOURS>
SESSION_SECRET=<A RANDOM STRING>
```

## Development

*  Install dependencies with `npm install`
*  Run local dev server with `npm start`
*  Project uses [bower](http://bower.io/) tomanage client-side dependencies
*  Project uses [brunch](http://brunch.io/) to manage assets, building production static files & running local dev server. Source files in `src/` get built into production files in `webroot/`
