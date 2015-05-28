define([

    'jquery'

], function($) {

    var imgTemplate = _.template('<img src="<%= src %>" class="gallery-img"/>');

    function Gallery(element) {
        this.element = $(element);
        this.activeImg = null;
    }

    Gallery.prototype = {
        add: function(pathToImg) {
            var img = $(imgTemplate({src: pathToImg}));
            img.addClass('animation');
            this.element.append(img);

            if (!this.activeImg) {
                this.activeImg = this.element.children().first();
            } else {
                img.css('left', '-100%');
            }
        },
        next: function() {
            if (!this._canMove()) {
                return;
            }
            var nextImg = this.activeImg.next();
            if (!nextImg.length) {
                nextImg = this.element.children().first();
            }

            nextImg
                .removeClass('animation')
                .css('left', '100%');

            // interval need for apply prev style
            setTimeout(function() {
                nextImg
                    .addClass('animation')
                    .css('left', '0');

                this.activeImg
                    .css('left', '-100%');

                this.activeImg = nextImg;
            }.bind(this), 0)
        },
        prev: function() {

        },
        _canMove: function() {
            return this.activeImg && this.element.children().length > 1;
        }
    }

    return Gallery;
});