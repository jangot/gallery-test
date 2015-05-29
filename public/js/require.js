requirejs.config({
    baseUrl: '/js/',
    paths: {
        app : 'app',
        jquery: '../bower_components/jquery/jquery.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        lodash: '../bower_components/lodash/dist/lodash.min'
    },
    shim: {
        app: ['lodash', 'bootstrap'],
        jquery: {
            exports: 'jQuery'
        },
        bootstrap: ['jquery']
    }
});