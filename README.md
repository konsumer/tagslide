# Tagslide

Basic event slideshow using AngularJS, easy to theme. Displays images and videos from Instagram. Synchronized, so the same thing shows on multiple computer-screens. Just post to Instagram with the tag, and it will show up.

Here is a [demo](http://tagslide.herokuapp.com/) with the tag #tagslide.

## Deploy

### heroku

You can deploy this on heroku easily, with 1 web dyno.

### configuration

Use `.env` to set your environment variables, or you can also edit your config variables in the dyno's settings.

To get settings from your remote heroku app:

	heroku config:pull --overwrite --interactive

To set settings on your remote heroku app:

	heroku config:push --overwrite --interactive


If you are not using heroku, just edit your `.env` file to look like this:

```
BASE_URI=http://<YOURS>.com/
INSTAGRAM_ID=<YOURS>
INSTAGRAM_SECRET=<YOURS>
INTERVAL=<INTERVAL_MS>
TAG=<TAG_TO_WATCH>
COMMENTS=no
```

*  You should probably set `INTERVAL` to  something larger than 3 seconds (default is 10000.)
*  `TAG` is whatever tag you want to watch for
*  `COMMENTS` is whether or not comments should be included

## Development

*  Install dependencies with `npm install`
*  Run local dev server with `npm start`

