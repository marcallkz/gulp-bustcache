# gulp-bustcache


bustcache is a tool for cache busting with gulp without the need for query strings. 
The plugin adds a random hash to the filename just before the extension.

# INSTALL

With [npm](http://npmjs.org) do:

```
npm install gulp-bustcache
```

# USAGE

``` js 
var gulp = require('gulp'),
    bust = require('gulp-bustcache');
    
gulp.task('bust', function() {
	gulp.src(['./src/**/*'])
		.pipe(bust())
		.pipe(gulp.dest('./public'));
});
```

The above code will run through every file in the 'src' folder and move it to 'public' with a hash in it's name. 
For example a file named :
```
src/main.js 
```
Will be something like 
``` 
public/main.7d6aa59b7be25c3eed016106500d08ca.js
```

To replace the names inside your html files you can use the [gulp-replace plugin](https://github.com/lazd/gulp-replace) and do something like

``` js
gulp.task('js-replace', function() {
	gulp.src(['./*.html']).pipe(replace(/\/main.*js/g, '/main.7d6aa59b7be25c3eed016106500d08ca.js')).pipe(gulp.dest('./'));
});
```
The above code assumes a single file name (for the sake of the example) and changes a specific pattern for JS files.

#### please be aware that this is not the best solution, just an idea.

# LICENSE

MIT