const { src, dest, series, watch } = require(`gulp`),
    htmlValidator = require(`gulp-html`);

let validateHTML = () => {
    return src(`index.html`)
        .pipe(htmlValidator());
};

exports.validateHTML = validateHTML;
