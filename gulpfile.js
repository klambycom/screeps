var gulp = require("gulp");
var screeps = require("gulp-screeps");
var credentials = require("./credentials");

gulp.task("screeps", () => {
  gulp.src("*.js")
      .pipe(screeps(credentials))
});
