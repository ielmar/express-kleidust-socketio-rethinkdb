var gulp = require('gulp');
var dust = require('gulp-dust');
var debug = require('gulp-debug');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var shell = require('gulp-shell');
var sftp = require('gulp-sftp');
var changed = require('gulp-changed');
var rsync = require('gulp-rsync');

var host = '46.101.213.27',
//    auth = 'keyMain',
    user = 'qafqaz-info',
    pass = 'Q73gVejbjaGNLDpe',
    port = 1982,
    remotePath = '/home/qafqaz-info';

gulp.task('default', ['watch']);

gulp.task('compile', function() {
   return gulp.src('./views/*.dust')
//    .pipe(changed('./public/js/compiled/'))
    .pipe(debug({title:'Qafqazinfo:'}))
    .pipe(dust({
    name: function (file) {
        return 'tpl-' + file.relative;
    },
    // config: {amd: false}
}))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/compiled/'))
});

gulp.task('sync', function() {
    return gulp.src(['public/css','public/js'])
        .pipe(rsync({
//            root: '/home',
            hostname: '188.166.77.235',
            username: 'root',
            destination: '/home/cdn',
            incremental: true,
            exclude: [],
            progress: true
        }));
});

gulp.task('concat', function() {
  return gulp.src('./public/js/compiled/*.js')
    .pipe(concat('views.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public_html/js/'))
	.pipe(sftp({
		host: host,
		remotePath: remotePath+'/public_html/js',
		user: user,
		pass: pass,
		port: port,
		compress: true,
	}));
});

gulp.task('upload', function() {
  return gulp.src('./public/js/views.min.js')
	.pipe(sftp({
		host: host,
		remotePath: remotePath+'/public_html/js',
		user: user,
		pass: pass,
		port: port,
		compress: true,
	}));
});

gulp.task('purge-cloudflare', function(){
  return gulp.src('./public/js/*.js', {read: false})
//    .pipe(changed('./public/js/'))
    .pipe(shell([
      'curl -X DELETE "https://api.cloudflare.com/client/v4/zones/158a5eda488723ec9557a61bec6e85f6/purge_cache" -H "Content-Type:application/json" -H "X-Auth-Key:bab549731f9722820a2396859a645adeb1f5e" -H "X-Auth-Email:qafqazsite@gmail.com" --data \'{"files":["http://new.qafqazinfo.az/js/qafqazinfo.js", "http://new.qafqazinfo.az/js/all.min.js"],"tags":["some-tag","another-tag"]}\''
  ]));
});

gulp.task('watch', function(){
   gulp.watch('./views/**/*.dust', ['compile']);
   gulp.watch('./public/js/compiled/*.js', ['concat']);
//   gulp.watch('./public/js/views.min.js', ['upload']);
});
