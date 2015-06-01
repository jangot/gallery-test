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
                //var hammertime = new Hammer($('.gallery')[0], {});
                //hammertime.on('swipe', function(ev) {
                //    console.log('swipe', ev);
                //});
                //hammertime.on('pan', function(ev) {
                //    console.log('pan', ev);
                //});


                var gallery = new Gallery('.gallery');
                images.forEach(function(img) {
                    gallery.add(img);
                });
                //
                //$('.next').click(function() {
                //    gallery.next();
                //});
                //$('.prev').click(function() {
                //    gallery.prev();
                //});
            });
        }
    }
});