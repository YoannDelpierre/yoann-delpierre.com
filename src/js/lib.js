document.addEventListener('DOMContentLoaded', function() {
    var scrolls = document.querySelectorAll('.nav__item');

    for(i = 0; i < scrolls.length; i++) {
        scrolls[i].onclick = function(e) {
            e.preventDefault();
            var el = document.querySelector(this.children[0].hash);
            window.scroll(0, el.offsetTop);
        }
    }
});