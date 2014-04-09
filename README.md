# Tagslide

Basic event slideshow using AngularJS, easy to theme. Displays images and videos from Instagram & Twitter.

## Deploy

This is designed to be deployed on heroku, so configuration is in `.env`.

Add a mongolab resource to your app, and you should be all set.

To get settings from remote:

	heroku config:pull --overwrite --interactive

To set settings:

	heroku config:push --overwrite --interactive

## Development

*  Install dependencies with `npm install`
*  Compile production version with `grunt`
*  Run `grunt bower` to add a client-side dependency & update HTML