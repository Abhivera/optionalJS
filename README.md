# OptionalJS 🎁

A robust and elegant Optional implementation for JavaScript, inspired by Java's Optional class. This package helps you handle null pointer exceptions gracefully and write more maintainable code by providing a container object that may or may not contain a non-null value.



## Why OptionalJS? 🤔

### The Null Pointer Exception Problem

JavaScript developers often encounter issues with null or undefined values:

```javascript
// Dangerous code
const user = getUser(); // might be null
const address = user.address; // 💥 TypeError: Cannot read property 'address' of null
const city = address.city;
```

This leads to the infamous:
```
TypeError: Cannot read property 'x' of null
```

### The Optional Solution

OptionalJS provides a safe way to handle potentially null values:

```javascript
const user = Optional.ofNullable(getUser())
  .map(u => u.address)
  .map(a => a.city)
  .orElse("Unknown City");
```

## Installation 📦

```bash
npm install optionaljs
```

## Usage 💡

### Basic Usage

```javascript
const Optional = require('optionaljs');

// Creating Optionals
const present = Optional.of("hello");          // Contains non-null value
const nullable = Optional.ofNullable(null);    // Empty optional
const empty = Optional.empty();                // Empty optional

// Checking values
console.log(present.isPresent());  // true
console.log(nullable.isEmpty());   // true

// Safe access
const value = present.get();                   // Returns "hello"
const safe = nullable.orElse("default");       // Returns "default"
```

### Chaining Operations

```javascript
const result = Optional.ofNullable(user)
  .map(user => user.profile)
  .map(profile => profile.settings)
  .map(settings => settings.theme)
  .orElse("default-theme");
```

### Conditional Operations

```javascript
Optional.ofNullable(user)
  .filter(user => user.age >= 18)
  .ifPresent(user => console.log("Adult user:", user))
  .ifEmpty(() => console.log("No adult user found"));
```

### Error Handling

```javascript
try {
  const value = Optional.empty()
    .orElseThrow(() => new Error("Value required!"));
} catch (error) {
  console.log(error.message); // "Value required!"
}
```

### Practical Examples

#### User Authentication
```javascript
const getUsername = (user) => {
  return Optional.ofNullable(user)
    .map(u => u.profile)
    .map(p => p.username)
    .orElse("anonymous");
};

// Usage
const user = { 
  profile: { 
    username: "john_doe" 
  } 
};
console.log(getUsername(user));      // "john_doe"
console.log(getUsername(null));      // "anonymous"
```

#### Configuration Management
```javascript
const getConfig = (path) => {
  return Optional.ofNullable(process.env)
    .map(env => env[path])
    .filter(value => value.length > 0)
    .orElseGet(() => loadDefaultConfig(path));
};
```

#### Form Validation
```javascript
const validateEmail = (formData) => {
  return Optional.ofNullable(formData.email)
    .map(email => email.trim())
    .filter(email => email.includes("@"))
    .map(email => ({ isValid: true, email }))
    .orElse({ isValid: false, error: "Invalid email" });
};
```

## API Reference 📚

### Static Methods

#### `Optional.of(value)`
Creates an Optional with a non-null value. Throws if value is null/undefined.
```javascript
const opt = Optional.of("hello");
```

#### `Optional.ofNullable(value)`
Creates an Optional that may contain a null value.
```javascript
const opt = Optional.ofNullable(possiblyNullValue);
```

#### `Optional.empty()`
Creates an empty Optional.
```javascript
const opt = Optional.empty();
```

### Instance Methods

#### `get()`
```javascript
const value = Optional.of("hello").get(); // "hello"
```

#### `isPresent()`
```javascript
const hasValue = Optional.of("hello").isPresent(); // true
```

#### `isEmpty()`
```javascript
const isEmpty = Optional.empty().isEmpty(); // true
```

#### `ifPresent(consumer)`
```javascript
Optional.of("hello")
  .ifPresent(value => console.log(value));
```

#### `ifEmpty(action)`
```javascript
Optional.empty()
  .ifEmpty(() => console.log("No value"));
```

#### `map(mapper)`
```javascript
const mapped = Optional.of("hello")
  .map(str => str.toUpperCase()); // Optional containing "HELLO"
```

#### `filter(predicate)`
```javascript
const filtered = Optional.of(5)
  .filter(num => num > 3); // Optional containing 5
```

#### `orElse(other)`
```javascript
const value = Optional.empty()
  .orElse("default"); // "default"
```

#### `orElseGet(supplier)`
```javascript
const value = Optional.empty()
  .orElseGet(() => computeDefault()); // Result of computeDefault()
```

#### `orElseThrow(exceptionSupplier)`
```javascript
const value = Optional.empty()
  .orElseThrow(() => new Error("Required!")); // Throws Error
```

## Comparison with Java Optional 🔄

OptionalJS is inspired by Java's Optional class but with some JavaScript-specific enhancements:

1. More fluent API with method chaining
2. Additional `ifEmpty` method for empty case handling
3. JavaScript-specific null/undefined handling
4. No checked exceptions
5. More functional programming friendly

## Best Practices 🌟

1. Use Optional as a return type, not as a parameter type
2. Don't overuse - Optional is for exceptional cases, not for all nullable values
3. Chain operations when possible instead of nesting
4. Use `ifPresent`/`ifEmpty` for side effects
5. Prefer `orElse`/`orElseGet` over `get()`


## Links 🔗

- [GitHub Repository](https://github.com/Abhivera/optionalJS)


- [NPM Package](https://www.npmjs.com/package/optionals-js)


## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits 💝

Inspired by Java's Optional class and functional programming patterns.

---

Made with ❤️ by Abhijit Verma



# optionalJS
