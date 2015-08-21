var fs = require('fs'),
	path = require('path'),
	crypt = require('crypto');



module.exports = function(arg, opts) {

	var md5Sum = null,
		dateStr = (+new Date()).toString(),
		arr = (typeof arg === "string") ? [arg] : (typeof arg === "object") ? arg : undefined,
		hash = '', ext = '', replaceArray = [];
	
	if (!arr)
		throw new Error("Invalid parameters. String or array expected, " + typeof arg + " given.");

	// fs.createReadStream(opts.src + opts.replace).pipe(fs.createWriteStream(opts.dist + opts.replace));

	for (var file in arr) {
		md5Sum = crypt.createHash('md5');
		hash = md5Sum.update(dateStr + arr[file]).digest('hex');
		
		srcFile = opts.src + arr[file];
		ext = path.extname(srcFile);
		distFile = path.basename(srcFile, ext) + '.' + hash + ext
		
		fs.createReadStream(srcFile).pipe(fs.createWriteStream(opts.dist + distFile));

		replaceArray.push({
			regex: new RegExp("\\{" + path.basename(srcFile) + "\\}", "g"),
			replace: distFile
		});
	}

	fs.readFile(opts.src + opts.replace, 'utf8', function (err,data) {
		var result = data,
		    regex = undefined;
		if (err) {
			return console.log(err);
		}
		

		replaceArray.forEach(function(v, k) {
			result = result.replace(v.regex, v.replace);
		});

		fs.writeFile(opts.dist + opts.replace, result, 'utf8', function (err) {
			if (err) return console.log(err);
		});
	});
}