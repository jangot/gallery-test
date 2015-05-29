define([
    'jquery',
    'images',
    'class/gallery'

], function($, images, Gallery) {
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