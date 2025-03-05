function sum(a, b) {
  return a + b;
}

describe('sum function', () => {
  it('adds 1 and 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
