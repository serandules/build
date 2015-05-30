var Build = require('component-build');
var resolve = require('component-resolver');
var fs = require('fs');

module.exports = function () {
    var options = {
        destination: 'public',
        install: true
    };
    resolve(process.cwd(), options, function (err, tree) {
        if (err) {
            throw err;
        }
        var build = Build(tree, options);
        build.scripts(function (err, js) {
            if (err) {
                throw err;
            }
            fs.writeFile('public/build.js', js);
        });
        build.styles(function (err, css) {
            if (err) {
                throw err;
            }
            fs.writeFile('public/build.css', css);
        });
        build.files(function (err) {
            if (err) {
                throw err;
            }
        });
    });
};