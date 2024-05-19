import parseServiceFile from "../../modules/fs/parseServiceFile";
import generateSystemServiceFile from "../../modules/generators/generateSystemServiceFile";

interface IOptions {
    
}

export default async function cREPLCommand ([ inputFile ]: string[], options: IOptions) {
    const config = await parseServiceFile(inputFile);
    const serviceFile = await generateSystemServiceFile(config);

    console.log(serviceFile);
}