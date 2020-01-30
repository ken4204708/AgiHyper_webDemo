var host = {};
var t_scroll = 1000;

host.BrowserHost = class {

    constructor() {
        if (!window.ga) {
            window.GoogleAnalyticsObject = 'ga';
            window.ga = window.ga || function() {
                window.ga.q = window.ga.q || [];
                window.ga.q.push(arguments);
            };
            window.ga.l = 1 * new Date();
        }
        window.ga('create', 'UA-54146-13', 'auto');

        window.addEventListener('error', (e) => {
            this.exception(e.error, true);
        });
        window.eval = () => {
            throw new Error('window.eval() not supported.');
        };

        let scrool_down_btn = this.document.getElementById('myBtn');
        let text_container = this.document.getElementById('text-container');
        // let video = document.getElementById("myVideo");
        var scrollTop = $(window).scrollTop();
        var is_scroll = false;
        if (scrool_down_btn) {
            scrool_down_btn.addEventListener('click', () => {
                scrollTop = $(window).scrollTop();
                if (scrollTop > 0 && !is_scroll) {
                    //$('.js-iframe-event').css({'position': 'fixed' });
                    //$('.js-arrow-header').click();
                    // $('.js-header-bottom-bg').show();
                    $(text_container).animate({ marginTop: '-50px' }, t_scroll);
                    // $('.js-header-bottom-bg').animate({ marginBottom: '0px' }, t_scroll);
                    is_scroll = true;
                } else if (scrollTop == 0) {
                    //$('.js-iframe-event').css({'position': 'relative' });
                    $(text_container).animate({ marginTop: '0px' }, 1000);
                    // $('.js-header-bottom-bg').animate({ marginBottom: '-50px' }, t_scroll);
                    is_scroll = false;
                }
                // if (video.paused) {
                //     video.play();
                //     btn.innerHTML = "Pause";
                // } else {
                //     video.pause();
                //     btn.innerHTML = "Play";
                // }
            });
        }

        // $(window).scroll(function () {	
        //     scrollTop = $(window).scrollTop();
        //     if ($('.js-block-content') && $('.js-header-menu').css('display') != 'none') {
        //         if (scrollTop > 0 && !is_scroll)  {
        //             //$('.js-iframe-event').css({'position': 'fixed' });
        //             //$('.js-arrow-header').click();
        //             $('.js-header-bottom-bg').show();
        //             $('.js-block-content').animate({marginTop: '-50px'}, t_scroll);
        //             $('.js-header-bottom-bg').animate({marginBottom: '0px'}, t_scroll);
        //             is_scroll = true;
        //         } else if( scrollTop == 0 ) {
        //             //$('.js-iframe-event').css({'position': 'relative' });
        //             $('.js-block-content').animate({marginTop: '0px'}, 1000);
        //             $('.js-header-bottom-bg').animate({marginBottom: '-50px'}, t_scroll);
        //             is_scroll = false;
        //         }
        //     }
        // });
    }

    get document() {
        return window.document;
    }

    get version() {
        return this._version;
    }

    get type() {
        return this._type;
    }

    require(id) {
        const url = this._url(id + '.js');
        window.__modules__ = window.__modules__ || {};
        if (window.__modules__[url]) {
            return Promise.resolve(window.__exports__[url]);
        }
        return new Promise((resolve, reject) => {
            window.module = { exports: {} };
            let script = document.createElement('script');
            script.setAttribute('id', id);
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', url);
            script.onload = () => {
                let exports = window.module.exports;
                delete window.module;
                window.__modules__[id] = exports;
                resolve(exports);
            };
            script.onerror = (e) => {
                delete window.module;
                reject(new Error('The script \'' + e.target.src + '\' failed to load.'));
            };
            this.document.head.appendChild(script);
        });
    }
}

window._host_ = new host.BrowserHost();