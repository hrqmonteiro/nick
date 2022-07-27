import { useContext } from "react";
import ColorContext from "../../contexts/ColorContext";

const useColorData = () => useContext(ColorContext);

export default useColorData;
