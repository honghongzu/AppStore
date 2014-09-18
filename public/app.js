var PULL = function () {
    var content,
        pullToRefresh,
        refreshing,
        contentStartY,
        success,
        start,
        cancel,
        startY,
        track = false,
        refresh = false;

    var removeTransition = function () {
        content.style['-webkit-transition-duration'] = 0;
    };

    return {
        init: function (o) {
            content = document.getElementsByClassName('content')[0];
            pullToRefresh = document.getElementsByClassName('pull-to-refresh')[0];
            refreshing = document.getElementsByClassName('refreshing')[0];
            success = o.success;
            start = o.start;
            cancel = o.cancel;

            document.body.addEventListener('touchstart', function (e) {
                e.preventDefault();
                contentStartY = parseInt(content.style.top);
                startY = e.touches[0].screenY;
            });

            document.body.addEventListener('touchend', function (e) {
                if (refresh) {
                    content.style['-webkit-transition-duration'] = '.5s';
                    content.style.top = '50px';

                    pullToRefresh.style.display = 'none';
                    refreshing.style.display = '';

                    success(function () { // pass down done callback
                        pullToRefresh.style.display = '';
                        refreshing.style.display = 'none';
                        content.style.top = '0';
                        content.addEventListener('transitionEnd', removeTransition);
                    });

                    refresh = false;
                } else if (track) {
                    content.style['-webkit-transition-duration'] = '.25s';
                    content.style.top = '0';
                    content.addEventListener('transitionEnd', removeTransition);

                    cancel();
                }

                track = false;
            });

            document.body.addEventListener('touchmove', function (e) {
                if (e.changedTouches[0].screenY > 300) {

                }
                var move_to = contentStartY - (startY - e.changedTouches[0].screenY);
                if (move_to > 0) track = true; // start tracking if near the top
                content.style.top = move_to + 'px';

                if (move_to > 50) {
                    refresh = true;
                } else {
                    content.style['-webkit-transition'] = '';
                    refresh = false;
                }
            });
        }
    };
}();