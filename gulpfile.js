"use strict";

var gulp = require('gulp');
var jsoncombine = require('gulp-jsoncombine');
var mkdirp = require('mkdirp');

// Create required directories
mkdirp('dist');

gulp.task('build', ['merge-catalog']);

gulp.task('merge-catalog', [], function() {
    var jsonspacing=0;
    return gulp.src("./datasources/*.json")
        .pipe(jsoncombine("mapFrance.json", function(data) {
            // be absolutely sure we have the files in alphabetical order, with 000_settings first.
            var keys = Object.keys(data).slice().sort();
            data[keys[0]].catalog = [];
	    
            for (var i = 1; i < keys.length; i++) {
		data[keys[0]].catalog.push(data[keys[i]].catalog[0]);
            }
            return new Buffer(JSON.stringify(data[keys[0]], null, jsonspacing));
	}))
	.pipe(gulp.dest("./dist"));
});
