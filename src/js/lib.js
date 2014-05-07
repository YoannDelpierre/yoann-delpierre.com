(function (window, document) {

    'use strict';

    var scrolls = document.querySelectorAll('.nav__item');

    function init(items) {
        for(var i = 0; i < items.length; i++) {
            items[i].addEventListener('click', function() {
                event.preventDefault();
                scroll(this);
            }, false);
        }
    }

    function scroll(item) {
        var el = document.querySelector(item.children[0].hash);
        window.scroll(0, el.offsetTop);
    }

    init(scrolls);

})(window, document);