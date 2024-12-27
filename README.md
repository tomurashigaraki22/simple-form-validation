Simple Form Validation Library
This is a simple form validation library for JavaScript/TypeScript to validate form fields. It provides common validators (required, minLength, maxLength, email, numeric, phone number, etc.) and allows easy integration into your forms.

Features:

Easy-to-use API for adding validation rules.
Built-in common validation rules such as required, minLength, email, etc.
Ability to add custom validation rules.
Provides error messages when validation fails.


Installation:
To install the library, run the following command in your project directory:

npm install simple-form-validation-lib


Usage Example:

import { FormValidator, Validators } from 'simple-form-validation-lib';

const formValidator = new FormValidator();

// Add validation rules for the username field
formValidator.addFieldRules('username', [
    Validators.required('Username is required'),
    Validators.minLength(3, 'Username must be at least 3 characters'),
]);

// Add validation rules for the email field
formValidator.addFieldRules('email', [
    Validators.required('Email is required'),
    Validators.email('Invalid email address'),
]);

// Validate a form
const formValues = {
    username: 'John',
    email: 'john.doe@example.com',
};

// Validate the form values
const errors = formValidator.validateAll(formValues);

if (formValidator.isValid(errors)) {
    console.log('Form is valid!');
} else {
    console.log('Validation Errors:', errors);
}




Available Validators:


required(message): Ensures the field is not empty.

minLength(length, message): Ensures the field has at least the specified length.

maxLength(length, message): Ensures the field does not exceed the specified length.

email(message): Ensures the field contains a valid email address.

numeric(message): Ensures the field is a valid number.

phoneNumber(message): Ensures the field contains a valid phone number (in E.164 format).

pattern(regex, message): Ensures the field matches the specified regular expression pattern.

equalTo(value, message): Ensures the field value is equal to another value.


Methods:


addFieldRules(field: string, rules: ValidationRule[]): void: Adds validation rules for a specific field.

validateField(field: string, value: any): string[]: Validates a single field and returns an array of error messages.

validateAll(values: Record<string, any>): Record<string, string[]>: Validates all fields in the form and returns a record of errors.

isValid(errors: Record<string, string[]>): boolean: Checks if the form is valid (no errors).


License:
This package is licensed under the MIT License.