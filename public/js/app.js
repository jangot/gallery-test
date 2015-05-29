define([
    'jquery',
    'images',
    'class/gallery',

    'jqueryMobile'

], function($, images, Gallery) {
    var DURATION_MIN = 150;

    $.mobile.autoInitializePage = false;

    return {
        start: function() {
            $(function() {
                var gallery = new Gallery('.gallery');
                images.forEach(function(img) {
                    gallery.add(img);
                });

                $('.next').click(function() {
                    gallery.next();
                });
                $('.prev').click(function() {
                    gallery.prev();
                });

                $('.gallery')
                    .swipeleft(function() {
                        gallery.next();
                    })
                    .swiperight(function() {
                        gallery.prev();
                    });
            });
        }
    }
});