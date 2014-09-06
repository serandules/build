/**
 * Module dependencies.
 */

var Builder = require('component-builder'),
    templates = require('./templates'),
    rework = require('./rework'),
    fs = require('fs'),
    write = fs.writeFileSync,
    env = process.env.NODE_ENV;

/**
 * Component builder middleware.
 */

module.exports = function (req, res, next) {
    if (env !== 'development') {
        return next();
    }
    var builder = new Builder('.');
    builder.addLookup('app'); // TODO: shouldn't be necessary
    builder.copyAssetsTo('public');
    builder.use(rework);
    builder.use(templates);
    builder.build(function (err, res) {
        if (err) return next(err);
        write('public/app.js', res.require + res.js);
        write('public/app.css', res.css);
        next();
    });
};
