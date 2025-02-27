import $ from "jquery";
import { THEME_DESKTOP, THEME_IPAD, THEME_IPHONE } from "./ThemeContext";
export function getCenterOfElement(element) {
  var offset = $(element).offset();
  var width = $(element).outerWidth();
  var height = $(element).outerHeight();

  return {
    x: offset.left + width / 2,
    y: offset.top + height / 2,
  };
}

export const wrapByLineWrapper = (element) => {
  const elementParent = element.parentNode;
  const lineWrapper = document.createElement("div");
  lineWrapper.classList.add("line-wrapper");
  const newElement = element.cloneNode(true);
  lineWrapper.appendChild(newElement);
  elementParent.replaceChild(lineWrapper, element);
  return newElement;
};

export const getWindowTheme = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1440) {
    return THEME_DESKTOP;
  } else if (screenWidth >= 1024) {
    return THEME_IPAD;
  } else {
    return THEME_IPHONE;
  }
};
