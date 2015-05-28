requirejs.config({
    baseUrl: '/js/',
    paths: {
        jquery: '../bower_components/jquery/jquery.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min'
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        }
    }
});