import fibonacci from '../src/utils/fibonacci';

describe('fibonacci', () => {
  it('returns 0 for n = 0', () => {
    expect(fibonacci(0)).toBe(0);
  });

  it('returns 1 for n = 1', () => {
    expect(fibonacci(1)).toBe(1);
  });

  it('returns 1 for n = 2', () => {
    expect(fibonacci(2)).toBe(1);
  });

  it('returns 55 for n = 10', () => {
    expect(fibonacci(10)).toBe(55);
  });

  it('throws an error for negative n', () => {
    expect(() => fibonacci(-1)).toThrow('Negative numbers are not allowed');
  });
});
