;(()=>{
  class SvgAdaptive{
    constructor(){
      this._storage = new Map();
      this._redrawController = this._redrawController.bind(this);
    }
  
    setSvg(svg, controlObj){
      const use = svg.getElementsByTagName("use")[0];
      const redrawPoint = -Infinity
  
      this._storage.set(svg, {controlObj, use, redrawPoint});
      
      this._initSvgAdaptive();
    }
  
    _initSvgAdaptive(){
      document.addEventListener("DOMContentLoaded", this._redrawController);
      window.addEventListener("resize", this._redrawController);
    }
  
    _getWindowsWidth() {
      const body = document.querySelector("body");
      body.style.overflow = "hidden";
      const viewportWidth = document.documentElement.clientWidth;
      body.style.overflow = "";
      return viewportWidth;
    }
  
    _redrawController() {
      const viewportWidth = this._getWindowsWidth();
  
      this._storage.forEach(({controlObj, use, redrawPoint})=>{
        if (redrawPoint > viewportWidth) {
          return;
        }
  
        const redrawControlPoints = Object.keys(controlObj);
        
        for (let controlPoint of redrawControlPoints) {
          if(viewportWidth >= +controlPoint){
            redrawPoint = +controlPoint;
          }
        };
  
        this._redrawSvg({controlObj, use, redrawPoint});
      });
    }
  
    _redrawSvg({use, controlObj, redrawPoint}) {
      use.setAttribute("xlink:href", controlObj[redrawPoint]);
    }
  };

  window.SvgAdaptive = SvgAdaptive;
})();

;(()=>{
  const {SvgAdaptive} = window;

  const headerSvg = document.querySelector(".main-navigation__logo-image");
  const footerSvg = document.querySelector(".footer__logo");
  
  const HEADER_REDRAW_POINTS = {
    "960": "./image/spriteSVG/sprite.svg#logotype-desktop",
    "660": "./image/spriteSVG/sprite.svg#logotype-tablet",
    "0": "./image/spriteSVG/sprite.svg#logotype-mobile"
  }
  
  const FOOTER_REDRAW_POINTS = {
    "960": "./image/spriteSVG/sprite.svg#logotype-desktop-footer",
    "660": "./image/spriteSVG/sprite.svg#logotype-tablet-footer"
  };
  
  const svgAdapt = new SvgAdaptive;
  svgAdapt.setSvg(headerSvg, HEADER_REDRAW_POINTS);
  svgAdapt.setSvg(footerSvg, FOOTER_REDRAW_POINTS);
})();

;(() => {
  function closeNavigation() {
    const navigation = document.querySelector(".main-navigation");
    navigation.classList.toggle("close");
  }

  closeNavigation(); // закрывает выпадающее меню (по умолчанию открыто, на случай если пользователь отключил js в настройках)

  const toggler = document.querySelector(".toggler");
  toggler.addEventListener("click", closeNavigation);
})();
