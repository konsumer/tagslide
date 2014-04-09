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
*  Run local dev version with `npm start`
*  Compile production version with `grunt`
*  Run `bower install <PACKAGE> && grunt bower-install` to add a client-side dependency & update HTML