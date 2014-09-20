# Tagslide

Basic event slideshow using AngularJS, easy to theme. Displays images and videos from Instagram. Synchronized, so the same thing shows on multiple computer-screens. Just post to Instagram with the tag, and it will show up.

Here is a [demo](http://tagslide.herokuapp.com/) with the tag #tagslide.

Optionally, you can moderate

## Deploy

### heroku

You can deploy this on heroku (for free) easily, with 1 web dyno.

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
MODERATED=no
MONGO_URI=blahblah
```

*  You should probably set `INTERVAL` to  something larger than 3000 for proper latency & animation (default is 10000.)
*  `TAG` is whatever tag you want to watch for. On the demo, it's "tagslide".
*  `COMMENTS` is whether or not comments should be displayed
*  `MODERATED` is whether or not you want to OK every image.  If you set this to true, but don't approve any images, then nothing will show. This will require a mongodb (free heroku addon) to use.
*  `MONGO_URI`, `MONGOHQ_URL`, `MONGOLAB_URI`, or `MONGOSOUP_URL` is needed if you want to moderate posts. It stores approved posts

### moderation

The approved images are stored in an optional mongodb database. If you set `MODERATED` to "yes" in your `.env` file, you can approve posts form the command-line. Only those that are approved will show up. You can use the command-line utility `./approve`. You will need a mongodb database. I use MongoLab (free.)

#### approve

    ./approve SOURCE ID

*  type "instagram" or "twitter" for SOURCE
*  type whatever the ID is for ID.


## Development

*  Install dependencies with `npm install`
*  Run local dev server with `npm start`

