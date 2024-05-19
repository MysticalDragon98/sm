import PrintType from "../../types/print-type.type";
import CLIContext from "../../const/CLIContext";

export default function print (type: PrintType, ...data: any[]) {
    switch (type) {
        case "tty":
            if (CLIContext.silent || !CLIContext.tty || CLIContext.json || CLIContext.raw) return;
            console.error(...data);
            break;
        case "json":
            if (!CLIContext.json) return;
            for (const item of data) {
                console.log(JSON.stringify(item, null, 2));
            }
            break;
        case "raw":
            if (CLIContext.json || !CLIContext.raw) return;
            console.log(...data);
            break;
    }
}