"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = exports.FormValidator = void 0;
class FormValidator {
    constructor() {
        this.rules = {};
    }
    // Add validation rules for a field
    addFieldRules(field, rules) {
        this.rules[field] = rules;
    }
    // Validate a single field
    validateField(field, value) {
        const fieldRules = this.rules[field];
        if (!fieldRules) {
            return [];
        }
        return fieldRules
            .filter((rule) => !rule.validator(value)) // If validation fails, add the message
            .map((rule) => rule.message); // Return the corresponding message
    }
    // Validate all fields
    validateAll(values) {
        const errors = {};
        Object.keys(this.rules).forEach((field) => {
            const fieldErrors = this.validateField(field, values[field]);
            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors; // If errors exist, add them to the result
            }
        });
        return errors; // Return the errors map
    }
    // Check if form is valid
    isValid(errors) {
        return Object.keys(errors).every((key) => errors[key].length === 0); // Return true if no errors
    }
}
exports.FormValidator = FormValidator;
// Common Validators
exports.Validators = {
    required: (message = "This field is required") => ({
        validator: (value) => value !== null && value !== undefined && value !== "",
        message,
    }),
    minLength: (length, message = `Minimum length is ${length}`) => ({
        validator: (value) => typeof value === "string" && value.length >= length,
        message,
    }),
    maxLength: (length, message = `Maximum length is ${length}`) => ({
        validator: (value) => typeof value === "string" && value.length <= length,
        message,
    }),
    email: (message = "Invalid email format") => ({
        validator: (value) => typeof value === "string" &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message,
    }),
    numeric: (message = "This field must be a number") => ({
        validator: (value) => !isNaN(value),
        message,
    }),
    range: (min, max, message = `Value must be between ${min} and ${max}`) => ({
        validator: (value) => typeof value === "number" && value >= min && value <= max,
        message,
    }),
    phoneNumber: (message = "Invalid phone number") => ({
        validator: (value) => typeof value === "string" &&
            /^\+?[1-9]\d{1,14}$/.test(value),
        message,
    }),
    pattern: (regex, message = "Invalid format") => ({
        validator: (value) => typeof value === "string" && regex.test(value),
        message,
    }),
    equalTo: (comparison, message = "Values do not match") => ({
        validator: (value) => value === comparison,
        message,
    }),
};
