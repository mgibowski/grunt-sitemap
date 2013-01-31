// Generated by CoffeeScript 1.4.0
(function() {

  module.exports = function(grunt) {
    var fs, path;
    path = require('path');
    fs = require('fs');
    return grunt.registerMultiTask('sitemap', 'sitemap description', function() {
      var changefreq, file, files, homeErrMess, pattern, priority, root, rootWarnMess, sitemapPath, url, xmlStr, _i, _len;
      url = grunt.config.get('pkg.homepage') || this.data.homepage;
      if (url.slice(-1) !== '/') {
        url += '/';
      }
      root = path.normalize(this.data.siteRoot || '.');
      changefreq = this.data.changefreq || 'daily';
      priority = (this.data.priority || 0.5).toString();
      pattern = path.join(root, this.data.pattern || '/**/*.html');
      homeErrMess = 'Requires "homepage" parameter. Sitemap was not created.';
      if (!url) {
        grunt.fail.warn(homeErrMess, 3);
      }
      rootWarnMess = 'No "siteRoot" parameter defined. Using current directory.';
      if (root === '.') {
        grunt.log.subhead(rootWarnMess);
      }
      files = grunt.file.expand(pattern);
      files = grunt.utils._.map(files, function(file) {
        var fileStat, mtime, rawUrlPath, urlPath;
        fileStat = {};
        rawUrlPath = file.replace(root, '');
        urlPath = rawUrlPath.replace(/(index)\.[A-z]+$/, '', 'i');
        fileStat.url = url + urlPath;
        mtime = (fs.statSync(file).mtime).getTime();
        fileStat.mtime = new Date(mtime).toISOString();
        return fileStat;
      });
      xmlStr = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xmlStr += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9/">\n';
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        xmlStr += '<url>\n';
        xmlStr += "  <loc>" + file.url + "</loc>\n";
        xmlStr += "  <lastmod>" + file.mtime + "</lastmod>\n";
        xmlStr += "  <changefreq>" + changefreq + "</changefreq>\n";
        xmlStr += "  <priority>" + priority + "</priority>\n";
        xmlStr += "</url>\n";
      }
      xmlStr += '</urlset>';
      sitemapPath = path.join(root, 'sitemap.xml');
      grunt.file.write(sitemapPath, xmlStr);
      grunt.log.writeln('Sitemap created successfully');
      grunt.log.writeln('OK');
      if (grunt.task.current.errorCount) {
        return false;
      } else {
        return true;
      }
    });
  };

}).call(this);
