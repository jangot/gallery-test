define([

    'jquery'

], function($) {

    var titleTemplate = _.template('<span class="created hideText"><%= text %></span>');

    function Title(element) {
        this.element = $(element);
    }

    Title.prototype = {
        set: function(text) {
            var titleElement = $(titleTemplate({text: text}));
            var oldElements = this.element
                .children()
                .removeClass('created')
                .addClass('removed')
                .on('transitionend webkitTransitionEnd oTransitionEnd', function () {
                    $(this).remove();
                });

            this.element.append(titleElement);
            setTimeout(function() {
                oldElements.addClass('hideText');
                titleElement.removeClass('hideText');
            }, 0);
        }
    };

    return Title;
});