module.exports = function (grunt) {
    // Load Grunt Tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        ts: {
            default: {
                src: ['services/**/*.ts' , 'controllers/**/*.ts', 'main.ts'],
                tsconfig: true
            }
        }
    });
    grunt.registerTask('build', ['ts']);
};

