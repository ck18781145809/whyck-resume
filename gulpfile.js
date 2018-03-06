var gulp = require('gulp'),
	md5 = require('gulp-md5-plus'),// 文件名加md5
	del = require('del'),// 删除文件
	cssmin = require('gulp-clean-css'),// 压缩css
	uglify = require("gulp-uglify"),//
	minifyHtml = require("gulp-minify-html");// 压缩html

// 每次执行先删除旧的dist 然后再生成一个新的dist
gulp.task('default',['clean'],function(){
	gulp.start('font');
})

// 开发环境的index输出到发布包中
gulp.task('html',function(){
	return gulp.src('./index.html')
			   .pipe(minifyHtml())
			   .pipe(gulp.dest('./dist/'))
})

//	对css文件加md5控制版本
gulp.task('css',['html'],function(){
	return gulp.src(['./css/*.css'])
			   .pipe(cssmin()) //压缩css
			   .pipe(md5(10,'./dist/*.html',{
				   mappingFile: 'manifest.json' // 将对应关系写到mainfest.json中
			   }))
			   .pipe(gulp.dest("./dist/css/"));
})

//	对js文件加md5控制版本
gulp.task('js',['css'],function(){
	return gulp.src("./js/*.js")
			   .pipe(md5(10,'./dist/*.html',{
				   mappingFile: 'manifest.json' // 将对应关系写到mainfest.json中
			   }))
			   .pipe(uglify())
			   .pipe(gulp.dest("./dist/js/"));
})

//	输出图片到dist
gulp.task('img',['js'],function(){
	return gulp.src("./images/**")
			   .pipe(gulp.dest("./dist/images/"));
})

//  输出字体文件到dist
gulp.task('font',['img'],function(){
	return gulp.src("./fonts/*")
			   .pipe(gulp.dest("./dist/fonts"));
})

// 删除发布包和mainfest.json
gulp.task('clean', function(){
	return del(['./dist','./manifest.json']);
});
