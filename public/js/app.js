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

                console.log($('.next'));
                $('button').click(function() {
                    console.log('click');
                    gallery.next();
                });
            });
        }
    }
});