'use strict';
module.exports = function(grunt) {


    // Load Grunt Tasks
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-cache-breaker');
    grunt.loadNpmTasks('grunt-exec');
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // // Metadata.
        // meta: {
        //     // basePath: '../',
        //     srcPath: 'dev/',
        //     deployPath: 'deploy/',
        // },
 
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> ',        

// ---------------------------
// Typescript Configuration
// ---------------------------        

        ts: {
            default: {
                src: ['app/**/*.ts'],
                //out: '../debug/js/main.js',
                outDir: 'js/',
                tsconfig: true
            }
        },

        webpack: {
            default: {
                entry: {
                    a: ['./app/main', './app/idsp.component']
                },
                devtool: 'source-map',
                output: {
                    path: 'ts',
                    filename: 'app.js'
                },
                resolve: {
                    extensions: ['.ts']
                },
                module: {
                    loaders: [
                        { test: /\.ts$/, loader: 'ts-loader' }
                    ]
                }
            }
        },

// ---------------------------
// tslint Configuration
// ---------------------------
        tslint: {
            options: {
                // can be a configuration object or a filepath to tslint.json
                configuration: "tslint.json"
            },
            files: {
                src: [
                    "app/**/*.ts"
                ]
            }
        },

// ---------------------------
// Concatenation Configuration
// ---------------------------        

        concat: {
            js: {
                src: ['app/**/*.js'],
                dest: '../../debug/js/app.js',
            },
        },

// ---------------------
// JSHint Configuration
// ---------------------        

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
            },            
            files: ['../../debug/app/**/**.js'
                    // 'dev/js/*.js'
                    ],
        },

// ---------------------
// SASS Configuration
// --------------------- 

        sass: {
            debug: {
                files: {
                    '../../debug/css/app.css': 'scss/app.scss',
                },
            },
        },

// --------------------------
// Minification Configuration
// --------------------------         

        uglify: {
            js: {
                src: ['../../debug/js/app.js'],
                dest: '../../debug/js/app.min.js',
            },
            options: {
                mangle: false
            },
        },

        cssmin: {
            css: {
                src: ['../../debug/css/app.css', '../../debug/css/nouislider.css'],
                dest: '../../debug/css/app.min.css',
            },
        },        

// --------------------
// Usemin Configuration
// --------------------

        useminPrepare:{
            html:'index.html',
            options:{
                dest:'../deploy'
            },
        },

        usemin:{
            html: ['../deploy/index.html'],
        },

// --------------------
// Copy Configuration
// --------------------   

        copy:{

            dependencies: {
                files: [
                    {
                        src:[
                            'node_modules/fastclick/lib/fastclick.js', 
                            'node_modules/hammerjs/hammer.min.js',
                            'node_modules/es6-shim/es6-shim.min.js',
                            'node_modules/systemjs/dist/system-polyfills.js',
                            'node_modules/angular2/bundles/angular2-polyfills.js',
                            'node_modules/systemjs/dist/system.src.js',
                            'node_modules/rxjs/bundles/Rx.js',
                            'node_modules/angular2/bundles/angular2.dev.js',
                            'node_modules/angular2/bundles/router.dev.js',
                            'node_modules/angular2/bundles/http.dev.js',
                            'node_modules/requirejs/require.js',
                            'node_modules/nouislider/distribute/nouislider.js',
                            'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
                        ],
                        dest:'../../debug/scripts',
                        expand: true, 
                        flatten: true,
                    }
                ]
            },

            resources: {
                files: [              
                    {
                        src:['img/**/*.*'],
                        dest:'../../debug/',
                        expand: true,
                    },
                    {
                        src:['res/**/*.*'],
                        dest:'../../debug/',
                        expand: true,                        
                    }
                ]
            },

            fonts: {
                files: [
                    {
                        src:['fonts/*.*'],
                        dest:'../../debug/',
                        expand: true
                    }
                ]
            },
            
            js: {
                files: [    
                    {
                        src:['config/**/*.json'],
                        dest:'../../debug/',
                        expand: true,
                    },
                    {
                        src:['init.js', 'tsconfig.json'],
                        dest:'../../debug/',
                        expand: true,
                    },
                    {
                        cwd:'js',
                        src:['*.js', '*.js.map', '*.baseDir.js' , '*.baseDir.js.map'],
                        dest:'../../debug/app/',
                        expand: true,
                    },
                    {
                        cwd:'js/app',
                        src:['**/*.js' , '**/*.js.map'],
                        dest:'../../debug/app/',
                        expand: true,
                    }
                ]
            },

            css: {
                files: [              
                    {
                        src:['node_modules/nouislider/src/nouislider.css'],
                        dest:'../../debug/css/nouislider.css',
                        expand: false,
                        flatten: true,
                    },
                ] } ,

            html: {
                files: [              
                    {
                        src:['app/**/*.html', 'index.html'],
                        dest:'../../debug/',
                        expand: true,
                    },
                ] } ,
                
            cordova: {
                files: [              
                    {
                        cwd: '../../debug/',
                        //src:['**'],
						src:[
							'app/**/*.*',
							'config/*.*',
							'css/*.*',
							'fonts/*.*',
							'img/**/*.*',
                            'js/*.*',
                            'res/**/*.*',
                            'scripts/*.*',
							'services/**/*.json',
							'init.js', 'tsconfig.json'
						],
                        dest:'../cordova/www/',
                        expand: true
                    },
                    {
                        cwd: '../../debug/',
                        src:['res/**/*.*'],
                        dest:'../cordova/',
                        expand: true
                    },
					{
                        cwd: './',
                        src:['index.cordova.html'],
                        dest:'../cordova/www/index.html',
                        expand: false,
                        flatten: true,
                    }
                ] 
            }
             
        },        

// ---------------------
// Clean Configuration
// ---------------------  
        clean:{
            options: { force: true },
            debug: ["../../debug/", "!../../debug/node_modules/"],
            cordova: ["../cordova/www/**", "../cordova/res/**"],
            sasscache: [".sass-cache/"]  
        },

// ---------------------
// Watch Configuration
// ---------------------         
        watch: {
            js: {
                files: ['js/**/*.js', 'js/**/*.js.map', 'Gruntfile.js', 'tsconfig.json','init.js'],
                tasks: ['copy:js'],
            },
            ts: {
                files: ['app/**/*.ts'],
                tasks: ['ts'],
            },
            sass: {
                files: 'scss/*.scss',
                tasks: ['sass'],
            },
            cssmin: {
                files: '../../debug/css/app.css',
                tasks: ['cssmin'],
            },
            html: {
                files: ['*.html','app/**/*.html'],
                tasks: ['copy:html'],
            },
            img: {
                files: 'img/*.*',
                tasks: ['copy:resources'],
            },
        },
            

        exec : {
            build : {
                cwd : "../cordova",
                command : "cordova build android",
                stdout : true,
                stderr : true
            },

            run : {
                cwd : "../cordova",
                command : 'cordova run android',
                stdout : true,
                stderr : true
            }
        },

// ---------------------
// Cache Breaker Configuration
// ---------------------          
        cachebreaker: {
            dev: {
                options: {
                    match: ['init.js', 'app.css'],
                },
                files: {
                    src: ['../../debug/index.html']
                }
            }
        }
    });  
// ---------------------
// Register Grunt Tasks
// ---------------------     

    grunt.registerTask('build',[
        // 'useminPrepare',
        'concat',
        'sass',
        'cssmin',
        'uglify',
        // 'usemin',
        'watch'
        ]);

    //Debug
    grunt.registerTask('debug',[      
        'clean:debug',
        'copy:dependencies',
        'copy:resources',
        'copy:html',
        'copy:css',
        'copy:fonts',
        'tslint',
        'ts',
        'copy:js',
        'concat',
        'sass',
        'clean:sasscache',
        // 'jshint',
        'cssmin',
        'uglify',
        'cachebreaker',
        'watch'
        ]); 

    grunt.registerTask('cordova',[      
        'clean:debug',
        'copy:dependencies',
        'copy:resources',
        'copy:html',
        'copy:css',
        'copy:fonts',
        'tslint',
        'ts',
        'copy:js',
        'concat',
        'sass',
        'clean:sasscache',
        // 'jshint',
        'cssmin',
        'uglify',
        'cachebreaker',
        'clean:cordova',
        'copy:cordova',
        'exec:build',
        'exec:run'
        ]); 

    grunt.registerTask('cordova-jenkins',[      
        'clean:debug',
        'copy:dependencies',
        'copy:resources',
        'copy:html',
        'copy:css',
        'copy:fonts',
        'tslint',
        'ts',
        'copy:js',
        'concat',
        'sass',
        'clean:sasscache',
        // 'jshint',
        'cssmin',
        'uglify',
        'cachebreaker',
        'clean:cordova',
        'copy:cordova'
        ]); 


    grunt.registerTask('default',[
        'tslint'
        ]);               

    grunt.registerTask('wp',[      
        'webpack'
    ]);

    grunt.registerTask('tss',[      
        'clean:debug',
        'ts'
    ]);

    grunt.registerTask('jenkins',[      
        'clean:debug',
        'copy:dependencies',
        'copy:resources',
        'copy:html',
        'copy:css',
        'copy:fonts',
        'tslint',
        'ts',
        'copy:js',
        'concat',
        'sass',
        'clean:sasscache',
        // 'jshint',
        'cssmin',
        'uglify',
        'cachebreaker',
        ]); 

};
