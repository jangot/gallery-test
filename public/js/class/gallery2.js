define([

    'jquery',

    'Hammer'

], function($, Hammer) {

    var imgTemplate = _.template('<div title="<%= title %>" style="background:url(<%= src %>);" class="gallery-img"></div>');

    function Gallery(element) {
        this.element = $(element);
        this.width = this.element[0].clientWidth;
        this.images = [];
        this.current = null;

        this.isPin = false;
        var hammertime = new Hammer(this.element[0], {});
        hammertime.on('swipe', function(ev) {
            console.log('swipe', ev);
        });
        hammertime.on('pan', function(ev) {
            this.draw(ev.deltaX);
        }.bind(this));
    }

    Gallery.prototype = {
        add: function(pathToImg, title) {
            var img = $(imgTemplate({
                src: pathToImg,
                title: title || ''
            }));

            this.element.append(img);
            if (!this.current) {
                this.setCurrent(img);
            }
        },
        setCurrent: function(img) {
            this.current = img;
            img.addClass('current');
        },
        draw: function(deltaX) {
            var moveElement = this.current;
            var elCount = Math.ceil(Math.abs(deltaX) / this.width);

            while(elCount > 0) {
                moveElement.css('left', deltaX + 'px');
                deltaX


                moveElement = this._getNextElement(moveElement, deltaX);
            }
        },
        _getNextElement: function(moveElement, deltaX) {

        }
    };

    return Gallery;
});