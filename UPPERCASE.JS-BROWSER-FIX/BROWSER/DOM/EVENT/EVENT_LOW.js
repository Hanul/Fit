OVERRIDE(EVENT_LOW,function(n){"use strict";global.EVENT_LOW=EVENT_LOW=CLASS({preset:function(){return n},init:function(n,o,a,t){var e,c,i,E;e=CHECK_IS_DATA(a)!==!0?a:a.name,"hashchange"===e&&void 0===global.onhashchange&&(c=location.hash,i=setInterval(function(){location.hash!==c&&(c=location.hash,t(EMPTY_E()))},100),OVERRIDE(o.remove,function(){o.remove=E=function(){clearInterval(i)}}))}})});