type ValidationRule = {
    validator: (value: any) => boolean;
    message: string;
};

export class FormValidator {
    private rules: Record<string, ValidationRule[]> = {};

    // Add validation rules for a field
    addFieldRules(field: string, rules: ValidationRule[]): void {
        this.rules[field] = rules;
    }

    // Validate a single field
    validateField(field: string, value: any): string[] {
        const fieldRules = this.rules[field];
        if (!fieldRules) {
            return [];
        }

        return fieldRules
            .filter((rule) => !rule.validator(value))  // If validation fails, add the message
            .map((rule) => rule.message);  // Return the corresponding message
    }

    // Validate all fields
    validateAll(values: Record<string, any>): Record<string, string[]> {
        const errors: Record<string, string[]> = {};

        Object.keys(this.rules).forEach((field) => {
            const fieldErrors = this.validateField(field, values[field]);
            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors;  // If errors exist, add them to the result
            }
        });

        return errors;  // Return the errors map
    }

    // Check if form is valid
    isValid(errors: Record<string, string[]>): boolean {
        return Object.keys(errors).every((key) => errors[key].length === 0);  // Return true if no errors
    }
}

// Common Validators
export const Validators = {
    required: (message = "This field is required") => ({
        validator: (value: any) => value !== null && value !== undefined && value !== "",
        message,
    }),
    minLength: (length: number, message = `Minimum length is ${length}`) => ({
        validator: (value: any) => typeof value === "string" && value.length >= length,
        message,
    }),
    maxLength: (length: number, message = `Maximum length is ${length}`) => ({
        validator: (value: any) => typeof value === "string" && value.length <= length,
        message,
    }),
    email: (message = "Invalid email format") => ({
        validator: (value: any) => typeof value === "string" &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message,
    }),
    numeric: (message = "This field must be a number") => ({
        validator: (value: any) => !isNaN(value),
        message,
    }),
    range: (min: number, max: number, message = `Value must be between ${min} and ${max}`) => ({
        validator: (value: any) => typeof value === "number" && value >= min && value <= max,
        message,
    }),
    phoneNumber: (message = "Invalid phone number") => ({
        validator: (value: any) => typeof value === "string" &&
            /^\+?[1-9]\d{1,14}$/.test(value),
        message,
    }),
    pattern: (regex: RegExp, message = "Invalid format") => ({
        validator: (value: any) => typeof value === "string" && regex.test(value),
        message,
    }),
    equalTo: (comparison: any, message = "Values do not match") => ({
        validator: (value: any) => value === comparison,
        message,
    }),
};
