function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var Util=function(t){function e(t){return{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function n(t){return(t[0]||t).nodeType}function i(){return{bindType:a.end,delegateType:a.end,handle:function(e){if(t(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}}function o(){if(window.QUnit)return!1;var t=document.createElement("bootstrap");for(var e in d)if(void 0!==t.style[e])return{end:d[e]};return!1}function s(e){var n=this,i=!1;return t(this).one(h.TRANSITION_END,function(){i=!0}),setTimeout(function(){i||h.triggerTransitionEnd(n)},e),this}function r(){a=o(),t.fn.emulateTransitionEnd=s,h.supportsTransitionEnd()&&(t.event.special[h.TRANSITION_END]=i())}var a=!1,l=1e6,d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},h={TRANSITION_END:"bsTransitionEnd",getUID:function(t){do t+=~~(Math.random()*l);while(document.getElementById(t));return t},getSelectorFromElement:function(t){var e=t.getAttribute("data-target");return e||(e=t.getAttribute("href")||"",e=/^#[a-z]/i.test(e)?e:null),e},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(e){t(e).trigger(a.end)},supportsTransitionEnd:function(){return Boolean(a)},typeCheckConfig:function(t,i,o){for(var s in o)if(o.hasOwnProperty(s)){var r=o[s],a=i[s],l=a&&n(a)?"element":e(a);if(!new RegExp(r).test(l))throw new Error(t.toUpperCase()+": "+('Option "'+s+'" provided type "'+l+'" ')+('but expected type "'+r+'".'))}}};return r(),h}(jQuery),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),Modal=function(t){var e="modal",n="4.0.0-alpha.6",i="bs.modal",o="."+i,s=".data-api",r=t.fn[e],a=300,l=150,d=27,h={backdrop:!0,keyboard:!0,focus:!0,show:!0},c={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},u={HIDE:"hide"+o,HIDDEN:"hidden"+o,SHOW:"show"+o,SHOWN:"shown"+o,FOCUSIN:"focusin"+o,RESIZE:"resize"+o,CLICK_DISMISS:"click.dismiss"+o,KEYDOWN_DISMISS:"keydown.dismiss"+o,MOUSEUP_DISMISS:"mouseup.dismiss"+o,MOUSEDOWN_DISMISS:"mousedown.dismiss"+o,CLICK_DATA_API:"click"+o+s},_={SCROLLBAR_MEASURER:"modal-scrollbar-measure",BACKDROP:"modal-backdrop",OPEN:"modal-open",FADE:"fade",SHOW:"show"},f={DIALOG:".modal-dialog",DATA_TOGGLE:'[data-toggle="modal"]',DATA_DISMISS:'[data-dismiss="modal"]',FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"},p=function(){function s(e,n){_classCallCheck(this,s),this._config=this._getConfig(n),this._element=e,this._dialog=t(e).find(f.DIALOG)[0],this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1,this._originalBodyPadding=0,this._scrollbarWidth=0}return s.prototype.toggle=function(t){return this._isShown?this.hide():this.show(t)},s.prototype.show=function(e){var n=this;if(this._isTransitioning)throw new Error("Modal is transitioning");Util.supportsTransitionEnd()&&t(this._element).hasClass(_.FADE)&&(this._isTransitioning=!0);var i=t.Event(u.SHOW,{relatedTarget:e});t(this._element).trigger(i),this._isShown||i.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),t(document.body).addClass(_.OPEN),this._setEscapeEvent(),this._setResizeEvent(),t(this._element).on(u.CLICK_DISMISS,f.DATA_DISMISS,function(t){return n.hide(t)}),t(this._dialog).on(u.MOUSEDOWN_DISMISS,function(){t(n._element).one(u.MOUSEUP_DISMISS,function(e){t(e.target).is(n._element)&&(n._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return n._showElement(e)}))},s.prototype.hide=function(e){var n=this;if(e&&e.preventDefault(),this._isTransitioning)throw new Error("Modal is transitioning");var i=Util.supportsTransitionEnd()&&t(this._element).hasClass(_.FADE);i&&(this._isTransitioning=!0);var o=t.Event(u.HIDE);t(this._element).trigger(o),this._isShown&&!o.isDefaultPrevented()&&(this._isShown=!1,this._setEscapeEvent(),this._setResizeEvent(),t(document).off(u.FOCUSIN),t(this._element).removeClass(_.SHOW),t(this._element).off(u.CLICK_DISMISS),t(this._dialog).off(u.MOUSEDOWN_DISMISS),i?t(this._element).one(Util.TRANSITION_END,function(t){return n._hideModal(t)}).emulateTransitionEnd(a):this._hideModal())},s.prototype.dispose=function(){t.removeData(this._element,i),t(window,document,this._element,this._backdrop).off(o),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._originalBodyPadding=null,this._scrollbarWidth=null},s.prototype._getConfig=function(n){return n=t.extend({},h,n),Util.typeCheckConfig(e,n,c),n},s.prototype._showElement=function(e){var n=this,i=Util.supportsTransitionEnd()&&t(this._element).hasClass(_.FADE);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.scrollTop=0,i&&Util.reflow(this._element),t(this._element).addClass(_.SHOW),this._config.focus&&this._enforceFocus();var o=t.Event(u.SHOWN,{relatedTarget:e}),s=function(){n._config.focus&&n._element.focus(),n._isTransitioning=!1,t(n._element).trigger(o)};i?t(this._dialog).one(Util.TRANSITION_END,s).emulateTransitionEnd(a):s()},s.prototype._enforceFocus=function(){var e=this;t(document).off(u.FOCUSIN).on(u.FOCUSIN,function(n){document===n.target||e._element===n.target||t(e._element).has(n.target).length||e._element.focus()})},s.prototype._setEscapeEvent=function(){var e=this;this._isShown&&this._config.keyboard?t(this._element).on(u.KEYDOWN_DISMISS,function(t){t.which===d&&e.hide()}):this._isShown||t(this._element).off(u.KEYDOWN_DISMISS)},s.prototype._setResizeEvent=function(){var e=this;this._isShown?t(window).on(u.RESIZE,function(t){return e._handleUpdate(t)}):t(window).off(u.RESIZE)},s.prototype._hideModal=function(){var e=this;this._element.style.display="none",this._element.setAttribute("aria-hidden","true"),this._isTransitioning=!1,this._showBackdrop(function(){t(document.body).removeClass(_.OPEN),e._resetAdjustments(),e._resetScrollbar(),t(e._element).trigger(u.HIDDEN)})},s.prototype._removeBackdrop=function(){this._backdrop&&(t(this._backdrop).remove(),this._backdrop=null)},s.prototype._showBackdrop=function(e){var n=this,i=t(this._element).hasClass(_.FADE)?_.FADE:"";if(this._isShown&&this._config.backdrop){var o=Util.supportsTransitionEnd()&&i;if(this._backdrop=document.createElement("div"),this._backdrop.className=_.BACKDROP,i&&t(this._backdrop).addClass(i),t(this._backdrop).appendTo(document.body),t(this._element).on(u.CLICK_DISMISS,function(t){return n._ignoreBackdropClick?void(n._ignoreBackdropClick=!1):void(t.target===t.currentTarget&&("static"===n._config.backdrop?n._element.focus():n.hide()))}),o&&Util.reflow(this._backdrop),t(this._backdrop).addClass(_.SHOW),!e)return;if(!o)return void e();t(this._backdrop).one(Util.TRANSITION_END,e).emulateTransitionEnd(l)}else if(!this._isShown&&this._backdrop){t(this._backdrop).removeClass(_.SHOW);var s=function(){n._removeBackdrop(),e&&e()};Util.supportsTransitionEnd()&&t(this._element).hasClass(_.FADE)?t(this._backdrop).one(Util.TRANSITION_END,s).emulateTransitionEnd(l):s()}else e&&e()},s.prototype._handleUpdate=function(){this._adjustDialog()},s.prototype._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},s.prototype._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},s.prototype._checkScrollbar=function(){this._isBodyOverflowing=document.body.clientWidth<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},s.prototype._setScrollbar=function(){var e=parseInt(t(f.FIXED_CONTENT).css("padding-right")||0,10);this._originalBodyPadding=document.body.style.paddingRight||"",this._isBodyOverflowing&&(document.body.style.paddingRight=e+this._scrollbarWidth+"px")},s.prototype._resetScrollbar=function(){document.body.style.paddingRight=this._originalBodyPadding},s.prototype._getScrollbarWidth=function(){var t=document.createElement("div");t.className=_.SCROLLBAR_MEASURER,document.body.appendChild(t);var e=t.offsetWidth-t.clientWidth;return document.body.removeChild(t),e},s._jQueryInterface=function(e,n){return this.each(function(){var o=t(this).data(i),r=t.extend({},s.Default,t(this).data(),"object"===("undefined"==typeof e?"undefined":_typeof(e))&&e);if(o||(o=new s(this,r),t(this).data(i,o)),"string"==typeof e){if(void 0===o[e])throw new Error('No method named "'+e+'"');o[e](n)}else r.show&&o.show(n)})},_createClass(s,null,[{key:"VERSION",get:function(){return n}},{key:"Default",get:function(){return h}}]),s}();return t(document).on(u.CLICK_DATA_API,f.DATA_TOGGLE,function(e){var n=this,o=void 0,s=Util.getSelectorFromElement(this);s&&(o=t(s)[0]);var r=t(o).data(i)?"toggle":t.extend({},t(o).data(),t(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||e.preventDefault();var a=t(o).one(u.SHOW,function(e){e.isDefaultPrevented()||a.one(u.HIDDEN,function(){t(n).is(":visible")&&n.focus()})});p._jQueryInterface.call(t(o),r,this)}),t.fn[e]=p._jQueryInterface,t.fn[e].Constructor=p,t.fn[e].noConflict=function(){return t.fn[e]=r,p._jQueryInterface},p}(jQuery);