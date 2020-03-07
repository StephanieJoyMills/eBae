import gulp from "gulp";
import loadPlugins from "gulp-load-plugins";
import webpack from "webpack";
import rimraf from "rimraf";

const plugins = loadPlugins();

import popupWebpackConfig from "./popup/webpack.config";
import eventWebpackConfig from "./event/webpack.config";
import backgroundWebpackConfig from "./background/webpack.config";
import contentWebpackConfig from "./content/webpack.config";
import authWebpackConfig from "./auth/webpack.config";

gulp.task("clean", (cb) => {
  rimraf("./build", cb);
});

gulp.task(
  "copy-manifest",
  gulp.series("clean", () => {
    return gulp.src("manifest.json").pipe(gulp.dest("./build"));
  })
);

gulp.task(
  "copy-images",
  gulp.series("clean", () => {
    return gulp.src("./images/**/*").pipe(gulp.dest("./build/images"));
  })
);

gulp.task(
  "copy-thirdparty-libs",
  gulp.series("clean", () => {
    return gulp.src("./thirdparty/*").pipe(gulp.dest("./build/thirdparty"));
  })
);

gulp.task(
  "copy-content-scripts",
  gulp.series("clean", () => {
    return gulp.src("./contentscripts/*").pipe(gulp.dest("./build/"));
  })
);

gulp.task(
  "popup-js",
  gulp.series("clean", (cb) => {
    webpack(popupWebpackConfig, (err, stats) => {
      if (err) throw new plugins.util.PluginError("webpack", err);
      plugins.util.log("[webpack]", stats.toString());

      cb();
    });
  })
);

gulp.task(
  "popup-html",
  gulp.series("clean", () => {
    return gulp
      .src("popup/src/index.html")
      .pipe(plugins.rename("popup.html"))
      .pipe(gulp.dest("./build"));
  })
);

gulp.task(
  "event-js",
  gulp.series("clean", (cb) => {
    webpack(eventWebpackConfig, (err, stats) => {
      if (err) throw new plugins.util.PluginError("webpack", err);
      plugins.util.log("[webpack]", stats.toString());
      cb();
    });
  })
);

gulp.task(
  "background-js",
  gulp.series("clean", (cb) => {
    webpack(backgroundWebpackConfig, (err, stats) => {
      if (err) throw new plugins.util.PluginError("webpack", err);
      plugins.util.log("[webpack]", stats.toString());

      cb();
    });
  })
);

gulp.task(
  "auth-js",
  gulp.series("clean", (cb) => {
    webpack(authWebpackConfig, (err, stats) => {
      if (err) throw new plugins.util.PluginError("webpack", err);
      plugins.util.log("[webpack]", stats.toString());
      cb();
    });
  })
);

gulp.task(
  "content-js2",
  gulp.series("clean", (cb) => {
    webpack(contentWebpackConfig2, (err, stats) => {
      if (err) throw new plugins.util.PluginError("webpack", err);

      plugins.util.log("[webpack]", stats.toString());

      cb();
    });
  })
);

gulp.task(
  "content-js",
  gulp.series("clean", (cb) => {
    webpack(contentWebpackConfig, (err, stats) => {
      if (err) throw new plugins.util.PluginError("webpack", err);

      plugins.util.log("[webpack]", stats.toString());

      cb();
    });
  })
);

gulp.task(
  "build",
  gulp.parallel(
    "copy-manifest",
    "copy-images",
    "copy-thirdparty-libs",
    "copy-content-scripts",
    "content-js",
    "popup-js",
    "popup-html",
    "event-js",
    "background-js",
    "auth-js",
    "content-js"
  )
);

gulp.task("default", gulp.series("build"));

gulp.task(
  "watch",
  gulp.series("default", () => {
    gulp.watch("popup/**/*", ["build"]);
    gulp.watch("auth/**/*", ["build"]);
    gulp.watch("content/**/*", ["build"]);
    gulp.watch("contenet2/**/*", ["build"]);
    gulp.watch("event/**/*", ["build"]);
    gulp.watch("background/**/*", ["build"]);
  })
);
