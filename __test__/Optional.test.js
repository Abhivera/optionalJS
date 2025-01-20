// __tests__/Optional.test.js

const Optional = require('../src/Optional');

describe('Optional', () => {
  describe('creation', () => {
    test('Optional.of should create an Optional with a non-null value', () => {
      const opt = Optional.of('test');
      expect(opt.isPresent()).toBe(true);
      expect(opt.get()).toBe('test');
    });

    test('Optional.of should throw for null/undefined', () => {
      expect(() => Optional.of(null)).toThrow();
      expect(() => Optional.of(undefined)).toThrow();
    });

    test('Optional.ofNullable should handle null/undefined', () => {
      const opt1 = Optional.ofNullable(null);
      const opt2 = Optional.ofNullable(undefined);
      expect(opt1.isEmpty()).toBe(true);
      expect(opt2.isEmpty()).toBe(true);
    });

    test('Optional.empty should create an empty Optional', () => {
      const opt = Optional.empty();
      expect(opt.isEmpty()).toBe(true);
    });
  });

  describe('methods', () => {
    test('map should transform present values', () => {
      const opt = Optional.of(5);
      const mapped = opt.map(x => x * 2);
      expect(mapped.get()).toBe(10);
    });

    test('filter should work correctly', () => {
      const opt = Optional.of(5);
      expect(opt.filter(x => x > 3).isPresent()).toBe(true);
      expect(opt.filter(x => x > 10).isEmpty()).toBe(true);
    });

    test('orElse should provide default values', () => {
      const present = Optional.of(5);
      const empty = Optional.empty();
      expect(present.orElse(10)).toBe(5);
      expect(empty.orElse(10)).toBe(10);
    });

    test('orElseGet should lazily provide default values', () => {
      const empty = Optional.empty();
      expect(empty.orElseGet(() => 10)).toBe(10);
    });

    test('orElseThrow should throw for empty Optionals', () => {
      const empty = Optional.empty();
      expect(() => 
        empty.orElseThrow(() => new Error('Empty!'))
      ).toThrow('Empty!');
    });

    test('ifPresent should execute for present values', () => {
      const mock = jest.fn();
      Optional.of(5).ifPresent(mock);
      expect(mock).toHaveBeenCalledWith(5);
    });

    test('ifEmpty should execute for empty values', () => {
      const mock = jest.fn();
      Optional.empty().ifEmpty(mock);
      expect(mock).toHaveBeenCalled();
    });
  });
});