import {} from "chalk";
import StyleInfoMark from "./InfoMark.style";

const StyleSuggestion = (text) => StyleInfoMark("?") + " " + (text);

export default StyleSuggestion;