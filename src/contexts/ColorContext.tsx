import { createContext, useEffect, useState } from "react";
import nookies, { parseCookies } from "nookies";
import { UserType } from "../types/UserType";
import { namecookie } from "../config/variables";
import { drndecrypt } from "../services/crypt";
import { ColorType } from "../types/ColorType";
import { findFirstItemByUserService } from "../services/CrudServices/findFirstItemByUserService";

type ColorContextProps = {
  color: ColorType;
};

type ColorProviderProps = {
  children?: any;
};

const ColorContext = createContext({} as ColorContextProps);

export function ColorProvider({ children }: ColorProviderProps) {
  const [color, setColor] = useState({} as ColorType);

  const getColors = async () => {
    const variablesColors = {
      colorBackground: "#181B23",
      colorContainer: "#1F2029",
      colorText: "#fff",
      colorButton: "#B83280",
    } as ColorType;

    const data = await findFirstItemByUserService("colors");
    if (data) {
      setColor(data);
    } else {
      setColor(variablesColors);
    }
  };

  useEffect(() => {
    getColors();
  }, []);

  return (
    <ColorContext.Provider value={{ color }}>{children}</ColorContext.Provider>
  );
}

export default ColorContext;
