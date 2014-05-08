(function (window, document) {

    'use strict';

    var scrollObject = function (item) {
        this.item = item
    }

    scrollObject.prototype.scroll = function() {
        var el = document.querySelector(this.item.children[0].hash);
        window.scroll(0, el.offsetTop);
    }

    scrollObject.prototype.init = function() {
        // keep reference
        var self = this;
        // addEventListener
        this.item.addEventListener('click', function () {
            event.preventDefault();
            self.scroll();
        }, false);
    }

    var scrolls = document.querySelectorAll('.nav__item');

    function init(items) {
        for(var i = 0; i < items.length; i++) {
            var item = new scrollObject(items[i]);
            item.init();
        }
    }

    init(scrolls);

})(window, document);