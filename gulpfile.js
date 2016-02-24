// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var gulp = require('gulp');
var del = require('del');
var mkdirp = require('mkdirp');
var runSequence = require('run-sequence');

gulp.task('clean', function () {
  del.sync(['dist']);
});

gulp.task('copy', function() {
  mkdirp('dist');
  gulp.src([
    'src/**',
    'README.md',
    'package.json'
  ])
  .pipe(gulp.dest('dist'));
});

gulp.task('dist', function(callback) {
  runSequence('clean', 'copy', callback);
});
