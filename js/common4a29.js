var cssua = function(html, userAgent, sa) {
  var PREFIX = " ua-";
  var R_Platform = /\s*([\-\w ]+)[\s\/\:]([\d_]+\b(?:[\-\._\/]\w+)*)/;
  var R_Version = /([\w\-\.]+[\s\/][v]?[\d_]+\b(?:[\-\._\/]\w+)*)/g;
  var R_BlackBerry = /\b(?:(blackberry\w*|bb10)|(rim tablet os))(?:\/(\d+\.\d+(?:\.\w+)*))?/;
  var R_Silk = /\bsilk-accelerated=true\b/;
  var R_FluidApp = /\bfluidapp\b/;
  var R_desktop = /(\bwindows\b|\bmacintosh\b|\blinux\b|\bunix\b)/;
  var R_mobile = /(\bandroid\b|\bipad\b|\bipod\b|\bwindows phone\b|\bwpdesktop\b|\bxblwp7\b|\bzunewp7\b|\bwindows ce\b|\bblackberry\w*|\bbb10\b|\brim tablet os\b|\bmeego|\bwebos\b|\bpalm|\bsymbian|\bj2me\b|\bdocomo\b|\bpda\b|\bchtml\b|\bmidp\b|\bcldc\b|\w*?mobile\w*?|\w*?phone\w*?)/;
  var R_game = /(\bxbox\b|\bplaystation\b|\bnintendo\s+\w+)/;
  var cssua = {parse:function(uaStr, sa) {
    var ua = {};
    if (sa) {
      ua.standalone = sa;
    }
    uaStr = ("" + uaStr).toLowerCase();
    if (!uaStr) {
      return ua;
    }
    var i, count, raw = uaStr.split(/[()]/);
    for (var j = 0, rawCount = raw.length;j < rawCount;j++) {
      if (j % 2) {
        var platforms = raw[j].split(";");
        for (i = 0, count = platforms.length;i < count;i++) {
          if (R_Platform.exec(platforms[i])) {
            var key = RegExp.$1.split(" ").join("_"), val = RegExp.$2;
            if (!ua[key] || parseFloat(ua[key]) < parseFloat(val)) {
              ua[key] = val;
            }
          }
        }
      } else {
        var uas = raw[j].match(R_Version);
        if (uas) {
          for (i = 0, count = uas.length;i < count;i++) {
            var parts = uas[i].split(/[\/\s]+/);
            if (parts.length && parts[0] !== "mozilla") {
              ua[parts[0].split(" ").join("_")] = parts.slice(1).join("-");
            }
          }
        }
      }
    }
    if (R_mobile.exec(uaStr)) {
      ua.mobile = RegExp.$1;
      if (R_BlackBerry.exec(uaStr)) {
        delete ua[ua.mobile];
        ua.blackberry = ua.version || (RegExp.$3 || (RegExp.$2 || RegExp.$1));
        if (RegExp.$1) {
          ua.mobile = "blackberry";
        } else {
          if (ua.version === "0.0.1") {
            ua.blackberry = "7.1.0.0";
          }
        }
      }
    } else {
      if (R_desktop.exec(uaStr)) {
        ua.desktop = RegExp.$1;
      } else {
        if (R_game.exec(uaStr)) {
          ua.game = RegExp.$1;
          var game = ua.game.split(" ").join("_");
          if (ua.version && !ua[game]) {
            ua[game] = ua.version;
          }
        }
      }
    }
    if (ua.intel_mac_os_x) {
      ua.mac_os_x = ua.intel_mac_os_x.split("_").join(".");
      delete ua.intel_mac_os_x;
    } else {
      if (ua.cpu_iphone_os) {
        ua.ios = ua.cpu_iphone_os.split("_").join(".");
        delete ua.cpu_iphone_os;
      } else {
        if (ua.cpu_os) {
          ua.ios = ua.cpu_os.split("_").join(".");
          delete ua.cpu_os;
        } else {
          if (ua.mobile === "iphone" && !ua.ios) {
            ua.ios = "1";
          }
        }
      }
    }
    if (ua.opera && ua.version) {
      ua.opera = ua.version;
      delete ua.blackberry;
    } else {
      if (R_Silk.exec(uaStr)) {
        ua.silk_accelerated = true;
      } else {
        if (R_FluidApp.exec(uaStr)) {
          ua.fluidapp = ua.version;
        }
      }
    }
    if (ua.applewebkit) {
      ua.webkit = ua.applewebkit;
      delete ua.applewebkit;
      if (ua.opr) {
        ua.opera = ua.opr;
        delete ua.opr;
        delete ua.chrome;
      }
      if (ua.safari) {
        if (ua.chrome || (ua.crios || (ua.opera || (ua.silk || (ua.fluidapp || (ua.phantomjs || ua.mobile && !ua.ios)))))) {
          delete ua.safari;
        } else {
          if (ua.version && !ua.rim_tablet_os) {
            ua.safari = ua.version;
          } else {
            ua.safari = {419:"2.0.4", 417:"2.0.3", 416:"2.0.2", 412:"2.0", 312:"1.3", 125:"1.2", 85:"1.0"}[parseInt(ua.safari, 10)] || ua.safari;
          }
        }
      }
    } else {
      if (ua.msie || ua.trident) {
        if (!ua.opera) {
          ua.ie = ua.msie || ua.rv;
        }
        delete ua.msie;
        if (ua.windows_phone_os) {
          ua.windows_phone = ua.windows_phone_os;
          delete ua.windows_phone_os;
        } else {
          if (ua.mobile === "wpdesktop" || (ua.mobile === "xblwp7" || ua.mobile === "zunewp7")) {
            ua.mobile = "windows desktop";
            ua.windows_phone = +ua.ie < 9 ? "7.0" : +ua.ie < 10 ? "7.5" : "8.0";
            delete ua.windows_nt;
          }
        }
      } else {
        if (ua.gecko || ua.firefox) {
          ua.gecko = ua.rv;
        }
      }
    }
    if (ua.rv) {
      delete ua.rv;
    }
    if (ua.version) {
      delete ua.version;
    }
    return ua;
  }, format:function(ua) {
    function format(b, v) {
      b = b.split(".").join("-");
      var css = PREFIX + b;
      if (typeof v === "string") {
        v = v.split(" ").join("_").split(".").join("-");
        var i = v.indexOf("-");
        while (i > 0) {
          css += PREFIX + b + "-" + v.substring(0, i);
          i = v.indexOf("-", i + 1);
        }
        css += PREFIX + b + "-" + v;
      }
      return css;
    }
    var uaCss = "";
    for (var b in ua) {
      if (b && ua.hasOwnProperty(b)) {
        uaCss += format(b, ua[b]);
      }
    }
    return uaCss;
  }, encode:function(ua) {
    var query = "";
    for (var b in ua) {
      if (b && ua.hasOwnProperty(b)) {
        if (query) {
          query += "&";
        }
        query += encodeURIComponent(b) + "=" + encodeURIComponent(ua[b]);
      }
    }
    return query;
  }};
  cssua.userAgent = cssua.ua = cssua.parse(userAgent, sa);
  var ua = cssua.format(cssua.ua) + " js";
  if (html.className) {
    html.className = html.className.replace(/\bno-js\b/g, "") + ua;
  } else {
    html.className = ua.substr(1);
  }
  return cssua;
}(document.documentElement, navigator.userAgent, navigator.standalone);
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function() {
    }, fBound = function() {
      return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
    };
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP;
    return fBound;
  };
}
var isTranslate3dSupported;
var cssTransformWithPrefix;
(function() {
  var cache;
  isTranslate3dSupported = function() {
    if ($.defined(cache)) {
      return cache;
    }
    if ($.defined(cssua.ua.safari)) {
      cache = false;
      return cache;
    }
    var el = document.createElement("p");
    var propertyValue;
    var transforms = {"webkitTransform":"-webkit-transform", "OTransform":"-o-transform", "msTransform":"-ms-transform", "MozTransform":"-moz-transform", "transform":"transform"};
    document.body.insertBefore(el, null);
    for (var transform in transforms) {
      if (transforms.hasOwnProperty(transform)) {
        if (el.style[transform] !== undefined) {
          el.style[transform] = "translate3d(1px,1px,1px)";
          propertyValue = window.getComputedStyle(el, null).getPropertyValue(transforms[transform]);
          cssTransformWithPrefix = transforms[transform];
        }
      }
    }
    document.body.removeChild(el);
    cache = propertyValue && (propertyValue.length > 0 && propertyValue !== "none");
    return cache;
  };
})();
(function($, undef) {
  if ($.fn.dotdotdot) {
    return;
  }
  $.fn.dotdotdot = function(o) {
    if (this.length == 0) {
      $.fn.dotdotdot.debug('No element found for "' + this.selector + '".');
      return this;
    }
    if (this.length > 1) {
      return this.each(function() {
        $(this).dotdotdot(o);
      });
    }
    var $dot = this;
    var orgContent = $dot.contents();
    if ($dot.data("dotdotdot")) {
      $dot.trigger("destroy.html");
    }
    $dot.data("dotdotdot-style", $dot.attr("style") || "");
    $dot.css("word-wrap", "break-word");
    if ($dot.css("white-space") === "nowrap") {
      $dot.css("white-space", "normal");
    }
    $dot.bind_events = function() {
      $dot.bind("update.html", function(e, c) {
        $dot.removeClass("is-truncated");
        e.preventDefault();
        e.stopPropagation();
        switch(typeof opts.height) {
          case "number":
            opts.maxHeight = opts.height;
            break;
          case "function":
            opts.maxHeight = opts.height.call($dot[0]);
            break;
          default:
            opts.maxHeight = getTrueInnerHeight($dot);
            break;
        }
        opts.maxHeight += opts.tolerance;
        if (typeof c != "undefined") {
          if (typeof c == "string" || "nodeType" in c && c.nodeType === 1) {
            c = $("<div />").append(c).contents();
          }
          if (c instanceof $) {
            orgContent = c;
          }
        }
        $inr = $dot.wrapInner('<div class="dotdotdot" />').children();
        $inr.contents().detach().end().append(orgContent.clone(true)).find("br").replaceWith("  <br />  ").end().css({"height":"auto", "width":"auto", "border":"none", "padding":0, "margin":0});
        var after = false, trunc = false;
        if (conf.afterElement) {
          after = conf.afterElement.clone(true);
          after.show();
          conf.afterElement.detach();
        }
        if (test($inr, opts)) {
          if (opts.wrap == "children") {
            trunc = children($inr, opts, after);
          } else {
            trunc = ellipsis($inr, $dot, $inr, opts, after);
          }
        }
        $inr.replaceWith($inr.contents());
        $inr = null;
        if ($.isFunction(opts.callback)) {
          opts.callback.call($dot[0], trunc, orgContent);
        }
        conf.isTruncated = trunc;
        return trunc;
      }).bind("isTruncated.html", function(e, fn) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof fn == "function") {
          fn.call($dot[0], conf.isTruncated);
        }
        return conf.isTruncated;
      }).bind("originalContent.html", function(e, fn) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof fn == "function") {
          fn.call($dot[0], orgContent);
        }
        return orgContent;
      }).bind("destroy.html", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $dot.unwatch().unbind_events().contents().detach().end().append(orgContent).attr("style", $dot.data("dotdotdot-style") || "").removeClass("is-truncated").data("dotdotdot", false);
      });
      return $dot;
    };
    $dot.unbind_events = function() {
      $dot.unbind(".dot");
      return $dot;
    };
    $dot.watch = function() {
      $dot.unwatch();
      if (opts.watch == "window") {
        var $window = $(window), _wWidth = $window.width(), _wHeight = $window.height();
        $window.bind("resize.html" + conf.dotId, function() {
          if (_wWidth != $window.width() || (_wHeight != $window.height() || !opts.windowResizeFix)) {
            _wWidth = $window.width();
            _wHeight = $window.height();
            if (watchInt) {
              clearInterval(watchInt);
            }
            watchInt = setTimeout(function() {
              $dot.trigger("update.html");
            }, 100);
          }
        });
      } else {
        watchOrg = getSizes($dot);
        watchInt = setInterval(function() {
          if ($dot.is(":visible")) {
            var watchNew = getSizes($dot);
            if (watchOrg.width != watchNew.width || watchOrg.height != watchNew.height) {
              $dot.trigger("update.html");
              watchOrg = watchNew;
            }
          }
        }, 500);
      }
      return $dot;
    };
    $dot.unwatch = function() {
      $(window).unbind("resize.html" + conf.dotId);
      if (watchInt) {
        clearInterval(watchInt);
      }
      return $dot;
    };
    var opts = $.extend(true, {}, $.fn.dotdotdot.defaults, o), conf = {}, watchOrg = {}, watchInt = null, $inr = null;
    if (!(opts.lastCharacter.remove instanceof Array)) {
      opts.lastCharacter.remove = $.fn.dotdotdot.defaultArrays.lastCharacter.remove;
    }
    if (!(opts.lastCharacter.noEllipsis instanceof Array)) {
      opts.lastCharacter.noEllipsis = $.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis;
    }
    conf.afterElement = getElement(opts.after, $dot);
    conf.isTruncated = false;
    conf.dotId = dotId++;
    $dot.data("dotdotdot", true).bind_events().trigger("update.html");
    if (opts.watch) {
      $dot.watch();
    }
    return $dot;
  };
  $.fn.dotdotdot.defaults = {"ellipsis":"... ", "wrap":"word", "fallbackToLetter":true, "lastCharacter":{}, "tolerance":0, "callback":null, "after":null, "height":null, "watch":false, "windowResizeFix":true};
  $.fn.dotdotdot.defaultArrays = {"lastCharacter":{"remove":[" ", "　", ",", ";", ".", "!", "?"], "noEllipsis":[]}};
  $.fn.dotdotdot.debug = function(msg) {
  };
  var dotId = 1;
  function children($elem, o, after) {
    var $elements = $elem.children(), isTruncated = false;
    $elem.empty();
    for (var a = 0, l = $elements.length;a < l;a++) {
      var $e = $elements.eq(a);
      $elem.append($e);
      if (after) {
        $elem.append(after);
      }
      if (test($elem, o)) {
        $e.remove();
        isTruncated = true;
        break;
      } else {
        if (after) {
          after.detach();
        }
      }
    }
    return isTruncated;
  }
  function ellipsis($elem, $d, $i, o, after) {
    var isTruncated = false;
    var notx = "a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style";
    var noty = "script, .dotdotdot-keep";
    $elem.contents().detach().each(function() {
      var e = this, $e = $(e);
      if (typeof e == "undefined") {
        return true;
      } else {
        if ($e.is(noty)) {
          $elem.append($e);
        } else {
          if (isTruncated) {
            return true;
          } else {
            $elem.append($e);
            if (after && (!$e.is(o.after) && !$e.find(o.after).length)) {
              $elem[$elem.is(notx) ? "after" : "append"](after);
            }
            if (test($i, o)) {
              if (e.nodeType == 3) {
                isTruncated = ellipsisElement($e, $d, $i, o, after);
              } else {
                isTruncated = ellipsis($e, $d, $i, o, after);
              }
            }
            if (!isTruncated) {
              if (after) {
                after.detach();
              }
            }
          }
        }
      }
    });
    $d.addClass("is-truncated");
    return isTruncated;
  }
  function ellipsisElement($e, $d, $i, o, after) {
    var e = $e[0];
    if (!e) {
      return false;
    }
    var txt = getTextContent(e), space = txt.indexOf(" ") !== -1 ? " " : "　", separator = o.wrap == "letter" ? "" : space, textArr = txt.split(separator), position = -1, midPos = -1, startPos = 0, endPos = textArr.length - 1;
    if (o.fallbackToLetter && (startPos == 0 && endPos == 0)) {
      separator = "";
      textArr = txt.split(separator);
      endPos = textArr.length - 1;
    }
    while (startPos <= endPos && !(startPos == 0 && endPos == 0)) {
      var m = Math.floor((startPos + endPos) / 2);
      if (m == midPos) {
        break;
      }
      midPos = m;
      setTextContent(e, textArr.slice(0, midPos + 1).join(separator) + o.ellipsis);
      $i.children().each(function() {
        $(this).toggle().toggle();
      });
      if (!test($i, o)) {
        position = midPos;
        startPos = midPos;
      } else {
        endPos = midPos;
        if (o.fallbackToLetter && (startPos == 0 && endPos == 0)) {
          separator = "";
          textArr = textArr[0].split(separator);
          position = -1;
          midPos = -1;
          startPos = 0;
          endPos = textArr.length - 1;
        }
      }
    }
    if (position != -1 && !(textArr.length == 1 && textArr[0].length == 0)) {
      txt = addEllipsis(textArr.slice(0, position + 1).join(separator), o);
      setTextContent(e, txt);
    } else {
      var $w = $e.parent();
      $e.detach();
      var afterLength = after && after.closest($w).length ? after.length : 0;
      if ($w.contents().length > afterLength) {
        e = findLastTextNode($w.contents().eq(-1 - afterLength), $d);
      } else {
        e = findLastTextNode($w, $d, true);
        if (!afterLength) {
          $w.detach();
        }
      }
      if (e) {
        txt = addEllipsis(getTextContent(e), o);
        setTextContent(e, txt);
        if (afterLength && after) {
          $(e).parent().append(after);
        }
      }
    }
    return true;
  }
  function test($i, o) {
    return $i.innerHeight() > o.maxHeight;
  }
  function addEllipsis(txt, o) {
    while ($.inArray(txt.slice(-1), o.lastCharacter.remove) > -1) {
      txt = txt.slice(0, -1);
    }
    if ($.inArray(txt.slice(-1), o.lastCharacter.noEllipsis) < 0) {
      txt += o.ellipsis;
    }
    return txt;
  }
  function getSizes($d) {
    return{"width":$d.innerWidth(), "height":$d.innerHeight()};
  }
  function setTextContent(e, content) {
    if (e.innerText) {
      e.innerText = content;
    } else {
      if (e.nodeValue) {
        e.nodeValue = content;
      } else {
        if (e.textContent) {
          e.textContent = content;
        }
      }
    }
  }
  function getTextContent(e) {
    if (e.innerText) {
      return e.innerText;
    } else {
      if (e.nodeValue) {
        return e.nodeValue;
      } else {
        if (e.textContent) {
          return e.textContent;
        } else {
          return "";
        }
      }
    }
  }
  function getPrevNode(n) {
    do {
      n = n.previousSibling;
    } while (n && (n.nodeType !== 1 && n.nodeType !== 3));
    return n;
  }
  function findLastTextNode($el, $top, excludeCurrent) {
    var e = $el && $el[0], p;
    if (e) {
      if (!excludeCurrent) {
        if (e.nodeType === 3) {
          return e;
        }
        if ($.trim($el.text())) {
          return findLastTextNode($el.contents().last(), $top);
        }
      }
      p = getPrevNode(e);
      while (!p) {
        $el = $el.parent();
        if ($el.is($top) || !$el.length) {
          return false;
        }
        p = getPrevNode($el[0]);
      }
      if (p) {
        return findLastTextNode($(p), $top);
      }
    }
    return false;
  }
  function getElement(e, $i) {
    if (!e) {
      return false;
    }
    if (typeof e === "string") {
      e = $(e, $i);
      return e.length ? e : false;
    }
    return!e.jquery ? false : e;
  }
  function getTrueInnerHeight($el) {
    var h = $el.innerHeight(), a = ["paddingTop", "paddingBottom"];
    for (var z = 0, l = a.length;z < l;z++) {
      var m = parseInt($el.css(a[z]), 10);
      if (isNaN(m)) {
        m = 0;
      }
      h -= m;
    }
    return h;
  }
  var _orgHtml = $.fn.html;
  $.fn.html = function(str) {
    if (str != undef && (!$.isFunction(str) && this.data("dotdotdot"))) {
      return this.trigger("update", [str]);
    }
    return _orgHtml.apply(this, arguments);
  };
  var _orgText = $.fn.text;
  $.fn.text = function(str) {
    if (str != undef && (!$.isFunction(str) && this.data("dotdotdot"))) {
      str = $("<div />").text(str).html();
      return this.trigger("update", [str]);
    }
    return _orgText.apply(this, arguments);
  };
})(jQuery);
jQuery(document).ready(function($) {
  $(".dot-ellipsis").each(function() {
    var watch_window = $(this).hasClass("dot-resize-update");
    var watch_timer = $(this).hasClass("dot-timer-update");
    var height = 0;
    var classList = $(this).attr("class").split(/\s+/);
    $.each(classList, function(index, item) {
      var matchResult = item.match(/^dot-height-(\d+)$/);
      if (matchResult !== null) {
        height = Number(matchResult[1]);
      }
    });
    var x = new Object;
    if (watch_timer) {
      x.watch = true;
    }
    if (watch_window) {
      x.watch = "window";
    }
    if (height > 0) {
      x.height = height;
    }
    $(this).dotdotdot(x);
  });
});
jQuery(window).on("load", function() {
  jQuery(".dot-ellipsis.dot-load-update").trigger("update.html");
});
/*!
 * jQuery.ellipsis
 * http://github.com/jjenzz/jquery.ellipsis
 * --------------------------------------------------------------------------
 * Copyright (c) 2013 J. Smith (@jjenzz)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * adds a class to the last 'allowed' line of text so you can apply
 * text-overflow: ellipsis;
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{a(jQuery)}}(function(d){var c="ellipsis",b='<span style="white-space: nowrap;">',e={lines:"auto",ellipClass:"ellip",responsive:false};function a(h,q){var m=this,w=0,g=[],k,p,i,f,j,n,s;m.$cont=d(h);m.opts=d.extend({},e,q);function o(){m.text=m.$cont.text();m.opts.ellipLineClass=m.opts.ellipClass+"-line";m.$el=d('<span class="'+m.opts.ellipClass+'" />');m.$el.text(m.text);m.$cont.empty().append(m.$el);t()}function t(){if(typeof m.opts.lines==="number"&&m.opts.lines<2){m.$el.addClass(m.opts.ellipLineClass);return}n=m.$cont.height();if(m.opts.lines==="auto"&&m.$el.prop("scrollHeight")<=n){return}if(!k){return}s=d.trim(m.text).split(/\s+/);m.$el.html(b+s.join("</span> "+b)+"</span>");m.$el.find("span").each(k);if(p!=null){u(p)}}function u(x){s[x]='<span class="'+m.opts.ellipLineClass+'">'+s[x];s.push("</span>");m.$el.html(s.join(" "))}if(m.opts.lines==="auto"){var r=function(y,A){var x=d(A),z=x.position().top;j=j||x.height();if(z===f){g[w].push(x)}else{f=z;w+=1;g[w]=[x]}if(z+j>n){p=y-g[w-1].length;return false}};k=r}if(typeof m.opts.lines==="number"&&m.opts.lines>1){var l=function(y,A){var x=d(A),z=x.position().top;if(z!==f){f=z;w+=1}if(w===m.opts.lines){p=y;return false}};k=l}if(m.opts.responsive){var v=function(){g=[];w=0;f=null;p=null;m.$el.html(m.text);clearTimeout(i);i=setTimeout(t,100)};d(window).on("resize."+c,v)}o()}d.fn[c]=function(f){return this.each(function(){try{d(this).data(c,(new a(this,f)))}catch(g){if(window.console){console.error(c+": "+g)}}})}}));
(function($) {
  var utils = {defined:function(variable) {
    return typeof variable !== "undefined";
  }, isString:function(variable) {
    return typeof variable === "string";
  }, isElement:function(variable) {
    return variable != null && variable.nodeType === 1;
  }, isNode:function(variable) {
    return variable != null && variable.nodeType != null;
  }, isJQuery:function(variable) {
    return variable instanceof $;
  }};
  $.extend($, utils);
})(jQuery);
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else {
    if (typeof exports === "object") {
      module.exports = factory;
    } else {
      factory(jQuery);
    }
  }
})(function($) {
  var toFix = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"];
  var toBind = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"];
  var lowestDelta, lowestDeltaXY;
  if ($.event.fixHooks) {
    for (var i = toFix.length;i;) {
      $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
    }
  }
  $.event.special.mousewheel = {setup:function() {
    if (this.addEventListener) {
      for (var i = toBind.length;i;) {
        this.addEventListener(toBind[--i], handler, false);
      }
    } else {
      this.onmousewheel = handler;
    }
  }, teardown:function() {
    if (this.removeEventListener) {
      for (var i = toBind.length;i;) {
        this.removeEventListener(toBind[--i], handler, false);
      }
    } else {
      this.onmousewheel = null;
    }
  }};
  $.fn.extend({mousewheel:function(fn) {
    return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
  }, unmousewheel:function(fn) {
    return this.unbind("mousewheel", fn);
  }});
  function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, deltaX = 0, deltaY = 0, absDelta = 0, absDeltaXY = 0, fn;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    if (orgEvent.wheelDelta) {
      delta = orgEvent.wheelDelta;
    }
    if (orgEvent.detail) {
      delta = orgEvent.detail * -1;
    }
    if (orgEvent.deltaY) {
      deltaY = orgEvent.deltaY * -1;
      delta = deltaY;
    }
    if (orgEvent.deltaX) {
      deltaX = orgEvent.deltaX;
      delta = deltaX * -1;
    }
    if (orgEvent.wheelDeltaY !== undefined) {
      deltaY = orgEvent.wheelDeltaY;
    }
    if (orgEvent.wheelDeltaX !== undefined) {
      deltaX = orgEvent.wheelDeltaX * -1;
    }
    absDelta = Math.abs(delta);
    if (!lowestDelta || absDelta < lowestDelta) {
      lowestDelta = absDelta;
    }
    absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
    if (!lowestDeltaXY || absDeltaXY < lowestDeltaXY) {
      lowestDeltaXY = absDeltaXY;
    }
    fn = delta > 0 ? "floor" : "ceil";
    delta = Math[fn](delta / lowestDelta);
    deltaX = Math[fn](deltaX / lowestDeltaXY);
    deltaY = Math[fn](deltaY / lowestDeltaXY);
    args.unshift(event, delta, deltaX, deltaY);
    return($.event.dispatch || $.event.handle).apply(this, args);
  }
});
(function(t,e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else if(typeof exports==="object"){module.exports=e(require("jquery"))}else{e(t.jQuery)}})(this,function(t){t.transit={version:"0.9.12",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var e=document.createElement("div");var n={};function i(t){if(t in e.style)return t;var n=["Moz","Webkit","O","ms"];var i=t.charAt(0).toUpperCase()+t.substr(1);for(var r=0;r<n.length;++r){var s=n[r]+i;if(s in e.style){return s}}}function r(){e.style[n.transform]="";e.style[n.transform]="rotateY(90deg)";return e.style[n.transform]!==""}var s=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;n.transition=i("transition");n.transitionDelay=i("transitionDelay");n.transform=i("transform");n.transformOrigin=i("transformOrigin");n.filter=i("Filter");n.transform3d=r();var a={transition:"transitionend",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var o=n.transitionEnd=a[n.transition]||null;for(var u in n){if(n.hasOwnProperty(u)&&typeof t.support[u]==="undefined"){t.support[u]=n[u]}}e=null;t.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeInCubic:"cubic-bezier(.550,.055,.675,.190)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};t.cssHooks["transit:transform"]={get:function(e){return t(e).data("transform")||new f},set:function(e,i){var r=i;if(!(r instanceof f)){r=new f(r)}if(n.transform==="WebkitTransform"&&!s){e.style[n.transform]=r.toString(true)}else{e.style[n.transform]=r.toString()}t(e).data("transform",r)}};t.cssHooks.transform={set:t.cssHooks["transit:transform"].set};t.cssHooks.filter={get:function(t){return t.style[n.filter]},set:function(t,e){t.style[n.filter]=e}};if(t.fn.jquery<"1.8"){t.cssHooks.transformOrigin={get:function(t){return t.style[n.transformOrigin]},set:function(t,e){t.style[n.transformOrigin]=e}};t.cssHooks.transition={get:function(t){return t.style[n.transition]},set:function(t,e){t.style[n.transition]=e}}}p("scale");p("scaleX");p("scaleY");p("translate");p("rotate");p("rotateX");p("rotateY");p("rotate3d");p("perspective");p("skewX");p("skewY");p("x",true);p("y",true);function f(t){if(typeof t==="string"){this.parse(t)}return this}f.prototype={setFromString:function(t,e){var n=typeof e==="string"?e.split(","):e.constructor===Array?e:[e];n.unshift(t);f.prototype.set.apply(this,n)},set:function(t){var e=Array.prototype.slice.apply(arguments,[1]);if(this.setter[t]){this.setter[t].apply(this,e)}else{this[t]=e.join(",")}},get:function(t){if(this.getter[t]){return this.getter[t].apply(this)}else{return this[t]||0}},setter:{rotate:function(t){this.rotate=b(t,"deg")},rotateX:function(t){this.rotateX=b(t,"deg")},rotateY:function(t){this.rotateY=b(t,"deg")},scale:function(t,e){if(e===undefined){e=t}this.scale=t+","+e},skewX:function(t){this.skewX=b(t,"deg")},skewY:function(t){this.skewY=b(t,"deg")},perspective:function(t){this.perspective=b(t,"px")},x:function(t){this.set("translate",t,null)},y:function(t){this.set("translate",null,t)},translate:function(t,e){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(t!==null&&t!==undefined){this._translateX=b(t,"px")}if(e!==null&&e!==undefined){this._translateY=b(e,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var t=(this.scale||"1,1").split(",");if(t[0]){t[0]=parseFloat(t[0])}if(t[1]){t[1]=parseFloat(t[1])}return t[0]===t[1]?t[0]:t},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var e=0;e<=3;++e){if(t[e]){t[e]=parseFloat(t[e])}}if(t[3]){t[3]=b(t[3],"deg")}return t}},parse:function(t){var e=this;t.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,n,i){e.setFromString(n,i)})},toString:function(t){var e=[];for(var i in this){if(this.hasOwnProperty(i)){if(!n.transform3d&&(i==="rotateX"||i==="rotateY"||i==="perspective"||i==="transformOrigin")){continue}if(i[0]!=="_"){if(t&&i==="scale"){e.push(i+"3d("+this[i]+",1)")}else if(t&&i==="translate"){e.push(i+"3d("+this[i]+",0)")}else{e.push(i+"("+this[i]+")")}}}}return e.join(" ")}};function c(t,e,n){if(e===true){t.queue(n)}else if(e){t.queue(e,n)}else{t.each(function(){n.call(this)})}}function l(e){var i=[];t.each(e,function(e){e=t.camelCase(e);e=t.transit.propertyMap[e]||t.cssProps[e]||e;e=h(e);if(n[e])e=h(n[e]);if(t.inArray(e,i)===-1){i.push(e)}});return i}function d(e,n,i,r){var s=l(e);if(t.cssEase[i]){i=t.cssEase[i]}var a=""+y(n)+" "+i;if(parseInt(r,10)>0){a+=" "+y(r)}var o=[];t.each(s,function(t,e){o.push(e+" "+a)});return o.join(", ")}t.fn.transition=t.fn.transit=function(e,i,r,s){var a=this;var u=0;var f=true;var l=t.extend(true,{},e);if(typeof i==="function"){s=i;i=undefined}if(typeof i==="object"){r=i.easing;u=i.delay||0;f=typeof i.queue==="undefined"?true:i.queue;s=i.complete;i=i.duration}if(typeof r==="function"){s=r;r=undefined}if(typeof l.easing!=="undefined"){r=l.easing;delete l.easing}if(typeof l.duration!=="undefined"){i=l.duration;delete l.duration}if(typeof l.complete!=="undefined"){s=l.complete;delete l.complete}if(typeof l.queue!=="undefined"){f=l.queue;delete l.queue}if(typeof l.delay!=="undefined"){u=l.delay;delete l.delay}if(typeof i==="undefined"){i=t.fx.speeds._default}if(typeof r==="undefined"){r=t.cssEase._default}i=y(i);var p=d(l,i,r,u);var h=t.transit.enabled&&n.transition;var b=h?parseInt(i,10)+parseInt(u,10):0;if(b===0){var g=function(t){a.css(l);if(s){s.apply(a)}if(t){t()}};c(a,f,g);return a}var m={};var v=function(e){var i=false;var r=function(){if(i){a.unbind(o,r)}if(b>0){a.each(function(){this.style[n.transition]=m[this]||null})}if(typeof s==="function"){s.apply(a)}if(typeof e==="function"){e()}};if(b>0&&o&&t.transit.useTransitionEnd){i=true;a.bind(o,r)}else{window.setTimeout(r,b)}a.each(function(){if(b>0){this.style[n.transition]=p}t(this).css(l)})};var z=function(t){this.offsetWidth;v(t)};c(a,f,z);return this};function p(e,i){if(!i){t.cssNumber[e]=true}t.transit.propertyMap[e]=n.transform;t.cssHooks[e]={get:function(n){var i=t(n).css("transit:transform");return i.get(e)},set:function(n,i){var r=t(n).css("transit:transform");r.setFromString(e,i);t(n).css({"transit:transform":r})}}}function h(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function b(t,e){if(typeof t==="string"&&!t.match(/^[\-0-9\.]+$/)){return t}else{return""+t+e}}function y(e){var n=e;if(typeof n==="string"&&!n.match(/^[\-0-9\.]+/)){n=t.fx.speeds[n]||t.fx.speeds._default}return b(n,"ms")}t.transit.getTransitionValue=d;return t});
(function(e){"use strict";e.Transitions={_names:{transition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend"},_parseTimes:function(e){var t,n=e.split(/,\s*/);for(var r=0;r<n.length;r++)t=n[r],n[r]=parseFloat(t),t.match(/\ds/)&&(n[r]=n[r]*1e3);return n},getEvent:function(){var e=!1;for(var t in this._names)if(typeof document.body.style[t]!="undefined"){e=this._names[t];break}return this.getEvent=function(){return e},e},animFrame:function(e){var t=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame;return t?this.animFrame=function(e){return t.call(window,e)}:this.animFrame=function(e){return setTimeout(e,10)},this.animFrame(e)},isSupported:function(){return this.getEvent()!==!1}},e.extend(e.fn,{afterTransition:function(t,n){typeof n=="undefined"&&(n=t,t=1);if(!e.Transitions.isSupported()){for(var r=0;r<this.length;r++)n.call(this[r],{type:"aftertransition",elapsedTime:0,propertyName:"",currentTarget:this[r]});return this}for(var r=0;r<this.length;r++){var i=e(this[r]),s=i.css("transition-property").split(/,\s*/),o=i.css("transition-duration"),u=i.css("transition-delay");o=e.Transitions._parseTimes(o),u=e.Transitions._parseTimes(u);var a,f,l,c,h;for(var p=0;p<s.length;p++)a=s[p],f=o[o.length==1?0:p],l=u[u.length==1?0:p],c=l+f*t,h=f*t/1e3,function(t,r,i,s){setTimeout(function(){e.Transitions.animFrame(function(){n.call(t[0],{type:"aftertransition",elapsedTime:s,propertyName:r,currentTarget:t[0]})})},i)}(i,a,c,h)}return this},transitionEnd:function(t){for(var n=0;n<this.length;n++)this[n].addEventListener(e.Transitions.getEvent(),function(e){t.call(this,e)});return this}})}).call(this,jQuery);
if (isTranslate3dSupported()) {
  $(document.documentElement).addClass("translate3d");
}
jQuery(function($) {"use strict";
  var $document = $(document);
  var $window = $(window);
  var $html = $(document.documentElement);
  var $body = $(document.body);
  var $header = $("body > header");
  var remember_scroll_top = 0;
  var lightbox;
  var AJAX_WORKING = 0;
  var TOUCH_START_EVENTS = "touchstart mousedown";
  var TOUCH_MOVE_EVENTS = "touchmove mousemove";
  var TOUCH_END_EVENTS = "touchend touchleave touchcancel mouseup";
  var designs_slider = null;
  if ($("main > h1.cover-slideshow:first-child").size()) {
    $body.addClass("black");
  }
  if ($body.hasClass("content")) {
    if (!$("main > h1.cover-slideshow:first-child").size() && !$("main > section.cover-slideshow:first-child").size()) {
      $body.addClass("black");
    }
  }
  var docCookies = {getItem:function(sKey) {
    if (!sKey) {
      return null;
    }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  }, setItem:function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    var sExpires = "";
    if (vEnd) {
      switch(vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  }, removeItem:function(sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) {
      return false;
    }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  }, hasItem:function(sKey) {
    if (!sKey) {
      return false;
    }
    return(new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  }, keys:function() {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0;nIdx < nLen;nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  }};
  var SimpleLightbox = function($content, openHandler, closeHandler, domExists) {
    this.$lightbox = null;
    this.unique = "Lightbox" + (new Date).getTime();
    this.$content = $content;
    this.domExists = domExists;
    this.scrollWidth = 0;
    this.openHandler = openHandler;
    this.closeHandler = closeHandler;
    this.keyupOptions = [[27, function() {
      this.close();
    }]];
  };
  SimpleLightbox.prototype = function() {
    function createDom() {
      $document.on("keyup." + this.unique, documentKeyupHandler.bind(this));
      if (this.$lightbox) {
        $body.append(this.$lightbox);
        return;
      }
      if (this.domExists !== undefined && this.domExists) {
        this.$lightbox = $("div.lightbox").click(lightboxClickHandler.bind(this));
      } else {
        this.$lightbox = $("<div/>", {"class":"lightbox"}).append(this.$content).appendTo($body).click(lightboxClickHandler.bind(this));
      }
    }
    function lightboxClickHandler(event) {
      if (!$.contains(this.$lightbox[0], event.target)) {
        closeLightbox.call(this);
        return false;
      }
      return true;
    }
    function documentKeyupHandler(event) {
      for (var i = 0;i < this.keyupOptions.length;i++) {
        if (event.which === this.keyupOptions[i][0]) {
          if ($.isFunction(this.keyupOptions[i][1])) {
            this.keyupOptions[i][1].call(this);
          }
        }
      }
    }
    function openLightbox() {
      createDom.call(this);
      hideHtmlScroll.call(this);
      $body.addClass("lightbox");
      $body.css("height", $window.height() + "px");
      $html.css("height", $window.height() + "px");
      if ($.isFunction(this.openHandler)) {
        this.openHandler.call(this);
      }
    }
    function closeLightbox() {
      var allow = true;
      $body.removeClass("lightbox");
      $body.css("height", "");
      $html.css("height", "");
      if ($.isFunction(this.closeHandler)) {
        allow = this.closeHandler.call(this);
      }
      if (allow !== false) {
        $document.off("keyup." + this.unique);
        this.$lightbox.detach();
        showHtmlScroll();
      }
    }
    function hideHtmlScroll() {
      var widthWithScroll = $html.width();
      var scrollWidth;
      $html.css("overflow", "hidden");
      scrollWidth = $html.width() - widthWithScroll;
      this.scrollWidth = scrollWidth;
      $html.css("padding-right", scrollWidth + "px");
      $("header").css("padding-right", scrollWidth + "px");
    }
    function showHtmlScroll() {
      $html.css({overflow:"", "padding-right":""});
      $("header").css("padding-right", "");
    }
    return{constructor:SimpleLightbox, open:function() {
      openLightbox.call(this);
      return this;
    }, close:function() {
      closeLightbox.call(this);
      return this;
    }, addClass:function(className) {
      this.$lightbox.addClass(className);
      return this;
    }, removeClass:function(className) {
      this.$lightbox.removeClass(className);
      return this;
    }, appendContent:function($content) {
      this.$content = $content;
      this.$lightbox.append(this.$content);
      return this;
    }, addContent:function($content) {
      this.$content = $content;
      this.$lightbox.html(this.$content);
      return this;
    }, addKeyupOption:function(key, func) {
      this.keyupOptions.push([key, func]);
      return this;
    }, getScrollWidth:function() {
      return this.scrollWidth;
    }, isOpened:function() {
      return this.$lightbox && this.$lightbox.parent()[0] === $body[0];
    }};
  }();
  var SwipeCarouselDirections = {NONE:0, FORWARD:1, BACK:-1};
  var SwipeCarouselOptions;
  function SwipeCarousel($element, options) {
    this.$element = $element.eq(0);
    this.options = {continuous:true, moveBothSiblings:true, draggable:true, stopOnHover:true, forceContinuous:false, horizontalScroll:false, $buttons:null, $bookmarks:null};
    $.extend(this.options, options);
    this._currentSlide = -1;
    this._slidesCount = 0;
    this.$slides = null;
    this.$bookmarks = null;
    this.$slidesContainer = null;
    this.$bookmarksContainer = null;
    this.$counter = null;
    this.unique = "SwipeCarousel" + (new Date).getTime();
    this._touch = {};
    this._timer = {id:0, delay:0};
    this.slidingDirection = SwipeCarouselDirections.NONE;
    this._resetDirectionTimer = 0;
    this.init();
  }
  SwipeCarousel.prototype = function() {
    var SPEED_INTERVAL = 60;
    var VELOCITY_LIMIT = 5;
    var TOUCH_START_EVENTS = "touchstart mousedown";
    var TOUCH_MOVE_EVENTS = "touchmove mousemove";
    var TOUCH_END_EVENTS = "touchend touchleave touchcancel mouseup";
    var TOUCH_LOCK_SENSIVITY = 6;
    var TOUCH_START_DELAY = 500;
    var TOUCH_TYPE_MOUSE = "mouse";
    var TOUCH_TYPE_TOUCH = "touch";
    var translate3dSupported;
    function init() {
      var $element;
      var $slidesContainer;
      var $buttonsContainer;
      var $btnPrev;
      var $btnNext;
      var $bookmarksContainer;
      $element = this.$element;
      $slidesContainer = $element.children("ul.slides");
      $buttonsContainer = $.isJQuery(this.options.$buttons) ? this.options.$buttons : $element.children("ul.buttons");
      $bookmarksContainer = $.isJQuery(this.options.$bookmarks) ? this.options.$bookmarks : $element.children("ul.bookmarks");
      if (this.$slides) {
        return;
      }
      this._touch.startX = 0;
      this._touch.startY = 0;
      this._touch.directionX = 0;
      this._touch.deltaX = 0;
      this._touch.deltaY = 0;
      this._touch.velocityX = 0;
      this._touch.velocityDirectionX = 0;
      this._touch.prevTime = null;
      this._touch.prevTimeX = 0;
      this._touch.$target = null;
      this._touch.$leftSibling = null;
      this._touch.$rightSibling = null;
      this._touch.slideStep = 0;
      this._touch.slideAfter = 0;
      this._touch.id = -1;
      this._touch.fromLeft = 0;
      this._touch.type = TOUCH_TYPE_MOUSE;
      if ($slidesContainer.size() < 1) {
        throw new Error("SwipeCarousel: Can't find element ul.slides.");
      }
      if ($buttonsContainer.size() > 0) {
        $btnPrev = $buttonsContainer.children("li.prev");
        if ($btnPrev.size() < 1) {
          $btnPrev = $("<li/>", {"class":"prev"}).appendTo($buttonsContainer);
        }
        $btnNext = $buttonsContainer.children("li.next");
        if ($btnNext.size() < 1) {
          $btnNext = $("<li/>", {"class":"next"}).appendTo($buttonsContainer);
        }
        this.$counter = $buttonsContainer.children("li.counter");
      }
      if ($.defined($btnNext)) {
        $btnNext.click(btnNextHandler.bind(this));
      }
      if ($.defined($btnPrev)) {
        $btnPrev.click(btnPrevHandler.bind(this));
      }
      $slidesContainer.mousewheel(mouseWheelHandler.bind(this));
      $window.resize(windowResizeHandler.bind(this));
      if (this.options.stopOnHover) {
        $element.mouseenter(stopAutoSlideShow.bind(this)).mouseleave(resetAutoSlideShow.bind(this));
      }
      if (!$.defined(translate3dSupported)) {
        translate3dSupported = isTranslate3dSupported();
      }
      this.$slidesContainer = $slidesContainer;
      this.$bookmarksContainer = $bookmarksContainer;
      this.$bookmarks = $bookmarksContainer.children("li");
      initSlides.call(this, $bookmarksContainer.length > 0 && this.$bookmarks.length < 1);
      $bookmarksContainer.on("click", "li", bookmarksClickHandler.bind(this));
      windowResizeHandler.call(this);
      $element.addClass("ready");
    }
    function initSlides(updateBookmarks) {
      var $slidesContainer;
      var $slides;
      var $bookmarksContainer;
      var $bookmarks;
      var slidesCount;
      var i;
      var currentSlide;
      $slidesContainer = this.$slidesContainer;
      $bookmarksContainer = this.$bookmarksContainer;
      $slides = $slidesContainer.children("li");
      slidesCount = $slides.length;
      if (updateBookmarks && $bookmarksContainer.length > 0) {
        $bookmarks = $([]);
        $bookmarksContainer.empty();
        for (i = slidesCount;i > 0;i--) {
          $bookmarks = $bookmarks.add("<li/>");
        }
        $bookmarks.appendTo($bookmarksContainer);
        this.$bookmarks = $bookmarks;
      }
      if (this.options.forceContinuous && slidesCount === 2) {
        this.options.continuous = true;
        $slides.clone().appendTo($slidesContainer);
        $slides = $slidesContainer.children("li");
        $slides.eq(2).addClass("clone");
        $slides.eq(3).addClass("clone");
        slidesCount = $slides.length;
      } else {
        this.options.continuous = slidesCount > 2;
        if (this.options.forceContinuous) {
          this.options.continuous = true;
        }
      }
      if ($.Transitions.isSupported()) {
        $slides.not(this.$slides).transitionEnd(transitionEndHandler.bind(this));
      }
      if (this.options.draggable) {
        this.$slides && this.$slides.off(TOUCH_START_EVENTS);
        $slides.on(TOUCH_START_EVENTS, touchStartHandler.bind(this));
        disableInternalDragging($slides.not(this.$slides));
      }
      this.$slides = $slides;
      this._slidesCount = slidesCount;
      currentSlide = $slides.filter(".current").index() | 0;
      if (currentSlide < 0) {
        currentSlide = 0;
      }
      this._currentSlide = currentSlide - 1;
      changeSlide.call(this, currentSlide);
    }
    function changeSlide(toSlide) {
      var currentSlide = this._currentSlide;
      var slidesCount = this._slidesCount;
      var lastSlide = slidesCount - 1;
      var prevSlide = currentSlide;
      var slideNumOverflow = 0;
      var $slides = this.$slides;
      var $element = this.$element;
      resetAutoSlideShow.call(this);
      if (currentSlide === toSlide || !this.options.continuous && (toSlide > lastSlide || toSlide < 0)) {
        return;
      }
      if (this.options.continuous) {
        if (toSlide > lastSlide) {
          slideNumOverflow = toSlide - lastSlide;
          toSlide -= slidesCount;
        } else {
          if (toSlide < 0) {
            slideNumOverflow = toSlide;
            toSlide += slidesCount;
          }
        }
        if (toSlide > lastSlide || toSlide < 0) {
          return;
        }
      }
      if ($.Transitions.isSupported()) {
        this.slidingDirection = currentSlide < toSlide ? SwipeCarouselDirections.FORWARD : SwipeCarouselDirections.BACK;
        this._resetDirectionTimer = setTimeout(resetDirectionTimerTick.bind(this), 2E3);
      }
      changeBookmark.call(this, toSlide);
      currentSlide = toSlide;
      $slides.filter(filterIndexes([currentSlide, prevSlide])).addClass("back").end().eq(prevSlide).removeClass("current").end().eq(currentSlide).removeClass("back next prev").addClass("current").end().slice(0, currentSlide).removeClass("next").addClass("prev").end().slice(currentSlide + 1).removeClass("prev").addClass("next");
      if (this.options.continuous) {
        if (slideNumOverflow === 1) {
          $slides.eq(prevSlide).removeClass("next").addClass("prev");
        } else {
          if (slideNumOverflow === -1) {
            $slides.eq(prevSlide).removeClass("prev").addClass("next");
          }
        }
        if (currentSlide === lastSlide) {
          $slides.eq(0).removeClass("prev").addClass("next");
        } else {
          if (currentSlide === 0) {
            $slides.eq(lastSlide).removeClass("next").addClass("prev");
          }
        }
      } else {
        $element.removeClass("no-prev no-next");
        if (currentSlide === 0) {
          this.$element.addClass("no-prev");
        }
        if (currentSlide === lastSlide) {
          this.$element.addClass("no-next");
        }
      }
      this.$counter && this.$counter.html('<span class="current">' + (currentSlide + 1) + '</span><span class="size">' + slidesCount + "</span>");
      this._currentSlide = currentSlide;
      this.$element.trigger("change", [currentSlide, prevSlide]);
    }
    function changeBookmark(toSlide) {
      if ($.defined(this.$bookmarks)) {
        if (this.$slides.eq(toSlide).hasClass("clone")) {
          toSlide = toSlide - 2;
        }
        this.$bookmarks.removeClass("current");
        this.$bookmarks.eq(toSlide).addClass("current");
      }
    }
    function filterIndexes(indexes) {
      return function(index) {
        return $.inArray(index, indexes) < 0;
      };
    }
    function nextSlide() {
      if (this.slidingDirection !== SwipeCarouselDirections.FORWARD) {
        changeSlide.call(this, this._currentSlide + 1);
      }
    }
    function prevSlide() {
      if (this.slidingDirection !== SwipeCarouselDirections.BACK) {
        changeSlide.call(this, this._currentSlide - 1);
      }
    }
    function btnNextHandler() {
      nextSlide.call(this);
    }
    function btnPrevHandler() {
      prevSlide.call(this);
    }
    function bookmarksClickHandler(event) {
      var index = this.$bookmarks.index($(event.originalEvent.target).closest("li"));
      if (index >= 0 && this.slidingDirection === SwipeCarouselDirections.NONE) {
        changeSlide.call(this, index);
      }
    }
    function transitionEndHandler(event) {
      if ($(event.target).hasClass("current")) {
        this.slidingDirection = SwipeCarouselDirections.NONE;
        clearTimeout(this._resetDirectionTimer);
      }
    }
    function resetDirectionTimerTick() {
      this.slidingDirection = SwipeCarouselDirections.NONE;
    }
    function mouseWheelHandler(event, delta, deltaX) {
      if (!this.options.horizontalScroll) {
        return;
      }
      if (this.slidingDirection !== SwipeCarouselDirections.FORWARD && deltaX > 0) {
        changeSlide.call(this, this._currentSlide + 1);
      } else {
        if (this.slidingDirection !== SwipeCarouselDirections.BACK && deltaX < 0) {
          changeSlide.call(this, this._currentSlide - 1);
        }
      }
      event;
      delta;
    }
    function windowResizeHandler() {
      this._touch.slideStep = this.$element.width();
      this._touch.slideAfter = Math.round(this._touch.slideStep / 2);
    }
    function touchStartHandler(event) {
      var startX;
      var $target = $(event.originalEvent.currentTarget);
      var $leftSibling = $target.prev();
      var $rightSibling = $target.next();
      var unique = this.unique;
      var left;
      var currentTime = new Date;
      if (currentTime - this._touch.startTime < 100) {
        return;
      }
      this._touch.type = event.type === "mousedown" ? TOUCH_TYPE_MOUSE : TOUCH_TYPE_TOUCH;
      this._touch.slideStep = this.$element.width();
      this._touch.slideAfter = Math.round(this._touch.slideStep / 2);
      if (this.slidingDirection !== SwipeCarouselDirections.NONE && $target.index("li") !== this._currentSlide || (this._touch.id !== -1 || event.type === "mousedown" && event.which !== 1)) {
        event.preventDefault();
        return;
      }
      stopAutoSlideShow.call(this);
      startX = getEventPageX(event, this);
      left = $target.position().left;
      if (this.options.continuous) {
        if ($leftSibling.size() < 1) {
          $leftSibling = this.$slides.eq(-1);
        }
        if ($rightSibling.size() < 1) {
          $rightSibling = this.$slides.eq(0);
        }
      }
      $target.on(addEventsNamespace(TOUCH_MOVE_EVENTS, unique), touchMoveHandler.bind(this));
      $target.on(addEventsNamespace(TOUCH_END_EVENTS, unique), touchEndHandler.bind(this));
      $document.on(addEventsNamespace(TOUCH_END_EVENTS, unique), touchEndHandler.bind(this));
      $target.add($leftSibling).add($rightSibling).addClass("dragging");
      if (translate3dSupported) {
        $target.css(cssTransformWithPrefix, "translate3d(" + left + "px,0,0)");
        $leftSibling.css(cssTransformWithPrefix, "translate3d(" + (left - this._touch.slideStep) + "px,0,0)");
        $rightSibling.css(cssTransformWithPrefix, "translate3d(" + (left + this._touch.slideStep) + "px,0,0)");
      } else {
        $target.css("left", left + "px");
        $leftSibling.css("left", left - this._touch.slideStep + "px");
        $rightSibling.css("left", left + this._touch.slideStep + "px");
      }
      this._touch.fromLeft = left;
      this._touch.$target = $target;
      this._touch.$leftSibling = $leftSibling;
      this._touch.$rightSibling = $rightSibling;
      this._touch.startX = startX;
      this._touch.startY = getEventPageY(event, this);
      this._touch.deltaX = 0;
      this._touch.deltaY = 0;
      this._touch.directionX = 0;
      this._touch.velocityX = 0;
      this._touch.velocityDirectionX = 0;
      this._touch.prevTime = this._touch.startTime = currentTime;
      this._touch.prevTimeX = startX;
      if (event.type === "mousedown") {
        event.preventDefault();
      }
    }
    function touchMoveHandler(event) {
      var currentTime = new Date;
      var timeDelta = currentTime - this._touch.prevTime;
      var currentX = getEventPageX(event, this._touch.id);
      var directionX = currentX > this._touch.startX ? 1 : -1;
      var deltaX = Math.abs(currentX - this._touch.startX);
      var left;
      var $leftSibling = this._touch.$leftSibling;
      var $rightSibling = this._touch.$rightSibling;
      var moveBothSiblings = this.options.moveBothSiblings;
      var mouseEvent = event.type === "mousemove";
      if (mouseEvent && this._touch.type !== TOUCH_TYPE_MOUSE || !mouseEvent && this._touch.type !== TOUCH_TYPE_TOUCH) {
        return true;
      }
      this._touch.directionX = directionX;
      this._touch.deltaX = deltaX;
      this._touch.deltaY = Math.abs(getEventPageY(event, this._touch.id) - this._touch.startY);
      if (currentX === null) {
        return false;
      }
      if (!mouseEvent && (TOUCH_START_DELAY < timeDelta || deltaX < Math.abs(getEventPageY(event, this._touch.id) - this._touch.startY))) {
        return true;
      }
      if (directionX > 0 && $leftSibling.size() === 0 || directionX < 0 && $rightSibling.size() === 0) {
        this._touch.deltaX = deltaX = Math.round(Math.pow(deltaX, 1.5 / 2));
      }
      left = this._touch.fromLeft + deltaX * directionX;
      if (timeDelta > SPEED_INTERVAL) {
        this._touch.prevTime = currentTime;
        this._touch.velocityDirectionX = currentX > this._touch.prevTimeX ? 1 : -1;
        this._touch.velocityX = Math.abs(currentX - this._touch.prevTimeX) / (timeDelta / SPEED_INTERVAL);
        this._touch.prevTimeX = currentX;
      }
      if (translate3dSupported) {
        this._touch.$target.css(cssTransformWithPrefix, "translate3d(" + left + "px,0,0)");
        if (directionX > 0 || moveBothSiblings) {
          $leftSibling.css(cssTransformWithPrefix, "translate3d(" + (left - this._touch.slideStep) + "px,0,0)");
        }
        if (directionX < 0 || moveBothSiblings) {
          $rightSibling.css(cssTransformWithPrefix, "translate3d(" + (left + this._touch.slideStep) + "px,0,0)");
        }
      } else {
        this._touch.$target.css("left", left + "px");
        if (directionX > 0 || moveBothSiblings) {
          $leftSibling.css("left", left - this._touch.slideStep + "px");
        }
        if (directionX < 0 || moveBothSiblings) {
          $rightSibling.css("left", left + this._touch.slideStep + "px");
        }
      }
      if (mouseEvent) {
        event.preventDefault();
      }
      return deltaX < TOUCH_LOCK_SENSIVITY;
    }
    function touchEndHandler(event) {
      var $target = this._touch.$target;
      var $leftSibling = this._touch.$leftSibling;
      var $rightSibling = this._touch.$rightSibling;
      var unique = this.unique;
      var fromLeft = Math.abs(this._touch.fromLeft);
      var mouseEvent = event.type === "mouseup";
      var currentTime = new Date;
      if (mouseEvent && this._touch.type !== TOUCH_TYPE_MOUSE || !mouseEvent && this._touch.type !== TOUCH_TYPE_TOUCH) {
        return true;
      }
      $target.off(addEventsNamespace(TOUCH_MOVE_EVENTS, unique));
      $target.off(addEventsNamespace(TOUCH_END_EVENTS, unique));
      $document.off(addEventsNamespace(TOUCH_END_EVENTS, unique));
      $target.add($leftSibling).add($rightSibling).removeClass("dragging back");
      if (translate3dSupported) {
        $target.add($leftSibling).add($rightSibling).css(cssTransformWithPrefix, "");
      } else {
        $target.add($leftSibling).add($rightSibling).css("left", "");
      }
      this._touch.id = -1;
      this._touch.fromLeft = 0;
      if (this._touch.deltaX + fromLeft > this._touch.slideAfter || this._touch.velocityX > VELOCITY_LIMIT && this._touch.velocityDirectionX === this._touch.directionX) {
        if (this._touch.directionX === -1) {
          nextSlide.call(this);
        }
        if (this._touch.directionX === 1) {
          prevSlide.call(this);
        }
      } else {
        resetAutoSlideShow.call(this);
      }
      this._touch.prevTime = currentTime;
      if (currentTime - this._touch.startTime < 500 && (this._touch.deltaX < 5 && this._touch.deltaY < 5)) {
        $target.trigger("justClick");
        return false;
      }
      return true;
    }
    function getEventPageX(event, id) {
      if ($.defined(event.originalEvent.changedTouches)) {
        if (id instanceof SwipeCarousel) {
          id._touch.id = event.originalEvent.changedTouches[0].identifier;
          return event.originalEvent.changedTouches[0].pageX;
        } else {
          if ($.isNumeric(id)) {
            for (var i = 0, n = event.originalEvent.changedTouches.length;i < n;i++) {
              if (event.originalEvent.changedTouches[i].identifier == id) {
                return event.originalEvent.changedTouches[i].pageX;
              }
            }
          }
        }
        return null;
      }
      if (id instanceof SwipeCarousel) {
        id._touch.id = 0;
      }
      return event.originalEvent.pageX;
    }
    function getEventPageY(event, id) {
      if ($.defined(event.originalEvent.changedTouches)) {
        if (id instanceof SwipeCarousel) {
          id._touch.id = event.originalEvent.changedTouches[0].identifier;
          return event.originalEvent.changedTouches[0].pageY;
        } else {
          if ($.isNumeric(id)) {
            for (var i = 0, n = event.originalEvent.changedTouches.length;i < n;i++) {
              if (event.originalEvent.changedTouches[i].identifier == id) {
                return event.originalEvent.changedTouches[i].pageY;
              }
            }
          }
        }
        return null;
      }
      if (id instanceof SwipeCarousel) {
        id._touch.id = 0;
      }
      return event.originalEvent.pageY;
    }
    function addEventsNamespace(events, namespace) {
      return events.replace(/((\S)(\s)|$)/g, "$2." + namespace + "$3");
    }
    function resetAutoSlideShow() {
      if (this._timer.id) {
        clearTimeout(this._timer.id);
      }
      if (this._timer.delay > 0) {
        this._timer.id = setTimeout(autoSlideShowTick.bind(this), this._timer.delay);
      }
    }
    function stopAutoSlideShow() {
      if (this._timer.id) {
        clearTimeout(this._timer.id);
      }
    }
    function autoSlideShowTick() {
      nextSlide.call(this);
    }
    function autoSlideShow(delay) {
      this._timer.delay = delay;
      resetAutoSlideShow.call(this);
    }
    function disableInternalDragging($elements) {
      $elements.find("img, a").prop("draggable", false);
      $elements.on("dragstart", "img, a", function() {
        return false;
      });
    }
    return{constructor:SwipeCarousel, init:function() {
      init.call(this);
    }, change:function(toSlide) {
      changeSlide.call(this, toSlide);
      return this;
    }, next:function() {
      nextSlide.call(this);
      return this;
    }, prev:function() {
      prevSlide.call(this);
      return this;
    }, auto:function(delay) {
      autoSlideShow.call(this, delay);
      return this;
    }, updateSlides:function(updateBookmarks) {
      initSlides.call(this, updateBookmarks);
      return this;
    }, getSlides:function() {
      return this.$slides;
    }};
  }();
  function ajaxWorking(onoff) {
    if (onoff) {
      $body.addClass("ajax-working");
    } else {
      $body.removeClass("ajax-working");
    }
  }
  Array.prototype.getUnique = function() {
    var u = {}, a = [];
    for (var i = 0, l = this.length;i < l;++i) {
      if (u.hasOwnProperty(this[i])) {
        continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
    }
    return a;
  };
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  Array.prototype.min = function() {
  return Math.min.apply(null, this);
};
  Array.prototype.rtrim = function(val) {
    for (var i = this.length - 1;i >= 0;i--) {
      if (this[i] == val) {
        this.splice(i, 1);
      } else {
        return this;
      }
    }
  };
  function dotdotdot() {
    $(".dotdotdot").dotdotdot({"watch":"window"});
  }
  function img2svg() {
    var $img = $(this);
    var url = $img.attr("src");
    var attrId = $img.attr("id");
    var attrClass = $img.attr("class");
    $.get(url, function(data) {
      var $svg = $(data).find("svg");
      if ($.defined(attrId)) {
        $svg.attr("id", attrId);
      }
      if ($.defined(attrClass)) {
        $svg.attr("class", attrClass);
      }
      $svg.removeAttr("xmlns:a");
      $img.replaceWith($svg);
    });
  }
  function isInt(num) {
    return num % 1 === 0;
  }
  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        size++;
      }
    }
    return size;
  };
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
  };
  function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }
  $document.on("click", 'label.choose-city[for="select_city"], label.choose-city[for="select_city_header"]', function() {
    var _this = $(this);
    _this.closest("ul.cities").children("li.active").removeClass("active");
    _this.closest("li").addClass("active");
    docCookies.setItem("current_city", _this.attr("data-alias"), "31 Dec 2099 23:59:59 GMT", "index.html");
    setTimeout(function() {
      if ($("#" + _this.attr("for")).prop("checked") == false) {
        if (location.pathname.indexOf("calculator") !== -1) {
          location.reload();
        }
        if ($body.hasClass("index")) {
          location.reload();
        }
      }
    }, 300);
  });
  $document.on("click", 'label[for="select_city_popup"]', function() {
    if ($(this).hasClass("yes")) {
      docCookies.setItem("current_city", $(this).attr("data-alias"), "31 Dec 2099 23:59:59 GMT", "index.html");
    } else {
      $("#select_city").prop("checked", true);
    }
  });
  $document.on("click", "section.combo-slider  ul.controls > li > ul > li:not(.active)", function() {
    var this_value = $(this).attr("data-name");
    var this_title = $(this).closest("ul").closest("li").attr("data-name");
    var selector = "[data-" + this_title + '="' + this_value + '"]';
    $(this).closest("ul.controls").children('li:not([data-name="' + this_title + '"])').each(function() {
      var title = $(this).attr("data-name");
      var value = $(this).children("ul").children("li.active").attr("data-name");
      selector += "[data-" + title + '="' + value + '"]';
    });
    if ($(this).closest("section.combo-slider").find("ul.images").children("li" + selector).size()) {
      $(this).closest("section.combo-slider").find("ul.images").children("li.active").removeClass("active");
      $(this).closest("section.combo-slider").find("ul.images").children("li" + selector).addClass("active");
      $(this).closest("ul").children("li.active").removeClass("active");
      $(this).addClass("active");
    }
  });
  if (!$("section.combo-slider ul.images > li.active").size()) {
    $("section.combo-slider ul.images > li").first().addClass("active");
  }
  $("section.combo-slider ul.controls > li").each(function() {
    var name = $(this).attr("data-name");
    var val = $(this).closest("section.combo-slider").find("ul.images").children("li.active").attr("data-" + name);
    $(this).children("ul").children('li[data-name="' + val + '"]').addClass("active");
  });
  var $csnu = $("section.cover-slideshow > div.content> nav> ul");
  $("[id]:not(.ruler) h2").each(function() {
    $csnu.append('<li><span data-href="#' + $(this).closest("[id]").attr("id") + '">' + $(this).text() + "</span></li>");
  });
  if ($("section.cover-slideshow:first-child").size()) {
    $body.addClass("white");
  }
  $document.on("click", "section.cover-slideshow > div.content > nav > ul.menu > li > span", function(e) {
    $("html, body").animate({scrollTop:$($(this).attr("data-href")).offset().top + "px"}, 500, function() {
    });
  });
  var ruler_timeout = null;
  $document.on("click", "section.ruler button.decrease, section.ruler button.increase", function() {
    var $input = $(this).closest("section.ruler").find('input[name="area"]');
    var val = $input.val();
    var min = parseInt($input.attr("min"));
    var max = parseInt($input.attr("max"));
    var dv = parseInt($input.attr("data-default"));
    if (isNaN(val)) {
      val = dv;
    }
    if ($(this).hasClass("decrease")) {
      val--;
    } else {
      val++;
    }
    if (val < min) {
      val = min;
    }
    if (val > max) {
      val = max;
    }
    $input.val(val);
    $input.change();
  });
  function adjust_ruler(_this) {
    var $w = _this.closest("li.input");
    var $sci = $w.find("span.check-input");
    var val = _this.val();
    $sci.html(val);
    var width = $sci.width();
    _this.css("width", width + "px");
    _this.closest("span").css("width", width + "px");
    if (isNaN(val)) {
      return;
    }
    var min = parseInt(_this.attr("min"));
    var max = parseInt(_this.attr("max"));
    if (val < min) {
      return;
    }
    if (val > max) {
      return;
    }
    if ($w.children("ul.divisions").children('li[data-number="' + val + '"]').size()) {
      $w.children("ul.divisions").children("li.current").removeClass("current");
      $w.children("ul.divisions").children('li[data-number="' + val + '"]').addClass("current");
    }
    $w.children("ul.divisions").children("li").css("width", "");
    $w.children("ul.divisions").children("li.current").css("width", width + "px");
    var margin = 0;
    for (var i = 0;i < $w.children("ul.divisions").children("li.current").index();i++) {
      margin += parseInt($w.children("ul.divisions").children("li").eq(i).css("width")) + parseInt($w.children("ul.divisions").children("li").eq(i).css("margin-right"));
    }
    margin += (parseInt($w.children("ul.divisions").children("li.current").css("width")) + parseInt($w.children("ul.divisions").children("li.current").css("margin-right"))) / 2 - parseInt($w.children("ul.divisions").children("li.current").css("margin-right")) / 2;
    $w.children("ul.divisions").children("li:first-child").css("margin-left", "-" + margin + "px");
  }
  $document.on("change", 'section.ruler input[name="area"]', function() {
    var val = $(this).val();
    var min = parseInt($(this).attr("min"));
    var max = parseInt($(this).attr("max"));
    var dv = parseInt($(this).attr("data-default"));
    if (isNaN(val)) {
      val = dv;
    }
    if (val < min) {
      val = min;
    }
    if (val > max) {
      val = max;
    }
    $(this).val(val);
    adjust_ruler($(this));
  });
  $document.on("focusin", 'section.ruler input[name="area"]', function() {
    var _this = $(this);
    _this.val("");
  });
  $document.on("focusout", 'section.ruler input[name="area"]', function() {
    var _this = $(this);
    _this.change();
  });
  $('section.ruler input[name="area"]').change();
  $document.on("click", "button.scroll", function() {
    var h = $(this).closest("section").offset().top + $(this).closest("section").height();
    $("html, body").animate({scrollTop:h + "px"}, 500, function() {
    });
  });
  $("button.scroll").closest("section").addClass("on-scroll");
  var section_scroll_scrolling = false;
  $document.on("mousewheel wheel DOMMouseScroll", "section.on-scroll:not(.scrolled)", function(e) {
    if (!section_scroll_scrolling) {
      var do_scroll = true;
      if (e.originalEvent.deltaY) {
        if (e.originalEvent.deltaY < 0) {
          do_scroll = false;
        }
      } else {
        if (e.originalEvent.wheelDeltaY) {
          if (e.originalEvent.wheelDeltaY > 0) {
            do_scroll = false;
          }
        } else {
          if (e.originalEvent.detail) {
            if (e.originalEvent.detail < 0) {
              do_scroll = false;
            }
          }
        }
      }
      if (do_scroll) {
        section_scroll_scrolling = true;
        var h = $(this).offset().top + $(this).height();
        $("html, body").animate({scrollTop:h + "px"}, 500, function() {
          setTimeout(function() {
            section_scroll_scrolling = false;
          }, 100);
        });
        $("section.on-scroll").addClass("scrolled");
      }
    }
  });
  $document.on("click", "button.scroll-top", function() {
    $("html, body").animate({scrollTop:"0px"}, 500, function() {
    });
  });
  if ($("#map-canvas").size()) {
    var styles = [{"featureType":"administrative", "elementType":"labels.text.fill", "stylers":[{"color":"#5f5f5f"}]}, {"featureType":"administrative.province", "elementType":"all", "stylers":[{"visibility":"off"}]}, {"featureType":"landscape", "elementType":"all", "stylers":[{"saturation":-100}, {"lightness":65}, {"visibility":"on"}]}, {"featureType":"landscape.man_made", "elementType":"geometry.fill", "stylers":[{"saturation":"0"}, {"gamma":"0.30"}]}, {"featureType":"landscape.man_made", "elementType":"geometry.stroke", 
    "stylers":[{"gamma":"1"}]}, {"featureType":"poi", "elementType":"all", "stylers":[{"saturation":-100}, {"lightness":51}, {"visibility":"simplified"}]}, {"featureType":"road", "elementType":"all", "stylers":[{"gamma":"1.00"}]}, {"featureType":"road", "elementType":"geometry", "stylers":[{"gamma":"0.3"}]}, {"featureType":"road", "elementType":"geometry.fill", "stylers":[{"gamma":"1.20"}]}, {"featureType":"road", "elementType":"labels.text", "stylers":[{"gamma":"1.990"}]}, {"featureType":"road", 
    "elementType":"labels.text.fill", "stylers":[{"gamma":"1.00"}, {"color":"#000000"}, {"visibility":"on"}, {"weight":"1.00"}]}, {"featureType":"road", "elementType":"labels.text.stroke", "stylers":[{"weight":"2.50"}, {"visibility":"off"}]}, {"featureType":"road.highway", "elementType":"all", "stylers":[{"saturation":-100}, {"visibility":"simplified"}]}, {"featureType":"road.highway", "elementType":"geometry.fill", "stylers":[{"gamma":"1.20"}, {"visibility":"on"}, {"color":"#6d6f71"}]}, {"featureType":"road.highway", 
    "elementType":"geometry.stroke", "stylers":[{"visibility":"off"}]}, {"featureType":"road.highway", "elementType":"labels.text", "stylers":[{"visibility":"on"}]}, {"featureType":"road.highway", "elementType":"labels.text.fill", "stylers":[{"color":"#ffffff"}]}, {"featureType":"road.highway", "elementType":"labels.text.stroke", "stylers":[{"color":"#777b7d"}, {"visibility":"on"}, {"weight":"2.50"}]}, {"featureType":"road.arterial", "elementType":"all", "stylers":[{"saturation":-100}, {"lightness":30}, 
    {"visibility":"on"}]}, {"featureType":"road.local", "elementType":"all", "stylers":[{"saturation":-100}, {"lightness":40}, {"visibility":"on"}]}, {"featureType":"transit", "elementType":"all", "stylers":[{"saturation":-100}, {"visibility":"simplified"}]}, {"featureType":"water", "elementType":"geometry", "stylers":[{"hue":"#ffff00"}, {"lightness":-25}, {"saturation":-97}]}, {"featureType":"water", "elementType":"labels", "stylers":[{"visibility":"on"}, {"lightness":-25}, {"saturation":-100}]}];
    var styledMap = new google.maps.StyledMapType(styles, {name:"Styled Map"});
    var map = null;
    function initializeLocation() {
      var center_lat = $("#map-canvas").attr("data-center-lat");
      var center_lng = $("#map-canvas").attr("data-center-lng");
      var pin_lat = $("#map-canvas").attr("data-pin-lat");
      var pin_lng = $("#map-canvas").attr("data-pin-lng");
      var mapOptions = {center:new google.maps.LatLng(center_lat, center_lng), zoom:12, minZoom:4, panControl:false, panControlOptions:{position:google.maps.ControlPosition.LEFT_BOTTOM}, zoomControl:true, zoomControlOptions:{style:google.maps.ZoomControlStyle.SMALL, position:google.maps.ControlPosition.LEFT_BOTTOM}, mapTypeControl:false, mapTypeControlOptions:{mapTypeIds:[google.maps.MapTypeId.ROADMAP, "map_style"]}, scrollwheel:false, streetViewControl:false};
      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      map.mapTypes.set("map_style", styledMap);
      map.setMapTypeId("map_style");
      var marker = new google.maps.Marker({position:new google.maps.LatLng(pin_lat, pin_lng), map:map, icon:{url:"/styles/images/pin.png", size:new google.maps.Size(51, 69), origin:new google.maps.Point(0, 0), anchor:new google.maps.Point(25, 57)}});
    }
    google.maps.event.addDomListener(window, "load", initializeLocation);
  }
  $("div.slider").each(function() {
    var draggable = true;
    if ($(this).attr("data-draggable") !== undefined) {
      if ($(this).attr("data-draggable") == "no") {
        draggable = false;
      }
    }
    var slider = new SwipeCarousel($(this), {draggable:draggable, continuous:true});
    if ($(this).attr("data-auto") !== undefined) {
      slider.auto(parseInt($(this).attr("data-auto")));
    }
  });
  if ($(".triplets").size()) {
  }
  if ($body.hasClass("calculator")) {
  }
  if ($body.hasClass("faq")) {
    $document.on("submit", 'form[name="faq"]', function(e) {
      var _this = $(this);
      var $name = _this.find('[name="name"]');
      var $email = _this.find('[name="email"]');
      var $question = _this.find('[name="question"]');
      var name = $name.val();
      var email = $email.val();
      var question = $question.val();
      var error = 0;
      if (name.length == 0) {
        error++;
        $name.addClass("error");
      } else {
        $name.removeClass("error");
      }
      if (email.length == 0 || !validateEmail(email)) {
        error++;
        $email.addClass("error");
      } else {
        $email.removeClass("error");
      }
      if (question.length == 0) {
        error++;
        $question.addClass("error");
      } else {
        $question.removeClass("error");
      }
      if (!_this.hasClass("on")) {
        $name.on("keyup change", function() {
          if ($(this).val().length == 0) {
            $(this).addClass("error");
          } else {
            $(this).removeClass("error");
          }
        });
        $email.on("keyup change", function() {
          if ($(this).val().length == 0 || !validateEmail($(this).val())) {
            $(this).addClass("error");
          } else {
            $(this).removeClass("error");
          }
        });
        $question.on("keyup change", function() {
          if ($(this).val().length == 0) {
            $(this).addClass("error");
          } else {
            $(this).removeClass("error");
          }
        });
      }
      if (error) {
        return false;
      }
      ajaxWorking(1);
      $.ajax({type:"POST", async:true, dataType:"json", url:_this.attr("action"), data:_this.serialize(), success:function(msg) {
        if (msg) {
          _this.addClass("success");
        } else {
          _this.addClass("success");
        }
      }, error:function(jqXHR, textStatus, errorThrown) {
        _this.addClass("success");
      }, complete:function(jqXHR, textStatus, errorThrown) {
        _this.addClass("sent");
        ajaxWorking(0);
      }});
      return false;
    });
    $document.on("change", 'ul.faq > li > input[type="checkbox"]', function() {
      if ($(this).prop("checked")) {
        var id = $(this).attr("id");
        $('ul.faq > li > input:not([id="' + id + '"]):checked').prop("checked", false);
      }
    });
  }
  if ($body.hasClass("index")) {
    $document.on("click", "div[data-video] button", function() {
      var code = $(this).closest("div[data-video]").attr("data-video");
      code = code.split("index.html");
      code = code[code.length - 1];
      lightbox = new SimpleLightbox(undefined, function() {
      }, function() {
      });
      lightbox.open(function() {
      });
      lightbox.removeClass("opened");
      lightbox.addContent('<div class="close"></div><article class="video"><iframe src="https://www.youtube.com/embed/' + code + '?rel=0&amp;showinfo=0&autoplay=1" frameborder="0" allowfullscreen></iframe></article>');
      lightbox.addClass("opened");
      lightbox.addClass("video");
    });
  }
  if ($body.hasClass("publications")) {
    $("main>ul.publications>li>p").ellipsis({lines:3, responsive:true});
  }
  $document.on("change", 'select[name="go-to-from-404"]', function() {
    $("a.go-to-from-404").attr("href", $(this).val());
  });
  if ($("main.error-404").size()) {
    $body.addClass("error-404");
  }
  $document.on("keyup", function(e) {
    if (e.keyCode == 27) {
      if (lightbox !== undefined && lightbox.isOpened()) {
        lightbox.close();
      }
      if ($("#main_menu_switch").is(":checked")) {
        $("#main_menu_switch").prop("checked", false);
        $("#main_menu_switch").change();
      }
    }
  });
  $window.resize(function() {
    if ($("section.splash >  div.video > video").size()) {
      var size = 0;
      if ($("section.splash >  div.video").css("position").toLowerCase() == "absolute") {
        var width = $window.width() / 2;
        var height = $window.height();
      } else {
        var width = parseInt($("section.splash >  div.video").css("width"));
        var height = parseInt($("section.splash >  div.video").css("height"));
      }
      if (height > width) {
        size = height;
      } else {
        size = width;
      }
      $("section.splash >  div.video > video").css("height", size + "px");
      $("section.splash >  div.video > video").css("width", size + "px");
      $("section.splash >  div.video > video").css("margin-top", size / -2 + "px");
      $("section.splash >  div.video > video").css("margin-left", size / -2 + "px");
    }
    $('section.ruler input[name="area"]').change();
    $("div.slider").each(function() {
      var h = 0;
      $(this).children("ul.bookmarks").children("li").each(function() {
        if (parseInt($(this).css("height")) > h) {
          h = parseInt($(this).css("height"));
        }
      });
      $(this).children("ul.bookmarks").css("min-height", h + "px");
    });
    if ($("section.designs").size()) {
      if ($("section.designs > ul.slides > li:first-child").css("display") == "table-cell") {
        designs_slider = null;
        $("section.designs").off();
        $("section.designs > ul").off();
        $("section.designs > ul > li").each(function() {
          $(this).off();
        });
        $("section.designs").removeClass("ready");
      } else {
        if (!$("section.designs").hasClass("ready")) {
          designs_slider = new SwipeCarousel($("section.designs"), {draggable:true, continuous:true});
        }
      }
    }
  });
  $window.scroll(function(e) {
    var div_footer_scroll_top = $window.scrollTop();
    var div_footer_wh = $window.height();
    var div_footer_dh = $document.height();
    var div_footer_footer_height = $("body > footer").height();
    if (div_footer_scroll_top + div_footer_wh > div_footer_dh - div_footer_footer_height) {
      $("div.footer").addClass("stick");
    } else {
      $("div.footer").removeClass("stick");
    }
    if ($body.hasClass("index")) {
    }
  });
  var freeze_click = false;
  $document.on("click", function(e) {
    if ($("#select_city").prop("checked") == true) {
      if (!$(e.target).closest("div.cities").size()) {
        $("#select_city").prop("checked", false);
      }
    }
    if (freeze_click) {
      return false;
    }
    if (!$body.hasClass("is-touch")) {
      if ($("#select_city_header").prop("checked") == true) {
        if ($(e.target).attr("id") != "select_city_header") {
          $("#select_city_header").prop("checked", false);
          freeze_click = true;
          setTimeout(function() {
            freeze_click = false;
          }, 300);
        }
      }
    }
  });
  $document.on("touchstart", function(e) {
    if (freeze_click || (!$body.hasClass("is-touch") || $(e.target)[0].tagName.toLowerCase() == "label")) {
      return true;
    }
    if ($("#select_city_header").prop("checked") == true) {
      if ($(e.target).attr("id") != "select_city_header") {
        $("#select_city_header").prop("checked", false);
        freeze_click = true;
        setTimeout(function() {
          freeze_click = false;
        }, 300);
      }
    }
  });
  $document.on("change", "#main_menu_switch", function() {
    if ($(this).is(":checked")) {
      remember_scroll_top = $window.scrollTop();
      var widthWithScroll = $html.width();
      var scrollWidth;
      $html.css("overflow", "hidden");
      scrollWidth = $html.width() - widthWithScroll;
      $html.css("padding-right", scrollWidth + "px");
      $body.css("height", $window.height() + "px");
      $html.css("height", $window.height() + "px");
      $("header article.main-menu nav.menu ul.menu").css("max-height", $("header article.main-menu nav.menu ul.menu").css("height"));
    } else {
      $body.css("height", "");
      $html.css("height", "");
      $html.css("overflow", "");
      $html.css("padding-right", "");
      $window.scrollTop(remember_scroll_top);
      remember_scroll_top = 0;
    }
  });
  if (!docCookies.hasItem("current_city")) {
    $("#select_city").prop("checked", false);
    setTimeout(function() {
      $("#select_city_popup").prop("checked", true);
      setTimeout(function() {
        $("div.popup").addClass("show");
      }, 100);
    }, 1E3);
  }
  $('img.cssable[src$=".svg"]').each(img2svg);
  dotdotdot();
  $document.on("click", "div.lightbox div.close", function() {
    lightbox.close();
  });
  $("a").each(function() {
    var href = $(this).attr("href");
    if (href == null) {
      return;
    }
    if (href.substr(0, 7) == "http://" || href.substr(0, 8) == "https:///") {
      $(this).attr("target", "_blank");
    }
  });
  function is_touch_device() {
    return "ontouchstart" in window || navigator.maxTouchPoints;
  }
  if (is_touch_device()) {
    $body.addClass("is-touch");
  }
  $window.resize();
  $window.scroll();
  $(".remove-me").remove();
  window.onload = function() {
    $body.addClass("loaded");
  };
  $(".state-switch").each(function() {
    $(this).prop("checked", false);
  });
  if ($body.hasClass("calculator")) {
    $('[data-do-check="yes"]').each(function() {
      $(this).next("label").click();
    });
  }

  function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }




  for (var i = 1; i <= 12; i++) {
    var imgCnt = $('.work-days li').not('.active').length;
    // console.log(imgCnt);
    var rnd = randomInteger(1, imgCnt);
    console.log(rnd);
    var $el = $('.work-days li:not(.active):eq('+rnd+')').show().addClass('active');
    var imgSrc = $el.find('figure').data('img');
    $el.find('figure').css('backgroundImage', 'url('+imgSrc+')');
     $el.find('figure').html('<img src="'+imgSrc+'" alt="" />');
  }


});

