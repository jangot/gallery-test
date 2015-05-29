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
            var img = $(imgTemplate({src: pathToImg}));
            img.on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
                $(e.target)
                    .removeClass('right')
                    .removeClass('left')
                    .removeClass('animation');
                this.inAnimation = false;
            }.bind(this));

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
            this.activeImg.addClass('left');
            var nextImg = this._getNext();

            this._setActive(nextImg);
        },
        prev: function() {
            if (!this._canMove()) {
                return;
            }
            this.inAnimation = true;
            this.activeImg.addClass('right');

            var prevImg = this._getPrev();
            this._setActive(prevImg);
        },
        _getNext: function() {
            var nextImg = this.activeImg.next();
            if (!nextImg.length) {
                nextImg = this.element.children().first();
            }
            nextImg.addClass('right');

            return nextImg;
        },
        _getPrev: function() {
            var prevImg = this.activeImg.prev();
            if (!prevImg.length) {
                prevImg = this.element.children().last();
            }
            prevImg.addClass('left');

            return prevImg;
        },
        _setActive: function(newActiveElement) {
            setTimeout(function() {
                this.activeImg
                    .addClass('animation')
                    .removeClass('active');
                newActiveElement
                    .addClass('animation')
                    .addClass('active');
                this.activeImg = newActiveElement;
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