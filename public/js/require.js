requirejs.config({
    baseUrl: '/js/',
    paths: {
        app : 'app',
        jquery: '../bower_components/jquery/jquery.min',
        jqueryMobile: '../bower_components/jquery-mobile-bower/js/jquery.mobile-1.4.5.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        lodash: '../bower_components/lodash/dist/lodash.min'
    },
    shim: {
        app: ['lodash', 'bootstrap', 'jqueryMobile'],
        jquery: {
            exports: 'jQuery'
        },
        jqueryMobile: ['jquery'],
        bootstrap: ['jquery']
    }
});