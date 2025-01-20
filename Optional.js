// src/Optional.js

/**
 * Represents a container object which may or may not contain a non-null value.
 */
class Optional {
    /**
     * Private constructor. Use static methods to create instances.
     * @param {*} value - The value to be wrapped
     */
    constructor(value) {
      this._value = value;
    }
  
    /**
     * Returns an Optional describing the given non-null value.
     * @param {*} value - The value to be wrapped
     * @throws {Error} if value is null or undefined
     * @returns {Optional}
     */
    static of(value) {
      if (value === null || value === undefined) {
        throw new Error("Value cannot be null or undefined");
      }
      return new Optional(value);
    }
  
    /**
     * Returns an Optional describing the given value, if non-null,
     * otherwise returns an empty Optional.
     * @param {*} value - The value to be wrapped
     * @returns {Optional}
     */
    static ofNullable(value) {
      return value === null || value === undefined
        ? Optional.empty()
        : new Optional(value);
    }
  
    /**
     * Returns an empty Optional instance.
     * @returns {Optional}
     */
    static empty() {
      return new Optional(null);
    }
  
    /**
     * If a value is present, returns the value, otherwise throws an Error.
     * @throws {Error} if value is not present
     * @returns {*} The non-null value described by this Optional
     */
    get() {
      if (this.isPresent()) {
        return this._value;
      }
      throw new Error("No value present");
    }
  
    /**
     * If a value is present, returns true, otherwise false.
     * @returns {boolean}
     */
    isPresent() {
      return this._value !== null && this._value !== undefined;
    }
  
    /**
     * If a value is not present, returns true, otherwise false.
     * @returns {boolean}
     */
    isEmpty() {
      return !this.isPresent();
    }
  
    /**
     * If a value is present, performs the given action with the value,
     * otherwise does nothing.
     * @param {Function} action - The action to be performed, if a value is present
     * @returns {Optional} this Optional
     */
    ifPresent(action) {
      if (this.isPresent()) {
        action(this._value);
      }
      return this;
    }
  
    /**
     * If a value is not present, performs the given action,
     * otherwise does nothing.
     * @param {Function} action - The action to be performed, if no value is present
     * @returns {Optional} this Optional
     */
    ifEmpty(action) {
      if (this.isEmpty()) {
        action();
      }
      return this;
    }
  
    /**
     * If a value is present, returns an Optional describing the result of applying
     * the given mapping function to the value, otherwise returns an empty Optional.
     * @param {Function} mapper - The mapping function to apply to a value, if present
     * @returns {Optional} An Optional describing the result of applying a mapping
     * function to the value of this Optional, if a value is present,
     * otherwise an empty Optional
     */
    map(mapper) {
      if (!this.isPresent()) {
        return Optional.empty();
      }
      const mapped = mapper(this._value);
      return Optional.ofNullable(mapped);
    }
  
    /**
     * If a value is present, returns the value, otherwise returns other.
     * @param {*} other - The value to be returned, if no value is present
     * @returns {*} The value, if present, otherwise other
     */
    orElse(other) {
      return this.isPresent() ? this._value : other;
    }
  
    /**
     * If a value is present, returns the value, otherwise returns the result
     * produced by the supplying function.
     * @param {Function} supplier - The supplying function that produces a value to
     * be returned
     * @returns {*} The value, if present, otherwise the result produced by the
     * supplying function
     */
    orElseGet(supplier) {
      return this.isPresent() ? this._value : supplier();
    }
  
    /**
     * If a value is present, returns the value, otherwise throws the exception
     * produced by the exception supplying function.
     * @param {Function} exceptionSupplier - The supplying function that produces an
     * exception to be thrown
     * @returns {*} The value, if present
     * @throws {Error} if no value is present
     */
    orElseThrow(exceptionSupplier) {
      if (this.isPresent()) {
        return this._value;
      }
      throw exceptionSupplier();
    }
  
    /**
     * If a value is present, and the value matches the given predicate,
     * returns an Optional describing the value, otherwise returns an empty Optional.
     * @param {Function} predicate - The predicate to apply to a value, if present
     * @returns {Optional} An Optional describing the value of this Optional,
     * if a value is present and the value matches the given predicate,
     * otherwise an empty Optional
     */
    filter(predicate) {
      if (!this.isPresent()) {
        return this;
      }
      return predicate(this._value) ? this : Optional.empty();
    }
  }
  
  module.exports = Optional;