const { src, dest, series, watch } = require(`gulp`),
    htmlValidator = require(`gulp-html`),
    htmlCompressor = require(`gulp-htmlmin`),
    cssValidator = require(`gulp-stylelint`);

let validateHTML = () => {
    return src(`index.html`)
        .pipe(htmlValidator());
};

let compressHTML = () => {
    return src(`index.html`)
        .pipe(htmlCompressor({collapseWhitespace:true}))
        .pipe(dest(`prod`));
};

let validateCSS = () => {
    return src(`styles/*.css`)
        .pipe(cssValidator({
            failAfterError: false,
            reporters: [{
                formatter: `string`,
                console: true
            }]
        }));
};

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.validateCSS = validateCSS;
