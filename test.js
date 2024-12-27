const { FormValidator, Validators } = require('./dist/index');

// Initialize the validator
const validator = new FormValidator();

// Add validation rules
validator.addFieldRules('username', [
    Validators.required('Username is required'),
    Validators.minLength(3, 'Username must be at least 3 characters'),
    Validators.maxLength(15, 'Username cannot exceed 15 characters'),
]);

validator.addFieldRules('email', [
    Validators.required('Email is required'),
    Validators.email('Invalid email address'),
]);

validator.addFieldRules('password', [
    Validators.required('Password is required'),
    Validators.minLength(8, 'Password must be at least 8 characters'),
    Validators.pattern(/[A-Z]/, 'Password must include at least one uppercase letter'),
    Validators.pattern(/[0-9]/, 'Password must include at least one number'),
]);

validator.addFieldRules('confirmPassword', [
    Validators.required('Confirm Password is required'),
    Validators.equalTo('Password22', 'Passwords do not match'),
]);

validator.addFieldRules('age', [
    Validators.required('Age is required'),
    Validators.numeric('Age must be a number'),
    Validators.range(18, 60, 'Age must be between 18 and 60'),
]);

validator.addFieldRules('phone', [
    Validators.required('Phone number is required'),
    Validators.phoneNumber('Invalid phone number format'),
]);

// Define sample data
const sampleData = {
    username: 'username1234',
    email: 'emmanuelhudson355@gmail.com',
    password: 'Password22',
    confirmPassword: 'Password22',
    age: 19,
    phone: '+2348071273078',
};

// Validate all fields
const errors = validator.validateAll(sampleData);
console.log('Validation Errors:', errors);

// Check if the form is valid
const isValid = validator.isValid(errors);
console.log('Is the form valid?', isValid);

// Run tests
function runTests() {
    console.log('\n--- Running Tests ---');

    // Test 1: Valid username
    let fieldErrors = validator.validateField('username', sampleData.username);
    console.log('Test 1 (Valid Username):', fieldErrors.length === 0 ? 'Pass' : 'Fail');

    // Test 2: Invalid username (too short)
    fieldErrors = validator.validateField('username', sampleData.username);
    console.log('Test 2 (Invalid Username - Too Short):', fieldErrors);

    // Test 3: Valid email
    fieldErrors = validator.validateField('email', sampleData.email);
    console.log('Test 3 (Valid Email):', fieldErrors.length === 0 ? 'Pass' : 'Fail');

    // Test 4: Invalid email
    fieldErrors = validator.validateField('email', sampleData.email);
    console.log('Test 4 (Invalid Email):', fieldErrors);

    // Test 5: Valid password
    fieldErrors = validator.validateField('password', sampleData.password);
    console.log('Test 5 (Valid Password):', fieldErrors.length === 0 ? 'Pass' : 'Fail');

    // Test 6: Invalid password (no uppercase)
    fieldErrors = validator.validateField('password', sampleData.password);
    console.log('Test 6 (Invalid Password - No Uppercase):', fieldErrors);

    // Test 7: Invalid age (out of range)
    fieldErrors = validator.validateField('age', sampleData.age);
    console.log('Test 7 (Invalid Age - Out of Range):', fieldErrors);

    // Test 8: Valid phone number
    fieldErrors = validator.validateField('phone', sampleData.phone);
    console.log('Test 8 (Valid Phone):', fieldErrors.length === 0 ? 'Pass' : 'Fail');

    // Test 9: Invalid phone number
    fieldErrors = validator.validateField('phone', sampleData.phone);
    console.log('Test 9 (Invalid Phone):', fieldErrors);

    console.log('\n--- Tests Completed ---');
}

// Run the test suite
runTests();
