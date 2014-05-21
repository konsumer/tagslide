/**
 * brunch config
 */

exports.config = {
  paths: {
    'public': 'webroot',
    'watched':['src']
  },

  files: {
    javascripts: {
      defaultExtension: 'js',
      joinTo: {
        'js/app.js': /^src/,
        'js/ie.js': /^bower_components[\\/](?=json3|es5-shim)/,
        'js/vendor.js': /^bower_components[\\/](?!json3|es5-shim)/,
      }
    },

    stylesheets: {
      defaltExtension: 'less',
      joinTo: {
        'css/site.css': /^src\/less\/site.less/,
      }
    }
  },
  
  framework: 'AngularJS',
  
  server:{
    path: 'server/worker.js',
    base: 'webroot'
  }

};