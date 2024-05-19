import { CLICommandMutability } from "../enums/CLICommandMutability.enum";

export interface ICLICommandHelp {
    tagline?: string;
    mutability: CLICommandMutability;
    args?: string[];
    description?: string;
    notes?: string[];
}