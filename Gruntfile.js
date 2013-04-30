module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            mainJS: {
                options: {
                    baseUrl: "public/js/app",
                    paths: {
                        "app": "config/Init",
                        "hbs": "../libs/hbs",
                        "handlebars" : "../libs/handlebars",
                        "underscore" : "../libs/lodash",
                        "i18nprecompile" : "../libs/i18nprecompile",
                        "json2" : "../libs/json2"
                    },
                    wrap: true,
                    name: "../libs/almond",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    mainConfigFile: "public/js/app/config/Init.js",
                    include: ["app"],
                    out: "public/js/app/config/Init.min.js",

                    /*********
                     * https://github.com/SlexAxton/require-handlebars-plugin
                     */
                    pragmasOnSave: {
                        //removes Handlebars.Parser code (used to compile template strings) set
                        //it to `false` if you need to parse template strings even after build
                        excludeHbsParser : true,
                        // kills the entire plugin set once it's built.
                        excludeHbs: true,
                        // removes i18n precompiler, handlebars and json2
                        excludeAfterBuild: true
                    },

                    locale: "en_us",

                    // default plugin settings, listing here just as a reference
                    hbs : {
                        templateExtension : 'html',
                        // if disableI18n is `true` it won't load locales and the i18n helper
                        // won't work as well.
                        disableI18n : false
                    }

                }
            },
            mainCSS: {
                options: {
                    optimizeCss: "standard",
                    cssIn: "./public/css/app.css",
                    out: "./public/css/app.min.css"
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: false,
                    module: true,
                    document: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['requirejs:mainJS', 'requirejs:mainCSS']);
    grunt.registerTask('default', ['test', 'build']);

};