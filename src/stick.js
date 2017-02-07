/**
 * Created by hugh on 16/12/26.
 */

;(function(){
    'use strict';
    if (window.hStick){
        return window.hStick
    };
    var hStick=function(){
        //UA判断
        var ua = navigator.userAgent;
        var REGEXP_IOS = /(iPad|iPhone|iPod).*?/;
        this.plat = REGEXP_IOS.test(ua)?'ios':'other';
        this.isStopTimer = null;
        this.header = document.querySelector('.sticky-wrap');
        this.offsetTop = this.header.offsetTop;
        this.height = this.header.offsetHeight;
        this.content = $(this.header).next();
        this.scrollTop = 0;
    };
    hStick.prototype={
        init: function () {
            this.addCssByStyle('.sticky-wrap{\
                top: 0;\
                width: 100%;\
                z-index: 999;\
                position: relative;\
                position: -webkit-sticky;\
                position: sticky;\
            }\
            .sticky-wrap.sticky {\
                position: fixed;\
            }\
            .sticky-wrap.ios-header{\
                box-sizing: border-box;\
                padding-top: 20px;\
            }');
            this.bindEvent();
        },
        addCssByStyle:function (cssString){
        var doc=document;
        var style=doc.createElement("style");
        style.setAttribute("type", "text/css");

        if(style.styleSheet){// IE
            style.styleSheet.cssText = cssString;
        } else {// w3c
            var cssText = doc.createTextNode(cssString);
            style.appendChild(cssText);
        }

        var heads = doc.getElementsByTagName("head");
        if(heads.length)
            heads[0].appendChild(style);
        else
            doc.documentElement.appendChild(style);
    },
    bindEvent:function(){
            var _this = this;
            if ($(this.header).css("position").indexOf("-webkit-sticky") == -1) {
                $(document).on('touchend', function() {
                    _this.isStopTimer = setInterval(function() {
                        document.body.scrollTop >= _this.offsetTop-3 ? _this.setFixed(): _this.cancelFixed();
                        if(document.body.scrollTop==_this.scrollTop){
                            clearInterval(_this.isStopTimer);
                            return;
                        }
                        _this.scrollTop = document.body.scrollTop;
                    }, 50)
                });
                $(document).on('touchmove', function() {
                    document.body.scrollTop >= _this.offsetTop-3 ? _this.setFixed() :_this.cancelFixed()
                });
            }
        },
        setFixed:function(){
            var _this = this;
            $(_this.content).css('margin-top',_this.height);
            $(_this.header).addClass('sticky');
            if(_this.plat==='ios'){
                var iosHeaderHeight = _this.height+20;
                $(_this.header).addClass('ios-header');
                $(_this.header).css('height',iosHeaderHeight)
            }
        },
        cancelFixed:function(){
            var _this = this;
            $(_this.content).css('margin-top',0);
            $(_this.header).removeClass('sticky');
            if(_this.plat==='ios'){
                $(_this.header).removeClass('ios-header');
                $(_this.header).css('height',_this.height)
            }
        }
    }

    window.hStick=new hStick();

})();

/*===========================
 hStick AMD Export
 ===========================*/
if (typeof(module) !== 'undefined'){
    module.exports = window.hStick;
}
else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.hStick;
    });
}