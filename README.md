# Tagslide

Basic event slideshow using AngularJS, easy to theme. Displays images and videos from Instagram. Synchronized, so the same thing shows on multiple computers.

## Deploy

This is designed to be deployed on heroku, so configuration is in `.env`.

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
```

## Development

*  Install dependencies with `npm install`
*  Run local dev server with `npm start`

