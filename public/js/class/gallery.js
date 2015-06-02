define([

    'jquery',

    'Hammer'

], function($, Hammer) {

    var imgTemplate = _.template('<div title="<%= title %>" style="background:url(<%= src %>);" class="gallery-img"></div>');

    function Gallery(element) {
        this.element = $(element);
        this.width = this.element[0].clientWidth;
        this.current = null;
        this.listeners = [];

        var hammertime = new Hammer(this.element[0], {});
        hammertime.on('pan', function(ev) {
            this.move(ev.deltaX);
        }.bind(this));
        hammertime.on('panend', function(ev) {
            var oldCurrent = this.current;
            this.current = this._getNewCurrent();
            if (oldCurrent !== this.current) {
                this._notify();
            }
            this.draw();
        }.bind(this));
    }

    Gallery.prototype = {
        onChange: function(fn) {
            if (_.isFunction(fn)) {
                this.listeners.push(fn);
            }
        },
        add: function(pathToImg, title) {
            var img = $(imgTemplate({
                src: pathToImg,
                title: title || '',
                index: this.element.children().length
            }));

            img.data('src', pathToImg);
            this.element.append(img);
            if (this.current === null) {
                this.current = 0;
                img.addClass('active');
                this._notify();
            }
        },
        draw: function() {
            var list = this.element.children();

            var next = this._getNextIndex(this.current, list);
            var prev = this._getPrevIndex(this.current, list);

            list
                .eq(this.current)
                .addClass('animation')
                .css('left', '0px');
            list
                .eq(next)
                .addClass('animation')
                .css('left', '100%');
            list
                .eq(prev)
                .addClass('animation')
                .css('left', '-100%');
        },
        move: function(deltaX) {
            var duration = Math.abs(deltaX);
            var direction = deltaX < 0 ? 'left' : 'right';
            var moveElementsCount = Math.floor(duration / this.width);
            var viewElement = this.current;
            var list = this.element.children();

            while (moveElementsCount > 0) {
                if (direction === 'right') {
                    deltaX = deltaX - this.width;
                    viewElement = this._getPrevIndex(viewElement, list);
                } else {
                    deltaX = deltaX + this.width;
                    viewElement = this._getNextIndex(viewElement, list);
                }
                moveElementsCount--;
            }

            var secondElement = 0;
            var secondDelta = 0;
            if (direction === 'right') {
                secondElement = this._getPrevIndex(viewElement, list);
                secondDelta = deltaX - this.width;
            } else {
                secondElement = this._getNextIndex(viewElement, list);
                secondDelta = deltaX + this.width;
            }

            list
                .removeClass('animation')
                .removeClass('active');
            list
                .eq(viewElement)
                .addClass('active')
                .css('left', deltaX + 'px');
            list
                .eq(secondElement)
                .addClass('active')
                .css('left', secondDelta + 'px');
        },
        _notify: function() {
            var img = this.element.children().eq(this.current);
            this.listeners.forEach(function(fn) {
                fn(img.data('src'));
            }.bind(this));
        },
        _getNewCurrent: function() {
            var list = this.element.children();

            var width = this.width;
            var current = null;
            list.each(function(i){
                var el = $(this);
                if (el.filter('.active').length === 0) {
                    return;
                }
                var left = el.position().left;
                if (Math.abs(left) < width / 2) {
                    current = i;
                    return false;
                }
            });

            return current;
        },
        _getPrevIndex: function(index, list) {
            if (index === 0) {
                return list.length - 1;
            } else {
                return --index;
            }
        },
        _getNextIndex: function(index, list) {
            var elementsCount = list.length - 1;
            if (index === elementsCount) {
                return 0;
            } else {
                return ++index;
            }
        }
    };

    return Gallery;
});