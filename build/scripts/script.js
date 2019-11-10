"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AdaptiveSvgSprite =
/*#__PURE__*/
function () {
  function AdaptiveSvgSprite() {
    _classCallCheck(this, AdaptiveSvgSprite);

    this._svgCollection = new Map();
    this._REDRAW_POINTS = {
      DESKTOP: "960",
      TABLET: "660"
    };
    this._redrawSvg = this._redrawSvg.bind(this);
    document.addEventListener("DOMContentLoaded", this._redrawSvg);
    window.addEventListener("resize", this._redrawSvg);
  }

  _createClass(AdaptiveSvgSprite, [{
    key: "setSvg",
    value: function setSvg(svg, svgLinksMap) {
      if (this._svgCollection.has(svg)) {
        return;
      }

      var use = svg.getElementsByTagName("use")[0];

      this._svgCollection.set(svg, {
        svgLinksMap: svgLinksMap,
        use: use
      });
    }
  }, {
    key: "_getWindowsWidth",
    value: function _getWindowsWidth() {
      var body = document.querySelector("body");
      body.style.overflow = "hidden";
      var clientWidth = document.documentElement.clientWidth;
      body.style.overflow = "";
      return clientWidth;
    }
  }, {
    key: "_getTypeScreen",
    value: function _getTypeScreen() {
      var clientWidth = this._getWindowsWidth();

      if (clientWidth >= this._REDRAW_POINTS.DESKTOP) {
        return "DESKTOP";
      }

      if (clientWidth >= this._REDRAW_POINTS.TABLET) {
        return "TABLET";
      }

      return "MOBILE";
    }
  }, {
    key: "_redrawSvg",
    value: function _redrawSvg() {
      var typeScreen = this._getTypeScreen();

      this._svgCollection.forEach(function (svgRelative) {
        svgRelative.use.setAttribute("xlink:href", svgRelative.svgLinksMap[typeScreen]);
      });
    }
  }]);

  return AdaptiveSvgSprite;
}();

var SVG_SPRITE_HEADER = {
  DESKTOP: "./image/spriteSVG/sprite.svg#logotype-desktop",
  TABLET: "./image/spriteSVG/sprite.svg#logotype-tablet",
  MOBILE: "./image/spriteSVG/sprite.svg#logotype-mobile"
};
var SVG_SPRITE_FOOTER = {
  DESKTOP: "./image/spriteSVG/sprite.svg#logotype-desktop-footer",
  TABLET: "./image/spriteSVG/sprite.svg#logotype-tablet-footer"
};
var headerSvg = document.querySelector(".main-navigation__logo-image");
var footerSvg = document.querySelector(".footer__logo");
var adaptiveSvg = new AdaptiveSvgSprite();
adaptiveSvg.setSvg(footerSvg, SVG_SPRITE_FOOTER);
adaptiveSvg.setSvg(headerSvg, SVG_SPRITE_HEADER);

(function () {
  function closeNavigation() {
    var navigation = document.querySelector(".main-navigation");
    navigation.classList.toggle("close");
  }

  closeNavigation(); // закрывает выпадающее меню (по умолчанию открыто, на случай если пользователь отключил js в настройках)

  var toggler = document.querySelector(".toggler");
  toggler.addEventListener("click", closeNavigation);
})();