define([
    'jquery',
    'images',
    'class/gallery',
    'class/title'

], function($, images, Gallery, Title) {
    return {
        start: function() {
            $(function() {
                var gallery = new Gallery('.gallery');
                var title = new Title('.title');

                gallery.onChange(function(src) {
                    title.set(images[src]);
                });

                _.forEach(images, function(title, src) {
                    gallery.add(src, title);
                })
            });
        }
    }
});