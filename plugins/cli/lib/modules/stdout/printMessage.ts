import print from "./print";

export default function printMessage (...data: any) {
    return print("tty", ...data);
}