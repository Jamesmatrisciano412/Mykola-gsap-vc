import { createContext } from "react";

const ThemeContext = createContext(null);

export const THEME_DESKTOP = "desktop";
export const THEME_IPAD = "md";
export const THEME_IPHONE = "sm";
export { ThemeContext };
