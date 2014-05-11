(function (window, document) {

    'use strict';

    var current,
        site = document.querySelector('.site');

    var ScrollObject = function (item) {
        this.item = item;
    };

    ScrollObject.prototype.scroll = function() {
        var animate = this.item.children[0].getAttribute('data-animate'),
            animateClass = 'site--animate' + animate;
        // apply class animate to body
        if(current) {
            site.classList.remove('site--animate' + current);
        }
        site.classList.add(animateClass);
        current = animate;
    };

    ScrollObject.prototype.init = function() {
        // keep reference
        var self = this;
        // addEventListener
        this.item.addEventListener('click', function () {
            event.preventDefault();
            self.scroll();
        }, false);
    };

    var scrolls = document.querySelectorAll('.nav__item');

    function init(items) {
        for(var i = 0; i < items.length; i++) {
            var item = new ScrollObject(items[i]);
            item.init();
        }
    }

    init(scrolls);

})(window, document);