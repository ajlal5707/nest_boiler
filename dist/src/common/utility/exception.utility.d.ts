import { ValidationError } from 'class-validator';
export interface NormalizeError {
    field: string;
    errorDetail: {
        [type: string]: string;
    };
}
export declare function normalizeValidationError(errors: ValidationError[]): NormalizeError[];
