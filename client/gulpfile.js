var es = require('event-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
// var connect = require('gulp-connect');
// var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var fs = require('fs');
var _ = require('lodash');


var scripts = require('./app.scripts.json');

var source = {
    js: {
        main: 'app/main.js',
        src: [
            // application config
            'constant/*.js',
            'app.js',

            // Connection
            'connection/*.js',
            // factories
            'factories/*.js',

            // directives
            'directives/*.js',
            'directives/**/*.js',

            // services
            'services/!(uploadHandler)*.js',

            // main controller
            'layout/main.js',

            'modules/**/*.js'
        ],
        admin: [
            'constant/*.js',
            'admin.js',

            // Connection
            'connection/*.js',
            // factories
            'factories/*.js',

            // directives
            'directives/*.js',
            'directives/**/*.js',

            // services
            'services/*.js',

            // main controller
            'admin/layout/main.js',

            'admin/!(layout)*/**/*.js'
        ]
        // tpl: 'app/**/*.tpl.html'
    }
};

var destinations = {
    js: 'build'
};


// gulp.task('build', function(){
//     return es.merge(gulp.src(source.js.src) , getTemplateStream())
//          .pipe(ngAnnotate())
//          .pipe(uglify())
//         .pipe(concat('app.js'))
//         .pipe(gulp.dest(destinations.js));
// });
//
// gulp.task('js', function(){
//     return es.merge(gulp.src(source.js.src) , getTemplateStream())
//         .pipe(concat('app.js'))
//         .pipe(gulp.dest(destinations.js));
// });

gulp.task('build', function(){
    return es.merge(gulp.src(source.js.src))
         .pipe(ngAnnotate())
         .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(destinations.js));
});

gulp.task('js', function(){
    return es.merge(gulp.src(source.js.src))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(destinations.js));
});

gulp.task('watch', function(){
    gulp.watch(source.js.src, ['js']);
    // gulp.watch(source.js.tpl, ['js']);
});

gulp.task('admin-js', function(){
    return es.merge(gulp.src(source.js.admin))
        .pipe(concat('admin.js'))
        .pipe(gulp.dest(destinations.js));
});

gulp.task('admin-watch', function(){
    gulp.watch(source.js.admin, ['admin-js']);
    // gulp.watch(source.js.tpl, ['js']);
});

// gulp.task('connect', function() {
//     connect.server({
//         port: 8001
//     });
// });

gulp.task('vendor', function(){
    _.forIn(scripts.chunks, function(chunkScripts, chunkName){
        var paths = [];
        chunkScripts.forEach(function(script){
            var scriptFileName = scripts.paths[script];

            if (!fs.existsSync(__dirname + '/' + scriptFileName)) {

                throw console.error('Required path doesn\'t exist: ' + __dirname + '/' + scriptFileName, script)
            }
            paths.push(scriptFileName);
        });
        gulp.src(paths)
            .pipe(concat(chunkName + '.js'))
            //.on('error', swallowError)
            .pipe(gulp.dest(destinations.js))
    })

});

gulp.task('prod', ['vendor', 'build']);
// gulp.task('dev', ['vendor', 'js', 'watch', 'connect']);
gulp.task('dev', ['vendor', 'js', 'watch']);
gulp.task('admin', ['vendor', 'admin-js', 'admin-watch']);
gulp.task('default', ['dev']);

var swallowError = function(error){
    console.log(error.toString());
    this.emit('end')
};

// var getTemplateStream = function () {
//     return gulp.src(source.js.tpl)
//         .pipe(templateCache({
//             root: 'app/',
//             module: 'app'
//         }))
// };
