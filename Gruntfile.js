module.exports = function(grunt){

    grunt.initConfig({
        watch: {
            ejs: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/libs/**', 'models/**/*.js', 'schemas/**/*.js'],
                //tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch'); //若有文件添加、修改或删除，就会去重新执行在它里面注册好的任务
    grunt.loadNpmTasks('grunt-nodemon'); //nodemon用于若项目源码变化，服务自动重启，
    grunt.loadNpmTasks('grunt-concurrent'); //跑多个阻塞的任务

    grunt.option('force', true);
    grunt.registerTask('default', ['concurrent']);
};