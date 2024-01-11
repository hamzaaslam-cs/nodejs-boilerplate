let add = (a, b) => {
  return a + b;
};

let cloneArray = (array) => {
  return [...array];
};

test("Test suite", function () {
  let array = [1, 2, 3];

  expect(add(1, 2)).toBe(3);

  expect(cloneArray([1, 2, 3])).toStrictEqual(array);
});
// describe('Sample Test', () => {
//   it('should test that true === true', () => {
//     expect(true).toBe(true)
//   })
// })