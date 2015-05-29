define([

    'jquery'

], function($) {

    var imgTemplate = _.template('<img src="<%= src %>" class="gallery-img"/>');

    function Gallery(element) {
        this.element = $(element);
        this.activeImg = null;
        this.inAnimation = false;
    }

    Gallery.prototype = {
        add: function(pathToImg) {
            var self = this;
            var img = $(imgTemplate({src: pathToImg}));
            img
                .on('transitionend webkitTransitionEnd oTransitionEnd', function() {
                    $(this)
                        .removeClass('right')
                        .removeClass('left')
                        .removeClass('animation');
                    self.inAnimation = false;
                });
            this.element.append(img);

            if (!this.activeImg) {
                this.activeImg = this.element.children().first();
                this.activeImg.addClass('active')
            }
        },
        next: function() {
            if (!this._canMove()) {
                return;
            }
            this.inAnimation = true;

            var nextImg = this.activeImg.next();
            if (!nextImg.length) {
                nextImg = this.element.children().first();
            }
            nextImg.addClass('right');
            this.activeImg.addClass('left');

            setTimeout(function() {
                this.activeImg
                    .addClass('animation')
                    .removeClass('active');
                nextImg
                    .addClass('animation')
                    .addClass('active');
                this.activeImg = nextImg;
            }.bind(this), 10);
        },
        prev: function() {
            if (!this._canMove()) {
                return;
            }
            this.inAnimation = true;

            var prevImg = this.activeImg.next();
            if (!prevImg.length) {
                prevImg = this.element.children().first();
            }
            prevImg.addClass('left');
            this.activeImg.addClass('right');

            setTimeout(function() {
                this.activeImg
                    .addClass('animation')
                    .removeClass('active');
                prevImg
                    .addClass('animation')
                    .addClass('active');
                this.activeImg = prevImg;
            }.bind(this), 10);
        },
        _canMove: function() {
            return this.activeImg &&
                this.element.children().length > 1 &&
                !this.inAnimation;
        }
    }

    return Gallery;
});