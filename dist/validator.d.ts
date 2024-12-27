type ValidationRule = {
    validator: (value: any) => boolean;
    message: string;
};
export declare class FormValidator {
    private rules;
    addFieldRules(field: string, rules: ValidationRule[]): void;
    validateField(field: string, value: any): string[];
    validateAll(values: Record<string, any>): Record<string, string[]>;
    isValid(errors: Record<string, string[]>): boolean;
}
export declare const Validators: {
    required: (message?: string) => {
        validator: (value: any) => boolean;
        message: string;
    };
    minLength: (length: number, message?: string) => {
        validator: (value: any) => boolean;
        message: string;
    };
    maxLength: (length: number, message?: string) => {
        validator: (value: any) => boolean;
        message: string;
    };
    email: (message?: string) => {
        validator: (value: any) => boolean;
        message: string;
    };
    numeric: (message?: string) => {
        validator: (value: any) => boolean;
        message: string;
    };
    range: (min: number, max: number, message?: string) => {
        validator: (value: any) => boolean;
        message: string;
    };
    phoneNumber: (message?: string) => {
        validator: (value: any) => boolean;
        message: string;
    };
    pattern: (regex: RegExp, message?: string) => {
        validator: (value: any) => boolean;
        message: string;
    };
    equalTo: (comparison: any, message?: string) => {
        validator: (value: any) => boolean;
        message: string;
    };
};
export {};
