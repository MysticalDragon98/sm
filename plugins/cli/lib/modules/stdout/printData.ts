import print from "./print";

export default function printData (...data: any[]) {
    return print("raw", ...data);
}