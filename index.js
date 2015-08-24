var path = require('path'),
    crypt = require('crypto'),
    gutil = require('gulp-util'),
    through = require('through2'),
    PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-bustcache';

function gulpBustCache() {
	return through.obj(function(file, encode, callback) {
		var ext = path.extname(file.path),
		    name = path.basename(file.path, ext),
		    dir = path.dirname(file.path),
		    rand = Math.round(Math.random() * +new Date()).toString(),
		    md5sum = crypt.createHash('md5'),
		    hash = md5sum.update(rand).digest('hex');

		file.path = dir + "/" + name + "." + hash + ext;

		callback(null, file);
	});
}

module.exports = gulpBustCache;