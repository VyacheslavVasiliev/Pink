class AdaptiveSvgSprite {
  constructor() {
    this._svgCollection = new Map();
    this._REDRAW_POINTS = {
      DESKTOP: "960",
      TABLET: "660"
    };
    this._redrawSvg = this._redrawSvg.bind(this);
    document.addEventListener("DOMContentLoaded", this._redrawSvg);
    window.addEventListener("resize", this._redrawSvg);
  }

  setSvg(svg, svgLinksMap) {
    if (this._svgCollection.has(svg)) {
      return;
    }
    const use = svg.getElementsByTagName("use")[0];

    this._svgCollection.set(svg, { svgLinksMap, use });
  }

  _getWindowsWidth() {
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    const clientWidth = document.documentElement.clientWidth;
    body.style.overflow = "";
    return clientWidth;
  }

  _getTypeScreen() {
    const clientWidth = this._getWindowsWidth();

    if (clientWidth >= this._REDRAW_POINTS.DESKTOP) {
      return "DESKTOP";
    }
    if (clientWidth >= this._REDRAW_POINTS.TABLET) {
      return "TABLET";
    }
    return "MOBILE";
  }

  _redrawSvg() {
    const typeScreen = this._getTypeScreen();

    this._svgCollection.forEach(svgRelative => {
      svgRelative.use.setAttribute("xlink:href", svgRelative.svgLinksMap[typeScreen]);
    });
  }
}

const SVG_SPRITE_HEADER = {
  DESKTOP: "./image/spriteSVG/sprite.svg#logotype-desktop",
  TABLET: "./image/spriteSVG/sprite.svg#logotype-tablet",
  MOBILE: "./image/spriteSVG/sprite.svg#logotype-mobile"
};

const SVG_SPRITE_FOOTER = {
  DESKTOP: "./image/spriteSVG/sprite.svg#logotype-desktop-footer",
  TABLET: "./image/spriteSVG/sprite.svg#logotype-tablet-footer"
};

const headerSvg = document.querySelector(".main-navigation__logo-image");
const footerSvg = document.querySelector(".footer__logo");

const adaptiveSvg = new AdaptiveSvgSprite();

adaptiveSvg.setSvg(footerSvg, SVG_SPRITE_FOOTER);
adaptiveSvg.setSvg(headerSvg, SVG_SPRITE_HEADER);

(() => {
  function closeNavigation() {
    const navigation = document.querySelector(".main-navigation");
    navigation.classList.toggle("close");
  }

  closeNavigation(); // закрывает выпадающее меню (по умолчанию открыто, на случай если пользователь отключил js в настройках)

  const toggler = document.querySelector(".toggler");
  toggler.addEventListener("click", closeNavigation);
})();
