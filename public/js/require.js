requirejs.config({
    baseUrl: '/js/',
    paths: {
        jquery: '../bower_components/jquery/jquery.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        lodash: '../bower_components/lodash/dist/lodash.min'
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        },
        bootstrap: ['jquery']
    }
});