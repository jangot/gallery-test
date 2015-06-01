define([
    'jquery',
    'images',
    'class/gallery2',
    'Hammer'

], function($, images, Gallery, Hammer) {
    var DURATION_MIN = 150;

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
            });
        }
    }
});