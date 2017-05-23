const Nunjucks = require('nunjucks');

let Views: any = {
    engines: {
        njk: {
            compile: function (src, options) {
                const template = Nunjucks.compile(src, options.environment);

                return function (context) {
                    return template.render(context);
                };
            },

            prepare: function (options, next) {
                options.compileOptions.environment = Nunjucks.configure(options.path, { watch: false });
                return next();
            },
            defaultExtension: 'njk'
        }
    },
    defaultExtension: 'njk'
};

export default Views;