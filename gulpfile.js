const { src, dest, series, watch } = require(`gulp`),
    htmlValidator = require(`gulp-html`),
    htmlCompressor = require(`gulp-htmlmin`),
    cssValidator = require(`gulp-stylelint`),
    jsLinter = require(`gulp-eslint`),
    babel = require(`gulp-babel`),
    jsCompressor = require(`gulp-uglify`),
    cssCompressor = require(`gulp-clean-css`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let validateHTML = () => {
    return src(`index.html`)
        .pipe(htmlValidator());
};

let compressHTML = () => {
    return src(`index.html`)
        .pipe(htmlCompressor({collapseWhitespace:true}))
        .pipe(dest(`prod`));
};

let validateJS = () => {
    return src(`scripts/main.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
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

let compressCSS = () => {
    return src(`styles/*.css`)
        .pipe(cssCompressor())
        .pipe(dest(`prod/styles`));
};

let transpileJSForDev = () => {
    return src(`scripts/main.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
};

let transpileJSForProd = () => {
    return src(`scripts/main.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        server: {
            baseDir: [
                `./`,
                `./styles`,
                `temp`
            ]
        }
    });

    watch(`scripts/main.js`, series(validateJS, transpileJSForDev))
        .on(`change`, reload);

    watch(`styles/main.css`, validateCSS)
        .on(`change`, reload);

    watch(`index.html`, validateHTML)
        .on(`change`, reload);
};

exports.default = serve;
exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.validateCSS = validateCSS;
exports.compressCSS = compressCSS;
exports.validateJS = validateJS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
